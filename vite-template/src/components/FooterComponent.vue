<template>
  <div class="container-fluid border-top border-bottom border-brown mt-8">
    <div class="container my-5">
      <footer>
        <div class="mb-5 text-center">
          <RouterLink
            class="navbar-brand logo text-brown p-0"
            to="/"
            onclick="window.scrollTo(0, 0)"
            ><h1 class="fs-2">Cat Paws</h1></RouterLink
          >
        </div>
        <div class="mb-3 text-brown text-center fs-5">聯絡我們</div>
        <div
          class="d-flex justify-content-center align-items-center mb-5 text-brown fs-4"
        >
          <a href="" class="icon"><i class="bi bi-instagram mx-3"></i></a>
          <a href="" class="icon"><i class="bi bi-line mx-3"></i></a>
          <a href="" class="icon"><i class="bi bi-facebook mx-3"></i></a>
          <a href="tel:02-12345678" class="icon"
            ><i class="bi bi-telephone-fill mx-3"></i
          ></a>
          <a
            target="_blank"
            href="https://maps.app.goo.gl/szHz1ncd6N1XjYd97"
            class="icon"
            ><i class="bi bi-geo-alt-fill mx-3"></i
          ></a>
        </div>
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
            <RouterLink
              class="text-center bg-brown text-decoration-none text-white m-1"
              to="/login"
              style="width: 175px; height: 30px; line-height: 30px"
              >登入後台</RouterLink
            >
          </div>
        </div>
      </footer>
    </div>
  </div>
  <div class="copy text-center text-brown fs-5">&copy; by Ariel</div>
</template>

<style scoped lang="scss">
.icon {
  color: #a2672d;
  &:hover {
    color: #e8b887;
  }
}
</style>
