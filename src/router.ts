import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Unknown from '@/pages/Unknown.vue'
import Verified from '@/pages/Verified.vue'
import Flagged from '@/pages/Flagged.vue'
import VerifiedView from '@/pages/VerifiedView.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/unknown', // page with unknown addresses
    component: Unknown,
  },
  {
    path: '/verified', // page with verified addresses
    component: Verified,
  },
  {
    path: '/flagged', // page with flagged addresses
    component: Flagged,
  },
  {
    path: '/view/verified', // page with flagged addresses
    component: VerifiedView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
