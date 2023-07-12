import algosdk
import os
import sys
import yaml

from beaker import Application, Authorize, BuildOptions, GlobalStateValue, localnet
from beaker.consts import TRUE
from beaker.lib.storage import BoxMapping
from pyteal import (
    And,
    Assert,
    Balance,
    Bytes,
    Expr,
    Global,
    InnerTxnBuilder,
    Int,
    Seq,
    TealType,
    Txn,
    TxnField,
    TxnType,
    abi,
)
from typing import Literal as L
from dotenv import load_dotenv

load_dotenv()

path = os.getcwd()
parent = os.path.dirname(path)
sys.path.append(parent)
default_app_path = path + "/default_app"
protocol_filepath = path + "/protocol"
sys.path.append(".")

from abi_structures import *
from protocol.assets.helpers.key_map import key_map as protocol_key_map
from protocol.utils.gora_pyteal_utils import (
    opt_in as gora_opt_in,
    get_method_signature,
    opt_in_asset,
)
from protocol.utils.abi_types import *

MLKEYMAP = protocol_key_map["main_local"]
VGKEYMAP = protocol_key_map["voting_global"]
RSKEYMAP = protocol_key_map["request_status"]

MAIN_APP_ID = Int(0)
MAIN_APP_ADDRESS = Bytes("")
DEMO_MODE = False

PREMIUM_AMOUNT = Int(1_000_000)
COVERAGE_AMOUNT = Int(300_000)

DEFAULT_POLICY_EXPIRATION_TIMELINE = Int(31_536_000)

PENDING = Bytes("Pending")
APPROVED = Bytes("Approved")
REJECTED = Bytes("Rejected")


class Policy(abi.NamedTuple):
    customer_address: abi.Field[abi.Address]
    premium_amount: abi.Field[abi.Uint64]  # 1A
    active_status: abi.Field[abi.Bool]
    registration_date: abi.Field[abi.Uint64]
    expiration_date: abi.Field[abi.Uint64]  # 1yr
    claim_status: abi.Field[abi.String]
    amount_claimed: abi.Field[abi.Uint64]


class PolicyState:
    box_name = GlobalStateValue(TealType.bytes)
    insurer = GlobalStateValue(
        stack_type=TealType.bytes, default=Bytes(""), descr="The insurer address"
    )
    coverage_amount = GlobalStateValue(
        stack_type=TealType.uint64,
        default=COVERAGE_AMOUNT,
        descr="This is the coverage amount",
    )
    policy_expiration_date = GlobalStateValue(
        stack_type=TealType.uint64,
        default=DEFAULT_POLICY_EXPIRATION_TIMELINE,
        descr="Expiration of policy. Default is set to yearly.",
    )
    address_to_policy = BoxMapping(abi.Address, Policy)
    wind_speed = GlobalStateValue(
        stack_type=TealType.uint64, default=Int(75), descr="Current wind speed"
    )
    wind_gust = GlobalStateValue(
        stack_type=TealType.uint64, default=Int(100), descr="Current wind gust"
    )


go_insure_app = Application(
    name="InsurancedApp",
    descr="Insurance dApp",
    state=PolicyState(),
    build_options=BuildOptions(avm_version=8),
)


@go_insure_app.opt_in
def opt_in():
    return Seq(Reject())


@go_insure_app.delete(bare=True)
def delete():
    return Seq(Reject())


def verify_app_call():
    # assert that this is coming from a voting contract
    voting_contract_creator = App.globalGetEx(
        Global.caller_app_id(), VGKEYMAP["creator"]
    )
    vote_app_creator = AppParam.creator(Global.caller_app_id())

    return Seq(
        vote_app_creator,
        voting_contract_creator,
        Assert(
            vote_app_creator.value() == MAIN_APP_ADDRESS,
            vote_app_creator.value() == voting_contract_creator.value(),
            Txn.application_id() == Global.current_application_id(),
        ),
    )


@go_insure_app.external
def write_to_data_box(
    response_type_bytes: abi.DynamicBytes,
    response_body_bytes: abi.DynamicBytes,
):
    verify = verify_app_call()
    if DEMO_MODE:
        verify = Assert(Int(1) == Int(1))

    return Seq(
        (response_body := abi.make(ResponseBody)).decode(response_body_bytes.get()),
        response_body.oracle_return_value.store_into(
            oracle_return_value := abi.make(abi.DynamicArray[abi.Byte])
        ),
        Pop(App.box_delete(go_insure_app.state.box_name.get())),
        # the plus 2 is to account for the length indicator for dynamic abi arrays
        Pop(
            App.box_create(
                go_insure_app.state.box_name.get(),
                oracle_return_value.length() + Int(2),
            )
        ),
        verify,
        App.box_put(go_insure_app.state.box_name.get(), oracle_return_value.encode()),
    )


@go_insure_app.create
def bootstrap() -> Expr:
    """Bootstrap global state vlaues."""
    return Seq(
        go_insure_app.initialize_global_state(),
        go_insure_app.state.insurer.set(Global.current_application_address()),
    )


@go_insure_app.external
def purchase_policy(pay_txn: abi.PaymentTransaction) -> Expr:
    """
    Buys a new property policy for an account.
    A new policy id is generated to identify the policy once purchased successfully.
    """
    txn = pay_txn.get()
    return Seq(
        Assert(txn.sender() == Txn.sender(), comment="Sender mismatch"),
        Assert(Global.group_size() == Int(2), comment="Group size not 2"),
        Assert(
            Balance(Txn.sender()) >= PREMIUM_AMOUNT,
            comment="Sender balance is lower than Premium",
        ),
        Assert(
            txn.type_enum() == TxnType.Payment,
            txn.amount() == PREMIUM_AMOUNT,
            txn.receiver() == go_insure_app.state.insurer.get(),
            comment="Invalid txn type, amount or receiver.",
        ),
        (customer_address := abi.Address()).set(Txn.sender()),
        (premium_amount := abi.Uint64()).set(PREMIUM_AMOUNT),
        (active_state := abi.Bool()).set(TRUE),
        (registration_date := abi.Uint64()).set(Global.latest_timestamp()),
        (expiration_date := abi.Uint64()).set(
            registration_date.get() + go_insure_app.state.policy_expiration_date.get()
        ),
        (claim_status := abi.String()).set(PENDING),
        (amount_claimed := abi.Uint64()).set(Int(0)),
        (policy := Policy()).set(
            customer_address,
            premium_amount,
            active_state,
            registration_date,
            expiration_date,
            claim_status,
            amount_claimed,
        ),
        go_insure_app.state.address_to_policy[Txn.sender()].set(policy),
    )


@go_insure_app.external
def approve_claim(
    receiver_addr: abi.Address,
    coverage_amt: abi.Uint64,
) -> Expr:
    """Approve policy claim"""
    return Seq(
        (policy := Policy()).decode(
            go_insure_app.state.address_to_policy[receiver_addr].get()
        ),
        (customer_address := abi.Address()).set(policy.customer_address),
        (premium_amount := abi.Uint64()).set(policy.premium_amount),
        (active_status := abi.Bool()).set(policy.active_status),
        (registration_date := abi.Uint64()).set(policy.registration_date),
        (expiration_date := abi.Uint64()).set(policy.expiration_date),
        (claim_status := abi.String()).set(policy.claim_status),
        # Ensure the sender has already purchased a policy
        Assert(customer_address.get() == receiver_addr.get()),
        # Ensure PREMIUM amount has been paid
        Assert(premium_amount.get() == PREMIUM_AMOUNT),
        # Ensure policy is still active
        Assert(active_status.get() == TRUE),
        # Ensure claim status is still pending
        Assert(claim_status.get() == PENDING),
        # Issue payment
        issue_payout(addr=receiver_addr.get(), amt=coverage_amt.get()),
        # Set claim status to `APPROVED`
        (claim_status := abi.String()).set(APPROVED),
        (amount_claimed := abi.Uint64()).set(coverage_amt),
        policy.set(
            customer_address,
            premium_amount,
            active_status,
            registration_date,
            expiration_date,
            claim_status,
            amount_claimed,
        ),
        go_insure_app.state.address_to_policy[receiver_addr].set(policy),
    )


@go_insure_app.external
def reject_claim(receiver_addr: abi.Address) -> Expr:
    """Reject a policy claim"""
    return Seq(
        (policy := Policy()).decode(
            go_insure_app.state.address_to_policy[receiver_addr].get()
        ),
        (customer_address := abi.Address()).set(policy.customer_address),
        (premium_amount := abi.Uint64()).set(policy.premium_amount),
        (active_state := abi.Bool()).set(policy.active_status),
        (registration_date := abi.Uint64()).set(policy.registration_date),
        (expiration_date := abi.Uint64()).set(policy.expiration_date),
        (claim_status := abi.String()).set(REJECTED),
        (amount_claimed := abi.Uint64()).set(policy.amount_claimed),
        (policy := Policy()).set(
            customer_address,
            premium_amount,
            active_state,
            registration_date,
            expiration_date,
            claim_status,
            amount_claimed,
        ),
        go_insure_app.state.address_to_policy[Txn.sender()].set(policy),
    )


def issue_payout(addr: abi.Address, amt: abi.Uint64) -> Expr:
    """Issues coverage amount to the claiming customer"""
    return Seq(
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields(
            {
                TxnField.type_enum: TxnType.Payment,
                TxnField.receiver: addr,
                TxnField.amount: amt,
            }
        ),
        InnerTxnBuilder.Submit(),
    )


@go_insure_app.external
def review_claim(
    response_type_bytes: abi.DynamicBytes, response_body_bytes: abi.DynamicBytes
):
    return Seq(
        write_to_data_box(response_type_bytes, response_body_bytes),
    )


@go_insure_app.external
def send_request(
    box_name: abi.DynamicBytes,
    key: abi.DynamicBytes,
    token_asset_id: abi.Uint64,
    source_arr: abi.DynamicArray[SourceSpec],
    agg_method: abi.Uint32,
    user_data: abi.DynamicBytes,
    main_app_reference: abi.Application,
):
    return Seq(
        # request_args
        Assert(MAIN_APP_ID == Txn.applications[1]),
        (request_tuple := abi.make(RequestSpec)).set(source_arr, agg_method, user_data),
        # destination
        (app_id_param := abi.Uint64()).set(Txn.applications[0]),
        (method_sig_param := abi.DynamicBytes()).set(
            Bytes(review_claim.method_signature())
        ),
        (destination_tuple := abi.make(DestinationSpec)).set(
            app_id_param, method_sig_param
        ),
        # type
        (request_type_param := abi.Uint64()).set(Int(1)),
        # key
        # simple enough that it's simply in the method args below
        # app_refs
        (current_app_id := abi.make(abi.Uint64)).set(Global.current_application_id()),
        (app_refs := abi.make(abi.StaticArray[abi.Uint64, L[1]])).set([current_app_id]),
        # asset_refs
        (asset_refs := abi.make(abi.StaticArray[abi.Uint64, L[1]])).set(
            [token_asset_id]
        ),
        # account_refs
        (current_app_addr := abi.make(abi.Address)).set(
            Global.current_application_address()
        ),
        (accounts_refs := abi.make(abi.StaticArray[abi.Address, L[1]])).set(
            [current_app_addr]
        ),
        # box_refs
        (data_box := abi.make(BoxType)).set(box_name, current_app_id),
        (box_refs := abi.make(abi.DynamicArray[BoxType])).set([data_box]),
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.MethodCall(
            app_id=MAIN_APP_ID,
            method_signature=get_method_signature("request", "main"),
            args=[
                request_tuple.encode(),
                destination_tuple.encode(),
                request_type_param.encode(),
                key.encode(),
                app_refs.encode(),
                asset_refs.encode(),
                accounts_refs.encode(),
                box_refs.encode(),
            ],
        ),
        InnerTxnBuilder.Submit(),
    )


@go_insure_app.external
def get_policy(addr: abi.Address, *, output: Policy) -> Expr:
    """Gets policy for a specific address"""
    return go_insure_app.state.address_to_policy[addr].store_into(output)


@go_insure_app.external(authorize=Authorize.only_creator())
def update_coverage_amount(amt: abi.Uint64) -> Expr:
    """Update policy coverage amount."""
    return go_insure_app.state.coverage_amount.set(amt.get())


@go_insure_app.external(authorize=Authorize.only_creator())
def update_expiration_timeline(expiration_timeline: abi.Uint64) -> Expr:
    """Update policy expiration timeline."""
    return go_insure_app.state.policy_expiration_date.set(expiration_timeline.get())


@go_insure_app.external
def opt_in_gora(
    asset_reference: abi.Asset,
    main_app_reference: abi.Application,
):
    return Seq(
        Assert(Txn.sender() == Global.creator_address()),
        opt_in_asset(Txn.assets[0]),
        gora_opt_in(Txn.applications[1]),
    )


if __name__ == "__main__":
    params = yaml.safe_load(sys.argv[1])
    MAIN_APP_ID = Int(params["MAIN_APP_ID"])
    MAIN_APP_ADDRESS = Bytes(
        algosdk.encoding.decode_address(
            algosdk.logic.get_application_address(params["MAIN_APP_ID"])
        )
    )
    DEMO_MODE = params["DEMO_MODE"]
    app_spec = go_insure_app.build(localnet.get_algod_client()).export(
        default_app_path + "/artifacts/"
    )
