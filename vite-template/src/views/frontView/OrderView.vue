<template>
  <div class="container mt-8 p-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">結帳</li>
      </ol>
    </nav>
  </div>
  <div class="container mt-5" >
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
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td></td>
            <td>
              <img
                :src="cart.product.imageUrl"
                class="img-fluid object-fit-cover pe-3"
                style="width: 80px; height: 80px"
                alt=""
              />
              <br>
              {{ cart.product.title }}
            </td>
            <td></td>
            <td>${{ cart.product.price }}</td>
            <td>{{ cart.qty }}</td>
            <td>${{ cart.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div class="form-check"></div>
            </td>
            <td></td>
            <!-- <td></td> -->
            <!-- <td class="py-3">
              <button
                type="button"
                class="btn text-lightBrown p-0"
                @click="openModal()"
              >
                <i class="bi bi-ticket-perforated fs-5"></i>
                <span class="ms-2 fs-5">選擇優惠券</span>
              </button>
            </td> -->
            <td class="text-lightBrown">
              <!-- 折扣:$100 -->
            </td>
            <td colspan="3" class="text-end">訂單金額({{ carts?.carts?.length }}商品):<span class="text-brown fs-5">${{ carts.final_total }}</span></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- form -->
    <div
      class="row justify-content-center bg-white p-2"
    >
      <v-form
        ref="formRef"
        class="col-md-10 form-floating"
        v-slot="{ errors }"
        @submit="createOrder"
      >
      <h5 class="my-5">購買人資料</h5>
        <div class="row">
          <div class="col-md-6 col-12">
            <div class="mb-4">
              <label for="name" class="form-label">姓名</label>
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
              <error-message
                name="name"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-4">
              <label for="tel" class="form-label">電話</label>
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
              <error-message
                name="tel"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-4">
              <label for="email" class="form-label">Email</label>
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
              <label for="address" class="form-label">地址</label>
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
              <error-message
                name="address"
                class="invalid-feedback"
              ></error-message>
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
                  border: 1px solid #A2672D;
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
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useCartStore } from '../../stores/cartStore'
import { useRouter } from 'vue-router'
import CouponModaL from '../../components/CouponModal.vue'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const store = useCartStore()
const { getCart } = store
const carts = ref({})
const getCartList = () => {
  const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
  axios.get(url).then((res) => {
    carts.value = res.data.data
    // console.log(carts.value)
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
  axios
    .post(url, { data: order })
    .then((response) => {
      if (formRef.value) {
        formRef.value.resetForm()
      }
      router.push((`/completed/${response.data.orderId}`))
    })
    .catch((err) => {
      // eslint-disable-next-line no-alert
      alert(err.response.data.message)
    })
  window.scrollTo(0, 0)
}
const isPhone = (value) => {
  const phoneNumber = /^(09)[0-9]{8}$/
  return phoneNumber.test(value) ? true : '需要正確的電話號碼'
}
watch(() => carts.value, () => {
  getCartList()
})
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
</style>
