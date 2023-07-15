<template>
  <div class="relative">
    <div class="flex flex-col justify-between md:h-[35vh] h-[50vh] bg-offBlack pb-[60px]">
      <Header class="md:hidden" :textColor="textColor" />
      <h1 class="md:mt-[50px] font-['Handjet'] text-[150px] drop-shadow-[5px_5px_0px_rgba(0,0,0,0.31)] leading-[168px] font-bold text-blue text-center mb-[9px]">
        Search
      </h1>
    </div>
    <div class="flex absolute left-1/2 transform -translate-y-[50%] -translate-x-[50%] drop-shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
      <div class="relative flex items-center">
        <i
          @click="pasteFromClipboard"
          class="hover:bg-blue hover:text-black bg-offBlack cursor-pointer border-[2px] border-[#6B7280] p-[17px] text-[20px] text-blue z-50 fa-regular fa-clipboard"
        ></i>
        <input
          type="text"
          id="search"
          name="search"
          :placeholder="shortenAddr('0x0000000000000000000000000000000000000000')"
          v-model.trim="address"
          @keyup.enter="handleSearch"
          @input="handleInputChange"
          class="bg-offBlack focus:outline-0 text-offWhite font-normal text-[32px] border-t-2 border-b-2 border-[#6B7280] leading-[36px] font-['VT323'] text-center placeholder-grey py-[9px] md:w-[240px] w-[580px]"
        />
        <div class="absolute bottom-[-1px] mb-[-1px] left-0 w-full h-[17px]">
          <div class="flex items-center gap-2 w-full px-[70px] border-t-2 py-[3px] border-[#6B7280]">
            <template v-for="index in 27">
              <div
                :class="{
                  'bg-[#44494C]': index > progress,
                  'bg-green': index <= progress
                }"
                class="w-[17px] h-[6px] transition-width duration-500 ease-in-out"
              ></div>
            </template>
          </div>
        </div>
        <i
          @click="handleSearch"
          class="hover:bg-blue hover:text-black bg-offBlack cursor-pointer border-[2px] border-[#6B7280] p-[17px] text-[20px] text-blue z-50 fa-solid fa-arrow-right"
        ></i>
      </div>
    </div>
    <div class="flex flex-col justify-between items-center md:h-[65vh] h-[50vh] bg-offBlack">
      <div class="flex justify-between md:flex-col gap-[30px] items-center min-w-[400px] pt-[75px]">
        <router-link
          to="/view/verified"
          class="hover:bg-green hover:border-black hover:text-black font-['Handjet'] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] font-normal text-[23px] leading-[26px] text-green text-center border-green border-[4px] py-[12px] px-[24px]"
        >
          Verified
          <p>addresses</p>
        </router-link>
        <a
          href="#"
          class="hover:bg-yellow hover:border-black hover:text-black font-['Handjet'] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] font-normal text-[23px] leading-[26px] text-yellow text-center border-yellow border-[4px] py-[12px] px-[24px]"
        >
          Certified
          <p>addresses</p>
        </a>
        <router-link
          to="/view/flagged"
          class="hover:bg-red hover:border-black hover:text-black font-['Handjet'] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] font-normal text-[23px] leading-[26px] text-red text-center border-red border-[4px] py-[12px] px-[24px]"
        >
          Flagged
          <p>addresses</p>
        </router-link>
      </div>
      <Footer :textColor="footerColor" />
    </div>
  </div>
</template>

<script lang="ts">
import '@/assets/sass/style.scss'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useStore } from '../store'
import WalletConnectionButton from '@/components/WalletConnectionButton.vue'
import Header from '@/pages/layouts/Header.vue'
import Footer from '@/pages/layouts/Footer.vue'
import { OIVerifiedContract } from '@/contracts/OIVerifiedInstance'
import { OIFlaggedContract } from '@/contracts/OIFlaggedInstance'
import { checkAddress, resolveENS } from '@/api'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      address: '',
      textColor: 'blue',
      footerColor: 'white',
      progress: 0 // Progress bar value
    }
  },
  computed: {
    deviceWidth() {
      return this.windowWidth
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
    },
    shortenAddr(addr: string) {
      if (this.windowWidth <= 768) {
        if (addr.length < 10) return addr
        return `${addr.slice(0, 8)}...${addr.slice(addr.length - 8)}`
      }
      return addr
    },
    handleInputChange() {
      this.address = this.address.replace(/\s/g, '') // Remove white spaces from the address
    },
    async handleSearch() {
      const store = useStore()
      store.setSearchAddr(this.address)
      // Define the total number of steps and the duration for the loading animation
      const totalSteps = 27;
      const animationDuration = 200; // in milliseconds

      // Calculate the increment value for each step
      const increment = totalSteps / animationDuration;


      // Helper function to increment the progress value with a delay
        const incrementProgress = () => {
          if (this.progress < totalSteps) {
            this.progress += increment;
            setTimeout(incrementProgress, 30); // Adjust the delay as needed for a smooth animation
          }
        };

        incrementProgress(); 

      this.progress = 5 // Update progress bar to Step 1

      // Step 2: Resolve ENS link if it is an ENS address
      if (this.address.endsWith('.eth')) {
        this.progress = 1 // Update progress bar to Step 2
        try {
          const resolvedAddress = await resolveENS(this.address)
          if (resolvedAddress && resolvedAddress.success) {
            this.address = resolvedAddress.address
          } else {
            throw new Error('ENS not found!')
          }
        } catch (error: any) {
          toast(error.message, {
            autoClose: 1000,
            theme: 'dark',
            type: 'error'
          })
          this.progress = 0 // Reset progress bar if an error occurs
          return
        }
      }

      this.progress = 10 // Update progress bar to Step 3

      // Step 4: Check if the address owns VRFD NFT
      try {
        let balance = await OIVerifiedContract().methods.balanceOf(this.address).call()
        if (Number(balance) !== 0) {
          store.setState('verified')
        }
      } catch (error: any) {
        if (error.code === 'INVALID_ARGUMENT') {
          toast('Invalid Address!', {
            autoClose: 1000,
            theme: 'dark',
            type: 'error'
          })
          this.progress = 0 // Reset progress bar if an error occurs
          return
        } else {
          toast('Unexpected Error!', {
            autoClose: 1000,
            theme: 'dark',
            type: 'error'
          })
          this.progress = 0 // Reset progress bar if an error occurs
          return
        }
      }

      this.progress = 15// Update progress bar to Step 4

      // Step 5: Check if the address owns FLAG NFT
      try {
        let balance = await OIFlaggedContract().methods.balanceOf(this.address).call()
        if (Number(balance) !== 0) {
          store.setState('flagged')
        }
      } catch (error: any) {
        if (error.code === 'INVALID_ARGUMENT') {
          toast('Invalid Address!', {
            autoClose: 1000,
            theme: 'dark',
            type: 'error'
          })
          this.progress = 0 // Reset progress bar if an error occurs
          return
        } else {
          toast('Unexpected Error!', {
            autoClose: 1000,
            theme: 'dark',
            type: 'error'
          })
          this.progress = 0 // Reset progress bar if an error occurs
          return
        }
      }

      this.progress = 20 // Update progress bar to Step 5

      // Step 6: Check for flag by association via backend
      try {
        let res = await checkAddress(this.address)
        console.log(res.flagged)
        if (res.flagged) {
          store.setState('flagged')
        } else {
          store.setState('unknown')
        }
      } catch (error: any) {
        toast('Unexpected Error!', {
          autoClose: 1000,
          theme: 'dark',
          type: 'error'
        })
        this.progress = 0 // Reset progress bar if an error occurs
        return
      }

      this.progress = 27// Update progress bar to complete

      this.$router.push({ name: 'address', params: { addr: this.address } })
    },
async pasteFromClipboard() {
        try {
          const text = await navigator.clipboard.readText();
          this.address = text;
        } catch (error) {
          console.error('Error pasting text from clipboard:', error);
        }
      }

  }
}
</script>

 