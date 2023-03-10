import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.postcss'
import router from './router'

const head = createHead({
  title: 'Verified'
  // meta - An array of meta tags
  // link - An array of link tags
  // script - An array of script tags
  // htmlAttrs - An object of attributes to be added to the html tag
  // bodyAttrs - An object of attributes to be added to the body tag
  // base - The base tag
  // noscript - An array of no noscript tags
  // style - An array of style tags
  // titleTemplate - A template for the title
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(head)

app.mount('#app')
