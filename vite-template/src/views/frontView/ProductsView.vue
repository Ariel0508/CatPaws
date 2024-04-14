<template>
  <div id="app">
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
          <li class="breadcrumb-item" to="/">
            <RouterLink class="text-black text-decoration-none" to="/"
              >首頁</RouterLink
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">產品</li>
          <li class="breadcrumb-item active" aria-current="page" v-if="pagination.category !== ''">
            {{ pagination.category }}
          </li>
        </ol>
      </nav>
      <div class="row mt-7">
        <div class="col-md-3">
          <div class="mSale">
            <div class="d-flex justify-content-end mb-3">
              <select
                class="p-1 text-center text-gray2 border-end-0 border-start-0 border-brown bg-vanilla w-100"
                aria-label="Default select example"
                @change="handleCategoryChange"
              >
                <option selected>全部產品</option>
                <option v-for="item in categories" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
            <div class="d-flex justify-content-end mb-5">
              <select
                class="p-1 text-gray2 border-end-0 border-start-0 border-top-0 border-bottom-1 border-brown bg-lightVanilla"
                aria-label="Default select example"
                @change="sortProducts($event.target.value)"
              >
                <option selected>價格</option>
                <option value="high">價格高到低</option>
                <option value="low">價格低到高</option>
              </select>
            </div>
          </div>
          <div class="pSale">
            <ul class="list-unstyled mb-2">
              <li class="fs-4 text-gray2 mb-2 list-unstyled">
                <RouterLink
                  class="text-decoration-none text-gray2"
                  :to="{ path: '/products', query: { category: '' } }"
                  @click="handleAllProductsClick"
                >
                  全部產品
                </RouterLink>
              </li>
              <li
                v-for="(item, i) in categories"
                :key="item"
                class="fs-6 mb-2 list-unstyled"
              >
                <RouterLink
                  class="activeCategory"
                  :to="`/products?category=${item}`"
                  @click="enterhandler(i)"
                >
                  {{ item }}
                </RouterLink>
              </li>
            </ul>
            <div class="fs-4 text-gray2 mt-3 mb-2">篩選條件</div>
            <div
              class="fs-6 text-gray2 mb-2 btn p-0 border-0"
              @click="sortProducts('high')"
            >
              <span class="heightPrice">價格高到低</span>
            </div>
            <br />
            <div
              class="fs-6 text-gray2 mb-2 btn p-0 border-0"
              @click="sortProducts('low')"
            >
              <span class="lowPrice">價格低到高</span>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div
              class="col-md-4 col-6"
              v-for="product in products"
              :key="product.id"
            >
              <div
                class="card shadow-sm bg-body rounded-lg border-0 position-relative mb-5"
                @click="openModal(product)"
              >
                <span
                  class="position-absolute top-0 start-0 fw-bold text-white p-2 bg-brown"
                  v-if="product.price !== product.origin_price"
                  >SALE</span
                >
                <img
                  :src="product.imageUrl"
                  class="card-img-top object-fit-cover w-100 rwdImg"
                  alt="productPicture"
                />
                <div class="card-body">
                  <p class="card-title text-center rwdFont">{{ product.title }}</p>
                  <div
                    v-if="product.price === product.origin_price"
                    class="text-gray2 fs-5 card-title text-center"
                  >
                    ${{ $filters.numberToCurrencyNo(product.origin_price) }}
                  </div>
                  <div
                    v-else
                    class="d-flex justify-content-center align-items-center card-title ms-2"
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
                    ></span>
                    <i class="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <Pagination :pages="pagination" @emitPages="getData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastMessages />
</template>

<script>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'
import Pagination from '../../components/PaginationComponent.vue'
import { useToastMessageStore } from '../../stores/toastMessage'
import ToastMessages from '../../components/ToastMessages.vue'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  setup () {
    const store = useCartStore()
    const { getCart } = store
    const toastMessageStore = useToastMessageStore()
    const { pushMessage } = toastMessageStore
    const router = useRouter()
    const route = useRoute()
    const id = ref(route.params.productId)
    const products = ref([])
    const status = ref({
      loadingItem: ''
    })
    const isLoading = ref(false)
    const carts = ref([])
    const finalTotal = ref(0)
    const total = ref(0)
    const categories = ref(['時尚配件', '休閒娛樂', '生活用品'])
    const getProducts = () => {
      const { category = '' } = route.query
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}`
      axios
        .get(url)
        .then((res) => {
          products.value = res.data.products
          pagination.value = res.data.pagination
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
        })
    }
    const pagination = ref({})
    const getData = (page = 1) => {
      const { category = '' } = route.query
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}&page=${page}`
      isLoading.value = true
      axios
        .get(url)
        .then((res) => {
          const sortedProducts = res.data.products.slice()
          if (currentSort.value === 'high') {
            sortedProducts.sort((a, b) => b.price - a.price)
            document.querySelector('.heightPrice').classList.add('activeC')
            document.querySelector('.lowPrice').classList.remove('activeC')
          } else if (currentSort.value === 'low') {
            sortedProducts.sort((a, b) => a.price - b.price)
            document.querySelector('.lowPrice').classList.add('activeC')
            document.querySelector('.heightPrice').classList.remove('activeC')
          }
          products.value = sortedProducts
          pagination.value = res.data.pagination
          isLoading.value = false
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message)
          isLoading.value = false
        })
    }
    const currentSort = ref('')
    const sortProducts = (price) => {
      currentSort.value = price
      getData()
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
    const openModal = (product) => {
      router.push(`/product/${product.id}`).then(() => {
        window.scrollTo(0, 0)
      })
    }
    const activeIndex = ref(0)
    const enterhandler = (i) => {
      const categories = document.querySelectorAll('.activeCategory')

      categories.forEach((item, index) => {
        if (index === i) {
          item.classList.add('activeC')
        } else {
          item.classList.remove('activeC')
        }
      })
      activeIndex.value = i
    }
    const handleAllProductsClick = () => {
      const categories = document.querySelectorAll('.activeCategory')

      categories.forEach((item) => {
        item.classList.remove('activeC')
      })
    }
    const handleCategoryChange = (event) => {
      const selectedCategory = event.target.value
      if (selectedCategory === '全部產品') {
        router.push({ path: '/products', query: { category: '' } })
      } else {
        router.push(`/products?category=${selectedCategory}`)
      }
    }
    watch(
      () => route.query,
      () => {
        getProducts()
        getData()
      }
    )
    onMounted(() => {
      getData()
      getProducts()
    })
    return {
      id,
      products,
      categories,
      status,
      isLoading,
      getProducts,
      sortProducts,
      addToCart,
      openModal,
      getData,
      pagination,
      carts,
      finalTotal,
      total,
      activeIndex,
      enterhandler,
      handleCategoryChange,
      handleAllProductsClick
    }
  },
  components: {
    Pagination,
    ToastMessages
  }
}
</script>

<style scoped lang="scss">
.card {
  height: 450px;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
}
.activeCategory {
  text-decoration: none;
  color: #676767;
  &:hover {
    color: #a2672d;
    text-decoration: underline;
  }
}
.activeC {
  color: #a2672d;
}
.mSale {
  display: none;
}
.rwdFont {
  font-size: 20px;
}
.rwdImg{
  height: 280px;
}
@media screen and (max-width: 768px) {
  .mSale {
    display: block;
  }
  .mSale select {
    width: 170px;
    &:active,
    &:focus {
      border: none;
      border-top: 1px solid #a2672d;
      border-bottom: 1px solid #a2672d;
      outline: none;
    }
  }
  .pSale {
    display: none;
  }
  .card {
    height: 350px;
  }
  .rwdFont {
  font-size: 16px;
}
.rwdImg{
  height: 200px;
}
}
</style>
