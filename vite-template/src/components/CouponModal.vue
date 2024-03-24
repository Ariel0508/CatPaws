<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="CouponModal"
    ref="CouponModalRef"
    aria-labelledby="CouponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-lightVanilla">
        <div class="modal-header">
          <h5 class="modal-title">我的優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="list-unstyled m-4">
            <li class="list-unstyled bg-white mb-3 shadow-sm rounded">
              <div class="row">
                <div class="bg-lightBrown col-2 text-center">折扣<span class="text-brown">$100</span></div>
                <div class="col-10">
                  <div class="pt-1">
                    新會員首購優惠
                  </div>
                  <div class="text-end text-gray2 pe-4 pb-1">
                    <small>有效日期:2024/03/24</small>
                  </div>
                  </div>
              </div>
            </li>
            <li class="list-unstyled bg-white mb-3 shadow-sm rounded">
              <div class="row">
                <div class="bg-lightBrown col-2 text-center">折扣<span class="text-brown">20%</span></div>
                <div class="col-10">
                  <div class="pt-1">
                    滿兩千享優惠
                  </div>
                  <div class="text-end text-gray2 pe-4 pb-1">
                    <small>有效日期:2024/03/24</small>
                  </div>
                  </div>
              </div>
            </li>
            <li class="list-unstyled bg-white mb-3 shadow-sm rounded">
              <div class="row">
                <div class="bg-lightBrown col-2 text-center">折扣<span class="text-brown">10%</span></div>
                <div class="col-10">
                  <div class="pt-1">
                    指定類別商品打九折
                  </div>
                  <div class="text-end text-gray2 pe-4 pb-1">
                    <small>有效日期:2024/03/24</small>
                  </div>
                  </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-brown" @click="cModal()">
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

export default {
  props: ['item'],
  setup (props, { emit }) {
    const CouponModal = ref(null)
    const CouponModalRef = ref(null)

    const oModal = () => {
      CouponModal.value.show()
    }
    const cModal = () => {
      CouponModal.value.hide()
    }
    onMounted(() => {
    // delete modal
      CouponModal.value = new Modal(CouponModalRef.value, {
        keyboard: false,
        backdrop: 'static'
      })
    })

    return {
      oModal,
      cModal,
      CouponModalRef
    }
  }
}
</script>
