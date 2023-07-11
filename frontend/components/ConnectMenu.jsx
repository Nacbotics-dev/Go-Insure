import React, { useEffect } from "react";
import { useWallet } from "@txnlab/use-wallet";

export default function ConnectMenu({toggleConnectModal }) {
  const { providers, activeAccount } = useWallet();

  // useEffect(() => {
  //   if (activeAccount?.address) {
  //     toggleConnectModal();
  //   }
  // });
  return (
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
                        : provider.connect()
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
  );
}
