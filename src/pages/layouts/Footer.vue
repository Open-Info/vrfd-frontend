<template>
  <footer class="md:hidden flex justify-between items-center px-[50px] w-[100%] h-[147px] border-black border-t-2">
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <a href="https://twitter.com/_vrfd" target="_blank" class="block">
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-white">
          X 
        </span>
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-yellow hover:text-blue">
          @_vrfd
        </span>
      </a>
      <a href="https://t.me/oi_vrfd" target="_blank" class="block">
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-white">
          Tg 
        </span>
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-yellow hover:text-blue">
          @oi_vrfd
        </span>
      </a>
    </div>
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <p :class="`text-${textColor} font-['Handjet']`">v{{ version }}</p>
      <p :class="`text-${textColor} font-['Handjet']`">
        free & open source.
      </p>
      <p :class="`text-${textColor} font-['Handjet']`">
        by
        <a href="https://github.com/open-info/" target="_blank">
          <span class="font-[23px] leading-[26px] font-['Handjet'] text-blue hover:text-yellow">
            Open Info
          </span>.
        </a>
      </p>
    </div>
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <a href="https://whitepaper.vrfd.info" target="_blank">
        <span class="font-[23px] leading-[26px] font-['Handjet'] text-blue  hover:text-yellow">
          Whitepaper
        </span>
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: "Footer",
  data() {
    return {
      version: ''
    };
  },
  mounted() {
    this.version = import.meta.env.VITE_APP_VERSION
  }
};
</script>

<script setup lang="ts">
const props = defineProps<{
  textColor: string;
}>();
</script>
