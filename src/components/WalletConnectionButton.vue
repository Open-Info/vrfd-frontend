<template>
  <button v-if="!walletAddr" @click="$event => connectWallet()" :class="`w-[67px] h-[67px] rounded-full flex justify-center items-center text-[47px] leading-[47px] font-normal text-[#30B1FD] text-center font-['VT323'] ml-[26px] bg-[${bgColor}]`">
    i
  </button>
</template>

<script setup lang="ts">
  import '@/assets/sass/style.scss'

  import { useOnboard } from '../composables/useOnboard'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism-dark.css'

  import { useStore } from '../store'

  Prism.manual = true;

  const { wallets, connectedWallet, connectedChain, connectWallet, disconnectConnectedWallet } = useOnboard();
  const store = useStore()
  const { walletAddr } = storeToRefs(store)

  const props = defineProps<{
    bgColor: string
  }>()
  
  onMounted(() => {
    console.log('kkk', connectedWallet.value)
    if (connectedWallet != null) {
      store.setWalletAddr(connectedWallet.value?.accounts[0].address as string)
    }
  })

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

