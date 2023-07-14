<template>
  <div>
    <div v-if="isLoading">
      <span class="font-[700]  mr-1">AKA</span><span class="text-gray-500">{{ randomNumbers }}</span>.eth
    </div>
    <div v-else>
      <div v-if="alias !== 'no alias'">
        <span class="font-[700]">AKA </span>{{ alias }}
      </div>
      <div v-else>
        no alias
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alias: {
      type: String,
      default: 'no alias'
    }
  },
  data() {
    return {
      isLoading: true,
      randomNumbers: ''
    };
  },
  created() {
    // Simulating data fetching delay
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    // Generate random numbers while data is being fetched
    this.startRandomNumbersCycle();
  },
  methods: {
    startRandomNumbersCycle() {
      this.randomNumbersInterval = setInterval(() => {
        this.randomNumbers = Math.floor(Math.random() * 1000000).toString();
      }, 20);
    }
  },
  beforeDestroy() {
    clearInterval(this.randomNumbersInterval);
  }
};
</script>

