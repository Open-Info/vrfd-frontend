<template>
  <div class="relative">
    <div class="flex flex-col justify-between md:h-[35vh] h-[50vh] bg-offBlack pb-[60px]">
      <Header class="md:hidden" :textColor=textColor />
      <h1
        class="md:mt-[50px] font-['Handjet'] text-[150px] leading-[168px] font-bold text-blue text-center mb-[9px]">
        Search</h1>
    </div>
    <div class="flex absolute left-1/2 transform -translate-y-[50%] -translate-x-[50%]">
      <div class="relative flex items-center">
        <i @click="copyAddress"
          class="hover:bg-blue hover:text-black cursor-pointer border-[1px] border-[#6B7280] p-[17px] text-[20px] text-blue z-50 fa-regular fa-clipboard"></i>
        <input type="text" id="search" name="search" placeholder="0x0000000000000000000000000000000000000000"
          v-model="address" @keyup.enter="handleSearch"
          class="bg-offBlack text-offWhite font-normal text-[32px] leading-[36px] font-['Handjet'] text-center placeholder-grey py-[9px] md:w-[240px] w-[580px] shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]" />
        <i @click="handleSearch"
          class="hover:bg-blue hover:text-black cursor-pointer border-[1px] border-[#6B7280] p-[17px] text-[20px] text-blue z-50 fa-solid fa-arrow-right"></i>
      </div>
    </div>
    <div class="flex flex-col justify-between items-center md:h-[65vh] h-[50vh] bg-offBlack">
      <div class="flex justify-between md:flex-col gap-[30px] items-center min-w-[400px] pt-[75px]">
        <a href="/view/verified"
          class="hover:bg-green hover:border-black hover:text-black font-['Ubuntu Condensed'] shadow-[8px_8px_0px_#232020] font-normal text-[23px] leading-[26px] text-green text-center border-green border-[4px] py-[12px] px-[24px]">verified
          <p>addresses</p>
        </a>
        <a href="/view/verified"
          class="hover:bg-yellow hover:border-black hover:text-black font-['Ubuntu Condensed'] shadow-[8px_8px_0px_#232020] font-normal text-[23px] leading-[26px] text-yellow text-center border-yellow border-[4px] py-[12px] px-[24px]">certified
          <p>addresses</p>
        </a>
        <a href="/view/flagged"
          class="hover:bg-red hover:border-black hover:text-black font-['Ubuntu Condensed'] shadow-[8px_8px_0px_#232020] font-normal text-[23px] leading-[26px] text-red text-center border-red border-[4px] py-[12px] px-[24px]">flagged
          <p>addresses</p>
        </a>
      </div>
      <Footer :textColor="footerColor" />
    </div>
  </div>
</template>

<script lang="ts">
  import '@/assets/sass/style.scss'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import { useStore } from '../store'
  import WalletConnectionButton from "@/components/WalletConnectionButton.vue"
  import Header from "@/pages/layouts/Header.vue"
  import Footer from "@/pages/layouts/Footer.vue"
  import { OIVerifiedContract } from '@/contracts/OIVerifiedInstance'
  import { OIFlaggedContract } from '@/contracts/OIFlaggedInstance'
  import { checkAddress } from '@/api'
  export default {
    name: 'Home',
    components: {
      Header,
      Footer,
      WalletConnectionButton
    },
    data() {
      return {
        address: '',
        textColor: 'blue',
        footerColor: "white"
      }
    },
    methods: {
      async handleSearch() {

        const store = useStore()

        store.setSearchAddr(this.address)

        let flag = 'unknown'

        try {
          let balance = await OIVerifiedContract().methods.balanceOf(this.address).call()
          if (Number(balance) != 0) {
            store.setState('verified')
            flag = 'verified'
          }
        } catch (error: any) {
          if (error.code == 'INVALID_ARGUMENT') {
            toast("Invalid Address!", {
              autoClose: 1000,
              theme: 'dark',
              type: 'error'
            });
            return;
          } else {
            toast("Unexpected Error!", {
              autoClose: 1000,
              theme: 'dark',
              type: 'error'
            });
            return;
          }
        }
        
        if (flag == 'unknown') {
          try {
            let balance = await OIFlaggedContract().methods.balanceOf(this.address).call()
            if (Number(balance) != 0) {
              flag = 'flagged'
              store.setState('flagged')
            }
          } catch (error: any) {
            if (error.code == 'INVALID_ARGUMENT') {
              toast("Invalid Address!", {
                autoClose: 1000,
                theme: 'dark',
                type: 'error'
              });
              return;
            } else {
              toast("Unexpected Error!", {
                autoClose: 1000,
                theme: 'dark',
                type: 'error'
              });
              return;
            }
          }
        }

        if (flag == 'unknown') {
          try {
            let res = await checkAddress(this.address)
            console.log(res.flagged)
            if (res.flagged) {
              flag = 'flagged'
              store.setState('flagged')
            } else {
              flag = 'unknown'
              store.setState('unknown')
            }
          } catch (error: any) {
            toast("Unexpected Error!", {
              autoClose: 1000,
              theme: 'dark',
              type: 'error'
            });
            return;
          }
        }
        
        // flag = 'flagged'
        // store.setState('flagged')
        // localStorage.setItem('state', 'flagged')

        this.$router.push({ name: 'address', params: { addr: this.address}})
      },
      copyAddress() {
        navigator.clipboard.writeText(this.address);
      }
    }
  }
</script>
