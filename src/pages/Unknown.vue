<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-offBlack pb-[60px]">
      <Header :textColor="textColor" /> 
      <h1 class="font-['Handjet'] font-normal md:text-[100px] text-[150px] leading-[168px] font-bold text-white text-center mb-[9px]">
        Unknown</h1>
    </div>
    <div class="flex absolute top-1/2 left-1/2 transform -translate-y-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div class="relative">
        <router-link to="/"><i class="absolute -translate-y-[50%] top-1/2 md:left-[5px] left-[15px] text-[20px] z-50 fa-solid fa-xmark"></i></router-link>
        <input type="text" id="search" name="search" :value="shortenAddr($route.params.addr as string)" readonly
          class="cursor-pointer text-black font-normal text-[32px] leading-[36px] font-['Handjet'] text-center py-[9px] px-[22px] md:w-[320px] w-[620px] shadow-[8px_8px_0px_#000]" />
      </div>
    </div>
    <div class="flex flex-col md:justify-start justify-between items-center h-[50vh] bg-offWhite">
      <div class="flex justify-between items-center md:gap-[30px] md:mb-[100px] md:w-[320px] w-[420px] pt-[75px]">
        <div
          class="md:w-1/2 hover:border-t-[12px] border-transparent hover:border-l-[12px] hover:border-black border-t-[12px] border-l-[12px]">
          <button v-if="store.getWalletAddr?.toLowerCase() != OWNER_ADDR.toLowerCase()"
            class="md:w-full bg-red font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black border-[4px] py-[9px] px-[12px]">
            <a href="https://bit.ly/mint-flag" target="_blank">report</a>
          </button>
        </div>
        <div
        class="md:w-1/2 hover:border-t-[12px] hover:border-l-[12px] hover:border-black border-transparent border-t-[12px] border-l-[12px]">
          <button v-if="store.getWalletAddr?.toLowerCase() != OWNER_ADDR.toLowerCase()"
            class="md:w-full bg-green font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black border-[4px] py-[9px] px-[12px]">
            <a href="https://bit.ly/get-vrfd" target="_blank">register</a>
          </button>
        </div>
        <button v-if="store.getWalletAddr?.toLowerCase() == OWNER_ADDR.toLowerCase()" @click="mintForFlagged"
          class="bg-red font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">Mint
          for flagged</button>
        <button v-if="store.getWalletAddr?.toLowerCase() == OWNER_ADDR.toLowerCase()" @click="mintForVerified"
          class="bg-green font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">Mint
          for verified</button>
      </div>
      <MobileFooter :textColor=blackColor />
      <Footer :textColor="blackColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useStore } from '../store'

  const store = useStore()
  const { walletAddr } = storeToRefs(store)

  watch(walletAddr, (newWalletAddr) => {
    console.log(newWalletAddr)
  })
</script>

<script lang="ts">
  import '@/assets/sass/style.scss'
  import { OWNER_ADDR } from "@/helpers/constants"
  import { useEthers } from "@/composables/useEthers"
  import Header from '@/pages/layouts/Header.vue'
  import Footer from '@/pages/layouts/Footer.vue'
  import MobileFooter from './layouts/MobileFooter.vue'
  import { OIVerifiedContract, OIVerifiedSignedContract } from '@/contracts/OIVerifiedInstance'
  import { OIFlaggedContract, OIFlaggedSignedContract } from '@/contracts/OIFlaggedInstance'

  export default {
    name: 'Flagged',
    components: {
      Header,
      Footer,
      MobileFooter
    },
    data() {
      return {
        windowWidth: window.innerWidth,
        blackColor: 'black',
        walletAddr: '',
        address: '',
        textColor: 'blue'
      }
    },
    computed: {
      deviceWidth() {
        return this.windowWidth;
      }
    },
    created() {
      window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
      window.removeEventListener("resize", this.handleResize);
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
      shortenAddr(addr: string) {
        if (this.windowWidth <= 768) {
          if (addr.length < 10) return addr;
          return `${addr.slice(0, 8)}...${addr.slice(addr.length - 8)}`;
        }
        return addr;
      },
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
