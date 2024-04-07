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
              <td></td>
              <td class="text-black text-end my-3">
                總計：<span
                  >${{ $filters.numberToCurrencyNo(carts.total) }}</span
                >
              </td>
              <td class="text-lightBrown text-center my-3">
                折扣：${{
                  $filters.numberToCurrencyNo(
                    Math.floor(carts.total - carts.final_total)
                  )
                }}
              </td>
              <td class="p-3 fs-5" colspan="2">
                訂單金額({{ carts?.carts?.length }}商品)：
                <span class="text-brown"
                  >${{
                    $filters.numberToCurrencyNo(Math.ceil(carts.final_total))
                  }}元</span
                >
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
              <div class="col-4">
                <img
                  :src="cart.product.imageUrl"
                  class="img-fluid object-fit-cover"
                  style="width: 80px; height: 80px"
                  alt=""
                />
              </div>
              <div class="col-5">
                <RouterLink
                  class="text-decoration-none text-black"
                  :to="`/product/${cart.product.id}`"
                >
                  {{ cart.product.title }}</RouterLink
                >
                <div>
                  ${{ $filters.numberToCurrencyNo(cart.product.price) }}
                </div>
              </div>
              <div class="col-3 text-center">
                <div>x {{ cart.qty }}</div>
              </div>
            </div>
          </div>
          <div class="border-top border-lightBrown p-3 bg-white">
            <div class="text-black text-end mt-3">
              總計：<span>${{ $filters.numberToCurrencyNo(carts.total) }}</span>
            </div>
            <div class="text-lightBrown text-end mt-3">
              折扣：${{
                $filters.numberToCurrencyNo(
                  Math.floor(carts.total - carts.final_total)
                )
              }}
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
      <!-- form -->
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
              <div
                class="d-flex justify-content-center align-items-center p-0"
                style="
                  width: 185px;
                  height: 40px;
                  background: #ffffff;
                  border: 1px solid #a2672d;
                "
              >
                <div class="loginbtn text-center bg-brown d-block">
                  <div>送出訂單</div>
                </div>
              </div>
            </button>
          </div>
        </v-form>
      </div>
    </div>
    <CouponModaL ref="CouponModalRef"></CouponModaL>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useCartStore } from '../../stores/cartStore'
import { useRouter } from 'vue-router'
import CouponModaL from '../../components/CouponModal.vue'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const store = useCartStore()
const { getCart } = store
const carts = ref({})
const isLoading = ref(false)
const getCartList = () => {
  const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
  isLoading.value = true
  axios
    .get(url)
    .then((res) => {
      carts.value = res.data.data
      isLoading.value = false
      // console.log(carts.value)
    })
    .catch((err) => {
      alert(err.response.data.message)
      isLoading.value = false
    })
}
const CouponModalRef = ref(null)
// const openModal = () => {
//   CouponModalRef.value.oModal()
// }
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
const router = useRouter()
const createOrder = () => {
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
    })
    .catch((err) => {
      // eslint-disable-next-line no-alert
      alert(err.response.data.message)
      isLoading.value = false
    })
  localStorage.removeItem('coupon_code')
  window.scrollTo(0, 0)
}
const isPhone = (value) => {
  const phoneNumber = /^(09)[0-9]{8}$/
  return phoneNumber.test(value) ? true : '需要正確的電話號碼'
}
// watch(() => carts.value, () => {
//   getCartList()
// })
onMounted(() => {
  getCart()
  getCartList()
})
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
