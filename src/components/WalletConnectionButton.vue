<template>
  <div v-if="!walletAddr" @click="$event => connectWallet()"
    :class="`hover:shadow-[6px_6px_0px_#000000] border-[4px] border-transparent hover:border-[#000000] py-[10px] px-[20px] cursor-pointer hover:bg-blue text-${textColor} hover:text-[#000000]`">
    <p class="font-[700] text-[23px] leading-[26px] font-['Handjet']">Connect Wallet</p>
  </div>
</template>

<script setup lang="ts">
import '@/assets/sass/style.scss'

import { useOnboard } from '../composables/useOnboard'
import Prism from 'prismjs'
import Web3 from 'web3';
import 'prismjs/themes/prism-dark.css'

import { useStore } from '../store'

Prism.manual = true;

const { wallets, connectedWallet, connectedChain, connectWallet, disconnectConnectedWallet } = useOnboard();
const store = useStore()
const { walletAddr } = storeToRefs(store)

onMounted(() => {
  if (connectedWallet != null) {
    store.setWalletAddr(connectedWallet.value?.accounts[0].address as string)
  }
})

const props = defineProps<{
  textColor: string
}>()

watch(connectedWallet, (newWalletConnected) => {
  if (newWalletConnected != null) {
    store.setWalletAddr(newWalletConnected?.accounts[0].address)
  } else {
    store.setWalletAddr('')
  }
})
</script>

<script lang="ts">
export default {
  name: 'WalletConnectionButton'
}
</script>