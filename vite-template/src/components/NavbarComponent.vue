<template>
  <div class="my-4">
    <nav class="navbar navbar-expand-xxl bg-vanilla fixed-top">
      <div class="container p-0 text-center">
        <RouterLink class="navbar-brand logo text-brown" to="/" @click="hideMobileMenu">
          <h1 class="fs-2">Cat Paws</h1>
        </RouterLink>
        <div class="d-flex align-items-center">
          <RouterLink
            class="nav-link position-relative mcartBtn"
            @click="hideMobileMenu"
            to="/cart"
          >
            <i class="bi bi-cart3 fs-5 pe-2"></i>
            <span
              v-if="store.carts?.length > 0"
              class="mobile-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brown text-center"
            >
              {{ store.carts?.length }}
            </span>
            <span class="visually-hidden"></span>
          </RouterLink>
          <button
            class="navbar-toggler ms-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="toggleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink
                class="nav-link fs-6 mx-3"
                to="/products"
                @click="hideMobileMenu"
                >產品</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link fs-6 mx-3"
                to="/saleproducts"
                @click="hideMobileMenu"
                >特價商品</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link fs-6 mx-3"
                to="/about"
                @click="hideMobileMenu"
                >品牌故事</RouterLink
              >
            </li>
            <li class="nav-item cartBtn">
              <RouterLink
                class="nav-link position-relative mx-3"
                @click="hideMobileMenu"
                to="/cart"
              >
                <i class="bi bi-cart3 fs-6"></i>
                <span
                  v-if="store.carts?.length > 0"
                  class="mobile-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brown text-center"
                >
                  {{ store.carts?.length }}
                </span>
                <span class="visually-hidden"></span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div>
    <button
      v-if="showTopBtn"
      type="button"
      class="fixed-bottom-right fs-1 p-0 topbtn border-0"
      @click="scrollToTop"
    >
      <i class="bi bi-arrow-up-circle fs-1"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const showTopBtn = ref(false)

const scrollHandler = () => {
  const st = window.scrollY || document.documentElement.scrollTop
  if (st > 500) {
    showTopBtn.value = true
  } else {
    showTopBtn.value = false
  }
}
const hideMobileMenu = () => {
  const navbar = document.querySelector('.navbar-collapse')
  if (navbar.classList.contains('show')) {
    navbar.classList.remove('show')
  }
  window.scrollTo(0, 0)
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
.fixed-bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
.topbtn {
  color: #a2672d;
  background: transparent;
}
.topbtn:hover,
.topbtn:active {
  background: transparent;
  color: #e9b888;
}
.mcartBtn {
  display: none;
}
@media screen and (max-width: 1399px) {
  .cartBtn {
    display: none;
  }
}
@media screen and (max-width: 1400px) {
  .mcartBtn {
    display: block;
  }
}
</style>
