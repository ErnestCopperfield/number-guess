import { cookieStorage, createConfig, createStorage, fallback, http } from "wagmi";
import { base } from "wagmi/chains";
import { baseAccount, injected } from "wagmi/connectors";
import { APP_NAME } from "@/lib/site";
import { okxConnector } from "@/lib/connectors/okx";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    okxConnector(),
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
