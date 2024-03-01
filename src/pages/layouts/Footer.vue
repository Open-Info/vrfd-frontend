<template>
  <footer
    class="md:hidden flex justify-between items-center px-[50px] w-[100%] h-[147px] border-black border-t-2"
  >
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <p :class="`text-${textColor} font-['Handjet']`">Our socials</p>
      <a href="https://twitter.com/_vrfd" target="_blank" class="block">
        <span
          class="font-[23px] leading-[26px] font-['Handjet'] text-blue"
          >Twitter</span
        >
      </a>
      <a href="https://t.me/oi_vrfd" target="_blank" class="block">
        <span
          class="font-[23px] leading-[26px] font-['Handjet'] text-blue"
          >Telegram</span
        >
      </a>
    </div>
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <p :class="`text-${textColor} font-['Handjet']`">VRFD v{{ version }}</p>
      <p :class="`text-${textColor} font-['Handjet']`">
        Free and open source.
      </p>
      <p :class="`text-${textColor} font-['Handjet']`">
        by
        <a href="https://github.com/open-info/" target="_blank">
          <span
            class="font-[23px] leading-[26px] font-['Handjet'] text-blue"
            >Open Info</span
          >.
        </a>
      </p>
    </div>
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <p :class="`text-${textColor} font-['Handjet']`">
        Saw something weird?
      </p>
      <a href="https://bit.ly/oi-feedback" target="_blank">
        <span
          class="font-[23px] leading-[26px] font-['Handjet'] text-blue"
          >Submit Feedback</span
        >
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
