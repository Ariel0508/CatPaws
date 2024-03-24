<template>
    <NavbarComponent />
        <RouterView />
    <FooterComponent />
</template>

<script>
import FooterComponent from '../components/FooterComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'

export default {
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>
