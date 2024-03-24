<template>
  <div id="app">
<div class="container mt-8 p-0">
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item" to="/"><RouterLink class="text-black text-decoration-none" to="/">首頁</RouterLink></li>
    <li class="breadcrumb-item active" aria-current="page">特價商品</li>
  </ol>
</nav>
<div class="row mt-5">
<div class="col-md-3">
<div class="fs-4 text-gray2 mt-3 mb-2">篩選條件</div>
<div class="fs-6 text-gray2 mb-2 btn p-0 border-0" @click="heightPrice">價格高到低</div>
<br>
<div class="fs-6 text-gray2 mb-2 btn p-0 border-0" @click="lowPrice">價格低到高</div>
</div>
<div class="col-md-9">
<div class="row mb-5">
    <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card shadow-sm bg-body rounded-lg border-0 position-relative mb-5" @click="openModal(product)">
          <span class="position-absolute top-0 start-0 fw-bold text-white p-2 bg-brown" v-if="product.price !== product.origin_price">SALE</span>
                      <img :src="product.imageUrl" class="card-img-top object-fit-cover" style="height: 300px;" alt="productPicture">
                      <div class="card-body">
                        <p class="card-title">{{ product.title }}</p>
                        <div
                  v-if="product.price === product.origin_price"
                  class="text-gray2 fs-5 card-title"
                >
                  ${{ product.origin_price }}
                </div>
                <div v-else class="d-flex align-items-center card-title ms-2">
                  <del class="text-gray2 fs-5">${{ product.origin_price }}</del>
                  <div class="text-brown fs-4 ms-3">${{ product.price }}</div>
                </div>
                        <button type="button" class="btn btn-outline-brown border-0 fs-5 m-2 position-absolute bottom-0 end-0" @click.stop="addToCart(product.id, 1)">
                          <span
                      v-if="product.id === status.loadingItem"
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                          <i class="bi bi-cart-plus"></i></button>
                      </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</div>
<ToastMessages></ToastMessages>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'
import { useToastMessageStore } from '../../stores/toastMessage'
import ToastMessages from '../../components/ToastMessages.vue'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  setup () {
    // const store = useCartStore()
    const store = useCartStore()
    const { getCart } = store
    const toastMessageStore = useToastMessageStore()
    const { pushMessage } = toastMessageStore
    const router = useRouter()
    const route = useRoute()
    const id = ref(route.params.productId)
    const products = ref([])
    const status = ref({
      loadingItem: ''
    })
    const carts = ref([])
    const finalTotal = ref(0)
    const total = ref(0)
    const lowPrice = () => {
      products.value.sort((a, b) => a.price - b.price)
    }
    const heightPrice = () => {
      products.value.sort((a, b) => b.price - a.price)
    }
    const openModal = (product) => {
      router.push(`/product/${product.id}`).then(() => {
        window.scrollTo(0, 0)
      })
    }
    const getProducts = () => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`
      axios.get(url).then((res) => {
        const filteredProducts = res.data.products.filter(product => product.price < product.origin_price)
        products.value = filteredProducts
        // console.log(filteredProducts)
      })
    }
    const addToCart = (id) => {
      status.value.loadingItem = id
      const order = {
        product_id: id,
        qty: 1
      }
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      axios.post(url, { data: order }).then((res) => {
        status.value.loadingItem = ''
        pushMessage({
          style: 'success',
          title: '加入購物車',
          content: res.data.message
        })
        getCart()
      })
    }
    onMounted(() => {
      getProducts()
    })
    return {
      id,
      products,
      status,
      addToCart,
      openModal,
      heightPrice,
      lowPrice,
      carts,
      finalTotal,
      total,
      getProducts
    }
  },
  components: {
    ToastMessages
  }
}
</script>

<style>
.card:hover{
  cursor: pointer;
  transform: scale(1.05);
}
</style>
