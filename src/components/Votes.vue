<template>
  <div class="flex flex-col justify-end pb-[27px]">
    <div v-if="isLoading">
      <p class="font-['VT323'] font-normal text-[40px] leading-[45px] text-black md:ml-0 ml-[31px]" :style="{color:color}">
        <span class="opacity-25">{{ displayVotes }}</span> time(s)
      </p>
    </div>
    <div v-else>
      <div v-if="votes !== null">
        <p class="font-['VT323'] font-normal text-[40px] leading-[45px] text-black md:ml-0 ml-[31px]" :style="{color:color}">
          {{ votes }} time(s)
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    votes: {
      type: Number,
      required: true
    },
    color: {
      type: String,
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
      }, 60);
    }
  },
  beforeDestroy() {
    clearInterval(this.randomVotesInterval);
  }
};
</script>
