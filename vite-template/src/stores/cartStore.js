import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useToastMessageStore } from './toastMessage'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export const useCartStore = defineStore('cart', () => {
  const carts = ref([])
  const finalTotal = ref(0)
  const total = ref(0)
  const route = useRoute()
  const status = ref({
    loadingItem: ''
  })
  const id = ref(route.params.productId)
  const products = ref([])
  const toastMessageStore = useToastMessageStore()
  const { pushMessage } = toastMessageStore
  const getCart = () => {
    const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
    axios.get(url).then((res) => {
      carts.value = res.data.data.carts
      finalTotal.value = res.data.data.final_total
      total.value = res.data.data.total
    })
  }
  const getCartList = () => {
    const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
    axios.get(url).then((res) => {
      carts.value = res.data.data
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
        title: '成功加入購物車',
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
  onMounted(() => {
    getCart()
    getCartList()
  })
  return {
    carts,
    finalTotal,
    total,
    getCart,
    getCartList,
    addToCart,
    removeCartItem,
    status,
    id,
    products
  }
})
export default useCartStore
