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
    <div class="container mt-5">
      <div class="row" v-if="carts.total !== 0">
        <table class="table align-middle border-lightBrown pc">
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
              <td colspan="2" class="pt-4 p-0">
                <form
                  @submit.prevent="addCouponCode"
                  class="d-flex align-items-center justify-content-end"
                >
                  <i class="bi bi-ticket-perforated fs-2 text-brown pe-3"></i>
                  <select
                    name="addCoupon"
                    id="addCoupon"
                    class="form-select rounded w-50 p-2 fs-6"
                    v-model="coupon_code"
                  >
                    <option value="" disabled>請輸入優惠券</option>
                    <option value="newMember20%">新會員首購八折優惠</option>
                    <option value="purchasesover200010%">
                      滿兩千享九折優惠
                    </option>
                  </select>
                  <button
                    type="submit"
                    class="btn btn-outline-brown border-lightBrown ms-3 p-2"
                  >
                    <span>
                      <img
                        src="@/assets/loadingCoupon.gif"
                        alt="loading"
                        width="20"
                        v-if="isLoadingCoupon"
                      />
                    </span>
                    套用
                  </button>
                </form>
              </td>
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
        <div class="mobile">
          <div
            class="border-top border-lightBrown p-3 bg-white"
            v-for="cart in carts.carts"
            :key="cart.id"
          >
            <div class="row">
              <div class="col-3">
                <img
                  :src="cart.product.imageUrl"
                  class="img-fluid object-fit-cover"
                  style="width: 80px; height: 80px"
                  alt=""
                />
              </div>
              <div class="col-4">
                <RouterLink
                  class="text-decoration-none text-black"
                  :to="`/product/${cart.product.id}`"
                >
                  {{ cart.product.title }}</RouterLink
                >
                <div>${{ $filters.numberToCurrencyNo(cart.total) }}</div>
              </div>
              <div class="col-5">
                <div class="input-group w-100 pt-4">
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
          <div class="border-top border-lightBrown p-3 bg-white">
            <form
              @submit.prevent="addCouponCode"
              class="d-flex align-items-center justify-content-between"
            >
              <i class="bi bi-ticket-perforated fs-1 text-brown pe-1"></i>
              <select
                name="addCoupon"
                id="addCoupon"
                class="form-select rounded p-2 fs-6"
                v-model="coupon_code"
              >
                <option value="" disabled>請輸入優惠券</option>
                <option value="newMember20%">新會員首購八折優惠</option>
                <option value="purchasesover200010%">滿兩千享九折優惠</option>
              </select>
              <button
                type="submit"
                class="btn btn-outline-brown border-lightBrown p-2"
              >
                <span>
                  <img
                    src="@/assets/loadingCoupon.gif"
                    alt="loading"
                    width="20"
                    v-if="isLoadingCoupon"
                  />
                </span>
                套用
              </button>
            </form>
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
      <div v-else class="text-center mb-8">
        <img
          src="../../../public/images/empty-cart.png"
          class="img-fluid object-fit-cover"
          alt="emptycartpicture"
          style="width: 300px; height: 350px"
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
    const carts = ref({})
    const status = ref({
      loadingItem: ''
    })
    const isLoading = ref(false)
    const getProducts = () => {
      const { category = '' } = route.query
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}`
      isLoading.value = true
      axios.get(url).then((res) => {
        products.value = res.data.products
        isLoading.value = false
        // console.log(res.data.products)
      })
    }
    // eslint-disable-next-line camelcase
    const coupon_code = ref(localStorage.getItem('coupon_code') || '')
    const isLoadingCoupon = ref(false)
    const addCouponCode = () => {
      if (
        // eslint-disable-next-line camelcase
        coupon_code.value === 'purchasesover200010%' &&
        carts.value.total < 2000
      ) {
        pushMessage({
          style: 'danger',
          title: '無法使用優惠券',
          content: '購物車金額需達到2000元才能使用優惠券'
        })
        return
      }
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/coupon`
      const coupon = {
        // eslint-disable-next-line camelcase
        code: coupon_code.value
      }
      // eslint-disable-next-line camelcase
      if (coupon_code.value === '') {
        return
      }
      // eslint-disable-next-line camelcase
      isLoadingCoupon.value = true
      axios
        .post(url, { data: coupon })
        .then((response) => {
          pushMessage({
            style: 'success',
            title: '加入優惠券',
            content: response.data.message
          })
          getCart()
          isLoadingCoupon.value = false
        })
        .catch((error) => {
          isLoadingCoupon.value = false
          pushMessage({
            style: 'danger',
            title: '優惠券不可用',
            content: error.response.data.message
          })
        })
      // eslint-disable-next-line camelcase
      localStorage.setItem('coupon_code', coupon_code.value)
    }
    const goToOrder = () => {
      if (
        // eslint-disable-next-line camelcase
        coupon_code.value === 'purchasesover200010%' &&
        carts.value.total < 2000
      ) {
        pushMessage({
          style: 'danger',
          title: '無法使用優惠券',
          content: '購物車金額需達到2000元才能使用優惠券'
        })
        return
      }
      router.push('/order')
      window.scrollTo(0, 0)
      // localStorage.removeItem('coupon_code')
    }
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

      axios
        .put(url, { data: cart })
        .then((response) => {
          pushMessage({
            style: 'success',
            title: '更新購物車',
            content: response.data.message
          })
          getCart()
        })
        .catch((error) => {
          pushMessage({
            style: 'danger',
            title: '更新購物車',
            content: error.response.data.message
          })
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
      getProducts()
    })
    return {
      products,
      id,
      carts,
      status,
      isLoading,
      isLoadingCoupon,
      changeCartQty,
      addCouponCode,
      // eslint-disable-next-line camelcase
      coupon_code,
      goToOrder,
      removeCartItem,
      getProducts,
      getCartList,
      updateCart
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
#addCoupon {
  width: 70%;
}
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
</style>
