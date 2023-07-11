import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "@txnlab/use-wallet";
import { shortenAddress } from "../helpers/shortenAddress";

const Navbar = ({ toggleConnectModal }) => {
  const { activeAccount, providers } = useWallet();

  const handleDisconnect = () => {
    providers?.map((provider) => {
      provider.disconnect();
    });
  };
  const handleConnect = () => {
    toggleConnectModal();
  };

  return (
    <header className="w-full px-32 py-8 font-medium flex justify-between items-center">
      <h2 className="font-bold text-2xl">GO-INSURE</h2>
      <nav>
        {activeAccount?.address && (
          <Link href="/" className="text-xl bg-black text-white py-2 px-4 mr-2">
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
  );
};
export default Navbar;
