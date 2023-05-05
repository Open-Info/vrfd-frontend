<template>
    <footer :class="`m_md:hidden flex text-${textColor} font-['Handjet'] text-[23px] font-normal font-bold leading-[26px] tracking-[1.6px] flex justify-between w-[300px]`">
        <a href="https://open-info.gitbook.io/verified-app/" target="_blank" class="block">User-Manual</a>
        <a href="https://open-info.gitbook.io/oi-litepaper/" target="_blank" class="block">Litepaper</a>
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
