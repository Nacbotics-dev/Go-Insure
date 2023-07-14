import json
import os
import shutil

from algosdk import encoding
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.transaction import PaymentTxn
from beaker import client, consts, localnet
from beaker.client.api_providers import AlgoNode, Network

from go_insure import go_insure_app, purchase_policy, get_policy


BUILD_PATH = "./artifacts"
if os.path.exists(BUILD_PATH):
    shutil.rmtree(BUILD_PATH)
else:
    import build
    build.build()


WEATHER_FEED_JSON_PATH = "./weather_feeds.json"


def form_weather_json(area: str, state: str, country: str, date_time: str) -> None:
    sign_key = "##signKey"
    unit_of_measure = "metric"
    weather_dict = {
        "weather": {
            "area": area,
            "state": state,
            "country": country,
            "date_time": date_time,
            "unit_of_measure": unit_of_measure,
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
    accts = localnet.get_accounts()

    deployer_acct = accts[0]
    acct1 = accts[1]
    acct2 = accts[2]

    algod_client = localnet.get_algod_client()

    app_client = client.ApplicationClient(
        client=algod_client,
        app=go_insure_app,
        sender=deployer_acct.address,
        signer=deployer_acct.signer,
    )
    app_id, app_addr, _ = app_client.create()

    print(f"Account 1 address: {acct1.address}")
    print(f"Contract deployed with app id: {app_id}, and address: {app_addr}")

    app_client.fund(10_000_000)

    print(f"Deployer global state {app_client.get_global_state()}")

    acct1_client = app_client.prepare(signer=acct1.signer)
    acct2_client = app_client.prepare(signer=acct2.signer)

    # Account 1 - This approves
    txn = PaymentTxn(
        sender=acct1.address,
        sp=algod_client.suggested_params(),
        receiver=app_addr,
        amt=consts.algo * 1,
    )
    acct1_client.call(
        purchase_policy,
        area="Ruiru",
        state="Kiambu",
        country="Kenya",
        pay_txn=TransactionWithSigner(txn=txn, signer=acct1.signer),
        boxes=[(app_id, encoding.decode_address(acct1.address))],
    )
    result = acct1_client.call(
        get_policy,
        addr=acct1.address,
        boxes=[(app_id, encoding.decode_address(acct1.address))],
    )
    print(result.return_value)


    # Account 2 - Line 104 fails because of insufficient premium amount
    txn = PaymentTxn(
        sender=acct2.address,
        sp=algod_client.suggested_params(),
        receiver=app_addr,
        # amt=int(consts.algo * .3),
        amt=int(consts.algo * 1),
    )
    acct2_client.call(
        purchase_policy,
        area="Ruiru",
        state="Kiambu",
        country="Kenya",
        pay_txn=TransactionWithSigner(txn=txn, signer=acct2.signer),
        boxes=[(app_id, encoding.decode_address(acct2.address))],
    )
    result = acct2_client.call(
        get_policy,
        addr=acct2.address,
        boxes=[(app_id, encoding.decode_address(acct2.address))],
    )
    print(result.return_value) 


if __name__ == "__main__":
    demo()
