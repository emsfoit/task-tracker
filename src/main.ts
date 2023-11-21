import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { de, en } from './locales' 

const i18n = createI18n({
  locale: 'de', // set current locale
  messages: {
    de: de,
    en: en
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
