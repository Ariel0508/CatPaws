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
    <div class="row p-0 bg-black mt-5">
      <div class="col-md-5 col-12 p-0">
        <img
          src="../../../public/images/1.png"
          class="img-fluid w-100 object-fit-cover"
          style="height: 550px"
          alt="banner"
        />
      </div>
      <div
        class="col-md-7 col-12 text-center p-0 d-flex flex-column align-items-center justify-content-center"
      >
        <div class="m-4">
          <p class="text-light mt-3" style="font-size: 1.5em">
            讓您的貓咪成為時尚界的新寵兒!
          </p>
          <button
            type="button"
            class="btn btn-outline-light m-3 px-5 btn-lg rounded-0"
            @click="goToShop"
          >
            立即選購
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-8">
    <h3 class="text-center text-brown">
      新品上市
      <div class="text-center text-brown m-0 p-0 fs-1">-</div>
    </h3>
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>
        <div class="row pc mb-5">
          <div
            class="col-md-6 p-0 bg-white d-flex justify-content-start text-start"
            v-if="lastProduct"
            style="width: 550px"
          >
            <div class="ms-5 my-6 d-flex flex-column justify-content-between">
              <p class="card-title fs-5 my-3">
                {{ lastProduct.title }}
              </p>
              <span class="card-title text-brown fs-5"
                >${{ $filters.numberToCurrencyNo(lastProduct.price) }}</span
              >
              <p class="fs-6 my-5" style="width: 300px">
                {{ lastProduct.content }}
              </p>
              <p
                class="mb-3 fs-6 cursor-pointer text-decoration-underline"
                @click="openModal(lastProduct)"
              >
                立即選購 >>
              </p>
            </div>
          </div>
          <div class="col-md-6 p-0 position-relative cursor-pointer">
            <img
              :src="lastProduct?.imagesUrl[0]"
              class="img-fluid object-fit-cover w-100"
              style="height: 550px"
              alt="picture"
              @click="openModal(lastProduct)"
            />
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="row pc">
          <div
            class="col-md-6 p-0 bg-white d-flex justify-content-start text-start"
            v-if="secondLastProduct"
            style="width: 550px"
          >
            <div class="ms-5 my-6 d-flex flex-column justify-content-between">
              <p class="card-title fs-5 my-3">
                {{ secondLastProduct.title }}
              </p>
              <span class="card-title text-brown fs-5"
                >${{
                  $filters.numberToCurrencyNo(secondLastProduct.price)
                }}</span
              >
              <p class="fs-6 my-5" style="width: 300px">
                {{ secondLastProduct.content }}
              </p>
              <p
                class="mb-3 fs-6 cursor-pointer text-decoration-underline"
                @click="openModal(secondLastProduct)"
              >
                立即選購 >>
              </p>
            </div>
          </div>
          <div class="col-md-6 p-0 position-relative cursor-pointer">
            <img
              :src="secondLastProduct?.imagesUrl[0]"
              class="img-fluid object-fit-cover w-100"
              style="height: 550px"
              alt="picture"
              @click="openModal(secondLastProduct)"
            />
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="mobile">
      <div id="swiper">
        <swiper
          :slidesPerView="1"
          :spaceBetween="10"
          :pagination="{
            clickable: true,
          }"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
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
          <swiper-slide>
            <div
              class="cursor-pointer mb-5"
              v-if="lastProduct"
              @click="openModal(lastProduct)"
            >
              <img
                :src="lastProduct?.imagesUrl[0]"
                class="img-fluid object-fit-cover w-100"
                style="height: 300px"
                alt="picture"
              />
              <p class="my-3">
                {{ lastProduct.title }}
              </p>
              <span class="text-brown fs-5"
                >${{ $filters.numberToCurrencyNo(lastProduct.price) }}</span
              >
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              class="cursor-pointer mb-5"
              v-if="secondLastProduct"
              @click="openModal(secondLastProduct)"
            >
              <img
                :src="secondLastProduct?.imagesUrl[0]"
                class="img-fluid object-fit-cover w-100"
                style="height: 300px"
                alt="picture"
              />
              <p class="my-3">
                {{ secondLastProduct.title }}
              </p>
              <span class="text-brown fs-5"
                >${{
                  $filters.numberToCurrencyNo(secondLastProduct.price)
                }}</span
              >
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <div class="container mt-8">
    <h3 class="text-center text-brown">
      產品分類
      <div class="text-center text-brown m-0 p-0 fs-1">-</div>
    </h3>
    <div class="row">
      <div class="col-md-4 col-12 mb-3 position-relative category">
        <RouterLink
          class="text-decoration-none"
          to="/products?category=生活用品"
          onclick="window.scrollTo(0, 0);"
        >
          <img
            src="../../../public/images/6.png"
            class="img-fluid w-100 object-fit-cover rounded-3"
            style="height: 400px"
            alt="productPicture"
          />
          <p
            class="fs-5 position-absolute top-50 start-50 translate-middle text-decoration-underline text-white"
          >
            生活用品
          </p>
        </RouterLink>
      </div>
      <div class="col-md-4 col-12 mb-3 position-relative category">
        <RouterLink
          class="text-decoration-none"
          to="/products?category=時尚配件"
          onclick="window.scrollTo(0, 0);"
        >
          <img
            src="../../../public/images/2.png"
            class="img-fluid w-100 object-fit-cover rounded-3"
            style="height: 400px"
            alt="productPicture"
          />
          <p
            class="fs-5 position-absolute top-50 start-50 translate-middle text-decoration-underline text-white"
          >
            時尚配件
          </p>
        </RouterLink>
      </div>
      <div class="col-md-4 col-12 mb-3 position-relative category">
        <RouterLink
          class="text-decoration-none"
          to="/products?category=休閒娛樂"
          onclick="window.scrollTo(0, 0);"
        >
          <img
            src="../../../public/images/3.png"
            class="img-fluid w-100 object-fit-cover rounded-3"
            style="height: 400px"
            alt="productPicture"
          />
          <p
            class="fs-5 position-absolute top-50 start-50 translate-middle text-decoration-underline text-white"
          >
            休閒娛樂
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="container mt-8">
    <h3 class="text-center text-brown">
      精選商品
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
            class="card shadow-sm border-0 position-relative mb-5"
            @click="openModal(product)"
          >
            <span
              class="position-absolute top-0 start-0 fw-bold text-white p-2 bg-brown fs-6 fw-bold"
              v-if="product.price !== product.origin_price"
              >SALE</span
            >
            <img
              :src="product.imageUrl"
              class="img-fluid object-fit-cover w-100"
              style="height: 300px"
              alt="productPicture"
            />
            <div
              class="card-body d-flex flex-column justify-content-between p-3"
            >
              <div class="card-title">{{ product.title }}</div>
              <div
                v-if="product.price === product.origin_price"
                class="text-gray2 fs-5 mt-2"
              >
                ${{ $filters.numberToCurrencyNo(product.origin_price) }}
              </div>
              <div
                v-else
                class="d-flex align-items-center justify-content-center ms-2 mt-2"
              >
                <del class="text-gray2 fs-5"
                  >${{ $filters.numberToCurrencyNo(product.origin_price) }}</del
                >
                <div class="text-brown fs-5 ms-3">
                  ${{ $filters.numberToCurrencyNo(product.price) }}
                </div>
              </div>
              <div class="mt-2">
                <button
                  type="button"
                  class="btn btn-outline-brown m-2 px-5 rounded-pill"
                  @click.stop="addToCart(product.id, 1)"
                >
                  <span
                    v-if="product.id === status.loadingItem"
                    class="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  加入購物車
                  <i class="bi bi-cart-plus fs-5"></i>
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <ToastMessages />
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '../../stores/cartStore'
import { useRouter, useRoute } from 'vue-router'
import { useToastMessageStore } from '../../stores/toastMessage'
import ToastMessages from '../../components/ToastMessages.vue'
// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

import 'swiper/css/navigation'

import {
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  Keyboard
} from 'swiper/modules'

export default {
  setup () {
    const goToShop = () => {
      router.push('/products')
      window.scrollTo(0, 0)
    }
    const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
    const router = useRouter()
    const route = useRoute()
    const store = useCartStore()
    const { getCart } = store
    const products = ref([])
    const id = ref(route.params.productId)
    const status = ref({
      loadingItem: ''
    })
    const isLoading = ref(false)
    const toastMessageStore = useToastMessageStore()
    const { pushMessage } = toastMessageStore
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
    const getData = (page = 2) => {
      isLoading.value = true
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products?page=${page}`)
        .then((res) => {
          products.value = res.data.products
          isLoading.value = false
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
        })
    }
    const openModal = (product) => {
      router.push(`/product/${product.id}`).then(() => {
        window.scrollTo(0, 0)
      })
    }
    const showPagination = ref(true)

    const handleCategoryClick = (category) => {
      if (category === '') {
        showPagination.value = true
      } else {
        showPagination.value = false
      }
    }
    const lastProduct = ref(null)
    const fetchLastProduct = () => {
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          if (res.data.success && res.data.products.length > 0) {
            lastProduct.value = res.data.products[res.data.products.length - 1]
          }
        })
        .catch(() => {
          lastProduct.value = null
        })
    }
    const secondLastProduct = ref(null)
    const fetchsecondLastProduct = () => {
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          if (res.data.success && res.data.products.length > 0) {
            secondLastProduct.value =
              res.data.products[res.data.products.length - 2]
          }
        })
        .catch(() => {
          secondLastProduct.value = null
        })
    }
    onMounted(() => {
      getData()
      fetchLastProduct()
      fetchsecondLastProduct()
    })
    return {
      modules: [Navigation, Pagination, Autoplay, Mousewheel, Keyboard],
      goToShop,
      products,
      openModal,
      addToCart,
      handleCategoryClick,
      id,
      status,
      isLoading,
      lastProduct,
      secondLastProduct
    }
  },
  components: {
    Swiper,
    SwiperSlide,
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
.newsimg {
  width: 500px;
  height: 400px;
  cursor: pointer;
}
.cursor-pointer {
  cursor: pointer;
}
.category {
  opacity: 0.5;
}
.category:hover {
  opacity: 1;
  transition: ease-in-out 0.3s;
}
.mobile {
  display: none;
}
@media screen and (max-width: 767px) {
  .mySwiper {
    width: 100%;
  }
}
@media screen and (max-width: 1280px) {
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>
