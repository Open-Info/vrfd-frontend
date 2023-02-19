import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'Verified?',
    },
  },
  {
    path: '/verified/', // page with verified addresses
    component: IndexPage, // ?
    meta: {
      title: 'Verified List'
    },
  },
  {
      path: '/flagged/', // page with flagged addresses
      component: IndexPage, // ?
      meta: {
        title: 'Flagged List'
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
