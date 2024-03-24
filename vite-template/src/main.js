import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/all.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap/scss/bootstrap.scss'

import Loading from 'vue-loading-overlay'

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { date, currency } from '@/methods/filters'

import App from './App.vue'
import router from './router'

/**
 * 這裡是將所有 vee-validate 的規則載入
 */
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

/**
 * 這裡是設定 vee-validate 的語系
 */
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  currency
}

app.use(createPinia())
app.use(router)

app.component('VueLoading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
