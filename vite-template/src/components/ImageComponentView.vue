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
  if (elementX.value > 100 && elementX.value < 300) { left.value = elementX.value - 100 }
  // 縱向
  if (elementY.value > 100 && elementY.value < 300) { top.value = elementY.value - 100 }
  // 邊界距離控制
  // 橫向
  if (elementX.value < 100) left.value = 0
  if (elementX.value > 300) left.value = 200
  // 縱向
  if (elementY.value < 100) top.value = 0
  if (elementY.value > 300) top.value = 200
  // 控制大圖的顯示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})
</script>

<template>
    <!-- {{ elementX }}, {{ elementY }}, {{ isOutside }} -->
    <div class="goods-image p-0">
        <div class="middle" ref="target">
            <img :src="imageList[activeIndex]" class="img-fluid object-fit-cover w-100" style="height: 400px;" alt="" />
            <!-- isOutside代表是否在外面，要取反 !isOutside 代表是否在裡面 -->
            <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
        </div>
        <!-- 小圖列表 -->
        <ul class="small">
            <!-- 通過下標值(i)控制active是否顯示 => 動態類名控制 :class="{ }" -->
            <li class="list-unstyled" v-for="(img, i) in imageList" :key="i" @mouseenter="enterhandler(i)" :class="{ active: i === activeIndex }">
                <img :src="img" class="img-fluid object-fit-cover w-100 h-100"  alt="" />
            </li>
        </ul>
        <!-- 放大鏡大圖 -->
        <div class="large" :style="[
            {
                backgroundImage: `url(${imageList[activeIndex]})`,
                backgroundPositionX: `${positionX}px`,
                backgroundPositionY: `${positionY}px`,
            },
        ]" v-show="!isOutside"></div>
    </div>
</template>

<style scoped lang="scss">
.goods-image {
    width: 100%;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 400px;
    background: #f5f5f5;
    }

    .large {
        position: absolute;
        top: 0;
        left: 420px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }

    .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        left: 0;
        top: 0;
        position: absolute;
    }

    .small {
        width: 100px;

        li {
            width: 90px;
            height: 90px;
            margin-bottom: 15px;
            cursor: pointer;
            &:hover,
            &.active {
                border: 3px solid #E9B888;
            }
        }
    }
}
</style>
