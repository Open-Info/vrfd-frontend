import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Unknown from '@/pages/Unknown.vue'
import Verified from '@/pages/Verified.vue'
import Flagged from '@/pages/Flagged.vue'
import VerifiedView from '@/pages/VerifiedView.vue'
import { useStore } from './store'

import { useOnboard } from "./composables/useOnboard";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:addr',
    name: 'address',
    component: () => {
      const state = localStorage.getItem('state')
      if (state == "verified") {
        return Verified;
      } else if (state == "flagged"){
        return Flagged;
      } else {
        return Unknown;
      }
    }
  },
  // {
  //   path: '/unknown', // page with unknown addresses
  //   component: Unknown,
  // },
  // {
  //   path: '/verified', // page with verified addresses
  //   component: Verified,
  // },
  // {
  //   path: '/flagged', // page with flagged addresses
  //   component: Flagged,
  // },
  {
    path: '/view/verified', // page with flagged addresses
    component: VerifiedView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const hasRecentlyConnected = (previousTimestamp: number, maxMinutes = 6) => {
  const timestamp = Date.now();
  const minutes = Math.floor((timestamp - previousTimestamp) / 60000);
  return minutes < maxMinutes;
}

router.beforeEach(async (_, _2, next) => {
  const {
    alreadyConnectedWallets,
    connectedWallet,
    lastConnectionTimestamp,
    connectWallet,
  } = useOnboard();

  if (connectedWallet.value === null && alreadyConnectedWallets.value.length > 0 && hasRecentlyConnected(lastConnectionTimestamp.value)) {
    await connectWallet({
      autoSelect: {
        label: alreadyConnectedWallets.value[0],
        disableModals: true,
      },
    });
  }
  next();
});

export default router
