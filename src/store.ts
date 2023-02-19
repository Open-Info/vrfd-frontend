import { defineStore } from 'pinia'

const versionString =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_VERSION + '-dev'
    : import.meta.env.VITE_APP_VERSION

export const useStore = defineStore('main', {
  state: () => ({
    debug: import.meta.env.MODE === 'development',
    version: versionString,
    isInitialized: false,
    count: 0,
    verified: false,
    flagged: false
  }),

  actions: {
    initApp() {
      this.isInitialized = true
      console.log('app initialized!')
    },

    verify() {
      this.verified = true
    },

    flag() {
      this.flagged = true
    },
  },

  getters: {
    isReady: (state) => {
      return !state.isInitialized
    },

    isVerified: (state) => {
      return state.verified
    },

    isFlagged: (state) => {
      return state.flagged
    }
  },
})
