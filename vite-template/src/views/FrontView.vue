<template>
  <div class="container-fluid">
    <NavbarComponent />
        <RouterView />
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from '../components/FooterComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
</script>
