import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
} from "@txnlab/use-wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";

export default function App({ Component, pageProps }: AppProps) {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    ],
  });

  return (
    <WalletProvider value={providers}>
      <Component {...pageProps} />
    </WalletProvider>
  );
}


