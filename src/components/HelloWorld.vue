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
  <button
    class="px-3 py-2 bg-white border border-gray-300 rounded-md shadow"
    @click="store.find_nft()"
  >Search</button>
  <p>Address is: {{ store.verified }}</p>
  <p>Address is {{ store.flagged }}</p>
</template>
