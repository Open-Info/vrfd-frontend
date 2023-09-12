<template>
  <div class="modal-backdrop">
    <div
      class="modal max-w-sm p-6 mx-4 bg-red font-['VT323'] font-normal text-[23px] leading-[26px] text-black border-black border-[3px] shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
      <div>
        <slot name="header"></slot>
        <button type="button" class="btn-close" @click="close">
          x
        </button>
      </div>
      <div class="text-center text-[25px]">
        <slot name="subtitle">tornado.eth</slot>
      </div>
      <div class="relative max-h-[100px] overflow-y-auto scrollbar-hide">
        <slot name="body">
          <div class="grid grid-cols-2 gap-3 mt-2">

          </div>
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
  name: 'FlaggedModal',
  methods: {
    close() {
      this.$emit('close');
    },
  }
};
</script>