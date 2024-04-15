<template>
  <div id="app">
    <VueLoading
      :active="isLoading"
      :is-full-page="true"
      :background-color="'#FFF8F1'"
      :opacity="1"
      :z-index="1060"
    >
      <img
        src="../../assets/loading.gif"
        width="500"
        alt="loading"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      />
    </VueLoading>

    <div class="container mt-7 p-0">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" to="/">
            <RouterLink class="text-black text-decoration-none" to="/"
              >首頁</RouterLink
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">特價商品</li>
        </ol>
      </nav>
      <div class="row mt-7">
        <div class="col-md-3">
          <div class="mSale">
            <div class="d-flex justify-content-end mb-5">
              <select
                class="p-1 text-gray2"
                aria-label="Default select example"
                @change="selectChange"
              >
                <option selected>價格</option>
                <option value="high">價格高到低</option>
                <option value="low">價格低到高</option>
              </select>
            </div>
          </div>
          <div class="pSale">
            <div class="fs-4 text-gray2 mb-2">篩選條件</div>
            <div
              class="fs-6 text-gray2 mb-2 btn p-0 border-0"
              @click="heightPrice"
            >
              <span class="heightPrice">價格高到低</span>
            </div>
            <br />
            <div
              class="fs-6 text-gray2 mb-2 btn p-0 border-0"
              @click="lowPrice"
            >
              <span class="lowPrice">價格低到高</span>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div
              class="col-md-4 col-6"
              v-for="product in products"
              :key="product.id"
            >
              <div
                class="card shadow-sm border-0 position-relative mb-5"
                @click="openModal(product)"
              >
                <span
                  class="position-absolute top-0 start-0 fw-bold text-white p-2 bg-brown"
                  v-if="product.price !== product.origin_price"
                  >SALE</span
                >
                <img
                  :src="product.imageUrl"
                  class="img-fluid object-fit-cover w-100 rwdImg"
                  alt="productPicture"
                />
                <div class="card-body">
                  <p class="card-title text-center rwdFont text-truncate">
                    {{ product.title }}
                  </p>
                  <div
                    v-if="product.price === product.origin_price"
                    class="text-gray2 fs-5 card-title"
                  >
                    ${{ $filters.numberToCurrencyNo(product.origin_price) }}
                  </div>
                  <div
                    v-else
                    class="d-flex justify-content-center align-items-center card-title ms-2"
                  >
                    <del class="text-gray2 fs-5"
                      >${{
                        $filters.numberToCurrencyNo(product.origin_price)
                      }}</del
                    >
                    <div class="text-brown fs-5 ms-3">
                      ${{ $filters.numberToCurrencyNo(product.price) }}
                    </div>
                  </div>
                  <br />
                  <button
                    type="button"
                    class="btn btn-outline-brown border-0 fs-5 m-2 position-absolute bottom-0 end-0"
                    @click.stop="addToCart(product.id, 1)"
                  >
                    <span
                      v-if="product.id === status.loadingItem"
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <i class="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastMessages />
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
    const isLoading = ref(false)
    const carts = ref([])
    const finalTotal = ref(0)
    const total = ref(0)
    const lowPrice = () => {
      products.value.sort((a, b) => a.price - b.price)
      document.querySelector('.lowPrice').classList.add('price-active')
      document.querySelector('.heightPrice').classList.remove('price-active')
    }
    const heightPrice = () => {
      products.value.sort((a, b) => b.price - a.price)
      document.querySelector('.heightPrice').classList.add('price-active')
      document.querySelector('.lowPrice').classList.remove('price-active')
    }
    const openModal = (product) => {
      router.push(`/product/${product.id}`).then(() => {
        window.scrollTo(0, 0)
      })
    }
    const getProducts = () => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`
      isLoading.value = true
      axios
        .get(url)
        .then((res) => {
          const filteredProducts = res.data.products.filter(
            (product) => product.price < product.origin_price
          )
          products.value = filteredProducts
          isLoading.value = false
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
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
    const selectChange = () => {
      const selectedValue = event.target.value
      if (selectedValue === 'high') {
        heightPrice()
      } else if (selectedValue === 'low') {
        lowPrice()
      }
    }
    onMounted(() => {
      getProducts()
    })
    return {
      id,
      products,
      status,
      isLoading,
      addToCart,
      openModal,
      heightPrice,
      lowPrice,
      carts,
      finalTotal,
      total,
      getProducts,
      selectChange
    }
  },
  components: {
    ToastMessages
  }
}
</script>

<style scoped lang="scss">
.card {
  height: 450px;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
}
.mSale {
  display: none;
}

.price-active {
  color: #a2672d;
}
.rwdFont {
  font-size: 20px;
}
.rwdImg{
  height: 280px;
}
@media screen and (max-width: 768px) {
  .mSale {
    display: block;
  }
  .mSale select {
    display: block;
    width: 170px;
    background: #fff8f1;
    border: none;
    border-bottom: 1px solid #a2672d;
    &:active,
    &:focus {
      border: none;
      border-bottom: 1px solid #a2672d;
      outline: none;
    }
  }
  .pSale {
    display: none;
  }
  .card {
    height: 350px;
  }
  .rwdFont {
  font-size: 16px;
}
.rwdImg{
  height: 200px;
}
}
</style>
