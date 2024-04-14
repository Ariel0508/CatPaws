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
          <li class="breadcrumb-item active" aria-current="page">購物車</li>
        </ol>
      </nav>
    </div>
    <div v-if="carts.carts?.length === 0" class="text-center mb-8">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <img
          src="../../../public/images/empty-cart.png"
          class="img-fluid object-fit-cover"
          alt="emptycartpicture"
          width="300"
        />
        <div class="text-brown fs-5">
          購物車還沒有商品呦~
          <br />
          <RouterLink
            to="/products"
            class="btn btn-brown text-decoration-none m-3"
            onclick="window.scrollTo(0, 0)"
            >按我去選購</RouterLink
          >
        </div>
      </div>
    </div>
    <div class="container mt-7" v-else>
      <div class="container-fluid mt-6 rwdStep">
        <div class="position-relative m-4">
          <div class="progress" style="height: 2px">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 0%"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <button
            type="button"
            class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-brown rounded-pill"
            style="width: 2rem; height: 2rem"
          >
            1
          </button>
          <button
            type="button"
            class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-gray2 rounded-pill"
            style="width: 2rem; height: 2rem"
          >
            2
          </button>
          <button
            type="button"
            class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-gray2 rounded-pill"
            style="width: 2rem; height: 2rem"
          >
            3
          </button>
        </div>
        <div class="pt-1">
          <div class="position-relative m-4">
            <div
              class="position-absolute top-0 start-0 translate-middle"
              style="width: 4rem; height: 2rem"
            >
              確認商品
            </div>
            <div
              class="position-absolute top-0 start-50 translate-middle"
              style="width: 4rem; height: 2rem"
            >
              填寫資料
            </div>
            <div
              class="position-absolute top-0 start-100 translate-middle"
              style="width: 4rem; height: 2rem"
            >
              完成訂單
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <table class="table align-middle border-lightBrown pc mt-6">
          <thead>
            <tr class="text-center">
              <th width="200">商品名稱</th>
              <th width="120">單價</th>
              <th width="200" class="text-center">數量</th>
              <th width="200">小計</th>
              <th width="100">刪除</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="cart in carts.carts" :key="cart.id">
              <td>
                <div>
                  <img
                    :src="cart.product.imageUrl"
                    class="img-fluid object-fit-cover"
                    style="width: 80px; height: 80px"
                    alt=""
                  />
                </div>
                <div>
                  <RouterLink
                    class="text-decoration-none text-black"
                    :to="`/product/${cart.product.id}`"
                  >
                    {{ cart.product.title }}
                  </RouterLink>
                </div>
              </td>
              <td>${{ $filters.numberToCurrencyNo(cart.product.price) }}</td>
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
              <td>${{ $filters.numberToCurrencyNo(cart.total) }}</td>
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
              <td></td>
              <td></td>
              <td>
                <div class="text-black mt-3 pe-7 text-end fs-5">
                  總計：${{ $filters.numberToCurrencyNo(carts.total) }}元
                </div>
              </td>
            </tr>
            <tr class="border-white">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="p-3">
                <div class="d-flex justify-content-center text-brown">
                  <div
                    class="d-flex align-items-center justify-content-center btnHover"
                    style="
                      width: 185px;
                      height: 40px;
                      background: #ffffff;
                      border: 1px solid #a2672d;
                    "
                  >
                    <a
                      class="text-center bg-brown text-decoration-none text-white m-1 d-block btnHover"
                      style="width: 175px; height: 30px; line-height: 30px"
                      @click="goToOrder"
                      >立即結帳
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="mobile mt-5">
          <div
            class="border-top border-lightBrown p-3 bg-white"
            v-for="cart in carts.carts"
            :key="cart.id"
          >
            <div class="row">
              <div class="col-4 p-0">
                <img
                  :src="cart.product.imageUrl"
                  class="img-fluid object-fit-cover"
                  style="width: 80px; height: 80px"
                  alt=""
                />
              </div>
              <div class="col-8 p-0">
                <RouterLink
                  class="text-decoration-none text-black"
                  :to="`/product/${cart.product.id}`"
                  style="font-size: 14px"
                >
                  {{ cart.product.title }}</RouterLink
                >
                <div
                  class="mt-4 d-flex align-items-center justify-content-between"
                >
                  <div>${{ $filters.numberToCurrencyNo(cart.total) }}</div>
                  <div class="input-group w-100 ps-3">
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
                </div>
              </div>
            </div>
          </div>
          <div class="border-top border-lightBrown p-3 bg-white">
            <div class="text-black text-end mt-3 fs-5">
              總計：${{ $filters.numberToCurrencyNo(carts.total) }}元
            </div>
            <div class="d-flex justify-content-end text-brown my-3">
              <div
                class="d-flex align-items-center justify-content-center btnHover"
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
                  @click="goToOrder"
                  >立即結帳
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastMessages />
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useCartStore } from '../../stores/cartStore'
import { useRouter, useRoute } from 'vue-router'
import { useToastMessageStore } from '../../stores/toastMessage'
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
    const carts = ref(store.carts)
    const status = ref({
      loadingItem: ''
    })
    const isLoading = ref(false)
    const goToOrder = () => {
      router.push('/order')
      window.scrollTo(0, 0)
      // localStorage.removeItem('coupon_code')
    }
    const getCartList = () => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      axios.get(url).then((res) => {
        carts.value = res.data.data
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
        getCartList()
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
    watch(
      () => carts.value,
      () => {
        getCartList()
      }
    )
    onMounted(() => {
      getCart()
      getCartList()
    })
    return {
      products,
      id,
      carts,
      status,
      isLoading,
      changeCartQty,
      goToOrder,
      removeCartItem,
      getCartList
    }
  },
  components: {
    ToastMessages
  }
}
</script>

<style>
.btnHover {
  cursor: pointer;
}
.rwdStep {
  width: 50%;
}
#addCoupon {
  width: 70%;
}
.mobile {
  display: none;
}
@media screen and (max-width: 767px) {
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }
  .rwdStep {
    width: 100%;
    font-size: 14px;
  }
}
</style>
