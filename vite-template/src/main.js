import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/all.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'

import Loading from 'vue-loading-overlay'

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import { date, currency, numberToCurrencyNo } from '@/methods/filters'

import App from './App.vue'
import router from './router'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  currency,
  numberToCurrencyNo
}

app.use(createPinia())
app.use(router)

app.component('VueLoading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
