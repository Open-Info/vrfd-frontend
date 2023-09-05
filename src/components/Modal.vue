<template>
    <div class="modal-backdrop">
        <div
            class="modal max-w-sm p-6 mx-4 bg-green font-['VT323'] font-normal text-[23px] leading-[26px] text-black border-black border-[3px] shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
            <div>
                <slot name="header"></slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </div>
            <div class="text-center text-[25px]">
                <slot name="subtitle">vrfd.eth</slot>
            </div>
            <div class="relative max-h-[100px] overflow-y-auto scrollbar-hide">
                <slot name="body">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptatibus qui nihil laborum quaerat blanditiis nemo explicabo
                    voluptatum ea architecto corporis quo vitae, velit temporibus
                    eaque quisquam in quis provident necessitatibus.
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
    name: 'Modal',
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>