<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-[#363B3E] pb-[60px]">
      <header class="py-[34px] px-[37px] flex justify-end">
        <WalletConnectionButton :bg-color="walletConnectionBtnBgColor" />
      </header>
      <h1 class="font-['Handjet'] font-normal text-[150px] leading-[168px] font-bold text-white text-center mb-[9px]">Unknown</h1>
    </div>
    <input type="text" id="search" name="search" :value="$route.params.addr" readonly class="text-black font-normal text-[32px] leading-[36px] font-['Handjet'] text-center py-[9px] px-[22px] min-w-[620px] rounded-[14px] shadow-[6px_10px] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
    />
    <div class="flex flex-col justify-between items-center h-[50vh] bg-[#FFF4F3]">
      <div class="flex justify-between items-center min-w-[420px] pt-[75px]">
        <button v-if="store.getWalletAddr?.toLowerCase() != OWNER_ADDR.toLowerCase()" class="bg-[#F7766A] font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">flag address</button>
        <button v-if="store.getWalletAddr?.toLowerCase() != OWNER_ADDR.toLowerCase()"  class="bg-[#00B689] font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">get verified</button>

        <button v-if="store.getWalletAddr?.toLowerCase() == OWNER_ADDR.toLowerCase()" @click="mintForFlagged" class="bg-[#F7766A] font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">Mint for flagged</button>
        <button v-if="store.getWalletAddr?.toLowerCase() == OWNER_ADDR.toLowerCase()" @click="mintForVerified" class="bg-[#00B689] font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">Mint for verified</button>
      </div>
      <footer class="flex justify-center items-center flex-col w-[100%] h-[147px] shadow-[inset_0_8px_4px_rgba(0,0,0,0.25)]">
        <p class="font-normal text-[23px] leading-[26px] text-[#000] text-center font-['Ubuntu Condensed']">Verified v3.1.0,</p>
        <p class="font-normal text-[23px] leading-[26px] text-[#000] text-center font-['Ubuntu Condensed']">Powered by <span class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-[#30B1FD]">Open Information</span></p>
      </footer>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useStore } from '../store'

  const store = useStore()
  const { walletAddr } = storeToRefs(store)
  console.log('walet, ', walletAddr)

  watch(walletAddr, (newWalletAddr) => {
    console.log(newWalletAddr)
  })
</script>

<script lang="ts">
  import '@/assets/sass/style.scss'
  import { OWNER_ADDR } from "@/helpers/constants"
  import { useEthers } from "@/composables/useEthers"
  import WalletConnectionButton from "@/components/WalletConnectionButton.vue"
  import { OIVerifiedContract, OIVerifiedSignedContract } from '@/contracts/OIVerifiedInstance'
  import { OIFlaggedContract, OIFlaggedSignedContract } from '@/contracts/OIFlaggedInstance'

  export default {
    name: 'Flagged',
    components: {
      WalletConnectionButton
    },
    data() {
      return {
        walletConnectionBtnBgColor: '#FFF4F3',
        walletAddr: '',
        address: ''
      }
    },
    methods: {
      async mintForVerified() {
        const { getSigner } = useEthers()
        const signer = getSigner()
        const address = await signer.getAddress()

        if (signer) {
          try {
            await OIVerifiedSignedContract(signer).methods.safeMint(this.$route.params.addr).send({from: address})
          } catch (error: any) {
            console.log('error', error)
          }
        }
      },

      async mintForFlagged() {
        const { getSigner } = useEthers()
        const signer = getSigner()
        const address = await signer.getAddress()

        if (signer) {
          try {
            await OIFlaggedSignedContract(signer).methods.safeMint(this.$route.params.addr).send({from: address})
          } catch (error: any) {
            console.log('error', error)
          }
        }
      }
    }
  }
</script>