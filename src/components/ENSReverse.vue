<template>
  <div>
    <div v-if="isLoading" class="w-full flex items-center justify-center h-full">
      <div class="flex justify-between">
        <span class="font-[700] fixed">AKA</span>
        <span class="opacity-25" style="width: 130px; display: inline-block; text-align: right">{{ randomNumbers }}</span>.eth
      </div>
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
    }, 4000);

    // Generate random numbers while data is being fetched
    this.startRandomNumbersCycle();
  },
  methods: {
    startRandomNumbersCycle() {
      this.randomNumbersInterval = setInterval(() => {
        this.randomNumbers = Math.floor(Math.random() * 900000 + 100000).toString();
      }, 60);
    }
  },
  beforeDestroy() {
    clearInterval(this.randomNumbersInterval);
  }
};
</script>
