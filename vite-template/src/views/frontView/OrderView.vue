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
          <li class="breadcrumb-item active" aria-current="page">結帳</li>
        </ol>
      </nav>
    </div>
    <div class="container mt-5">
      <div class="row">
        <table
          v-if="carts.total !== 0"
          class="table align-middle border-lightBrown pc"
        >
          <thead>
            <tr class="text-center">
              <th width="200">商品名稱</th>
              <th width="120">單價</th>
              <th width="200" class="text-center">數量</th>
              <th width="200">小計</th>
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
                <RouterLink
                  class="text-decoration-none text-black"
                  :to="`/product/${cart.product.id}`"
                >
                  {{ cart.product.title }}</RouterLink
                >
              </td>
              <td>${{ $filters.numberToCurrencyNo(cart.product.price) }}</td>
              <td>{{ cart.qty }}</td>
              <td>${{ $filters.numberToCurrencyNo(cart.total) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-white">
              <td colspan="2" class="pt-4">
                <div class="d-flex align-items-center justify-content-end">
                  <i class="bi bi-ticket-perforated fs-2 text-brown pe-3"></i>
                  <select
                    name="addCoupon"
                    id="addCoupon"
                    class="form-select rounded w-50 p-2 fs-6"
                    v-model="coupon_code"
                    @change="addCouponCode"
                  >
                    <option value="請輸入優惠券" selected>請輸入優惠券</option>
                    <option value="newMember20%">新會員首購八折優惠</option>
                    <option value="purchasesover200010%">
                      滿兩千享九折優惠
                    </option>
                  </select>
                </div>
              </td>
              <td class="text-center pt-4">
                <div class="me-5">
                  總計：<span
                    >${{ $filters.numberToCurrencyNo(carts.total) }}</span
                  >
                </div>
              </td>
              <td class="text-center pt-4">
                折扣：<span class="text-brown"
                  >${{
                    $filters.numberToCurrencyNo(
                      Math.floor(carts.total - carts.final_total)
                    )
                  }}</span
                >
              </td>
            </tr>
            <tr class="border-white">
              <td></td>
              <td></td>
              <td class="fs-5 text-end py-4" colspan="2">
                <div class="me-8">
                  訂單金額({{ carts?.carts?.length }}商品)：
                  <span class="text-brown"
                    >${{
                      $filters.numberToCurrencyNo(Math.ceil(carts.final_total))
                    }}元</span
                  >
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="mobile justify-content-center">
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
                  style="font-size: 14px;"
                >
                  {{ cart.product.title }}</RouterLink
                >
                <div class="mt-3 d-flex justify-content-between">
                  ${{ $filters.numberToCurrencyNo(cart.product.price) }}
                  <div class="pe-4">
                    x {{ cart.qty }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top border-lightBrown p-3 bg-white">
            <div class="d-flex align-items-center">
              <i class="bi bi-ticket-perforated fs-2 text-brown pe-3"></i>
              <select
                name="addCoupon"
                id="addCoupon"
                class="form-select rounded w-100 p-2 fs-6"
                v-model="coupon_code"
                @change="addCouponCode"
              >
                <option value="請輸入優惠券" selected>請輸入優惠券</option>
                <option value="newMember20%">新會員首購八折優惠</option>
                <option value="purchasesover200010%">滿兩千享九折優惠</option>
              </select>
            </div>
            <div class="text-black text-end mt-3">
              總計：<span>${{ $filters.numberToCurrencyNo(carts.total) }}</span>
            </div>
            <div class=" text-end mt-3">
              折扣：<span class="text-brown">
                ${{
                  $filters.numberToCurrencyNo(
                    Math.floor(carts.total - carts.final_total)
                  )
                }}
              </span>
            </div>
            <div class="fs-5 text-end mt-3">
              訂單金額({{ carts?.carts?.length }}商品)：
              <span class="text-brown"
                >${{
                  $filters.numberToCurrencyNo(Math.ceil(carts.final_total))
                }}元</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-5">
        <v-form
          ref="formRef"
          class="form-floating"
          v-slot="{ errors }"
          @submit="createOrder"
        >
          <h5 class="my-5 text-center">購買人資料</h5>
          <div class="row">
            <div class="col-md-6 col-12">
              <div class="mb-4">
                <label for="name" class="form-label">*姓名</label>
                <v-field
                  id="name"
                  name="name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['name'] }"
                  placeholder="請輸入收件人姓名"
                  rules="required"
                  v-model="form.user.name"
                ></v-field>
                <error-message name="name" class="invalid-feedback"
                  ><div class="text-danger small mt-2">
                    姓名為必填
                  </div></error-message
                >
              </div>
              <div class="mb-4">
                <label for="tel" class="form-label">*電話</label>
                <v-field
                  id="tel"
                  name="tel"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['tel'] }"
                  placeholder="請輸入收件人電話"
                  :rules="isPhone"
                  v-model="form.user.tel"
                ></v-field>
                <error-message name="tel" class="invalid-feedback"
                  ><div class="text-danger small mt-2">
                    需要正確的電話號碼
                  </div></error-message
                >
              </div>
              <div class="mb-4">
                <label for="email" class="form-label">*Email</label>
                <v-field
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email"
                  rules="email|required"
                  v-model="form.user.email"
                ></v-field>
                <error-message
                  name="email"
                  class="invalid-feedback"
                ></error-message>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="mb-4">
                <label for="address" class="form-label">*地址</label>
                <v-field
                  id="address"
                  name="address"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['address'] }"
                  placeholder="請輸入收件人地址"
                  rules="required"
                  v-model="form.user.address"
                ></v-field>
                <error-message name="address" class="invalid-feedback"
                  ><div class="text-danger small mt-2">
                    地址為必填
                  </div></error-message
                >
              </div>
              <div class="mb-4">
                <label for="message" class="form-label">留言</label>
                <textarea
                  name=""
                  id="message"
                  class="form-control"
                  cols="20"
                  rows="5"
                  v-model="form.message"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="text-end py-5">
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
                    >送出訂單
                  </a>
                </div>
              </div>
            </button>
          </div>
        </v-form>
      </div>
    </div>
    <ToastMessages />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useCartStore } from '../../stores/cartStore'
import { useRouter } from 'vue-router'
import { useToastMessageStore } from '../../stores/toastMessage'
import ToastMessages from '../../components/ToastMessages.vue'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const store = useCartStore()
const { getCart } = store
const carts = ref(store.carts)
const router = useRouter()
const isLoading = ref(false)
const toastMessageStore = useToastMessageStore()
const { pushMessage } = toastMessageStore
const getCartList = () => {
  const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
  axios
    .get(url)
    .then((res) => {
      carts.value = res.data.data
    })
    .catch(() => {
      isLoading.value = false
    })
}
const formRef = ref(null)
const form = ref({
  user: {
    name: '',
    email: '',
    tel: '',
    address: ''
  },
  message: ''
})

const createOrder = () => {
  // eslint-disable-next-line camelcase
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
  const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/order`
  const order = form.value
  isLoading.value = true
  axios
    .post(url, { data: order })
    .then((response) => {
      if (formRef.value) {
        formRef.value.resetForm()
        isLoading.value = false
      }
      router.push(`/completed/${response.data.orderId}`)
      localStorage.removeItem('coupon_code')
    })
    .catch(() => {
      isLoading.value = false
    })
  window.scrollTo(0, 0)
}
const isPhone = (value) => {
  const phoneNumber = /^(09)[0-9]{8}$/
  return phoneNumber.test(value) ? true : '需要正確的電話號碼'
}
// eslint-disable-next-line camelcase
const coupon_code = ref(localStorage.getItem('coupon_code') || '請輸入優惠券')
const isLoadingCoupon = ref(false)
const addCouponCode = () => {
  // eslint-disable-next-line camelcase
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

  isLoadingCoupon.value = true

  axios
    .post(url, { data: coupon })
    .then((response) => {
      if (coupon.code === '請輸入優惠券') {
        // 不顯示任何提示訊息
      } else {
        pushMessage({
          style: 'success',
          title: '加入優惠券',
          content: response.data.message
        })
      }
      getCart()
      isLoadingCoupon.value = false
    })
    .catch(() => {
      isLoadingCoupon.value = false
      pushMessage({
        style: 'danger',
        title: '優惠券不可用'
      })
    })

  // eslint-disable-next-line camelcase
  localStorage.setItem('coupon_code', coupon_code.value)
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
</style>
