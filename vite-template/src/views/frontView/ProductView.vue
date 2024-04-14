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
    <div class="container mt-7">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" to="/">
            <RouterLink class="text-black text-decoration-none" to="/"
              >首頁</RouterLink
            >
          </li>
          <li class="breadcrumb-item">
            <RouterLink class="text-black text-decoration-none" to="/products"
              >產品</RouterLink
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.category }}
          </li>
        </ol>
      </nav>
      <div class="container bg-vanilla pt-2 pb-5">
        <div class="row mt-5">
          <div class="col-md-6 d-flex justify-content-center p-0">
            <ImageComponent
              :imageList="imagesUrl"
              class="mb-8"
            ></ImageComponent>
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-between p-0">
              <div class="fs-4 mb-4 px-2">{{ product.title }}</div>
              <div class="mb-4 px-2">
                <div
                  v-if="product.price === product.origin_price"
                  class="text-gray2 fs-5"
                >
                  ${{ $filters.numberToCurrencyNo(product.origin_price) }}
                </div>
                <div
                  v-else
                  class="d-flex align-items-center justify-content-start"
                >
                  <del class="text-gray2 fs-5 me-2"
                    >${{ $filters.numberToCurrencyNo(product.origin_price) }}</del
                  >
                  <div class="text-brown fs-4">
                    ${{ $filters.numberToCurrencyNo(product.price) }}
                  </div>
                </div>
            </div>
            <div class="mb-5 px-2">
              <div class="fs-6 mb-2">商品內容:</div>
              <div style="white-space: pre-wrap">
                {{ product.content }}
              </div>
            </div>
            <div class="input-group mb-4  px-2 rwdQty">
              <button
                type="button"
                class="btn btn-outline-lightBrown"
                :disabled="qty === 1"
                @click="qty--"
              >
                -
              </button>
              <input
                v-model.number="qty"
                type="number"
                min="1"
                max="20"
                class="form-control text-center"
                aria-label="Dollar amount (with dot and two decimal places)"
                readonly
              />
              <button
                type="button"
                class="btn btn-outline-lightBrown"
                @click="qty++"
              >
                +
              </button>
            </div>
            <div class="d-flex justify-content-between mb-3 rwdQty">
              <div class="d-flex justify-content-center text-brown">
                <div
                  class="d-flex align-items-center justify-content-center btnHover"
                  style="
                    width: 150px;
                    height: 40px;
                    background: #ffffff;
                    border: 1px solid #e8b887;
                  "
                >
                  <div
                    class="text-center bg-lightBrown text-white m-1"
                    style="width: 140px; height: 30px; line-height: 30px"
                    @click="addToCart(product.id)"
                  >
                    <span
                      v-if="product.id === status.loadingItem"
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    >
                    </span>
                    加入購物車
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center text-brown">
                <div
                  class="d-flex align-items-center justify-content-center"
                  style="
                    width: 150px;
                    height: 40px;
                    background: #ffffff;
                    border: 1px solid #a2672d;
                  "
                >
                  <RouterLink
                    to="/cart"
                    class="text-center bg-brown text-decoration-none text-white m-1"
                    style="width: 140px; height: 30px; line-height: 30px"
                    @click="addToCart(product.id)"
                    >立即購買
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-7 col-12 col-md-8 margin-auto">
          <div class="fs-6 mb-4">商品詳情:</div>
          <div style="white-space: pre-wrap">
            {{ product.description }}
          </div>

          <div class="mt-5" v-for="image in imagesUrl" :key="image">
            <li class="list-unstyled mb-3">
              <img :src="image" class="w-100" alt="" />
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-8">
    <h3 class="text-center text-brown">
      猜你喜歡
      <div class="text-center text-brown m-0 p-0 fs-1">-</div>
    </h3>
    <div id="swiper">
      <swiper
        :slidesPerView="1"
        :spaceBetween="10"
        :pagination="{
          clickable: true,
        }"
        :breakpoints="{
          '640': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '1024': {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }"
        :grabCursor="true"
        :freeMode="true"
        :modules="modules"
        class="mySwiper"
        :mousewheel="true"
        :keyboard="true"
      >
        <swiper-slide v-for="product in products" :key="product.id">
          <div
            style="height: 450px"
            class="card shadow-sm rounded-lg border-0 position-relative mb-5"
            @click="openModal(product)"
          >
            <span
              class="position-absolute top-0 start-0 fw-bold text-white p-2 fs-6 bg-brown"
              v-if="product.price !== product.origin_price"
              >SALE</span
            >
            <img
              :src="product.imageUrl"
              class="card-img-top object-fit-cover w-100"
              style="height: 300px"
              alt="productPicture"
            />
            <div class="card-body">
              <p class="card-title">{{ product.title }}</p>
              <div
                v-if="product.price === product.origin_price"
                class="text-gray2 fs-5 card-title text-center"
              >
                ${{ $filters.numberToCurrencyNo(product.origin_price) }}
              </div>
              <div
                v-else
                class="d-flex justify-content-center align-items-center card-title ms-2"
              >
                <del class="text-gray2 fs-5"
                  >${{ $filters.numberToCurrencyNo(product.origin_price) }}</del
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
                >
                </span>
                <i class="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <ToastMessages />
</template>

<script>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'
import { useToastMessageStore } from '../../stores/toastMessage'
import ImageComponent from '../../components/ImageComponentView.vue'
import ToastMessages from '../../components/ToastMessages.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

import { Pagination, Mousewheel, Keyboard } from 'swiper/modules'
export default {
  setup () {
    const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
    const router = useRouter()
    const route = useRoute()
    const store = useCartStore()
    const { getCart } = store
    const toastMessageStore = useToastMessageStore()
    const { pushMessage } = toastMessageStore
    const id = ref(route.params.productId)
    const products = ref([])
    const status = ref({
      loadingItem: ''
    })
    const isLoading = ref(false)
    const product = ref({})
    const imagesUrl = ref([])
    const qty = ref(1)
    const gProduct = ref(route.params)
    const getProduct = () => {
      isLoading.value = true
      axios
        .get(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${gProduct.value.id}`
        )
        .then((res) => {
          product.value = res.data.product
          imagesUrl.value = res.data.product.imagesUrl
          isLoading.value = false
        })
    }
    const getData = () => {
      isLoading.value = true
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products`)
        .then((res) => {
          products.value = res.data.products
          isLoading.value = false
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
          isLoading.value = false
        })
    }
    const openModal = (product) => {
      gProduct.value = product
      router.push(`/product/${product.id}`).then(() => {
        window.scrollTo(0, 0)
      })
      getProduct()
    }
    const categories = ref(['時尚配件', '休閒娛樂', '生活用品'])
    const getProducts = () => {
      const { category = '' } = route.query
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}`
      isLoading.value = true
      axios.get(url).then((res) => {
        product.value = res.data.products
        isLoading.value = false
      })
    }
    const addToCart = (id) => {
      status.value.loadingItem = id
      const order = {
        product_id: id,
        qty: qty.value
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
        window.scrollTo(0, 0)
      })
    }
    watch(
      () => route.query,
      () => {
        getCart()
      }
    )
    onMounted(() => {
      getProduct()
      getCart()
      getData()
    })

    return {
      modules: [Pagination, Mousewheel, Keyboard],
      products,
      openModal,
      addToCart,
      product,
      imagesUrl,
      qty,
      categories,
      getProducts,
      gProduct,
      id,
      status,
      isLoading
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ImageComponent,
    ToastMessages
  }
}
</script>

<style>
#swiper {
  height: 100%;
}

html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #fff8f1;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff8f1;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 0px;
}

.swiper-pagination-bullet-active {
  background: #a2672d;
}

.swiper-button-next,
.swiper-button-prev {
  color: #a2672d;
}

.card:hover {
  cursor: pointer;
  background: #f4f0e3;
}
.btnHover {
  cursor: pointer;
}
.rwdQty {
  width: 80%;
}
.margin-auto {
  margin-inline: auto;
}
@media screen and (max-width: 767px) {
  .rwdQty {
    width: 100%;
  }
}
</style>
