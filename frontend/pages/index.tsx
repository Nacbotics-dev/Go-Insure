// @ts-nocheck
import Image from "next/image";
import { Inter } from "next/font/google";
import algosdk from "algosdk";
import { useState, useEffect } from "react";
import { clients } from "beaker-ts";
import Link from "next/link";
import { useWallet } from "@txnlab/use-wallet";
import { shortenAddress } from "../helpers/shortenAddress";

import { KrowdFund } from "../app_client/krowdfund_client";

// If you just need a placeholder signer
const PlaceHolderSigner: algosdk.TransactionSigner = (
  _txnGroup: algosdk.Transaction[],
  _indexesToSign: number[]
): Promise<Uint8Array[]> => {
  return Promise.resolve([]);
};

// AnonClient can still allow reads for an app but no transactions
// can be signed
const AnonClient = (client: algosdk.Algodv2, appId: number): KrowdFund => {
  return new KrowdFund({
    // @ts-ignore
    client: client,
    signer: PlaceHolderSigner,
    sender: "",
    appId: appId,
  });
};

export default function Home() {
  const [appId, setAppId] = useState<number>(171237480);
  // Setup config for client/network.
  const [apiProvider, setApiProvider] = useState(clients.APIProvider.AlgoNode);
  const [network, setNetwork] = useState(clients.Network.TestNet);
  // Init our algod client
  const algodClient = clients.getAlgodClient(apiProvider, network);
  const [loading, setLoading] = useState(false);

  // Init our app client
  const [appClient, setAppClient] = useState<KrowdFund>(
    AnonClient(algodClient, appId)
  );

  const { activeAccount, activeAddress, providers, signer } = useWallet();
  const [connectModal, setConnectModal] = useState(false);

  useEffect(() => {
    console.log(activeAccount, appId, algodClient);
    // Bad way to track connected status but...
    if (activeAccount === null && appClient.sender !== "") {
      setAppClient(AnonClient(algodClient, appId));
    } else if (activeAccount && activeAccount.address != appClient.sender) {
      setAppClient(
        new KrowdFund({
          client: algodClient,
          signer: signer,
          sender: activeAccount.address,
          appId: appId,
        })
      );
    }
    // _getFundings();
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
  };

  const handleConnect = () => {
    toggleConnectModal();
  };

  // Deploy the app on chain
  async function createApp() {
    if (!activeAddress) {
      console.log("please connect wallet");
      return
    }
    setLoading(true);
    console.log(appClient);
    const { appId, appAddress, txId } = await appClient.create();
    console.log(appId);
    console.log(appAddress);
    console.log(txId);
    setAppId(appId);
    alert(`Created app: ${appId}`);
    setLoading(false);
  }

  return (
    <main className="">
      <button className="m-10" onClick={() => createApp()}>
        createApp
      </button>
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

      {/* PURCHASE POLICY */}
      <div className="flex justify-center p-20">
        <button
          className="bg-black text-white py-3 px-10 text-2xl"
          onClick={() => {}}
        >
          Purchase Policy
        </button>
      </div>

      {/* CLAIM POLICY */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Area"
                className="py-3 px-10 border-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="State"
                className="py-3 px-10 border-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Country"
                className="py-3 px-10 border-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="DateTime"
                className="py-3 px-10 border-2 rounded-lg"
              />
            </div>
          </div>
          <button className="border-2 mt-4 p-4 text-2xl" onClick={() => {}}>
            Claim Policy
          </button>
        </div>
      </div>

      {/* MY INSURANCE */}
      <div className="flex justify-center align-center">
        <h2 className="text-bold text-2xl underline mt-10 p-2">MY INSURANCE</h2>
      </div>
      {/* INSURANCE TABLE */}
      <div className="flex justify-between align-center mt-10 px-40 border-b-2">
        <h3 className="text-xl text-bold">Premium Amount</h3>
        <h3 className="text-xl text-bold">Active Status</h3>
        <h3 className="text-xl text-bold">Registration Date</h3>
        <h3 className="text-xl text-bold">Expiration Date</h3>
        <h3 className="text-xl text-bold">Claim Status</h3>
        <h3 className="text-xl text-bold">Amount Claimed</h3>
      </div>
    </main>
  );
}
