<script setup lang="ts">
// useRoute, useHead, and HelloWorld are automatically imported. See vite.config.ts for details.
const route = useRoute()

useHead({
  bodyAttrs: {
    // title: route.meta.title,
  },
  meta: [
    {
      property: 'og:title',
      content: route.meta.title,
    },
    {
      name: 'twitter:title',
      content: route.meta.title,
    },
  ],
})

const VERSION = import.meta.env.VITE_APP_VERSION
const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined
const thisYear = new Date().getFullYear()
</script>

<template>
  <div class="relative py-8">
    <div
      class="absolute inset-0 bg-[url(/img/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div
      class="container relative max-w-2xl mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
    >
      <header class="flex justify-end items-center px-4 bg-gray-800 text-white fixed top-0 right-0 w-full">

      <div class="float-left text-lg font-bold mr-auto">
        OI
      </div>
      <a href="#" class="float-right px-4 py-2 text-lg rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600 focus:outline-none focus:bg-green-600 no-underline">
        HELP
      </a>
      <div class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300 text-gray-600 font-bold text-lg mr-4">
        ?
      </div>

      </header>
      <main>
        <div class="p-4 mx-auto prose md:px-6 prose-indigo sm:rounded-md">
          <HelloWorld msg="Verified?" />
        </div>
      </main>
      <footer class="py-6 text-sm text-center text-gray-700">
    
      <p>
          Verified v{{ VERSION }}, Powered by Open Information &copy; 2020-{{ thisYear }}.
          <template v-if="BUILD_DATE"> Site built {{ BUILD_DATE.toLocaleDateString() }}. </template>
          <template v-else> Development mode. </template>
        </p>
      </footer>
    </div>
  </div>
</template>
