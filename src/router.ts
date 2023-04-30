import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Unknown from '@/pages/Unknown.vue'
import Verified from '@/pages/Verified.vue'
import Flagged from '@/pages/Flagged.vue'
import VerifiedView from '@/pages/VerifiedView.vue'
import FlaggedView from '@/pages/FlaggedView.vue'
import { OIVerifiedContract } from '@/contracts/OIVerifiedInstance'
import { OIFlaggedContract } from '@/contracts/OIFlaggedInstance'
import { checkAddress } from '@/api'
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

const classifyAddr = async (addr: string) => {
  let flag = 'unknown'
  const store = useStore()

  try {
    let balance = await OIVerifiedContract.methods.balanceOf(addr).call()
    if (Number(balance) != 0) {
      store.setState('verified')
      flag = 'verified'
    }
  } catch (error: any) {
    return 'invalid'
  }

  if (flag == 'unknown') {
    try {
      let balance = await OIFlaggedContract.methods.balanceOf(addr).call()
      if (Number(balance) != 0) {
        flag = 'flagged'
        store.setState('flagged')
      }
    } catch (error: any) {
      return 'invalid'
    }
  }

  if (flag == 'unknown') {
    try {
      let res = await checkAddress(addr)
      console.log(res.flagged)
      if (res.flagged) {
        flag = 'flagged'
        store.setState('flagged')
      } else {
        flag = 'unknown'
        store.setState('unknown')
      }
    } catch (error: any) {
      return 'invalid'
    }
  }

  return flag;
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

  const state = useStore().state;
  console.log(to.params.addr, state);
  if (to.name == 'address') {
    const state = await classifyAddr(to.params.addr as string);
    if (state == "invalid") {
      next({
        name: 'home',
      })
    }
    else if (state == "verified") {
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
