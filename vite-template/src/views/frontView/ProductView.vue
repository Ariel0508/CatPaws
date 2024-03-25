<template>
  <div id="app">
    <div class="container mt-8">
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
      <div class="row mt-5">
        <div class="col-md-2"></div>
        <div class="col-md-10">
          <div class="row ">
            <div class="col-md-6 col-12">
              <div class="row">
                <ImageComponent :imageList="imagesUrl" class="mb-8"></ImageComponent>
              </div>
            </div>
            <div
              class="col-md-6 col-12 d-flex flex-column justify-content-between"
            >
              <div class="fs-4 mb-4">{{ product.title }}</div>
              <div class="mb-4">
                <div
                  v-if="product.price === product.origin_price"
                  class="text-gray2 fs-5"
                >
                  ${{ product.origin_price }}
                </div>
                <div v-else class="d-flex align-items-center">
                  <del class="text-gray2 fs-5">${{ product.origin_price }}</del>
                  <div class="text-brown fs-4 ms-3">${{ product.price }}</div>
                </div>
              </div>
              <div class="mb-5">
                <div class="fs-6 mb-2">商品內容:</div>
                <div>
                  {{ product.content }}
                </div>
              </div>

              <div class="input-group w-50 mb-4">
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

              <div class="row">
                <div
                  class="d-flex justify-content-center align-items-center mx-2 p-0 mt-3"
                  style="
                    width: 185px;
                    height: 40px;
                    background: #ffffff;
                    border: 1px solid #e9b888;
                  "
                >
                  <button
                    type="button"
                    class="loginbtn text-center bg-lightBrown border-0"
                    @click="addToCart(product.id)"
                  >
                  <span
                        v-if="product.id === status.loadingItem"
                        class="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      >
                    </span>
                    加入購物車
                  </button>
                </div>
                <div
                  class="d-flex justify-content-center align-items-center mx-2 p-0 mt-3"
                  style="
                    width: 185px;
                    height: 40px;
                    background: #ffffff;
                    border: 1px solid #e9b888;
                  "
                >
                  <RouterLink
                    class="loginbtn text-center bg-brown d-block"
                    to="/cart"
                    @click="addToCart(product.id)"
                    >立即購買</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-8">
            <div class="fs-6 mb-4">商品詳情:</div>
            <div style="white-space: pre-wrap">
              {{ product.description }}
            </div>
          </div>
          <div class="row mt-5" v-for="image in imagesUrl" :key="image">
            <li class="list-unstyled mb-3">
              <img :src="image" class="w-50" alt="" />
            </li>
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
            :slidesPerView="slidesPerView"
            :grabCursor="true"
            :spaceBetween="30"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
            :mousewheel="true"
            :keyboard="true"
          >
            <swiper-slide v-for="product in products" :key="product.id">
              <div class="row">
                <div
                  class="card shadow-sm bg-body rounded-lg border-0 position-relative mb-5 col-md-12 col-12 p-0"
                  @click="openModal(product)"
                >
                  <span
                    class="position-absolute top-0 start-0 fw-bold text-white p-2 bg-brown rounded-top"
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
                    <p class="card-title text-brown">$ {{ product.price }}</p>
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
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
  <ToastMessages></ToastMessages>
</template>

<script>
import axios from 'axios'
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
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

import 'swiper/css/navigation'

import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules'
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
    const getData = () => {
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products`)
        .then((res) => {
          products.value = res.data.products
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
        })
    }
    const openModal = (product) => {
      gProduct.value = product
      getProduct()
      router.push(`/product/${product.id}`).then(() => {
        window.scrollTo(0, 0)
      })
    }
    const product = ref({})
    // const status = ref({
    //   loadingItem: ''
    // })
    // const cart = ref({})
    const imagesUrl = ref([])
    const qty = ref(1)
    const gProduct = ref(route.params)
    const getProduct = () => {
      axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${gProduct.value.id}`).then((res) => {
        product.value = res.data.product
        imagesUrl.value = res.data.product.imagesUrl
        console.log(res.data.product.imagesUrl)
        console.log(res.data.product)
        // console.log(res.data.product);
      })
    }
    const categories = ref(['時尚配件', '休閒娛樂', '生活用品'])
    const getProducts = () => {
      const { category = '' } = route.query
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}`
      axios.get(url).then((res) => {
        product.value = res.data.products
        // console.log(res.data.products);
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
      })
    }
    getProduct()
    const slidesPerView = ref(4)
    const setSlidesPerView = () => {
      if (window.innerWidth <= 767) {
        slidesPerView.value = 2
      } else {
        slidesPerView.value = 4
      }
    }
    watch(
      () => route.query,
      () => {
        getProducts()
        getProduct()
        getCart()
      }
    )
    onMounted(() => {
      getProduct()
      getCart()
      getProducts()
      getData()
      setSlidesPerView()
      window.addEventListener('resize', setSlidesPerView)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', setSlidesPerView)
    })

    return {
      modules: [Pagination, Navigation, Mousewheel, Keyboard],
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
      slidesPerView
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
.loginbtn {
  width: 175px;
  height: 30px;
  color: #ffffff;
  font-size: 20px;
  letter-spacing: 4.8px;
  user-select: none;
  margin: 5px;
  text-decoration: none;
}

#swiper {
  height: 450px;
}
html,
body {
  position: relative;
  height: 100%;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  display: flex;
  justify-content: space-around;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: vanilla;
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
}
</style>
