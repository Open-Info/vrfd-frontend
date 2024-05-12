<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-offBlack pb-[60px]">
      <Header :textColor=textColor />
      <div class="flex md:flex-col justify-center md:items-center">
        <h1 class=" md:mb-[30px] flex font-['Handjet'] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)] text-[150px] leading-[168px] font-bold text-red text-center">
          FLAG
        </h1>
        <votes :votes="votes" color="rgb(247 118 106 )"/>
      </div>
    </div>
    <div class="flex absolute left-1/2 transform -translate-y-[50%] -translate-x-[50%]">
      <div class="relative">
        <router-link to="/"><i class="absolute -translate-y-[50%] top-1/2 md:left-[7px] left-[15px] text-[20px] z-50 fa-solid fa-xmark"></i></router-link>
        <input @click="redirectToBSCLink" type="text" id="search" name="search" :value="shortenAddr($route.params.addr as string)" readonly
          class="cursor-pointer text-black font-normal bg-red text-[32px] border-[3px] border-black leading-[36px] font-['VT323'] text-center py-[9px] px-[22px] md:w-[320px] w-[620px] shadow-[8px_8px_0px_#000]" />
      </div>
      <button 
        @click="copyToClipboard"
        class="md:hidden text-black font-normal bg-red text-[32px] border-[3px] border-black leading-[36px] py-[9px] px-[22px] ml-[22px] shadow-[8px_8px_0px_#000]">
        <i class="fas fa-share-alt"></i>
      </button>
    </div>
    <div class="m_md:hidden flex bg-offBlack justify-center pt-[70px]">
      <!-- Mobile view of ENS -->
      <button @click="showFlaggedModal"
        class="font-['VT323'] bg-red font-[400] text-[32px] leading-[36px] text-black text-center shadow-[8px_8px_0px_#000] border-black border-[3px] py-[5px] px-[12px] min-w-[200px]">
        <EnsReverse :alias="ens" />
      </button>
      <button
        @click="copyToClipboard"
        class="text-black font-normal bg-red text-[32px] border-[3px] border-black leading-[36px] py-[9px] px-[22px] ml-[22px] shadow-[8px_8px_0px_#000]">
        <i class="fas fa-share-nodes"></i>
      </button>
    </div>
    <div class="flex flex-col justify-between md:justify-start items-center md:h-[40vh] h-[50vh] bg-offBlack">
      <div class="flex justify-between items-center md:w-[300px] w-[400px] md:pt-[30px] md:mb-[100px] pt-[75px]">
        <button @click="downvote"
          class="shadow-[8px_8px_0px_#000] hover:border-black hover:text-black hover:bg-red bg-transparent font-['VT323'] font-[400] text-[23px] leading-[26px] text-red text-center border-silver border-[4px] py-[9px] px-[12px]">
          second
        </button>
        <!-- Desktop view of ENS -->
        <button @click="showFlaggedModal"
          class="md:hidden font-['VT323'] bg-red font-[400] text-[32px] leading-[36px] text-black text-center shadow-[8px_8px_0px_#000] border-black border-[3px] py-[5px] px-[12px] min-w-[200px]">
          <EnsReverse :alias="ens" />
        </button>
        <ENSModal v-show="isModalVisible" :type="modalType" :ens="ens" :content="[...content]" @close="closeModal"  class="absolute inset-0 flex items-center justify-center" />
        <div>
          <div v-if="store.getWalletAddr?.toLowerCase() != OWNER_ADDR.toLowerCase()">
            <a href="https://bit.ly/get-vrfd" target="_blank"
              class="shadow-[8px_8px_0px_#000] hover:border-black hover:text-black hover:bg-green bg-transparent font-['VT323'] font-[400] text-[23px] leading-[26px] text-green text-center border-silver border-[4px] py-[9px] px-[12px]">
              dispute
            </a>
          </div>
          <div v-else>
            <button @click="revoke"
              class="shadow-[8px_8px_0px_#000] hover:border-black hover:text-black hover:bg-green bg-transparent font-['VT323'] font-[400] text-[23px] leading-[26px] text-green text-center border-silver border-[4px] py-[9px] px-[12px]">
              revoke
            </button>
          </div>
        </div>
      </div>
      <img class="md:hidden w-[103px] h-[85px]" src="../assets/images/flagged.png" alt="" />
      <MobileFooter :textColor=textColor />
      <Footer :textColor=footerColor />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import EnsReverse from '../components/ENSReverse.vue';

const store = useStore();
const { walletAddr } = storeToRefs(store);

watch(walletAddr, (newWalletAddr) => {
  console.log(newWalletAddr);
});
</script>

<script lang="ts">
import "@/assets/sass/style.scss";
import { toast } from "vue3-toastify";
import { OWNER_ADDR } from "@/helpers/constants";
import Header from "../pages/layouts/Header.vue";
import Footer from "../pages/layouts/Footer.vue";
import MobileFooter from "../pages/layouts/MobileFooter.vue";
import { useEthers } from "@/composables/useEthers";
import { OIFlaggedContract, OIFlaggedSignedContract } from "@/contracts/OIFlaggedInstance";
import { voteAddress, getVotes, getENS, flaggedMeta } from "@/api";
import Votes from '../components/Votes.vue';
import ENSModal from '../components/ENSModal.vue';

export default {
  name: "Flagged",
  components: {
    Header,
    Footer,
    MobileFooter,
    Votes
  },
  data() {
    return {
      isModalVisible: false,
      windowWidth: window.innerWidth,
      textColor: "blue",
      footerColor: "white",
      votes: 0,
      ens: "no alias",
      modalType: '',
      token: '',
      content: [],
    };
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
  async mounted() {
    getVotes(this.$route.params.addr as string)
      .then(res => {
        if (res.success) {
          this.votes = res.votes;
        } else {
          console.log('GetVotes API refused');
        }
      })
      .catch(e => {
        console.log('GetVotes error', e);
      })

      getENS(this.$route.params.addr as string)
      .then(res => {
        if (res.success) {
          this.ens = res.name
          console.log('ENS', res);
        } else {
          this.ens = 'no alias'
          console.log('No ENS exists', res);
        }
      })
      .catch(e => {
        console.log('ENS error', e);
      })

      try {
        const tokenIds = await OIFlaggedContract()
          .methods.getOwnersToken(this.$route.params.addr)
          .call();

        if (tokenIds.length === 0) {
          throw new Error('No token IDs found');
        }

        const lastTokenId = tokenIds[tokenIds.length - 1];

        const res = await flaggedMeta(lastTokenId as number);

        if (!res) {
          throw new Error('Network Error');
        }

        this.content = res.attributes;
        console.log('Metadata', this.content)
      } catch (e) {
        console.error('Metadata Error', e);
      }
  },
  methods: {
    showFlaggedModal() {
      this.isModalVisible = true;
      this.modalType = 'flagged';
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    shortenAddr(addr: string) {
      if (this.windowWidth <= 768) {
        if (addr.length < 10) return addr;
        return `${addr.slice(0, 6)}...${addr.slice(addr.length - 4)}`;
      }
      return addr;
    },
    async downvote() {
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
        const res = await voteAddress('downvote', this.$route.params.addr as string, address);
        if (res.success) {
          toast("Successfully downvoted!", {
            autoClose: 1000,
            theme: "dark",
            type: "success",
          });
        } else {
          toast("Downvoting failed!", {
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
        let tokenIds = await OIFlaggedSignedContract(signer)
          .methods.getOwnersToken(this.$route.params.addr)
          .call();
        console.log("tokenIds", tokenIds);
        if (tokenIds.length > 0) {
          await OIFlaggedSignedContract(signer)
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
      window.open(`${import.meta.env.VITE_BSCSCAN_URL}/token/${import.meta.env.VITE_FLAGGED_CONTRACT_ADDR}?a=${this.$route.params.addr}`, '_blank');
    }
  }
};
</script>
