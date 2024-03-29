import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import trustModule from "@web3-onboard/trust";

import { init } from "./composables/useOnboard";

import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import VueGtag from "vue-gtag";
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.postcss'
import router from './router'

const head = createHead({
  title: 'VRFD'
  // meta - An array of meta tags
  // link - An array of link tags
  // script - An array of script tags
  // htmlAttrs - An object of attributes to be added to the html tag
  // bodyAttrs - An object of attributes to be added to the body tag
  // base - The base tag
  // noscript - An array of no noscript tags
  // style - An array of style tags
  // titleTemplate - A template for the title
})

const injected = injectedModule();
const walletConnect = walletConnectModule();
const trust = trustModule();

const chains = [
  {
    id: '0x61',
    token: 'BSC TEST',
    label: 'Binance Test',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545'
  }
];

const onboardOptions = {
  accountCenter: {
    desktop: {
      enabled: true,
    },
  },
  wallets: [walletConnect, injected, trust],
  chains: chains,
  appMetadata: {
    name: "VRFD",
    icon: "<svg><svg/>",
    description: "Open Info",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "Frame", url: "https://frame.sh" },
    ],
  },
};

init(onboardOptions);

const app = createApp(App)

app.use(VueGtag, {
  config: {id: "G-Z2WTHPKQQ4"}
})

app.use(createPinia())
app.use(router)
app.use(head)

app.mount('#app')
