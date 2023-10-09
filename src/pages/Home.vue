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

        <!--desktop Loading bar-->
        <div class="absolute bottom-[-1px] mb-[-1px] left-0 w-full h-[17px] md:hidden">
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

        <!--mobile loading bar-->
        <div class="absolute bottom-[-1px] mb-[-1px] left-0 w-full h-[17px] hidden md:block">
          <div class="flex items-center gap-1 justify-center align-items-center px-[60px] w-full border-t-2 py-[3px] border-[#6B7280]">
            <template v-for="index in 27">
              <div
                :class="{
                  'bg-[#44494C]': index > progress,
                  'bg-green': index <= progress
                }"
                class="w-[6px] h-[6px] transition-width duration-500 ease-in-out"
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

<script setup lang="ts">
  import '@/assets/sass/style.scss'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import { useStore } from '@/store'
  import Header from '@/pages/layouts/Header.vue'
  import Footer from '@/pages/layouts/Footer.vue'
  import { OIVerifiedContract } from '@/contracts/OIVerifiedInstance'
  import { OIFlaggedContract } from '@/contracts/OIFlaggedInstance'
  import { checkAddress } from '@/api'
  import { useEnsAddress } from 'vagmi'
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'

  const windowWidth = ref(window.innerWidth)
  const address = ref('')
  const textColor = ref('blue')
  const footerColor = ref('white')
  const progress = ref(0)
  const errorOccurred = ref(false)
  const progressTimeout = ref<any>(null);

  const router = useRouter()
  const store = useStore()
  const { searchAddr } = storeToRefs(store)

  const { data: ensName, isError, isLoading, refetch} = useEnsAddress({
    name: searchAddr,
    enabled: false,
    onSuccess(data) {
      store.setReservedAddr(data !== null ? data as string : '');
    },
    onError(error) {
      console.log('ensName error', error);
      toast(error.message, {
        autoClose: 1000,
        theme: 'dark',
        type: 'error'
      })
    }
  })
    
  const deviceWidth = () => windowWidth.value

  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  const shortenAddr = (addr: string) => {
    if (windowWidth.value <= 768) {
      if (addr.length < 10) return addr
      return `${addr.slice(0, 8)}...${addr.slice(addr.length - 8)}`
    }
    return addr
  }

  const handleInputChange = () => {
    address.value = address.value.replace(/\s/g, '')
  }

  const handleSearch = async () => {
    store.setSearchAddr(address.value)

    // Define the total number of steps and the duration for the loading animation
    const totalSteps = 27
    const animationDuration = 200 // in milliseconds

    // Calculate the increment value for each step
    const increment = totalSteps / animationDuration

    // Helper function to increment the progress value with a delay
    const incrementProgress = () => {
      if (progress.value < totalSteps) {
        progress.value += increment
        progressTimeout.value = setTimeout(incrementProgress, 30) // Save the timeout reference to progressTimeout
      }
    }

    incrementProgress()

    // Step 2: Resolve ENS link if it is an ENS address
    if (address.value.endsWith('.eth')) {
      progress.value = 1 // Update progress bar to Step 2
      
      await refetch();

      const { resolvedAddr } = storeToRefs(store)

      console.log('resolved address=======>', resolvedAddr.value)

      if (resolvedAddr.value !== '') {
        address.value = resolvedAddr.value
      } else {
        throw new Error('ENS not found!')
      }
      
      clearProgressTimeout() // Clear the loading bar animation when there is an error
      errorOccurred.value = true // Set the error flag to true
    }

    progress.value = 10 // Update progress bar to Step 3

    // Step 4: Check if the address owns VRFD NFT
    try {
      let balance = await OIVerifiedContract().methods.balanceOf(address.value).call()
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
      } else {
        toast('Unexpected Error!', {
          autoClose: 1000,
          theme: 'dark',
          type: 'error'
        })
      }
      clearProgressTimeout() // Clear the loading bar animation when there is an error
      errorOccurred.value = true // Set the error flag to true
      return
    }

    progress.value = 15 // Update progress bar to Step 4

    // Step 5: Check if the address owns FLAG NFT
    try {
      let balance = await OIFlaggedContract().methods.balanceOf(address.value).call()
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
      } else {
        toast('Unexpected Error!', {
          autoClose: 1000,
          theme: 'dark',
          type: 'error'
        })
      }
      clearProgressTimeout() // Clear the loading bar animation when there is an error
      errorOccurred.value = true // Set the error flag to true
      return
    }

    progress.value = 20 // Update progress bar to Step 5

    // Step 6: Check for flag by association via backend
    try {
      let res = await checkAddress(address.value)
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
      clearProgressTimeout() // Clear the loading bar animation when there is an error
      errorOccurred.value = true // Set the error flag to true
      return
    }

    progress.value = 27 // Update progress bar to complete
    router.push({ name: 'address', params: { addr: address.value } });
  }

  const clearProgressTimeout = () => {
    // Clear the progressTimeout when there is an error or the search is complete
    if (progressTimeout) {
      // clearTimeout(progressTimeout)
      // progressTimeout = null // Reset progressTimeout to null after clearing the timeout
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      address.value = text
    } catch (error) {
      console.error('Error pasting text from clipboard:', error)
      errorOccurred.value = true // Set the error flag to true
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>

<script lang="ts">
  export default {
    name: 'Home',
    components: {
      Header,
      Footer
    }
  }
</script>
 