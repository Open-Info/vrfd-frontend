<template>
    <footer :class="`m_md:hidden flex text-${textColor} font-['VT323'] text-[23px] font-normal leading-[26px] tracking-[1.6px] flex justify-between w-[300px]`">
        <a href="https://twitter.com/_vrfd" target="_blank" class="block">
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-white">
          X 
        </span>
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-yellow hover:text-blue">
          @_vrfd
        </span>
      </a>
      <a href="https://docs.vrfd.info/" target="_blank" class="block">docs</a>

      <a href="https://t.me/oi_vrfd" target="_blank" class="block">
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-white">
          Tg 
        </span>
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-yellow hover:text-blue">
          @oi_vrfd
        </span>
      </a>
 </footer>
</template>

<script lang="ts">
export default {
    name: "Footer",
}
</script>

<script setup lang="ts">
    const props = defineProps<{
        textColor: string
    }>()
</script>
