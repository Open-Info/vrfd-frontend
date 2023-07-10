<template>
      <div v-if="alias !== 'no alias'">
        <span class="font-[700]">AKA </span>{{ alias }}
      </div>
      <div v-else>
        no alias
      </div>
  </template>
  
  <script>
  export default {
    props: {
      alias: {
        type: String,
        default: 'no alias'
      }
    }
  };
  </script>
  