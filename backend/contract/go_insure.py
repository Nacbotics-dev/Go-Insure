from beaker import Application, Authorize, BuildOptions, GlobalStateValue
from beaker.consts import TRUE
from beaker.lib.storage import BoxMapping
from pyteal import (
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

PREMIUM_AMOUNT = Int(1_000_000)  # 1A
COVERAGE_AMOUNT = Int(5_000_000)  # 5A

DEFAULT_POLICY_EXPIRATION_TIMELINE = Int(31_536_000)

PENDING = Bytes("Pending")
APPROVED = Bytes("Approved")
REJECTED = Bytes("Rejected")


class Policy(abi.NamedTuple):
    customer_address: abi.Field[abi.Address]
    premium_amount: abi.Field[abi.Uint64]
    active_status: abi.Field[abi.Bool]
    registration_date: abi.Field[abi.Uint64]
    expiration_date: abi.Field[abi.Uint64]  # 1yr from reg. date
    claim_status: abi.Field[abi.String]
    amount_claimed: abi.Field[abi.Uint64]
    area: abi.Field[abi.String]
    state: abi.Field[abi.String]
    country: abi.Field[abi.String]


class PolicyState:
    insurer = GlobalStateValue(
        stack_type=TealType.bytes,
        default=Bytes(""),
        descr="The insurer address",
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


go_insure_app = Application(
    name="go_insure",
    descr="Insurance dApp",
    state=PolicyState(),
    build_options=BuildOptions(avm_version=8),
)


# @go_insure_app.create
# def create() -> Expr:
#     """Initialize global state values."""
#     return Seq(
#     )


@go_insure_app.external
def bootstrap() -> Expr:
    """Set insurer address to the current app address."""
    return Seq(
        go_insure_app.state.insurer.set(Global.current_application_address()),
    )


@go_insure_app.external
def purchase_policy(
    pay_txn: abi.PaymentTransaction,
    area: abi.String,
    state: abi.String,
    country: abi.String,
) -> Expr:
    """
    Buys a new property policy for an account.
    """
    txn = pay_txn.get()
    return Seq(
        Assert(
            area.get() != Bytes(""),
            state.get() != Bytes(""),
            country.get() != Bytes(""),
            comment="Invalid area, state or country",
        ),
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
            area,
            state,
            country,
        ),
        go_insure_app.state.address_to_policy[Txn.sender()].set(policy),
    )


@go_insure_app.external
def approve_claim() -> Expr:
    """Approve policy claim"""
    return Seq(
        (policy := Policy()).decode(
            go_insure_app.state.address_to_policy[Txn.sender()].get()
        ),
        (customer_address := abi.Address()).set(policy.customer_address),
        (premium_amount := abi.Uint64()).set(policy.premium_amount),
        (active_status := abi.Bool()).set(policy.active_status),
        (registration_date := abi.Uint64()).set(policy.registration_date),
        (expiration_date := abi.Uint64()).set(policy.expiration_date),
        (claim_status := abi.String()).set(policy.claim_status),
        (area := abi.String()).set(policy.area),
        (state := abi.String()).set(policy.state),
        (country := abi.String()).set(policy.country),
        # Ensure the sender has already purchased a policy
        Assert(customer_address.get() == Txn.sender()),
        # Ensure PREMIUM amount has been paid
        Assert(premium_amount.get() == PREMIUM_AMOUNT),
        # Ensure policy is still active
        Assert(active_status.get() == TRUE),
        # Ensure claim status is still pending
        Assert(claim_status.get() == PENDING),
        # Issue payment
        issue_payout(addr=customer_address.get(), amt=COVERAGE_AMOUNT),
        # Set claim status to `APPROVED`
        (claim_status := abi.String()).set(APPROVED),
        (amount_claimed := abi.Uint64()).set(COVERAGE_AMOUNT),
        policy.set(
            customer_address,
            premium_amount,
            active_status,
            registration_date,
            expiration_date,
            claim_status,
            amount_claimed,
            area,
            state,
            country,
        ),
        go_insure_app.state.address_to_policy[customer_address].set(policy),
    )


@go_insure_app.external
def reject_claim() -> Expr:
    """Reject a policy claim"""
    return Seq(
        (policy := Policy()).decode(
            go_insure_app.state.address_to_policy[Txn.sender()].get()
        ),
        (customer_address := abi.Address()).set(policy.customer_address),
        Assert(customer_address.get() == Txn.sender()),
        (premium_amount := abi.Uint64()).set(policy.premium_amount),
        (active_state := abi.Bool()).set(policy.active_status),
        (registration_date := abi.Uint64()).set(policy.registration_date),
        (expiration_date := abi.Uint64()).set(policy.expiration_date),
        (claim_status := abi.String()).set(REJECTED),
        (amount_claimed := abi.Uint64()).set(policy.amount_claimed),
        (area := abi.String()).set(policy.area),
        (state := abi.String()).set(policy.state),
        (country := abi.String()).set(policy.country),
        (policy := Policy()).set(
            customer_address,
            premium_amount,
            active_state,
            registration_date,
            expiration_date,
            claim_status,
            amount_claimed,
            area,
            state,
            country,
        ),
        go_insure_app.state.address_to_policy[customer_address].set(policy),
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
