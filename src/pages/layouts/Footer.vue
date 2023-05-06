<template>
  <footer
    class="md:hidden flex justify-between items-center px-[50px] w-[100%] h-[147px] shadow-[inset_0_8px_4px_rgba(0,0,0,0.25)]"
  >
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <p :class="`text-${textColor} font-['Ubuntu Condensed']`">Our socials</p>
      <a href="https://twitter.com/_vrfd" target="_blank" class="block">
        <span
          class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-blue"
          >Twitter</span
        >
      </a>
      <a href="https://t.me/oi_vrfd" target="_blank" class="block">
        <span
          class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-blue"
          >Telegram</span
        >
      </a>
    </div>
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <p :class="`text-${textColor} font-['Ubuntu Condensed']`">VRFD v{{ version }}</p>
      <p :class="`text-${textColor} font-['Ubuntu Condensed']`">
        Free and open source.
      </p>
      <p :class="`text-${textColor} font-['Ubuntu Condensed']`">
        by
        <a href="https://github.com/open-info/" target="_blank">
          <span
            class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-blue"
            >Open Info</span
          >.
        </a>
      </p>
    </div>
    <div class="text-[23px] leading-[26px] font-[400] text-center">
      <p :class="`text-${textColor} font-['Ubuntu Condensed']`">
        Saw something weird?
      </p>
      <a href="https://bit.ly/oi-feedback" target="_blank">
        <span
          class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-blue"
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
    fetch('/VERSION')
      .then(response => response.text())
      .then(version => this.version = version.trim())
      .catch(error => console.error(error));

  }
};
</script>

<script setup lang="ts">
const props = defineProps<{
  textColor: string;
}>();
</script>
