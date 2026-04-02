import type { OKXUniversalProvider } from "@okxconnect/universal-provider";
import { createConnector } from "@wagmi/core";
import { ChainNotConfiguredError } from "@wagmi/core";
import {
  type AddEthereumChainParameter,
  getAddress,
  numberToHex,
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError
} from "viem";
import { APP_ICON_URL, APP_NAME } from "@/lib/site";

export function okxConnector() {
  type Provider = OKXUniversalProvider;

  let provider: Provider | undefined;
  let accountsChanged: ((accounts: string[]) => void) | undefined;
  let chainChanged: ((chainId: string | number) => void) | undefined;
  let disconnectListener: (() => void) | undefined;

  return createConnector<Provider>((config) => ({
    id: "okxUniversal",
    name: "OKX Wallet",
    rdns: "com.okex.wallet",
    type: "okx",
    async connect<withCapabilities extends boolean = false>(
      parameters: {
        chainId?: number | undefined;
        isReconnecting?: boolean | undefined;
        withCapabilities?: boolean | withCapabilities | undefined;
      } = {}
    ) {
      const { chainId } = parameters;

      try {
        const okx = await this.getProvider();
        const targetChainId = chainId ?? config.chains[0]?.id;
        if (!targetChainId) throw new ChainNotConfiguredError();

        const chains = config.chains.length
          ? config.chains.map((chain) => `eip155:${chain.id}`)
          : [`eip155:${targetChainId}`];

        await okx.connect({
          namespaces: {
            eip155: {
              chains,
              defaultChain: String(targetChainId)
            }
          },
          optionalNamespaces: {
            eip155: {
              chains
            }
          },
          sessionConfig: {
            redirect: "none"
          }
        });

        const accounts = await this.getAccounts();
        const currentChainId = await this.getChainId();

        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this) as (accounts: string[]) => void;
          okx.on("accountsChanged", accountsChanged);
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this) as (chainId: string | number) => void;
          okx.on("chainChanged", chainChanged);
        }
        if (!disconnectListener) {
          disconnectListener = this.onDisconnect.bind(this) as () => void;
          okx.on("disconnect", disconnectListener);
        }

        return {
          accounts: accounts as withCapabilities extends true
            ? readonly { address: `0x${string}`; capabilities: Record<string, unknown> }[]
            : readonly `0x${string}`[],
          chainId: currentChainId
        };
      } catch (error) {
        const message = (error as Error)?.message ?? "";
        if (/user rejected|user denied|rejected|cancel/i.test(message)) {
          throw new UserRejectedRequestError(error as Error);
        }
        throw error;
      }
    },
    async disconnect() {
      const okx = await this.getProvider();
      if (accountsChanged) okx.off("accountsChanged", accountsChanged);
      if (chainChanged) okx.off("chainChanged", chainChanged);
      if (disconnectListener) okx.off("disconnect", disconnectListener);
      accountsChanged = undefined;
      chainChanged = undefined;
      disconnectListener = undefined;
      await okx.disconnect();
    },
    async getAccounts() {
      const okx = await this.getProvider();
      const accounts = (await okx.request<string[]>({ method: "eth_accounts" }, "eip155:8453")) ?? [];
      return accounts.map((account) => getAddress(account));
    },
    async getChainId() {
      const okx = await this.getProvider();
      const chainId = await okx.request<string | number>({ method: "eth_chainId" }, "eip155:8453");
      if (typeof chainId === "number") return chainId;
      return Number(chainId);
    },
    async getProvider() {
      if (!provider) {
        const { OKXUniversalProvider } = await import("@okxconnect/universal-provider");
        provider = await OKXUniversalProvider.init({
          dappMetaData: {
            name: APP_NAME,
            icon: APP_ICON_URL
          }
        });
      }
      return provider;
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts();
        return accounts.length > 0;
      } catch {
        return false;
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find((item) => item.id === chainId);
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

      const okx = await this.getProvider();
      try {
        await okx.request(
          {
            method: "wallet_switchEthereumChain",
            params: [{ chainId: numberToHex(chain.id) }]
          },
          `eip155:${chain.id}`
        );
        return chain;
      } catch (error) {
        if ((error as ProviderRpcError).code !== 4902) {
          throw new SwitchChainError(error as Error);
        }

        const addChain = addEthereumChainParameter ?? {
          chainId: numberToHex(chain.id),
          chainName: chain.name,
          nativeCurrency: chain.nativeCurrency,
          rpcUrls: chain.rpcUrls.default.http,
          blockExplorerUrls: chain.blockExplorers?.default ? [chain.blockExplorers.default.url] : undefined
        } satisfies AddEthereumChainParameter;

        await okx.request(
          {
            method: "wallet_addEthereumChain",
            params: [addChain]
          },
          `eip155:${chain.id}`
        );
        return chain;
      }
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect();
      else {
        config.emitter.emit("change", {
          accounts: accounts.map((account) => getAddress(account))
        });
      }
    },
    onChainChanged(chain) {
      const chainId = Number(chain);
      config.emitter.emit("change", { chainId });
    },
    async onDisconnect() {
      config.emitter.emit("disconnect");
      const okx = await this.getProvider();
      if (accountsChanged) okx.off("accountsChanged", accountsChanged);
      if (chainChanged) okx.off("chainChanged", chainChanged);
      if (disconnectListener) okx.off("disconnect", disconnectListener);
      accountsChanged = undefined;
      chainChanged = undefined;
      disconnectListener = undefined;
    }
  }));
}
