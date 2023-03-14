import { ref } from "vue";

import { useOnboard } from "./useOnboard";
import { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";

import type { JsonRpcSigner } from "@ethersproject/providers";

export function useEthers() {
  const { connectedWallet } = useOnboard();
  const address = ref<string>("");
  const ens = ref<string | null>(null);
  const balance = ref<string>("");
  const loading = ref(false);

  const getSigner = (): JsonRpcSigner => {
    try {
      loading.value = true;
      if (connectedWallet.value) {
        const web3Provider = new Web3Provider(
          connectedWallet.value.provider
        );
        const signer = web3Provider.getSigner(0);
        loading.value = false;
        return signer;
      } else {
        loading.value = false;
        throw new Error("Connect your wallet first");
      }
    } catch (error) {
      loading.value = false;
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("cannot initialize the ethers signer");
      }
    }
  };

  const fetchSignerData = async () => {
    const signer = getSigner();
    loading.value = true;
    try {
      address.value = await signer.getAddress();
      ens.value = await signer.provider.lookupAddress(address.value);
      balance.value = formatUnits(
        await signer.provider.getBalance(address.value)
      );
      loading.value = false;
    } catch (error) {
      loading.value = false;
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("cannot fetch the signer data");
      }
    }
  };

  return {
    loading,
    getSigner,
    fetchSignerData,
    address,
    ens,
    balance,
  };
}
