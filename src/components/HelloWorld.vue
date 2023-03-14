<script setup lang="ts">
// useStore, and computed are automatically imported. See vite.config.ts for details.
const store = useStore();

const props = defineProps<{
  msg: string;
  optionalProp?: number;
}>();

</script>

<template>
  <h2 class="!mt-0">{{ props.msg }}</h2>

</template>
