<template>
  <div>
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
          <li
            class="breadcrumb-item active"
            aria-current="page"
            v-if="order.is_paid === true"
          >
            訂單完成!感謝您的購買!
          </li>
          <li class="breadcrumb-item active" aria-current="page" v-else>
            待付款訂單
          </li>
        </ol>
      </nav>
    </div>
    <div class="container mt-5">
      <div class="row">
        <table class="table pc align-middle border-bottom border-lightBrown">
          <thead>
            <tr class="text-center">
              <th width="200">商品名稱</th>
              <th width="120">單價</th>
              <th width="200" class="text-center">數量</th>
              <th width="200">小計</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="item in order.products" :key="item.id">
              <td>
                <div>
                  <img
                    :src="item.product.imageUrl"
                    class="img-fluid object-fit-cover"
                    style="width: 80px; height: 80px"
                    alt=""
                  />
                  <div>{{ item.product.title }}</div>
                </div>
              </td>
              <td>${{ $filters.numberToCurrencyNo(item.product.price) }}</td>
              <td>{{ item.qty }}</td>
              <td>${{ $filters.numberToCurrencyNo(item.total) }}</td>
            </tr>
          </tbody>
          <tfoot class="border-bottom border-white">
            <tr>
              <td colspan="4" class="text-end pe-8">
                <div class="text-brown fs-5 text-end mt-3">
                  訂單金額：${{
                    $filters.numberToCurrencyNo(Math.floor(order.total))
                  }}元
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="mobile">
          <div
            class="border-top border-lightBrown p-3 bg-white"
            v-for="item in order.products"
            :key="item.id"
          >
            <div class="row">
              <div class="col-4 p-0">
                <img
                  :src="item.product.imageUrl"
                  class="img-fluid object-fit-cover"
                  style="width: 80px; height: 80px"
                  alt=""
                />
              </div>
              <div class="col-8 p-0">
                <div>{{ item.product.title }}</div>
                <div class="mt-3 d-flex justify-content-between">
                  <div>${{ $filters.numberToCurrencyNo(item.total) }}</div>
                  <div class="col-3 text-center">x {{ item.qty }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top border-lightBrown p-4 bg-white">
            <div class="text-brown fs-5 text-end">
              訂單金額：${{
                $filters.numberToCurrencyNo(Math.floor(order.total))
              }}元
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="payOrder">
        <div class="row px-2 py-5 fs-6">
          <div class="mb-5"> 付款狀態
            <span class="text-danger fw-bold" v-if="!order.is_paid">尚未付款</span>
            <span v-else class="text-success fw-bold">付款完成</span></div>
          <div class="col-md-6 col-12">
            <div class="mb-3">送貨地址：{{ order.user.address }}</div>
            <div class="mb-3">Email：{{ order.user.email }}</div>
            <div class="mb-3">顧客姓名：{{ order.user.name }}</div>
            <div class="mb-4">電話：{{ order.user.tel }}</div>
             <div class="mb-3 text-gray2">
              下單時間：{{ $filters.date(order.create_at) }}
          </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="mb-3">留言</div>
            <div
              class="border border-1 rounded p-2 w-100 bg-white"
              style="height: 150px;"
            >
              {{ order.message }}
            </div>
          </div>
        </div>
        <div class="text-end" v-if="order.is_paid === false">
          <div>
            <button type="submit" class="btn p-0 border-0">
              <div class="d-flex justify-content-center text-brown">
                <div
                  class="d-flex align-items-center justify-content-center"
                  style="
                    width: 185px;
                    height: 40px;
                    background: #ffffff;
                    border: 1px solid #a2672d;
                  "
                >
                  <a
                    class="text-center bg-brown text-decoration-none text-white m-1 d-block"
                    style="width: 175px; height: 30px; line-height: 30px"
                    >確認付款
                  </a>
                </div>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="container mt-8 p-0" v-if="order.is_paid === true">
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
                  class="position-absolute top-0 start-0 fw-bold fs-6 text-white p-2 bg-brown"
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
                    class="d-flex align-items-center justify-content-center card-title ms-2"
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
                    ></span
                    ><i class="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <ToastMessages />
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '../../stores/cartStore'
import { useRoute, useRouter } from 'vue-router'
import { useToastMessageStore } from '../../stores/toastMessage'
import ToastMessages from '../../components/ToastMessages.vue'
// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination, Mousewheel, Keyboard } from 'swiper/modules'
export default {
  setup () {
    const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
    const router = useRouter()
    const route = useRoute()
    const store = useCartStore()
    const toastMessageStore = useToastMessageStore()
    const { pushMessage } = toastMessageStore
    const { getCart } = store
    const carts = ref({})
    const id = ref(route.params.productId)
    const products = ref([])
    const status = ref({
      loadingItem: ''
    })
    const isLoading = ref(false)
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
      router.push(`/product/${product.id}`).then(() => {
        window.scrollTo(0, 0)
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
    const orderId = ref(route.params.orderId)
    const order = ref({
      user: {}
    })

    const getOrder = () => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/order/${orderId.value}`
      isLoading.value = true
      axios
        .get(url)
        .then((response) => {
          order.value = response.data.order
          isLoading.value = false
        })
        .catch((error) => {
          pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: error.response.data.message
          })
          isLoading.value = false
        })
    }

    const payOrder = () => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/pay/${orderId.value}`
      isLoading.value = true
      axios
        .post(url)
        .then(() => {
          getOrder()
          isLoading.value = false
          pushMessage({
            style: 'success',
            title: '付款成功',
            content: '感謝您的支持'
          })
        })
        .catch((error) => {
          pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: error.response.data.message
          })
          isLoading.value = false
        })
      window.scrollTo(0, 0)
    }
    getOrder()
    onMounted(() => {
      getData()
      getCart()
    })

    return {
      modules: [Pagination, Mousewheel, Keyboard],
      products,
      carts,
      openModal,
      addToCart,
      getOrder,
      getCart,
      id,
      status,
      isLoading,
      order,
      orderId,
      payOrder
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
@media screen and (max-width: 767px) {
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }
}
@media screen and (min-width: 768px) {
  .mobile {
    display: none;
  }
}
#swiper {
  height: 550px;
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
</style>
