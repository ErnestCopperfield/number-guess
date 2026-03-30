import { cookieStorage, createConfig, createStorage, fallback, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const BASE_APP_ID = "69c9f07354fba99e37410fe5";
export const BASE_BUILDER_CODE = "bc_ko5o9z6v";

// Base builder code data suffix for 8021 attribution.
export const BASE_BUILDER_DATA_SUFFIX =
  "0x62635f6b6f356f397a36760b0080218021802180218021802180218021" as const;

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  storage: createStorage({ storage: cookieStorage }),
  transports: {
    [base.id]: fallback([
      http("https://mainnet.base.org"),
      http()
    ])
  }
});
