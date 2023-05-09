<template>
    <div class="flex pt-[20px] mx-[27px] justify-between">
        <div>
            <ul class="flex">
                <router-link to="/"
                    :class="`hover:shadow-[6px_6px_0px_#000] border-[4px] border-transparent hover:border-[#000] py-[10px] px-[20px] cursor-pointer hover:bg-blue text-${textColor} hover:text-[#000]`">
                    <li to="/" class="font-[700] text-[23px] leading-[26px] font-['Handjet']">Home</li>
                </router-link>
                <li class="md:hidden" @click="showMenu"
                    :class="`relative ml-[42px] hover:shadow-[6px_6px_0px_#000] border-[4px] border-transparent hover:border-[#000] py-[10px] px-[20px] cursor-pointer hover:bg-blue text-${textColor} hover:text-[#000]`">
                    <p class="font-[700] text-[23px] leading-[26px] font-['Handjet']">
                        View Top
                        <i class="text-[15px] fa-solid fa-chevron-down"></i>
                    </p>
                    <ul v-if="dropdown" class="absolute -bottom-[220px] -left-[3px]">
                        <router-link to="/view/verified"
                            class="block mb-[18px] shadow-[6px_6px_0px_#000] border-[4px] border-[#000] py-[10px] px-[20px] cursor-pointer bg-blue text-blue text-[#000]">
                            <li class="text-center font-[700] text-[23px] leading-[26px] font-['Handjet']">VRFD</li>
                        </router-link>
                        <router-link to=""
                            class="block mb-[18px] shadow-[6px_6px_0px_#000] border-[4px] border-[#000] py-[10px] px-[20px] cursor-pointer bg-blue text-blue text-[#000]">
                            <li class="text-center font-[700] text-[23px] leading-[26px] font-['Handjet']">CRTFD</li>
                        </router-link>
                        <router-link to="/view/flagged"
                            class="block shadow-[6px_6px_0px_#000] border-[4px] border-[#000] py-[10px] px-[20px] cursor-pointer bg-blue text-blue text-[#000]">
                            <li class="text-center font-[700] text-[23px] leading-[26px] font-['Handjet']">FLAG</li>
                        </router-link>
                    </ul>
                </li>
                <a href="https://open-info.gitbook.io/verified-app/" target="_blank"
                    class="font-[700] text-[23px] leading-[26px] font-['Handjet']">
                    <li class="md:hidden"
                        :class="`ml-[42px] hover:shadow-[6px_6px_0px_#000] border-[4px] border-transparent hover:border-[#000] py-[10px] px-[20px] cursor-pointer hover:bg-blue text-${textColor} hover:text-[#000]`">
                        User Manual
                    </li>
                </a>
                <a href="https://open-info.gitbook.io/oi-litepaper" target="_blank"
                    class="font-[700] text-[23px] leading-[26px] font-['Handjet']">
                    <li class="md:hidden"
                        :class="`ml-[42px] hover:shadow-[6px_6px_0px_#000] border-[4px] border-transparent hover:border-[#000] py-[10px] px-[20px] cursor-pointer hover:bg-blue text-${textColor} hover:text-[#000]`">
                        Learn More
                    </li>
                </a>
            </ul>
        </div>
        <WalletConnectionButton :textColor="textColor" />
    </div>
</template>

<script lang="ts">
import WalletConnectionButton from '@/components/WalletConnectionButton.vue';
export default {
    name: "Header",
    components: {
        WalletConnectionButton,
    },
    data() {
        return {
            dropdown: false,
            textColor: 'blue',
        }
    },
    methods: {
        showMenu() {
            if (this.dropdown) {
                this.dropdown = false;
            } else {
                this.dropdown = true;
            }
        }
    }
}
</script>

<script setup lang="ts">
const props = defineProps<{
    textColor: string
}>()
</script>