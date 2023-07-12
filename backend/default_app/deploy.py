# Demonstrate the sample contract in this directory by building, deploying and calling the contract
import algosdk
import algokit_utils
import sys
import os
import subprocess
import base64
import json
import beaker
from beaker import client, consts
from pathlib import Path
from algosdk.abi import ABIType
from algosdk import atomic_transaction_composer as atc, abi, encoding
from algosdk.transaction import LogicSigAccount
from beaker.client import ApplicationClient
from beaker.client.api_providers import AlgoNode, Network

from dotenv import load_dotenv

load_dotenv()

path = os.getcwd()
parent = os.path.dirname(path)
sys.path.append(parent)
default_app_path = path + "/default_app"
protocol_filepath = path + "/protocol"
sys.path.append(".")

import default_app
from utils import *
from abi_structures import response_body_type
from build import build
import json


app = default_app.go_insure_app

WEATHER_FEED_JSON_PATH = f"{default_app_path}/weather_feeds.json"


def form_weather_json(area: str, state: str, country: str, date_time: str) -> None:
    sign_key = "##signKey"
    unit_of_measure = "metric"
    weather_dict = {
        "weather": {
            "area": area,
            "state": state,
            "country": country,
            "unit_of_measure": unit_of_measure,
            "date_time": date_time,
            "key": sign_key,
        }
    }
    json_obj = json.dumps(weather_dict, indent=2)

    with open(WEATHER_FEED_JSON_PATH, "w") as output_file:
        output_file.write(json_obj)


form_weather_json(
    area="Ruiru", state="Kiambu", country="Kenya", date_time="2023-07-13T08:00:00"
)


def demo() -> None:
    with open(WEATHER_FEED_JSON_PATH) as f:
        feed_examples = json.load(f)
    feed_type = "weather"
    feed_example = feed_examples[feed_type]
    feed_result_bytes = convert_feed_result_json(feed_example)
    print(feed_result_bytes)

    client = ALGOD_CLIENT

    suggested_params = client.suggested_params()

    # Fund owner account
    owner = generate_account()
    fund_account(owner.address, 1_000_000_000_000)

    asset_id = deploy_token(owner)

    # compile the vote_verify_lsig
    vote_verify_lsig_out = subprocess.run(
        ["python", protocol_filepath + "/assets/vote_verify_lsig.py", ""],
        capture_output=True,
    )
    vote_verify_lsig_compiled = compileTeal(vote_verify_lsig_out.stdout)
    vote_verify_lsig_bytes = base64.b64decode(vote_verify_lsig_compiled["result"])
    vote_verify_lsig_acct = LogicSigAccount(vote_verify_lsig_bytes)

    # fund the lsig
    fund_account(vote_verify_lsig_acct.address(), 1_000_000_000)

    # get hash of main contract's abi
    main_abi_hash = get_ABI_hash(protocol_filepath + "/assets/abi/main-contract.json")

    # compile vote contract
    vote_approval_out = subprocess.run(
        [
            "python",
            protocol_filepath + "/assets/voting_approval.py",
            f"{{CONTRACT_VERSION: {main_abi_hash}, VOTE_VERIFY_LSIG_ADDRESS: {vote_verify_lsig_acct.address()}}}",
        ],
        capture_output=True,
    )
    vote_approval_out_compiled = compileTeal(vote_approval_out.stdout)
    vote_approval_out_b64 = vote_approval_out_compiled["result"]
    vote_clear_out = subprocess.run(
        ["python", protocol_filepath + "/assets/voting_clear.py", ""],
        capture_output=True,
    )
    vote_clear_out_compiled = compileTeal(vote_clear_out.stdout)
    vote_clear_out_b64 = vote_clear_out_compiled["result"]

    # deploy main contract
    main_approval_out = subprocess.run(
        [
            "python",
            protocol_filepath + "/assets/main_approval.py",
            f"{{\
                TOKEN_ASSET_ID: {asset_id}, \
                CONTRACT_VERSION: {main_abi_hash},\
                VOTE_APPROVAL_PROGRAM: {vote_approval_out_b64},\
                VOTE_CLEAR_PROGRAM: {vote_clear_out_b64},\
                MINIMUM_STAKE: {500},\
            }}",
        ],
        capture_output=True,
    )
    main_approval_out_compiled = compileTeal(main_approval_out.stdout)
    main_approval_out_bytes = base64.b64decode(main_approval_out_compiled["result"])
    main_clear_out = subprocess.run(
        ["python", protocol_filepath + "/assets/main_clear.py", ""], capture_output=True
    )
    main_clear_out_compiled = compileTeal(main_clear_out.stdout)
    main_clear_out_bytes = base64.b64decode(main_clear_out_compiled["result"])

    main_app = Main_Contract(
        client,
        owner,
        asset_id,
        main_approval_out_bytes,
        main_clear_out_bytes,
        owner.address,
    )

    # Generate a requester and opt into $GORA token
    requester = generate_account()
    fund_account(requester.address, 1_000_000)
    opt_in(token_id=asset_id, user=requester)

    send_asa(owner, requester, asset_id, 50_000_000_000)

    fund_account(main_app.address, 202_000)

    app_spec_path_str = default_app_path + "/artifacts/application.json"
    app_spec_path = Path(app_spec_path_str)
    build(main_app.id, True)

    default_app_client = algokit_utils.ApplicationClient(
        algod_client=ALGOD_CLIENT, app_spec=app_spec_path, signer=requester
    )

    # Deploy
    create_response = default_app_client.create()
    default_app_id = default_app_client.app_id
    default_app_address = default_app_client.app_address
    fund_account(default_app_address, 100_000 + 3200)
    print(
        f"""
            Deployed app in txid {create_response.tx_id}
            App ID: {default_app_client.app_id}
            Address: {default_app_client.app_address}
        """
    )

    # Create a data box
    data_box_name = bytes(feed_type, "utf-8")

    # we add 8 to account for the abi array length indicator at the beginning
    print(len(feed_result_bytes))
    data_box_cost = (len(data_box_name) + len(feed_result_bytes) + 8) * 400 + 2500

    signer = atc.AccountTransactionSigner(owner.private_key)

    # Set up app to make requests
    fund_account(default_app_address, 602_500 + data_box_cost)

    default_app_client.call(
        default_app.opt_in_gora,
        asset_reference = asset_id,
        main_app_reference = main_app.id
    )

    main_app.deposit_algo(owner, 100_000, default_app_address)
    main_app.deposit_token(owner, 7_000_000_000, default_app_address)

    # Form request inputs
    key = b"foo"
    form_values = {
        
    }


if __name__ == "__main__":
    demo()
