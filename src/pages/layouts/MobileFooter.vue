<template>
    <footer :class="`m_md:hidden flex text-${textColor} font-['VT323'] text-[23px] font-normal leading-[26px] tracking-[1.6px] flex justify-between w-[300px]`">
        <a href="https://docs.vrfd.info/" target="_blank" class="block">User Manual</a>
        <a href="https://whitepaper.vrfd.info/" target="_blank" class="block">Whitepaper</a>
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
