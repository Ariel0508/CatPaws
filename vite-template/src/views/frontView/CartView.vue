<!-- eslint-disable no-unused-vars -->
<template>
  <div class="container mt-8 p-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">購物車</li>
      </ol>
    </nav>
  </div>
  <div class="container mt-5">
    <div class="row">
      <table
        v-if="carts.total !== 0"
        class="table align-middle border-lightBrown"
      >
        <thead>
          <tr>
            <th width="5%"></th>
            <th width="35%">商品名稱</th>
            <th width="20%">單價</th>
            <th width="30%">數量</th>
            <th width="20%">小計</th>
            <th width="20%">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td></td>
            <td>
              <img
                :src="cart.product.imageUrl"
                class="img-fluid object-fit-cover"
                style="width: 80px; height: 80px"
                alt=""
              />
              <RouterLink
                class="text-decoration-none ps-3 text-black"
                :to="`/product/${cart.product.id}`"
              >
                {{ cart.product.title }}</RouterLink
              >
            </td>
            <td>${{ cart.product.price }}</td>
            <td>
              <div class="input-group w-100">
                <button
                  v-if="cart.qty > 1"
                  type="button"
                  class="btn btn-outline-lightBrown"
                  :disabled="cart.qty === 1"
                  @click="
                    cart.qty--;
                    changeCartQty(cart, cart.qty);
                  "
                >
                  <span style="height: 16px; width: 16px">-</span>
                </button>
                <button
                  v-else
                  type="button"
                  class="btn btn-outline-brown border-lightBrown"
                  @click="removeCartItem(cart.id)"
                >
                  <span style="height: 16px; width: 16px"
                    ><i class="bi bi-trash"></i
                  ></span>
                </button>
                <input
                  v-model="cart.qty"
                  type="number"
                  min="1"
                  max="20"
                  class="form-control text-center"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  readonly
                  :disabled="cart.productId === status.loadingItem"
                />
                <button
                  type="button"
                  class="btn btn-outline-lightBrown"
                  @click="
                    cart.qty++;
                    changeCartQty(cart, cart.qty);
                  "
                >
                  <span style="height: 16px; width: 16px">+</span>
                </button>
              </div>
            </td>
            <td>${{ cart.total }}</td>
            <td>
              <button
                class="btn btn-outline-brown border-0"
                @click="removeCartItem(cart.id)"
              >
              <span
                      v-if="cart.id === status.loadingItem"
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    >
                  </span>
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-white">
            <td></td>
            <td></td>
            <!-- <td>
              <button
                type="button"
                class="btn text-lightBrown p-0"
                @click="openCouponModal()"
              >
                <i class="bi bi-ticket-perforated fs-5"></i>
                <span class="ms-2 fs-5">選擇優惠券</span>
              </button>
            </td> -->
            <!-- <td class="text-lightBrown">
              折扣:$100
            </td> -->
            <td class="text-brown fs-5 text-end" colspan="3">總金額:${{ carts.final_total }}元</td>
            <td class="pe-3">
              <div
                class="d-flex justify-content-center align-items-center p-0"
                style="
                  width: 185px;
                  height: 40px;
                  background: #ffffff;
                  border: 1px solid #e9b888;
                "
              >
                <RouterLink
                  class="loginbtn text-center bg-brown d-block"
                  to="/order"
                  onclick="window.scrollTo(0, 0);"
                  >立即結帳</RouterLink
                >
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div v-else class="text-center mb-8">
        <img
          src="../../../public/images/empty-cart.png"
          class="img-fluid object-fit-cover w-25"
          alt="emptycartpicture"
        />
        <div class="text-brown fs-5">
          購物車還沒有商品呦~
          <br />
          <RouterLink
            to="/products"
            class="btn btn-brown text-decoration-none m-3"
            >按我去選購</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-8 p-0">
    <h3 class="text-center text-brown">
      猜你喜歡
      <div class="text-center text-brown m-0 p-0 fs-1">-</div>
    </h3>
    <div id="swiper">
      <swiper
        :slidesPerView="2"
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
              class="card shadow-sm bg-body rounded-lg border-0 position-relative mb-5 col-12 ms-3 p-0"
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
                    >
                  </span>
                  <i class="bi bi-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <ToastMessages></ToastMessages>
  <CouponModaL ref="CouponModalRef"></CouponModaL>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

import 'swiper/css/navigation'

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useCartStore } from '../../stores/cartStore'
import { useRouter, useRoute } from 'vue-router'
import { useToastMessageStore } from '../../stores/toastMessage'
import CouponModaL from '../../components/CouponModal.vue'
import ToastMessages from '../../components/ToastMessages.vue'

export default {
  setup () {
    const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
    const router = useRouter()
    const route = useRoute()
    const store = useCartStore()
    const toastMessageStore = useToastMessageStore()
    const { pushMessage } = toastMessageStore
    const { getCart } = store
    const products = ref([])
    const id = ref(route.params.productId)
    const carts = ref({})
    const status = ref({
      loadingItem: ''
    })
    const getProducts = () => {
      const { category = '' } = route.query
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}`
      axios.get(url).then((res) => {
        products.value = res.data.products
        console.log(res.data.products)
      })
    }
    const openModal = (product) => {
      router.push(`/product/${product.id}`).then(() => {
        window.scrollTo(0, 0)
      })
    }
    const CouponModalRef = ref(null)
    const getCartList = () => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      axios.get(url).then((res) => {
        carts.value = res.data.data
        // console.log(carts.value);
      })
    }
    const changeCartQty = (item, qty = 1) => {
      const order = {
        product_id: item.product_id,
        qty
      }
      status.value.loadingItem = item.id
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`
      axios.put(url, { data: order }).then(() => {
        status.value.loadingItem = ''
        // alert(res.data.message);
        getCartList()
      })
    }
    const openCouponModal = () => {
      CouponModalRef.value.oModal()
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

    const removeCartItem = (id) => {
      status.value.loadingItem = id
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${id}`
      axios.delete(url).then((res) => {
        status.value.loadingItem = ''
        pushMessage({
          style: 'success',
          title: '刪除成功',
          content: res.data.message
        })
        getCart()
        getCartList()
      })
    }

    const updateCart = (data) => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${data.id}`
      const cart = {
        product_id: data.product_id,
        qty: data.qty
      }

      axios.put(url, { data: cart }).then((response) => {
        pushMessage({
          style: 'success',
          title: '更新購物車',
          content: response.data.message
        })
        getCart()
      }).catch((error) => {
        pushMessage({
          style: 'danger',
          title: '更新購物車',
          content: error.response.data.message
        })
      })
    }
    watch(() => carts.value, () => {
      getCartList()
    })
    onMounted(() => {
      getCart()
      getCartList()
      getProducts()
    })
    return {
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
      products,
      id,
      openModal,
      carts,
      status,
      changeCartQty,
      CouponModalRef,
      openCouponModal,
      removeCartItem,
      addToCart,
      getProducts,
      getCartList,
      updateCart
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    CouponModaL,
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
  display: flex;
  justify-content: center;
  align-items: center;
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
