<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-[#363B3E] pb-[60px]">
      <header class="py-[34px] px-[37px] flex justify-end">
        <WalletConnectionButton :bg-color="walletConnectionBtnBgColor" />
      </header>
      <h1 class="font-['Handjet'] font-normal text-[150px] leading-[168px] font-bold text-[#30B1FD] text-center mb-[9px]">Verified - oi</h1>
    </div>
    <input type="text" id="search" name="search" class="bg-transparent text-[#FFF4F3] font-normal text-[32px] leading-[36px] font-['Handjet'] text-center placeholder-[#747C81] py-[9px] px-[22px] min-w-[620px] rounded-[14px] shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
      placeholder="0x0000000000000000000000000000000000000000"
      v-model="address"
      @keyup.enter="handleSearch"
    />
    <div class="flex flex-col justify-between items-center h-[50vh] bg-[#363B3E]">
      <div class="flex justify-between items-center min-w-[400px] pt-[75px]">
        <button class="font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-[#F7766A] text-center border-[#F7766A] rounded-[20px] border-[4px] py-[12px] px-[24px]">flagged<p class="text-[#747C81]">addresses</p></button>
        <button class="font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-[#00B689] text-center border-[#00B689] rounded-[20px] border-[4px] py-[12px] px-[24px]">verified<p class="text-[#747C81]">addresses</p></button>
      </div>
      <footer class="flex justify-center items-center flex-col w-[100%] h-[147px] shadow-[inset_0_8px_4px_rgba(0,0,0,0.25)]">
        <p class="font-normal text-[23px] leading-[26px] text-[#FFF4F3] text-center font-['Ubuntu Condensed']">Verified v3.1.0,</p>
        <p class="font-normal text-[23px] leading-[26px] text-[#FFF4F3] text-center font-['Ubuntu Condensed']">Powered by <span class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-[#30B1FD]">Open Information</span></p>
      </footer>
    </div>
  </div>
  
</template>

<script lang="ts">
  import '@/assets/sass/style.scss'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import { useStore } from '../store'

  import WalletConnectionButton from "@/components/WalletConnectionButton.vue"
  import { OIVerifiedContract } from '@/contracts/OIVerifiedInstance'
  import { OIFlaggedContract } from '@/contracts/OIFlaggedInstance'
  import { checkAddress } from '@/api'
  export default {
    name: 'Home',
    components: {
      WalletConnectionButton
    },
    data() {
      return {
        address: '',
        walletConnectionBtnBgColor: '#FFF4F3'
      }
    },
    methods: {
      async handleSearch() {

        const store = useStore()

        store.setSearchAddr(this.address)

        let flag = 'unknown'

        try {
          let balance = await OIVerifiedContract.methods.balanceOf(this.address).call()
          if (Number(balance) != 0) {
            store.setState('verified')
            flag = 'verified'
            localStorage.setItem('state', 'verified')
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
            let balance = await OIFlaggedContract.methods.balanceOf(this.address).call()
            if (Number(balance) != 0) {
              flag = 'flagged'
              store.setState('flagged')
              localStorage.setItem('state', 'flagged')
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

        // if (flag == 'unknown') {
        //   try {
        //     let res = await checkAddress(this.address)
        //     console.log(res)
        //   } catch (error: any) {
        //     toast("Unexpected Error!", {
        //       autoClose: 1000,
        //       theme: 'dark',
        //       type: 'error'
        //     });
        //     return;
        //   }
        //   // flag = 'unknown'
        //   // store.setState('unknown')
        //   // localStorage.setItem('state', 'unknown')
        // }
        store.setState('unknown')
        localStorage.setItem('state', 'unknown')
        this.$router.push({ name: 'address', params: { addr: this.address}})
      }
    }
  }
</script>
