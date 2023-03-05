<script setup lang="ts">
  import '@/assets/sass/style.scss'
</script>

<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-[#00B689] pb-[60px]">
      <header class="py-[34px] px-[37px] flex justify-end items-center">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.9167 16.3334H39.0834V11.6667C39.0834 7.00002 37.3334 4.66669 32.0834 4.66669H23.9167C18.6667 4.66669 16.9167 7.00002 16.9167 11.6667V16.3334ZM37.3334 35V44.3334C37.3334 49 35.0001 51.3334 30.3334 51.3334H25.6667C21.0001 51.3334 18.6667 49 18.6667 44.3334V35H37.3334Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M39.6667 35H16.3333M16.3333 25.6666H23.3333M49 23.3333V35C49 39.6666 46.6667 42 42 42H37.3333V35H18.6667V42H14C9.33333 42 7 39.6666 7 35V23.3333C7 18.6666 9.33333 16.3333 14 16.3333H42C46.6667 16.3333 49 18.6666 49 23.3333Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="w-[67px] h-[67px] rounded-full bg-[#FFF4F3] flex justify-center items-center text-[47px] leading-[47px] font-normal text-[#30B1FD] text-center font-['VT323'] ml-[26px]">
          i
        </div>
      </header>
      <div class="flex justify-center">
        <h1 class="flex font-['Handjet'] font-normal text-[150px] leading-[168px] font-bold text-[#232020] text-center ml-[140px]">
          VRFD
          <div class="flex flex-col justify-end pb-[27px]"><p class="font-['Handjet'] font-normal text-[40px] leading-[45px] text-[#232020] ml-[31px]">77k times</p></div>
        </h1>
      </div>
    </div>
    <input type="text" id="search" name="search" value="0x0e9989e703F39880A8E2759BB93B4A9dDD11aCcF ✓" class="bg-[#00B689] text-black font-normal text-[32px] leading-[36px] font-['Handjet'] text-center py-[9px] px-[22px] min-w-[620px] rounded-[14px] border-[1px] border-[#000] shadow-[6px_10px] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
    />
    <div class="flex flex-col justify-between items-center h-[50vh] bg-[#FFF4F3]">
      <div class="flex justify-between items-center min-w-[300px] pt-[75px]">
        <button class="bg-[#F7766A] font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">report</button>
        <button class="bg-[#00B689] font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">second</button>
      </div>
      <footer class="flex justify-center items-center flex-col w-[100%] h-[147px] shadow-[inset_0_8px_4px_rgba(0,0,0,0.25)]">
        <p class="font-normal text-[23px] leading-[26px] text-[#000] text-center font-['Ubuntu Condensed']">Verified v3.1.0,</p>
        <p class="font-normal text-[23px] leading-[26px] text-[#000] text-center font-['Ubuntu Condensed']">Powered by <span class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-[#30B1FD]">Open Information</span></p>
      </footer>
    </div>
  </div>
  
</template>