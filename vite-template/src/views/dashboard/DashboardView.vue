<template>
  <div class="container-fluid">
    <div class="container mt-5 p-0">
      <RouterLink class="navbar-brand logo text-brown" to="/"
        ><h1 class="fs-2">Cat Paws</h1></RouterLink
      >
      <h2 class="mt-3 text-brown text-center">後台</h2>
    </div>
    <nav class="text-center mt-4">
      <RouterLink
        class="text-decoration-none text-black m-2"
        to="/admin/products"
        >產品</RouterLink
      >|
      <RouterLink class="text-decoration-none text-black m-2" to="/admin/order"
        >訂單</RouterLink
      >|
      <RouterLink class="text-decoration-none text-black m-2" to="/admin/coupon"
        >優惠券</RouterLink
      >|
      <RouterLink class="text-decoration-none text-brown" to="/"
        >回到前台</RouterLink
      >
    </nav>
    <RouterView />
  </div>
  <ToastMessages />
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToastMessageStore } from '../../stores/toastMessage'
import ToastMessages from '../../components/ToastMessages.vue'

const toastMessageStore = useToastMessageStore()
const { pushMessage } = toastMessageStore

const { VITE_APP_URL } = import.meta.env
const router = useRouter()

// 1.確認是否登入
const checkLogin = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)rubbyToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  axios.defaults.headers.common.Authorization = token
  axios
    .post(`${VITE_APP_URL}/api/user/check`)
    .then((res) => {
      pushMessage({
        style: 'success',
        title: '登入成功'
      })
    })
    .catch(() => {
      pushMessage({
        style: 'danger',
        title: '登入失敗'
      })
      window.scrollTo(0, 0)
      router.push('/login')
    })
}
checkLogin()
</script>
