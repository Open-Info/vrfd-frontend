import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Unknown from '@/pages/Unknown.vue'
import Verified from '@/pages/Verified.vue'
import Flagged from '@/pages/Flagged.vue'
import VerifiedView from '@/pages/VerifiedView.vue'
import FlaggedView from '@/pages/FlaggedView.vue'
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
    component: Home,
  },
  {
    path: '/:addr',
    name: 'unknown',
    component: Unknown,
  },
  {
    path: '/:addr',
    name: 'verified',
    component: Verified,
  },
  {
    path: '/:addr',
    name: 'flagged',
    component: Flagged,
  },
  {
    path: '/view/verified', // page with verified addresses
    component: VerifiedView,
  },
  {
    path: '/view/flagged', // page with flagged addresses
    component: FlaggedView,
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

router.beforeEach(async (to, from, next) => {
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

  const state = localStorage.getItem('state')
  if (to.name == 'address') {
    if (state == "verified") {
      next({
        name: 'verified',
        params: { addr: to.params.addr}
      })
    } else if (state == "flagged"){
      next({
        name: 'flagged',
        params: { addr: to.params.addr}
      })
    } else {
      next({
        name: 'unknown',
        params: { addr: to.params.addr}
      })
    }
  } else {
    next();
  }
});

export default router
