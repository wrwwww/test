<template>
<div class="loading-background" >
  <div ref="loading_bar" class="loading-bar"></div>
</div>

</template>

<script setup lang="ts">
import {ref} from "vue";

const  speed= ref(0) ;
const loading_bar=ref()
const timer=ref(0)
// 开始加载
 const startLoading=()=>{
   let dom = loading_bar.value as HTMLElement;
   speed.value = 1
   timer.value = window.requestAnimationFrame(function fn() {
     if (speed.value < 90) {
       speed.value += 1;
       dom.style.width = speed.value + '%'
       timer.value = window.requestAnimationFrame(fn)
     } else {
       speed.value = 1;
       window.cancelAnimationFrame(timer.value)
     }
   })

}

// 结束加载
const endLoading=()=>{
  let dom = loading_bar.value as HTMLElement;
  setTimeout(()=>{
    window.requestAnimationFrame(() => {
      speed.value = 100;
      dom.style.width = speed.value + '%'
    })
    setTimeout(() => {
      // window.requestAnimationFrame(() => {
        speed.value = 0;
        dom.style.width = speed.value + '%'
      // })
    }, 500)
  },500)


}
// const reset=()=>{
//   speed.value=0;
// }
defineExpose({
  startLoading,
  endLoading
})


</script>

<style lang="less" scoped>
.loading-background{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 4px;
}
.loading-bar{
  height: inherit;
  width: 0;
  background: dodgerblue;
}
</style>