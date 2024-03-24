<template>
  <div class="container mt-8 p-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page" v-if="order.is_paid === true">
          訂單完成!感謝您的購買!
        </li>
        <li class="breadcrumb-item active" aria-current="page" v-else>待付款訂單</li>
      </ol>
    </nav>
  </div>
  <div class="container mt-5">
    <form  @submit.prevent="payOrder">
    <div class="row">
      <table class="table align-middle border-bottom border-lightBrown m-0">
        <thead>
          <tr>
            <th width="2%"></th>
            <th width="30%">訂單商品</th>
            <th width="8%"></th>
            <th width="20%">單價</th>
            <th width="20%">數量</th>
            <th width="20%">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td></td>
            <td>
              <img
                :src="item.product.imageUrl"
                style="width: 80px; height: 80px"
                alt=""
              />
              {{ item.product.title }}
            </td>
            <td></td>
            <td>${{ item.product.price }}</td>
            <td>{{ item.qty }}</td>
            <td>${{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div class="form-check"></div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-lightBrown">
              <!-- 折扣:$100 -->
            </td>
            <td>訂單金額({{ order.products?.length }}商品):<span class="text-brown fs-5">${{ order.total }}</span></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      class="row justify-content-center bg-white px-8 py-6"
    >
      <div class="col-md-6">
        <div class="mb-3">送貨地址:{{ order.user.address }}</div>
        <div class="mb-3">Email:{{ order.user.email }}</div>
        <div class="mb-3">顧客姓名:{{ order.user.name }}</div>
        <div class="mb-3">電話:{{ order.user.tel }}</div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">留言</div>
        <div
          class="border border-1 rounded p-2 mb-3 w-100"
          style="height: 100px"
        >
          {{ order.message }}
        </div>
      </div>
      <div class="text-end">付款狀態
              <span class="text-danger" v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </div>
    </div>
    <div class="p-3 bg-white row  border-top border-1 border-lightBrown" v-if="order.is_paid === false">
      <div class="text-end">
        <button type="submit" class="btn p-0 border-0">
          <div
            class="d-flex justify-content-center align-items-center p-0"
            style="
              width: 185px;
              height: 40px;
              background: #ffffff;
              border: 1px solid #e9b888;
            "
          >
        <button type="submit" class="loginbtn text-center bg-lightBrown border-0">確認付款去</button>
          </div>
        </button>
      </div>
    </div>
  </form>
  </div>
  <div class="container mt-8 p-0">
    <h3 class="text-center text-brown">
      猜你喜歡
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
                  ></span
                  ><i class="bi bi-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
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
import { useRoute, useRouter } from 'vue-router'
import { useToastMessageStore } from '../../stores/toastMessage'
import ToastMessages from '../../components/ToastMessages.vue'
// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

import 'swiper/css/navigation'

// import required modules
import { Pagination, Navigation } from 'swiper/modules'
export default {
  setup () {
    const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
    const router = useRouter()
    const route = useRoute()
    const store = useCartStore()
    const toastMessageStore = useToastMessageStore()
    const { pushMessage } = toastMessageStore
    const { getCart } = store
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
      axios.get(url).then((response) => {
        order.value = response.data.order
      }).catch((error) => {
        pushMessage({
          style: 'danger',
          title: '錯誤訊息',
          content: error.response.data.message
        })
      })
    }

    const payOrder = () => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/pay/${orderId.value}`
      axios.post(url).then(() => {
        getOrder()
      }).catch((error) => {
        pushMessage({
          style: 'danger',
          title: '錯誤訊息',
          content: error.response.data.message
        })
      })
      window.scrollTo(0, 0)
    }

    getOrder()
    onMounted(() => {
      getData()
    })
    return {
      modules: [Pagination, Navigation],
      products,
      openModal,
      addToCart,
      getOrder,
      getCart,
      id,
      status,
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
</style>
