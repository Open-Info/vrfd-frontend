import { defineStore } from "pinia";

const versionString =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_APP_VERSION + "-dev"
    : import.meta.env.VITE_APP_VERSION;

export const useStore = defineStore("main", {
  state: () => ({
    debug: import.meta.env.MODE === "development",
    version: versionString,
    isInitialized: false,
    state: 'unknown',
    resolvedAddr: '',
    searchAddr: '',
    walletAddr: '',
    signer: null
  }),

  actions: {
    initApp() {
      this.isInitialized = true;
      console.log("app initialized!");
    },

    setState(state: string) {
      this.state = state;
    },
    
    setSearchAddr(searchAddr: string) {
      this.searchAddr = searchAddr;
    },

    setReservedAddr(addr: string) {
      this.resolvedAddr = addr;
    },

    setWalletAddr(addr: string) {
      this.walletAddr = addr;
    },

    setSigner(signer: any) {
      this.signer = signer
    }
    
  },

  getters: {
    isReady: (state) => {
      return !state.isInitialized;
    },

    getState: (state) => {
      return state.state;
    },

    getSearchAddr: (state) => {
      return state.searchAddr;
    },

    getReservedAddr: (state) => {
      return state.resolvedAddr;
    },

    getWalletAddr: (state) => {
      return state.walletAddr;
    },
    
    getSigner: (state) => {
      return state.signer;
    }
  },
});
