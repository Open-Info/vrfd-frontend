<template>
  <div class="modal-backdrop">
    <div
      class="modal max-w-sm p-6 mx-4 font-['VT323'] font-normal text-[23px] leading-[26px] text-black border-black border-[3px] shadow-[8px_8px_0px_rgba(0,0,0,0.5)]" :class="type">
      <div>
        <slot name="header"></slot>
        <button type="button" class="btn-close" @click="close">
          x
        </button>
      </div>
      <div class="text-center text-[25px]">
        <slot name="subtitle">{{ token }}</slot>
      </div>
      <div class="relative max-h-[100px] overflow-y-auto scrollbar-hide">
        <slot name="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          
        </slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  width: 0.5em;
  background-color: transparent;
}

.scrollbar-hide::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>

<script>
export default {
  name: 'ENSModal',
  props: {
    type: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
  }
};
</script>

<style>
  .flagged {
    background-color: #F7766A;
  }
  .verified {
    background-color: #00B689;
  }
</style>