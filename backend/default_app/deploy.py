# Demonstrate the sample contract in this directory by building, deploying and calling the contract
import algokit_utils
import sys
import os
import subprocess
import base64
import json
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
    path = f"{default_app_path}/weather_feeds.json"

    with open(path, "w") as output_file:
        output_file.write(json_obj)


form_weather_json(
    area="Ruiru", state="Kiambu", country="Kenya", date_time="2023-07-13T08:00:00"
)

def demo() -> None:
    with open(default_app_path + "/weather_feeds.json") as f:
        weather_feed = json.load(f)
    weather_feed_result_bytes = convert_feed_result_json(weather_feed)
    print(weather_feed_result_bytes)

    # client = AlgoNode(Network.TestNet).algod()
    client = ALGOD_CLIENT

    suggested_params = client.suggested_params()


demo()
