<template>
  <div class="flex flex-col justify-end pb-[27px]">
    <div v-if="isLoading">
      <p class="font-['VT323'] font-normal text-[40px] leading-[45px] text-black md:ml-0 ml-[31px]">
        <span class="text-gray-500">{{ displayVotes }}</span> time(s)
      </p>
    </div>
    <div v-else>
      <div v-if="votes !== null">
        <p class="font-['VT323'] font-normal text-[40px] leading-[45px] text-black md:ml-0 ml-[31px]">
          {{ votes }} time(s)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    votes: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      displayVotes: this.votes,
      randomVotesInterval: null
    };
  },
  created() {
    // Simulating data fetching delay
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    // Generate random vote counts while data is being fetched
    if (this.votes !== null) {
      this.startRandomVotesCycle();
    }
  },
  methods: {
    startRandomVotesCycle() {
      this.randomVotesInterval = setInterval(() => {
        this.displayVotes = Math.floor(Math.random() * 10);
      }, 20);
    }
  },
  beforeDestroy() {
    clearInterval(this.randomVotesInterval);
  }
};
</script>
