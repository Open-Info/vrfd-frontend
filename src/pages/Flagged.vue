<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-[50vh] bg-[#363B3E] pb-[60px]">
      <header class="py-[34px] px-[37px] flex justify-end items-center">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.9165 16.3334H39.0832V11.6667C39.0832 7.00002 37.3332 4.66669 32.0832 4.66669H23.9165C18.6665 4.66669 16.9165 7.00002 16.9165 11.6667V16.3334ZM37.3332 35V44.3334C37.3332 49 34.9998 51.3334 30.3332 51.3334H25.6665C20.9998 51.3334 18.6665 49 18.6665 44.3334V35H37.3332Z"
            stroke="#B8B8B8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M39.6667 35H16.3333M16.3333 25.6666H23.3333M49 23.3333V35C49 39.6666 46.6667 42 42 42H37.3333V35H18.6667V42H14C9.33333 42 7 39.6666 7 35V23.3333C7 18.6666 9.33333 16.3333 14 16.3333H42C46.6667 16.3333 49 18.6666 49 23.3333Z"
            stroke="#B8B8B8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <WalletConnectionButton :bg-color="walletConnectionBtnBgColor" />
      </header>
      <div class="flex flex-col items-center">
        <img src="../assets/images/flagged.png" alt="" class="mt-[-14px]" />
        <h1
          class="flex font-['Handjet'] font-normal text-[150px] leading-[168px] font-bold text-[#F7766A] text-center ml-[140px]"
        >
          Flagged
          <div class="flex flex-col justify-end pb-[27px]">
            <p
              class="font-['Handjet'] font-normal text-[40px] leading-[45px] text-[#F7766A] ml-[31px]"
            >
              {{ votes }} times
            </p>
          </div>
        </h1>
      </div>
    </div>
    <input
      type="text"
      id="search"
      name="search"
      :value="$route.params.addr"
      readonly
      class="bg-[#F7766A] text-black font-normal text-[32px] leading-[36px] font-['Handjet'] text-center py-[9px] px-[22px] min-w-[620px] rounded-[14px] border-[1px] border-[#000] shadow-[6px_10px] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
    />
    <div
      class="flex flex-col justify-between items-center h-[50vh] bg-[#363B3E]"
    >
      <div class="flex justify-between items-center min-w-[300px] pt-[75px]">
        <button
          @click="downvote"
          class="bg-transparent font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-[#F7766A] text-center border-[#B8B8B8] rounded-[20px] border-[4px] py-[9px] px-[12px]"
        >
          second
        </button>
        <a
          v-if="store.getWalletAddr?.toLowerCase() != OWNER_ADDR.toLowerCase()"
          href="/"
          target="_blank"
          class="bg-transparent font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-[#00B689] text-center border-[#B8B8B8] rounded-[20px] border-[4px] py-[9px] px-[12px]"
          >dispute</a
        >
        <button
          v-if="store.getWalletAddr?.toLowerCase() == OWNER_ADDR.toLowerCase()"
          @click="revoke"
          class="bg-transparent font-['Ubuntu Condensed'] font-normal text-[23px] leading-[26px] text-[#00B689] text-center border-[#B8B8B8] rounded-[20px] border-[4px] py-[9px] px-[12px]"
        >
          revoke
        </button>
      </div>
      <footer
        class="flex justify-center items-center flex-col w-[100%] h-[147px] shadow-[inset_0_8px_4px_rgba(0,0,0,0.25)]"
      >
        <p
          class="font-normal text-[23px] leading-[26px] text-[#000] text-center font-['Ubuntu Condensed']"
        >
          Verified v3.1.0,
        </p>
        <p
          class="font-normal text-[23px] leading-[26px] text-[#000] text-center font-['Ubuntu Condensed']"
        >
          Powered by
          <span
            class="font-normal font-[23px] leading-[26px] font-['Ubuntu Condensed'] text-[#30B1FD]"
            >Open Information</span
          >
        </p>
      </footer>
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
import "@/assets/sass/style.scss";
import { toast } from "vue3-toastify";
import { OWNER_ADDR } from "@/helpers/constants";
import WalletConnectionButton from "@/components/WalletConnectionButton.vue";
import { useEthers } from "@/composables/useEthers";
import { OIFlaggedSignedContract } from "@/contracts/OIFlaggedInstance";
import { voteAddress, getVotes } from "@/api";

export default {
  name: "Flagged",
  components: {
    WalletConnectionButton,
  },
  data() {
    return {
      walletConnectionBtnBgColor: "#FFF4F3",
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
  },
};
</script>