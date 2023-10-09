<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-green pb-[60px]">
      <Header :textColor=textColor />
      <div class="flex md:flex-col justify-center md:items-center">
        <h1 class="flex font-['Handjet'] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.25)] text-[150px] leading-[168px] font-bold text-black text-center">
          VRFD
        </h1>
        <votes :votes="votes" />
      </div>
    </div>
    <div class="flex absolute left-1/2 transform -translate-y-[50%] -translate-x-[50%]">
      <div class="relative">
        <router-link to="/"><i class="absolute -translate-y-[50%] top-1/2 md:left-[7px] left-[15px] text-[20px] z-50 fa-solid fa-xmark"></i></router-link>
        <input @click="redirectToBSCLink" type="text" id="search" name="search" :value="shortenAddr($route.params.addr as string)" readonly
          class="cursor-pointer text-black font-normal bg-green text-[32px] border-[3px] border-black leading-[36px] font-['VT323'] text-center py-[9px] px-[22px] md:w-[320px] w-[620px] shadow-[8px_8px_0px_#000]" />
      </div>
      <button
        @click="copyToClipboard"
        class="md:hidden text-black font-normal bg-green text-[32px] border-[3px] border-black leading-[36px] py-[9px] px-[22px] ml-[22px] shadow-[8px_8px_0px_#000]">
        <i class="fas fa-share-nodes"></i>
      </button>
    </div>
    <div class="m_md:hidden flex bg-offWhite justify-center pt-[70px]">
      <!-- Mobile view of ENS -->
      <button
        class="font-['VT323'] bg-green font-[400] text-[32px] leading-[36px] text-black text-center shadow-[8px_8px_0px_#000] border-black border-[3px] py-[5px] px-[12px] min-w-[200px]">
        <EnsReverse :alias="ens" />
      </button>
      <button
        @click="copyToClipboard"
        class="text-black font-normal bg-green text-[32px] border-[3px] border-black leading-[36px] py-[9px] px-[22px] ml-[22px] shadow-[8px_8px_0px_#000]">
        <i class="fas fa-share-nodes"></i>
      </button>
    </div>
    <div class="flex flex-col justify-between md:justify-start items-center md:h-[40vh] h-[50vh] bg-offWhite">
      <div class="flex justify-between items-center md:w-[300px] w-[400px] md:pt-[30px] md:mb-[100px] pt-[75px]">
        <div>
          <div v-if="store.getWalletAddr?.toLowerCase() != OWNER_ADDR.toLowerCase()">
            <a href="https://bit.ly/mint-flag" target="_blank"
                class="cursor-pointer bg-red font-['VT323'] font-normal text-[23px] leading-[26px] text-black text-center border-black border-[4px] py-[9px] px-[12px] hover:brightness-90">
              report
            </a>
          </div>
          <div v-else>
            <button @click="revoke"
              class="cursor-pointer bg-red font-['VT323'] font-normal text-[23px] leading-[26px] text-black text-center border-black border-[4px] py-[9px] px-[12px] hover:brightness-90">
              revoke
            </button>
          </div>
        </div>

        <!-- Desktop view of ENS -->
        <div
            class="md:hidden font-['VT323'] bg-green font-[400] text-[32px] leading-[36px] text-black text-center shadow-[8px_8px_0px_#000] border-black border-[3px] py-[5px] px-[12px] min-w-[200px]">
            <EnsReverse :alias="ens" />
        </div>
        <div>
          <button @click="upvote"
            class="bg-green font-['VT323'] font-normal text-[23px] leading-[26px] text-black text-center border-black border-[4px] py-[9px] px-[12px]  hover:brightness-90">
            second
          </button>
        </div>
      </div>
      <MobileFooter :textColor=textColor />
      <Footer :textColor=textColor />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {  useEnsName } from 'vagmi'
import { useStore } from "../store";
import EnsReverse from '../components/ENSReverse.vue';


const store = useStore();
const { walletAddr } = storeToRefs(store);

watch(walletAddr, (newWalletAddr) => {
  console.log(newWalletAddr);
});

const route = useRoute()
const routeParams = route.params
const ens = ref<string | null>('no alias')

const { data: ensName, isError, isLoading, refetch } = useEnsName({
  address: routeParams.addr as string,
  onSuccess(data) {
    ens.value = data
  },
  onError(error) {
    console.log('ensName error', error);
  }
})

onMounted(() => {
  refetch();
})

</script>

<script lang="ts">
import { toast } from "vue3-toastify";
import "@/assets/sass/style.scss";
import { OWNER_ADDR } from "@/helpers/constants";
import { useEthers } from "@/composables/useEthers";
import Header from "../pages/layouts/Header.vue";
import Footer from "../pages/layouts/Footer.vue";
import MobileFooter from "../pages/layouts/MobileFooter.vue";
import { OIVerifiedSignedContract } from "@/contracts/OIVerifiedInstance";
import { voteAddress, getVotes } from "@/api";
import Votes from '../components/Votes.vue';



export default {
  name: "Verified",
  components: {
    Header,
    Footer,
    MobileFooter,
    Votes
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      ensName: null,
      textColor: 'black',
      votes: 0,
      // ens: 'no alias'
    };
  },
  computed: {
    deviceWidth() {
      return this.windowWidth;
    }
  },
  async created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  async mounted() {
    getVotes(this.$route.params.addr as string)
      .then(res => {
        if (res.success) {
          this.votes = res.votes;
        } else {
          console.log('getVotes api failed');
        }
      })
      .catch(e => {
        console.log(e);
      })
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
    async upvote() {
      const { getSigner } = useEthers();
      let address;
      try {
        const signer = getSigner();
        address = await signer.getAddress();
      } catch(e) {
        console.log(e);
        toast("Please connect your wallet", {
          autoClose: 1000,
          theme: "dark",
          type: "error",
        });
        return;
      }

      try {
        const res = await voteAddress('upvote', this.$route.params.addr as string, address);
        if (res.success) {
          toast("Successfully upvoted!", {
            autoClose: 1000,
            theme: "dark",
            type: "success",
          });
        } else {
          toast("Upvoting failed!", {
            autoClose: 1000,
            theme: "dark",
            type: "error",
          });
        }
        
      } catch (error: any) {
        console.log(error);
        toast("Unexpected Error!", {
            autoClose: 1000,
            theme: "dark",
            type: "error",
          });
      }
    },
    async revoke() {
      const { getSigner } = useEthers();
      const signer = getSigner();
      const address = await signer.getAddress();

      try {
        let tokenIds = await OIVerifiedSignedContract(signer)
          .methods.getOwnersToken(this.$route.params.addr)
          .call();
        console.log("tokenIds", tokenIds);
        if (tokenIds.length > 0) {
          await OIVerifiedSignedContract(signer)
            .methods.burn(tokenIds[tokenIds.length - 1])
            .send({ from: address });
          toast("Successfully revoked!", {
            autoClose: 1000,
            theme: "dark",
            type: "success",
          });
        }
      } catch (error: any) {
        if (error.code == "INVALID_ARGUMENT") {
          toast("Invalid Address!", {
            autoClose: 1000,
            theme: "dark",
            type: "error",
          });
          return;
        } else {
          toast("Unexpected Error!", {
            autoClose: 1000,
            theme: "dark",
            type: "error",
          });
          return;
        }
      }
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.$route.params.addr as string).then(() => {
        toast("Text copied to clipboard", {
            autoClose: 1000,
            theme: "dark",
            type: "success",
          });
      }).catch((error) => {
        toast("Error copying text to clipboard", {
            autoClose: 1000,
            theme: "dark",
            type: "error",
          });
      });
    },
    redirectToBSCLink() {
      window.open(`${import.meta.env.VITE_BSCSCAN_URL}/token/${import.meta.env.VITE_VERIFIED_CONTRACT_ADDR}?a=${this.$route.params.addr}`, '_blank');
    }
  },
};
</script>
