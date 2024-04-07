<template>
    <div id="app">
      <VueLoading :active="isLoading" :is-full-page="true" :background-color="'#FFF8F1'" :opacity="1" :z-index="1060">
    <img src="../../assets/loading.gif" width="500" alt="loading" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
  </VueLoading>

      <div class="container p-0">
        <div class="m-3 d-flex justify-content-end">
          <button type="button" class="btn btn-primary" @click="openModal('new')">
            建立新的產品
          </button>
        </div>
        <div class="row my-3">
          <table class="table p-0">
            <thead>
              <tr>
                <th width="120">分類</th>
                <th width="150">產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="150">是否啟用</th>
                <th width="150">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td width="150">{{ product.category }}</td>
                <td width="150">{{ product.title }}</td>
                <td width="120">{{ product.origin_price }}</td>
                <td width="120">{{ product.price }}</td>
                <td width="150">
                  <span
                    v-if="product.is_enabled"
                    :class="{ 'text-success': product.is_enabled }"
                    >啟用</span
                  >
                  <span v-else>未啟用</span>
                </td>
                <td width="150">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="openModal('edit', product)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="openModal('delete', product)"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="6" class="border-0">
                  目前有{{ products.length }}項產品
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!-- 分頁元件 -->
        <PaginationComponent :pages="pagination" @emit-pages="getData"></PaginationComponent>
      </div>
      <!-- modal -->
      <ProductModal
        ref="productRef"
        :product="tempProduct"
        :status="status"
        @update="getData"
      ></ProductModal>
      <!-- del modal -->
      <DelProductModal
        ref="delModalRef"
        :item="tempProduct"
        @update="getData"
      ></DelProductModal>
    </div>
  </template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import PaginationComponent from '../../components/PaginationComponent.vue'
import ProductModal from '../../components/ProductModal.vue'
import DelProductModal from '../../components/DelProductModal.vue'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  setup () {
    const products = ref([])
    const tempProduct = ref({
      imageUrl: []
    })
    const pagination = ref({})
    const productRef = ref(null)
    const delModalRef = ref(null)
    const status = ref(false)
    const router = useRouter()
    const isLoading = ref(false)
    // 2.取得產品資料
    const getData = (page = 1) => {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products?page=${page}`
      isLoading.value = true
      axios
        .get(url)
        .then((res) => {
          products.value = res.data.products
          pagination.value = res.data.pagination
          isLoading.value = false
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
          isLoading.value = false
        })
    }
    // 1.確認是否登入
    const checkLogin = () => {
      isLoading.value = true
      axios.post(`${VITE_APP_URL}/api/user/check`)
        .then(() => {
          getData()
          isLoading.value = false
        })
        .catch(() => {
          router.push('/login')
          isLoading.value = false
        })
    }

    // 3.查看產品細節
    const openModal = (isNew, product) => {
      // isNew === 'new' 新增產品
      if (isNew === 'new') {
        tempProduct.value = {
          imageUrl: []
        }
        status.value = true
        productRef.value.oModal()
      } else if (isNew === 'edit') {
        tempProduct.value = { ...product }
        status.value = false
        productRef.value.oModal()
      } else if (isNew === 'delete') {
        tempProduct.value = { ...product }
        delModalRef.value.oModal()
      }
    }
    onMounted(() => {
      // Retrieve Token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)rubbyToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      axios.defaults.headers.common.Authorization = token
      checkLogin()
    })
    return {
      products,
      tempProduct,
      openModal,
      status,
      isLoading,
      getData,
      pagination,
      delModalRef,
      productRef
    }
  },
  components: {
    PaginationComponent,
    DelProductModal,
    ProductModal
  }
}
</script>
