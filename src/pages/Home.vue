<template>
  <div class="relative">
    <div class="flex flex-col justify-between md:h-[35vh]  h-[50vh] bg-offBlack pb-[60px]">
      <Header class="md:hidden" :textColor=textColor />
      <h1
        class="md:mt-[50px] font-['Handjet'] text-[150px] drop-shadow-[5px_5px_0px_rgba(0,0,0,0.31)] leading-[168px] font-bold text-blue text-center mb-[9px]">
        Search</h1>
    </div>
    <div class="flex absolute left-1/2 transform -translate-y-[50%] -translate-x-[50%] drop-shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
      <div class="relative flex items-center">
        <i @click="pasteFromClipboard"
          class="hover:bg-blue hover:text-black bg-offBlack cursor-pointer border-[2px] border-[#6B7280] p-[17px] text-[20px] text-blue z-50 fa-regular fa-clipboard"></i>
        <input type="text" id="search" name="search" :placeholder="shortenAddr('0x0000000000000000000000000000000000000000')"
          v-model.trim="address" @keyup.enter="handleSearch" 
          @input="handleInputChange"
          class="bg-offBlack focus:outline-0 text-offWhite font-normal text-[32px] border-t-2 border-b-2 border-[#6B7280] leading-[36px] font-['VT323'] text-center placeholder-grey py-[9px] md:w-[240px] w-[580px]" />
        <i @click="handleSearch"
          class="hover:bg-blue hover:text-black bg-offBlack cursor-pointer border-[2px] border-[#6B7280] p-[17px] text-[20px] text-blue z-50 fa-solid fa-arrow-right"></i>
      </div>
    </div>
    <div class="flex flex-col justify-between items-center md:h-[65vh] h-[50vh] bg-offBlack">
      <div class="flex justify-between md:flex-col gap-[30px] items-center min-w-[400px] pt-[75px]">
        <router-link to="/view/verified"
          class="hover:bg-green hover:border-black hover:text-black font-['Handjet'] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] font-normal text-[23px] leading-[26px] text-green text-center border-green border-[4px] py-[12px] px-[24px]">verified
          <p>addresses</p>
        </router-link>
        <a href="#"
          class="hover:bg-yellow hover:border-black hover:text-black font-['Handjet'] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] font-normal text-[23px] leading-[26px] text-yellow text-center border-yellow border-[4px] py-[12px] px-[24px]">certified
          <p>addresses</p>
        </a>
        <router-link to="/view/flagged"
          class="hover:bg-red hover:border-black hover:text-black font-['Handjet'] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] font-normal text-[23px] leading-[26px] text-red text-center border-red border-[4px] py-[12px] px-[24px]">flagged
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
  import WalletConnectionButton from "@/components/WalletConnectionButton.vue"
  import Header from "@/pages/layouts/Header.vue"
  import Footer from "@/pages/layouts/Footer.vue"
  import { OIVerifiedContract } from '@/contracts/OIVerifiedInstance'
  import { OIFlaggedContract } from '@/contracts/OIFlaggedInstance'
  import { checkAddress, resolveENS } from '@/api'
  export default {
    name: 'Home',
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        windowWidth: window.innerWidth,
        address: '',
        textColor: 'blue',
        footerColor: "white"
      }
    },
    computed: {
      deviceWidth() {
        return this.windowWidth;
      }
    },
    created() {
      window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
      window.removeEventListener("resize", this.handleResize);
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
      shortenAddr(addr: string) {
        if (this.windowWidth <= 768) {
          if (addr.length < 10) return addr;
          return `${addr.slice(0, 8)}...${addr.slice(addr.length - 8)}`;
        }
        return addr;
      },

      handleInputChange() {
      this.address = this.address.replace(/\s/g, ''); // Remove white spaces from the address
    },
      // SEARCH STATE MACHINE. WORKS AS FOLLOWS:
      // 1. Check if given address own:
      // 2. The Verfied NFT, or
      // 3. The Flagged NFT.
      // 4. Thereafter, checks for flagged by association using the checkAddress() API
      // 
      // If any of the steps are true, the remaining steps are skipped and the appropriate page loaded.

      async handleSearch() {
  const store = useStore();
  store.setSearchAddr(this.address);

  // Resolve ENS link
  const resolvedAddress = await resolveENS(this.address);
  if (resolvedAddress && resolvedAddress.success) {
    this.address = resolvedAddress.address;
  }

  // by default the address is assumed to be unknown
  let flag = 'unknown';

  try {
    // check if the address owns VRFD NFT
    let balance = await OIVerifiedContract().methods.balanceOf(this.address).call();
    if (Number(balance) != 0) {
      store.setState('verified');
      flag = 'verified';
    }
  } catch (error: any) {
    if (error.code == 'INVALID_ARGUMENT') {
      toast("Invalid Address!", {
        autoClose: 1000,
        theme: 'dark',
        type: 'error'
      });
      return;
    } else {
      toast("Unexpected Error!", {
        autoClose: 1000,
        theme: 'dark',
        type: 'error'
      });
      return;
    }
  }

  // will only execute if address is still unknown
  if (flag == 'unknown') {
    try {
      // Check if the address owns FLAG NFT
      let balance = await OIFlaggedContract().methods.balanceOf(this.address).call();
      if (Number(balance) != 0) {
        flag = 'flagged';
        store.setState('flagged');
      }
    } catch (error: any) {
      if (error.code == 'INVALID_ARGUMENT') {
        toast("Invalid Address!", {
          autoClose: 1000,
          theme: 'dark',
          type: 'error'
        });
        return;
      } else {
        toast("Unexpected Error!", {
          autoClose: 1000,
          theme: 'dark',
          type: 'error'
        });
        return;
      }
    }
  }

  // will only execute if address is still unknown
  if (flag == 'unknown') {
    try {
      // Check for flag by association via backend
      let res = await checkAddress(this.address);
      console.log(res.flagged);
      if (res.flagged) {
        flag = 'flagged';
        store.setState('flagged');
      } else {
        flag = 'unknown';
        store.setState('unknown');
      }
    } catch (error: any) {
      toast("Unexpected Error!", {
        autoClose: 1000,
        theme: 'dark',
        type: 'error'
      });
      return;
    }
  }

  this.$router.push({ name: 'address', params: { addr: this.address } });
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
