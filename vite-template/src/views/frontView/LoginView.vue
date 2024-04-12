<template>
  <div class="container mt-5">
    <RouterLink class="navbar-brand logo text-brown" to="/"
      ><h1 class="fs-2">Cat Paws</h1></RouterLink
    >
  </div>
  <div
    class="container d-flex justify-content-center align-items-center text-center vh-100 w-100"
  >
    <div class="row">
      <form
        class="form-signin bg-vanilla shadow p-5 rounded w-100"
        @submit.prevent="login"
      >
        <div class="fs-3 mb-3 fw-normal text-brown">請先登入</div>

        <div class="form-floating">
          <input
            type="email"
            class="form-control mt-4"
            v-model="user.username"
            id="username"
            placeholder="name@example.com"
            required
            autofocus
          />
          <label for="username">Email address</label>
        </div>
        <div class="form-floating mt-4">
          <input
            type="password"
            class="form-control"
            v-model="user.password"
            id="password"
            placeholder="Password"
            required
          />
          <label for="password">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-brown mt-4" type="submit">
          登入
        </button>
        <p class="mt-5 mb-3 text-muted copy">&copy; 2024 by Ariel</p>
      </form>
    </div>
  </div>
  <ToastMessages />
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToastMessageStore } from '../../stores/toastMessage'
import ToastMessages from '../../components/ToastMessages.vue'

const { VITE_APP_URL } = import.meta.env
const toastMessageStore = useToastMessageStore()
const { pushMessage } = toastMessageStore

export default {
  setup () {
    const user = ref({
      username: '',
      password: ''
    })
    const router = useRouter()

    const login = () => {
      axios
        .post(`${VITE_APP_URL}/admin/signin`, user.value)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `rubbyToken=${token}; expires=${new Date(
            expired
          )};`
          pushMessage({
            style: 'success',
            title: '登入成功'
          })
          router.push('/admin/products')
          window.scrollTo(0, 0)
        })
        .catch(() => {
          pushMessage({
            style: 'danger',
            title: '登入失敗'
          })
        })
    }
    return {
      user,
      login
    }
  },
  components: {
    ToastMessages
  }
}
</script>
