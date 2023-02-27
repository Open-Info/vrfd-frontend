<script setup lang="ts">
// useStore, and computed are automatically imported. See vite.config.ts for details.
const store = useStore();

const props = defineProps<{
  msg: string;
  optionalProp?: number;
}>();

</script>

<template>

  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-center w-2/5 gap-4 p-8 bg-gray-200 rounded-lg">
      <h1 class="text-2xl text-center my-0">{{ props.msg }}</h1>
      <form class="flex items-center">
        <input class="flex-1 px-4 py-2 text-lg rounded-md border-2 border-gray-300 mr-4 focus:outline-none focus:border-green-500" type="text" placeholder="Enter search term...">
        <button 
          class="px-4 py-2 text-lg rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600 focus:outline-none focus:bg-green-600" 
          @click="store.find_nft()">
          Search
        </button>
      </form>
      <div class="flex justify-center gap-4">
        <button class="px-4 py-2 text-lg rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600 focus:outline-none focus:bg-green-600">
          View verified</button>
        <button class="px-4 py-2 text-lg rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600 focus:outline-none focus:bg-green-600">
          View flagged</button>
      </div>
      <p>Vrfd: {{ store.verified }}</p>
      <p>flag: {{ store.flagged }}</p>
    </div>
  </div>


</template>
