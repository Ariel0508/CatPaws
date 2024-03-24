<template>
    <div class="container-fluid border-top border-bottom border-brown mt-8">
<div class="container my-5">
<footer>
  <div class="row mb-3 text-center">
    <RouterLink class="navbar-brand logo text-brown p-0" to="/"><h1 class="fs-2">Cat Paws</h1></RouterLink>
  </div>
  <div class="row">
    <div class="col-md-4 col-12 p-0 mb-3 d-flex justify-content-center align-items-center">
  <div class="d-flex text-brown fs-4">
    <div class="me-3">聯絡我們</div>
    <i class="bi bi-instagram me-3"></i>
    <i class="bi bi-line me-3"></i>
    <i class="bi bi-facebook me-3"></i>
    <i class="bi bi-telephone-fill me-3"></i>
    <i class="bi bi-geo-alt-fill me-3"></i>
  </div>
</div>
<div class="col-md-4 col-12 mb-5">
  <div class="text-brown fs-5 text-center d-flex justify-content-center align-items-center">
    <RouterLink class="nav-link me-4" to="/" aria-current="page">首頁</RouterLink>
    <RouterLink class="nav-link me-4" to="/products">產品</RouterLink>
    <RouterLink class="nav-link me-4" to="/saleproducts">特價商品</RouterLink>
    <RouterLink class="nav-link me-4" to="/about">品牌故事</RouterLink>
  </div>
</div>
<div class="col-md-4 col-12 mb-3 d-flex justify-content-center align-items-center p-0">
  <div
  style="
  width: 185px;
  height: 40px;
    background: #ffffff;
    border: 1px solid #e9b888;
  ">
  <RouterLink class="loginbtn text-center d-block" to="/login">登入後台</RouterLink>
</div>
</div>
</div>
</footer>
</div>
</div>
<div class="copy text-center text-brown fs-5"> &copy; by Ariel</div>
</template>

<style>
.loginbtn{
      width: 175px;
      height: 30px;
      background: #e9b888;
      color: #ffffff;
      font-size: 20px;
      letter-spacing: 4.8px;
      user-select: none;
      margin: 5px;
      text-decoration: none;
}
</style>
