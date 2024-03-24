<template>
      <div class="container mt-5 p-0">
        <RouterLink class="navbar-brand logo text-brown" to="/"><h1 class="fs-2">Cat Paws</h1></RouterLink>
        <h2 class="mt-3 text-brown text-center">後台</h2>
      </div>
    <nav class="text-center mt-4">
    <RouterLink class="text-decoration-none text-black m-2" to="/admin/products">產品</RouterLink>|
    <RouterLink class="text-decoration-none text-black m-2" to="/admin/order">訂單</RouterLink>|
    <!-- <RouterLink class="text-decoration-none text-black m-2" to="/admin/coupon">優惠券</RouterLink>| -->
    <RouterLink class="text-decoration-none text-brown" to="/">回到前台</RouterLink>
    </nav>
    <RouterView />

</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const { VITE_APP_URL } = import.meta.env

export default {
  setup () {
    const products = ref([])
    const tempProduct = ref({})
    const router = useRouter()

    // 1.確認是否登入
    const checkLogin = () => {
      axios
        .post(`${VITE_APP_URL}/api/user/check`)
        .then(() => {
        //   console.log('驗證成功', res.data.success);
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
          router.push('/admin/products')
          window.scrollTo(0, 0)
        })
    }

    onMounted(() => {
      // Retrieve Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)rubbyToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      axios.defaults.headers.common.Authorization = token
      checkLogin()
    })

    return {
      products,
      tempProduct
    }
  }
}
</script>
