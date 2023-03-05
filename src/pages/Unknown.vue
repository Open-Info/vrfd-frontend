<script setup lang="ts">
  import '@/assets/sass/style.scss'
</script>

<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-[#363B3E] pb-[60px]">
      <header class="py-[34px] px-[37px] flex justify-end">
        <div class="w-[67px] h-[67px] rounded-full bg-[#FFF4F3] flex justify-center items-center text-[47px] leading-[47px] font-normal text-[#30B1FD] text-center font-['VT323']">
          i
        </div>
      </header>
      <h1 class="font-['Handjet'] font-normal text-[150px] leading-[168px] font-bold text-white text-center mb-[9px]">Unknown</h1>
    </div>
    <input type="text" id="search" name="search" class="text-black font-normal text-[32px] leading-[36px] font-['Handjet'] text-center py-[9px] px-[22px] min-w-[620px] rounded-[14px] shadow-[6px_10px] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
    />
    <div class="flex flex-col justify-between items-center h-[50vh] bg-[#FFF4F3]">
      <div class="flex justify-between items-center min-w-[400px] pt-[75px]">
        <button class="bg-[#F7766A] font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">flag address</button>
        <button class="bg-[#00B689] font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black rounded-[20px] border-[4px] py-[9px] px-[12px]">get verified</button>
      </div>
      <footer class="flex justify-center items-center flex-col w-[100%] h-[147px] shadow-[inset_0_8px_4px_rgba(0,0,0,0.25)]">
        <p class="font-normal text-[23px] leading-[26px] text-[#000] text-center font-['Ubuntu Condensed']">Verified v3.1.0,</p>
        <p class="font-normal text-[23px] leading-[26px] text-[#000] text-center font-['Ubuntu Condensed']">Powered by <span class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-[#30B1FD]">Open Information</span></p>
      </footer>
    </div>
  </div>
  
</template>
