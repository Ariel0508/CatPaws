<template>
  <div id="app">
  <div class="container-fluid bg-black">
    <div class="row">
      <div class="col-md-6 p-0">
        <img
          src="../../../public/images/1.png"
          class="img-fluid"
          style="height: 600px"
          alt="banner"
        />
      </div>
      <div class="col-md-6 text-center align-self-center p-0">
        <p class="text-light" style="font-size: 1.5em">
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
  <div class="container mt-8 p-0">
    <h3 class="text-center text-brown">
      精選商品
      <div class="text-center text-brown m-0 p-0 fs-1">-</div>
    </h3>
    <div id="swiper">
      <swiper
        :slidesPerView="4"
        :grabCursor="true"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
        :navigation="true"
        :mousewheel="true"
        :keyboard="true"
      >
        <swiper-slide v-for="product in products" :key="product.id">
          <div class="col-md-9">
            <div
              class="card shadow-sm bg-body rounded-lg border-0 position-relative mb-5"
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
  <div class="container bg-white mt-8">
    <div class="row">
      <div class="col-md-6 p-0 position-relative" v-if="lastProduct">
        <div
          class="position-absolute top-50 start-50 translate-middle w-100 h-50 text-center"
        >
          <img
            :src="lastProduct?.imagesUrl[1]"
            class="img-fluid object-fit-cover newsimg"
            alt="picture"
            @click="openModal(lastProduct)"
          />
          <p class="card-title mt-2">{{ lastProduct.title }}</p>
          <p class="card-title text-brown">${{ lastProduct.price }}</p>
        </div>
      </div>
      <div class="col-md-6 p-0 position-relative">
        <img
          :src="lastProduct?.imagesUrl[0]"
          class="img-fluid object-fit-cover w-100"
          style="height: 700px"
          alt="picture"
        />
        <p
          class="position-absolute top-50 start-50 translate-middle text-decoration-underline text-white fs-4"
        >
          新品上市
        </p>
      </div>
    </div>
    <div class="row flex-row-reverse">
      <div class="col-md-6 p-0 position-relative" v-if="secondLastProduct">
        <div
          class="position-absolute top-50 start-50 translate-middle w-100 h-50 text-center"
        >
          <img
            :src="secondLastProduct?.imagesUrl[1]"
            class="img-fluid object-fit-cover newsimg"
            alt="picture"
            @click="openModal(secondLastProduct)"
          />
          <p class="card-title mt-2">{{ secondLastProduct.title }}</p>
          <p class="card-title text-brown">${{ secondLastProduct.price }}</p>
        </div>
      </div>
      <div class="col-md-6 p-0 position-relative">
        <img
          :src="secondLastProduct?.imagesUrl[0]"
          class="img-fluid object-fit-cover w-100"
          style="height: 700px"
          alt="picture"
        />
        <p
          class="position-absolute top-50 start-50 translate-middle text-decoration-underline text-white fs-4"
        >
          新品上市
        </p>
      </div>
    </div>
  </div>
  <div class="container mt-8">
    <div class="row flex-nowrap">
      <div class="col-md-4 p-0 me-1 position-relative">
        <RouterLink
          class="text-decoration-none"
          to="/products?category=生活用品"
          onclick="window.scrollTo(0, 0);"
        >
          <img
            src="../../../public/images/6.png"
            class="img-fluid w-80 opacity-50"
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
      <div class="col-md-4 p-0 me-1 position-relative">
        <RouterLink
          class="text-decoration-none"
          to="/products?category=時尚配件"
          onclick="window.scrollTo(0, 0);"
        >
          <img
            src="../../../public/images/2.png"
            class="img-fluid w-80 opacity-50"
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
      <div class="col-md-4 p-0 me-1 position-relative">
        <RouterLink
          class="text-decoration-none"
          to="/products?category=休閒娛樂"
          onclick="window.scrollTo(0, 0);"
        >
          <img
            src="../../../public/images/3.png"
            class="img-fluid w-80 opacity-50"
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
</div>
<ToastMessages></ToastMessages>
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

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

export default {
  setup () {
    const goToShop = () => {
      router.push('/products')
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
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products?page=${page}`)
        .then((res) => {
          products.value = res.data.products
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
      console.log(category)
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
        .catch((err) => {
          console.error(err.response.data.message)
          lastProduct.value = null
        })
    }
    const secondLastProduct = ref(null)
    const fetchsecondLastProduct = () => {
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          if (res.data.success && res.data.products.length > 0) {
            secondLastProduct.value = res.data.products[res.data.products.length - 2]
          }
        })
        .catch((err) => {
          console.error(err.response.data.message)
          secondLastProduct.value = null
        })
    }
    onMounted(() => {
      getData()
      fetchLastProduct()
      fetchsecondLastProduct()
    })
    return {
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
      goToShop,
      products,
      openModal,
      addToCart,
      handleCategoryClick,
      id,
      status,
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
.newsimg {
  width: 500px;
  height: 400px;
  cursor: pointer;
}
</style>
