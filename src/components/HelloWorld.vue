<script setup lang="ts">
// useStore, and computed are automatically imported. See vite.config.ts for details.
const store = useStore();
let verified = store.isVerified;
let flagged = store.isFlagged;

const props = defineProps<{
  msg: string;
  optionalProp?: number;
}>();

function verify() {
  store.verify();
}

function flag() {
  store.flag();
}

function find_nft() {
  // call web3 smart contract and call either flag or verify
  if (Math.random() > 0.5) {
    verify();
  } else {
    flag();
  }
}
</script>

<template>
  <h2 class="!mt-0">{{ props.msg }}</h2>
  <button
    class="px-3 py-2 bg-white border border-gray-300 rounded-md shadow"
    @click="find_nft"
  >Search
  </button>
  <p>Address is: {{ verified }}</p>
  <p>Address is {{ flagged }}</p>
</template>
