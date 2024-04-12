<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

// props適配圖片列表
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})

// 1.小圖切換大圖顯示
const activeIndex = ref(0)

const enterhandler = (i) => {
  activeIndex.value = i
}

// 2.獲取鼠標相對位置
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)

// 3.控制滑塊跟著鼠標移動 監聽elementX/Y 一旦變化重新設置 left/top
const left = ref(0)
const top = ref(0)
// 大圖效果
const positionX = ref(0)
const positionY = ref(0)
watch([elementX, elementY, isOutside], () => {
  // console.log('x,y變化了')
  // 如果鼠標沒有移入盒子內， 直接不執行後面的邏輯
  if (isOutside.value) return
  // console.log('後面邏輯執行了')
  // 有效範圍內控制滑塊距離
  // 橫向
  if (elementX.value > 125 && elementX.value < 325) {
    left.value = elementX.value - 125
  }
  // 縱向
  if (elementY.value > 125 && elementY.value < 325) {
    top.value = elementY.value - 125
  }
  // 邊界距離控制
  // 橫向
  if (elementX.value < 125) left.value = 0
  if (elementX.value > 325) left.value = 225
  // 縱向
  if (elementY.value < 125) top.value = 0
  if (elementY.value > 325) top.value = 225
  // 控制大圖的顯示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})
</script>

<template>
  <!-- {{ elementX }}, {{ elementY }}, {{ isOutside }} -->
  <div class="goods-image flex-column d-flex align-items-between p-0">
    <div class="middle" ref="target">
      <img
        :src="imageList[activeIndex]"
        class="img-fluid object-fit-cover w-100"
        alt=""
      />
      <!-- isOutside代表是否在外面，要取反 !isOutside 代表是否在裡面 -->
      <div
        class="layer"
        v-show="!isOutside"
        :style="{ left: `${left}px`, top: `${top}px` }"
      ></div>
    </div>
    <!-- 小圖列表 -->
    <ul class="small d-flex px-0 m-0">
      <!-- 通過下標值(i)控制active是否顯示 => 動態類名控制 :class="{ }" -->
      <li
        class="list-unstyled p-0 me-2"
        v-for="(img, i) in imageList"
        :key="i"
        @mouseenter="enterhandler(i)"
        :class="{ active: i === activeIndex }"
      >
        <img :src="img" class="img-fluid object-fit-cover w-100 h-100" alt="" />
      </li>
    </ul>
    <!-- 放大鏡大圖 -->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`,
        },
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 450px;
  height: 450px;
  position: relative;
  display: flex;

  .middle {
    width: 450px;
    height: 450px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 470px;
    width: 450px;
    height: 450px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 900px 900px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 225px;
    height: 225px;
    background: rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 100%;

    li {
      background: #fff;
      width: 100px;
      height: 100px;
      margin-block: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 3px solid #e9b888;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .large,
    .layer {
      display: none;
    }
    width: 300px;
    height: 300px;

    .middle {
      width: 300px;
      height: 300px;
    }

    .large {
      left: 320px;
      width: 300px;
      height: 300px;
    }

    .layer {
      width: 150px;
      height: 150px;
    }

    .small li {
      width: 60px;
      height: 60px;
      margin-block: 15px;
    }
  }
}
</style>
