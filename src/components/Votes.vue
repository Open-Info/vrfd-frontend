<template>
    <div class="flex flex-col justify-end pb-[27px]">
      <p class="font-['VT323'] font-normal text-[40px] leading-[45px] text-black md:ml-0 ml-[31px]">
        {{ votes }} time(s)
      </p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      votes: {
        type: Number,
        required: true
      }
    }
  };
  </script>
