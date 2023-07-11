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

CREATOR = {
    "address": os.getenv("ACCOUNT_ADDRESS"),
    "private_key": os.getenv("ACCOUNT_MNEMONIC"),
    "signer": algosdk.mnemonic.to_private_key(os.getenv("ACCOUNT_MNEMONIC")),
}

WEATHER_FEED_JSON_PATH = f"{default_app_path}/weather_feeds.json"
GORA_TESTNET_ASSET_ID = 227418519


def form_weather_json(area: str, state: str, country: str, date_time: str) -> None:
    sign_key = "##signKey"
    unit_of_measure = "metric"
    dictionary = {
        "area": area,
        "state": state,
        "country": country,
        "unit_of_measure": unit_of_measure,
        "date_time": date_time,
        "key": sign_key,
    }
    json_obj = json.dumps(dictionary, indent=4)

    with open(WEATHER_FEED_JSON_PATH, "w") as output_file:
        output_file.write(json_obj)


form_weather_json(
    area="Ruiru", state="Kiambu", country="Kenya", date_time="2023-07-13T08:00:00"
)


def opt_in_to_gora(client, token_id, account: dict) -> None:
    unsigned_txn = AssetTransferTxn(
        sender=account["address"],
        sp=client.suggested_params(),
        receiver=account["address"],
        amt=0,
        index=token_id,
    )
    signed_txn = unsigned_txn.sign(account["private_key"])
    txid = client.send_transacation(signed_txn)
    txn_result = wait_for_confirmation(client, txid, 4)


def demo() -> None:
    with open(WEATHER_FEED_JSON_PATH) as f:
        weather_feed = json.load(f)
    weather_feed_result_bytes = convert_feed_result_json(weather_feed)
    print(weather_feed_result_bytes)

    client = AlgoNode(Network.TestNet).algod()

    suggested_params = client.suggested_params()

    try:
        asset_info = client.account_asset_info(
            CREATOR["address"], GORA_TESTNET_ASSET_ID
        )
        print(asset_info)
        if asset_info["asset-holding"]["amount"] == 0:
            print("Need sufficient $GORA")
    finally:
        opt_in_to_gora(
            client=client,
            token_id=GORA_TESTNET_ASSET_ID,
            account={
                "address": CREATOR["address"],
                "private_key": CREATOR["private_key"],
            },
        )
    
    


demo()
