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
    // count: 0,
    // verified: false,
    // flagged: false,
    state: 'unknown',
    searchAddr: '',
    walletAddr: ''
  }),

  actions: {
    initApp() {
      this.isInitialized = true;
      console.log("app initialized!");
    },

    // verify() {
    //   this.verified = true;
    // },

    // flag() {
    //   this.flagged = true;
    // },

    setState(state: string) {
      this.state = state;
    },
    
    setSearchAddr(searchAddr: string) {
      this.searchAddr = searchAddr;
    },

    setWalletAddr(addr: string) {
      this.walletAddr = addr;
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

    getWalletAddr: (state) => {
      return state.walletAddr;
    }
  },
});
