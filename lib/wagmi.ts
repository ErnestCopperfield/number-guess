import { cookieStorage, createConfig, createStorage, fallback, http } from "wagmi";
import { base } from "wagmi/chains";
import { baseAccount, injected } from "wagmi/connectors";
import { APP_NAME } from "@/lib/site";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({ target: "okxWallet" }),
    injected(),
    baseAccount({
      appName: APP_NAME
    })
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [base.id]: fallback([http("https://mainnet.base.org"), http()])
  }
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
