<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-green pb-[60px]">
      <Header :textColor=textColor>
        <WalletConnectionButton :textColor=textColor />
      </Header>
      <div class="flex md:flex-col justify-center md:items-center">
        <h1 class="flex font-['Handjet'] text-[150px] leading-[168px] font-bold text-black text-center">
          VRFD
        </h1>
        <div class="flex flex-col justify-end pb-[27px]">
          <p class="font-['Handjet'] font-normal text-[40px] leading-[45px] text-black md:ml-0 ml-[31px]">
            {{ votes }} time(s)
          </p>
        </div>
      </div>
    </div>
    <div class="flex absolute left-1/2 transform -translate-y-[50%] -translate-x-[50%]">
      <div class="relative">
        <a href="/"><i class="absolute -translate-y-[50%] top-1/2 md:left-[7px] left-[15px] text-[20px] z-50 fa-solid fa-xmark"></i></a>
        <input type="text" id="search" name="search" :value="$route.params.addr" readonly
          class="text-black font-normal bg-green text-[32px] border-[3px] border-black leading-[36px] font-['Handjet'] text-center py-[9px] px-[22px] md:w-[320px] w-[620px] shadow-[8px_8px_0px_#000000]" />
      </div>
      <button
        class="md:hidden text-black font-normal bg-green text-[32px] border-[3px] border-black leading-[36px] py-[9px] px-[22px] ml-[22px] shadow-[8px_8px_0px_#000000]">
        <i class="fas fa-share-nodes"></i>
      </button>
    </div>
    <div class="m_md:hidden flex bg-offWhite justify-center pt-[70px]">
      <button
        class="font-['Handjet'] bg-green font-[700] text-[32px] leading-[36px] text-black text-center shadow-[8px_8px_0px_#000000] border-black border-[3px] py-[5px] px-[12px]">
        AKA
      </button>
      <button
        class="text-black font-normal bg-green text-[32px] border-[3px] border-black leading-[36px] py-[9px] px-[22px] ml-[22px] shadow-[8px_8px_0px_#000000]">
        <i class="fas fa-share-nodes"></i>
      </button>
    </div>
    <div class="flex flex-col justify-between md:justify-start items-center md:h-[40vh] h-[50vh] bg-offWhite">
      <div class="flex justify-between items-center md:w-[300px] w-[400px] md:pt-[30px] md:mb-[100px] pt-[75px]">
        <div
          class="hover:border-t-[12px] hover:border-l-[12px] hover:border-black border-transparent">
          <button v-if="store.getWalletAddr?.toLowerCase() != OWNER_ADDR.toLowerCase()"
            class="cursor-pointer bg-red font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black border-[4px] py-[9px] px-[12px]">
            <a href="https://bit.ly/mint-flag" target="_blank">
              report
            </a>
          </button>
        </div>
        <button
          class="md:hidden font-['Handjet'] bg-green font-[700] text-[32px] leading-[36px] text-black text-center shadow-[8px_8px_0px_#000000] border-black border-[3px] py-[5px] px-[12px]">
          AKA
        </button>
        <div v-if="store.getWalletAddr?.toLowerCase() == OWNER_ADDR.toLowerCase()"
          class="hover:border-t-[12px] hover:border-l-[12px] hover:border-black border-transparent">
          <button @click="revoke"
            class="cursor-pointer bg-red font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black border-[4px] py-[9px] px-[12px]">
            revoke
          </button>
        </div>
        <div
          class="hover:border-t-[12px] hover:border-l-[12px] hover:border-black border-transparent">
          <button @click="upvote"
            class="bg-green font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-black text-center border-black border-[4px] py-[9px] px-[12px]">
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
import { useStore } from "../store";

const store = useStore();
const { walletAddr } = storeToRefs(store);

watch(walletAddr, (newWalletAddr) => {
  console.log(newWalletAddr);
});
</script>

<script lang="ts">
import { toast } from "vue3-toastify";
import "@/assets/sass/style.scss";
import { OWNER_ADDR } from "@/helpers/constants";
import { useEthers } from "@/composables/useEthers";
import WalletConnectionButton from "@/components/WalletConnectionButton.vue";
import Header from "../pages/layouts/Header.vue";
import Footer from "../pages/layouts/Footer.vue";
import MobileFooter from "../pages/layouts/MobileFooter.vue";
import { OIVerifiedSignedContract } from "@/contracts/OIVerifiedInstance";
import { voteAddress, getVotes } from "@/api";

export default {
  name: "Verified",
  components: {
    WalletConnectionButton,
    Header,
    Footer,
    MobileFooter
  },
  data() {
    return {
      textColor: 'black',
      votes: 0
    };
  },
  mounted() {
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
  },
};
</script>
