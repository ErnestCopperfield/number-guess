import { cookieStorage, createConfig, createStorage, fallback, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// TODO(builder-code): replace this placeholder with the final builder code suffix once provided.
const BUILDER_CODE_DATA_SUFFIX = "TODO_REPLACE_WITH_BUILDER_CODE_SUFFIX";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  storage: createStorage({ storage: cookieStorage }),
  transports: {
    [base.id]: fallback([
      http("https://mainnet.base.org", {
        fetchOptions: {
          headers: {
            "x-builder-code-placeholder": BUILDER_CODE_DATA_SUFFIX
          }
        }
      }),
      http()
    ])
  }
});
