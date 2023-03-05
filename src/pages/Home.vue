<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-[#363B3E] pb-[60px]">
      <header class="py-[34px] px-[37px] flex justify-end">
        <div class="w-[67px] h-[67px] rounded-full bg-[#FFF4F3] flex justify-center items-center text-[47px] leading-[47px] font-normal text-[#30B1FD] text-center font-['VT323']">
          i
        </div>
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
  // import web3 from '../contracts/web3'
  import OIVerifiedContract from '../contracts/OIVerifiedInstanace'
  export default {
    name: 'Home',
    data() {
      return {
        address: '',
      }
    },
    methods: {
      handleSearch() {
        console.log(this.address)
        OIVerifiedContract.methods
        .balanceOf(this.address)
        .call()
        .then((balance: any) => {
          console.log('balance', balance)
        })
      }
    }
  }
</script>
