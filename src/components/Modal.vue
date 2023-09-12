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
                    <div class="grid grid-cols-2 gap-3 mt-2">
                        <div class="text-center px-5">telegram</div><div class="text-center">{{ telegram }}</div>
                        <div class="text-center px-5">twitter</div><div class="text-center">{{ twitter }}</div>
                        <div class="text-center px-5">linkedin</div><div class="text-center">{{ linkedin }}</div>
                        <div class="text-center px-5">tiktok</div><div class="text-center">{{ tiktok }}</div>
                        <div class="text-center px-5">facebook</div><div class="text-center">{{ facebook }}</div>
                        <div class="text-center px-5">instagram</div><div class="text-center">{{ instagram }}</div>
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
    name: 'Modal',
    methods: {
        close() {
            this.$emit('close');
        },
    },
    props: {
        telegram: {
            type: String,
            default: '@unknown'
        },
        twitter: {
            type: String,
            default: '@unknown'
        },
        tiktok: {
            type: String,
            default: '@unknown'
        },
        linkedin: {
            type: String,
            default: '@unknown'
        },
        facebook: {
            type: String,
            default: '@unknown'
        },
        instagram: {
            type: String,
            default: '@unknown'
        }
    }
};
</script>