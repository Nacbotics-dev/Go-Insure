// @ts-nocheck
import Image from "next/image";
import algosdk, { getApplicationAddress, microalgosToAlgos } from "algosdk";
import { useState, useEffect } from "react";
import { clients } from "beaker-ts";
import Link from "next/link";
import { useWallet } from "@txnlab/use-wallet";
import { shortenAddress } from "../helpers/shortenAddress";
// import app client
import { go_insure } from "../app_client/go_insure_client";
import { makeCall } from "../request";

// If you just need a placeholder signer
const PlaceHolderSigner: algosdk.TransactionSigner = (
  _txnGroup: algosdk.Transaction[],
  _indexesToSign: number[]
): Promise<Uint8Array[]> => {
  return Promise.resolve([]);
};

// AnonClient can still allow reads for an app but no transactions
// can be signed
const AnonClient = (client: algosdk.Algodv2, appId: number): go_insure => {
  return new go_insure({
    // @ts-ignore
    client: client,
    signer: PlaceHolderSigner,
    sender: "",
    appId: appId,
  });
};

export default function Home() {
  const [appId, setAppId] = useState<number>(257585879);
  // Setup config for client/network.
  const [apiProvider, setApiProvider] = useState(clients.APIProvider.AlgoNode);
  const [network, setNetwork] = useState(clients.Network.TestNet);
  // Init our algod client
  const algodClient = clients.getAlgodClient(apiProvider, network);
  const [loading, setLoading] = useState(false);

  // Init our app client
  const [appClient, setAppClient] = useState<go_insure>(
    AnonClient(algodClient, appId)
  );

  const { activeAccount, activeAddress, providers, signer } = useWallet();
  const [connectModal, setConnectModal] = useState(false);
  const [myPolicy, setMyPolicy] = useState([]);
  const [area, setArea] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    console.log(activeAccount, appId, algodClient);
    // Bad way to track connected status but...
    if (activeAccount === null && appClient.sender !== "") {
      setAppClient(AnonClient(algodClient /*, appId*/));
    } else if (activeAccount && activeAccount.address != appClient.sender) {
      setAppClient(
        new go_insure({
          client: algodClient,
          signer: signer,
          sender: activeAccount.address,
          appId: appId,
        })
      );
      console.log("hello");
    }

    _getMyPolicy();
  }, [activeAccount]);
  const toggleConnectModal = () => {
    if (connectModal) {
      setConnectModal(false);
    } else {
      setConnectModal(true);
    }
    console.log("x");
  };

  const handleDisconnect = () => {
    providers?.map((provider) => {
      provider.disconnect();
    });
    setMyPolicy([]);
  };

  const handleConnect = () => {
    toggleConnectModal();
  };

  // Deploy the app on chain
  async function createApp() {
    if (!activeAddress) {
      console.log("please connect wallet");
      return;
    }
    console.log("activeAddress");

    console.log(activeAddress);
    setLoading(true);
    console.log(appClient);
    const { appId, appAddress, txId } = await appClient.create();
    await appClient.bootstrap();

    console.log(appId);
    console.log(appAddress);
    console.log(txId);
    setAppId(appId);
    alert(`Created app: ${appId}`);
    setLoading(false);
  }
  async function _getMyPolicy() {
    const policy = await getMyPolicy();
    console.log(policy);
    setMyPolicy(policy);
  }

  async function getMyPolicy() {
    const _policy = [];
    for (let boxName of await appClient.getApplicationBoxNames()) {
      console.log(boxName);
      const result = await appClient.getApplicationBox(boxName);
      console.log(result);

      const resultCodec = algosdk.ABIType.from(
        "(address,uint64,bool,uint64,uint64,string,uint64,string,string,string)"
      );
      const val = resultCodec.decode(result);
      console.log(val);
      let policy = {
        premAmount: Number(val[1]),
        activeStatus: val[2],
        registrationDate: Number(val[3]),
        expirationDate: Number(val[4]),
        claimedStatus: val[5],
        amountClaimed: Number(val[6]),
        area: val[7],
        state: val[8],
        country: val[9],
      };
      console.log(policy);
      console.log(val[0]);
      if (activeAccount?.address) {
        if (val[0] == activeAccount.address) {
          console.log("hello");

          _policy.push(policy);
        }
      }
    }
    console.log(_policy);
    return _policy;
  }

  async function claim_policy(_date, _time) {
    if (_date && _time) {
      const _dateTime = _date.concat("T", _time);
      const result = await makeCall(area, state, country, _dateTime);
      console.log(result);

      if (result?.windSpeed >= 75 && result?.windGust >= 100) {
        const result = await appClient.approve_claim({
          boxes: [
            {
              appIndex: appId,
              name: algosdk.decodeAddress(activeAccount.address).publicKey,
            },
          ],
        });
        console.log(result);
        setDate("");
        setTime("");
      } else {
        const result = await appClient.reject_claim({
          boxes: [
            {
              appIndex: appId,
              name: algosdk.decodeAddress(activeAccount.address).publicKey,
            },
          ],
        });
        console.log(result);
        setDate("");
        setTime("");
      }
    }

    _getMyPolicy();
  }

  async function purchase_policy(area, state, country) {
    if (area && state && country) {
      let _seed = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAccount?.address ? activeAccount.address : "",
        suggestedParams: await algodClient.getTransactionParams().do(),
        to: getApplicationAddress(appId),
        amount: 1000000n,
      });

      const result = await appClient.purchase_policy(
        { pay_txn: _seed, area: area, state: state, country: country },
        {
          boxes: [
            {
              appIndex: appId,
              name: algosdk.decodeAddress(activeAccount.address).publicKey,
            },
          ],
        }
      );
      console.log(result);
      setArea("");
      setState("");
      setCountry("");
    }

    _getMyPolicy();
  }

  const convertToDateTime = (timestamp) => {
    let dateFormat = new Date(timestamp * 1000);
    return "".concat(
      dateFormat.getDate(),
      "/",
      dateFormat.getMonth() + 1,
      "/",
      dateFormat.getFullYear(),
      " ",
      dateFormat.getHours(),
      ":",
      dateFormat.getMinutes(),
      ":",
      dateFormat.getSeconds()
    );
  };
  return (
    <main className="">
      {/* <button className="m-10" onClick={() => createApp()}>
        createApp
      </button> */}

      {/* NAVBAR */}
      <header className="w-full px-32 py-8 font-medium flex justify-between items-center">
        <h2 className="font-bold text-2xl">GO-INSURE</h2>
        <nav>
          {activeAccount?.address && (
            <Link
              href="/"
              className="text-xl bg-black text-white py-2 px-4 mr-2"
            >
              {shortenAddress(activeAccount.address)}
            </Link>
          )}
          <Link
            href="/"
            className="text-xl bg-black text-white py-2 px-4"
            onClick={!activeAccount?.address ? handleConnect : handleDisconnect}
          >
            {activeAccount?.address ? "Disconnect" : "Connect Wallet"}
          </Link>
        </nav>
      </header>

      {/* CONNECT MENU */}

      {connectModal && (
        <div className="w-full h-full z-10 fixed top-1/4 left-1/4">
          <div className="relative w-2/4 bg-black h-2/4 rounded-[24px]">
            <div className="absolute top-0 right-0 -mt-5 -mr-5 bg-black">
              <button onClick={toggleConnectModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="w-12 h-12"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full h-full ">
              <div className="flex justify-center w-full h-full items-center">
                {providers?.map((provider) => (
                  <div key={provider.metadata.id} className="mr-20">
                    <div className="">
                      <button
                        type="button"
                        onClick={
                          provider.isConnected
                            ? provider.disconnect
                            : () => {
                                provider.connect();
                                setConnectModal(false);
                              }
                        }
                      >
                        <img
                          width={200}
                          alt={`${provider.metadata.name} icon`}
                          src={provider.metadata.icon}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* section goes here */}

      <div className="flex justify-center align-center p-20">
        {/* PURCHASE POLICY */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Area"
                  className="py-3 px-10 border-2 rounded-lg"
                  onChange={(e) => {
                    setArea(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="State"
                  className="py-3 px-10 border-2 rounded-lg"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Country"
                  className="py-3 px-10 border-2 rounded-lg"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>

              <button
                className="bg-black text-white py-3 px-10 text-2xl"
                onClick={() => purchase_policy(area, state, country)}
              >
                Purchase Policy
              </button>
            </div>
          </div>
        </div>

        {/* CLAIM POLICY */}
        <div className="flex justify-center items-center p-20">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Date"
                  className="py-3 px-10 border-2 rounded-lg"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Time"
                  className="py-3 px-10 border-2 rounded-lg"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              className="border-2 mt-4 p-4 text-2xl"
              onClick={() => claim_policy(date, time)}
            >
              Claim Policy
            </button>
          </div>
        </div>
      </div>

      {/* MY INSURANCE */}
      <div className="flex justify-center align-center">
        <h2 className="text-bold text-2xl underline mt-10 p-2">MY INSURANCE</h2>
      </div>
      {/* INSURANCE TABLE */}

      <div className="flex justify-center align-center mt-10">
        <table class="shadow-lg bg-white text-2x">
          <thead>
            <tr>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Premium Amount
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Active Status
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Registration Date
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Expiration Date
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Claim Status
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Amount Claimed
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">Area</th>
              <th className="bg-blue-100 border text-left px-8 py-4">State</th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Country
              </th>
            </tr>
          </thead>
          <tbody>
            {myPolicy &&
              myPolicy.map((policy) => (
                <tr className="border px-8 py-4">
                  <td className="border text-center px-8 py-4">
                    {microalgosToAlgos(policy.premAmount)}
                  </td>
                  <td className="border text-center px-8 py-4">
                    {policy.activeStatus ? "True" : "False"}
                  </td>
                  <td className="border text-center px-8 py-4">
                    {convertToDateTime(policy.registrationDate)}
                  </td>
                  <td className="border text-center px-8 py-4">
                    {convertToDateTime(policy.expirationDate)}
                  </td>
                  <td className="border text-center px-8 py-4">{policy.claimedStatus}</td>
                  <td className="border text-center px-8 py-4">
                    {microalgosToAlgos(policy.amountClaimed)}
                  </td>
                  <td className="border text-center px-8 py-4">{policy.area}</td>
                  <td className="border text-center px-8 py-4">{policy.state}</td>
                  <td className="border text-center px-8 py-4">{policy.country}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>

    
  );
}
