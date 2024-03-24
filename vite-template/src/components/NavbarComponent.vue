<template>
  <div class="my-4">
    <nav class="navbar navbar-expand-xxl bg-vanilla fixed-top" :class="{ 'is-hidden': isHidden }">
      <div class="container p-0">
        <RouterLink class="navbar-brand logo text-brown" to="/"><h1 class="fs-2">Cat Paws</h1></RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link active text-brown fs-6" to="/" aria-current="page" onclick="window.scrollTo(0, 0);">首頁</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-brown fs-6" to="/products" onclick="window.scrollTo(0, 0);">產品</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-brown fs-6" to="/saleproducts" onclick="window.scrollTo(0, 0);">特價商品</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-brown fs-6" to="/about" onclick="window.scrollTo(0, 0);">品牌故事</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link position-relative text-brown" onclick="window.scrollTo(0, 0);" to="/cart">
                <i class="bi bi-cart3 fs-6"></i>
                <span class="p-1 position-absolute top-0 start-100 translate-middle
          badge rounded-pill bg-brown text-center" style="width: 30px;"
          :style="{ display: store.carts?.length === 0 ? 'none' : 'block' }">
          {{ store.carts?.length }}
        </span>
          <span class="visually-hidden"></span>
  </RouterLink>
              <!-- <RouterLink class="nav-link text-brown fs-6 ps-3" to="/cart" onclick="window.scrollTo(0, 0);"><i class="bi bi-cart3"></i></RouterLink> -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div>
    <button v-if="showTopBtn" type="button" class="fixed-bottom-right fs-1 p-0 topbtn border-0" @click="scrollToTop"><i class="bi bi-arrow-up-circle fs-1"></i></button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const isHidden = ref(false)
const showTopBtn = ref(false)

let lastScrollTop = 0
const scrollHandler = () => {
  const st = window.scrollY || document.documentElement.scrollTop
  if (st > lastScrollTop) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
  lastScrollTop = st <= 0 ? 0 : st

  if (st > 500) {
    showTopBtn.value = true
  } else {
    showTopBtn.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const store = useCartStore()
const { getCart } = store

onMounted(() => {
  getCart()
})
onMounted(() => {
  window.addEventListener('scroll', scrollHandler)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})

</script>

<style>
.is-hidden {
  transform: translateY(-100%);
  transition: transform 0.3s;
}
.fixed-bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
.topbtn {
  color: #A2672D;
  background: transparent;
}
.topbtn:hover, .topbtn:active {
  background: transparent;
  color: #e9b888;
}
</style>
