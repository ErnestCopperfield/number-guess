import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { APP_NAME } from "@/lib/site";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [coinbaseWallet({ appName: APP_NAME }), injected()],
  transports: {
    [base.id]: http()
  }
});
