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
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const { VITE_APP_URL } = import.meta.env

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
          // console.log(res);
          const { token, expired } = res.data
          // console.log(token, expired);
          document.cookie = `rubbyToken=${token}; expires=${new Date(
            expired
          )};`
          router.push('/admin/products')
          window.scrollTo(0, 0)
          console.log(token, expired)
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
        })
    }
    return {
      user,
      login
    }
  }
}
</script>
