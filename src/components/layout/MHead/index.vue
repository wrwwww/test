<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-logo">简单电影</div>
      <div class="btn" @click="handleBtn('/')" >首页</div>
      <div class="btn" @click="handleBtn('/movies')">影视剧</div>
      <div class="btn" @click="handleBtn('/tv')">电影</div>
<!--      <div class="btn" @click="handleBtn('/')">动漫</div>-->
    </div>
    <div class="header-right">
      <div class="btn" @click="handleBtn('/user')">用户</div>


    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter}from 'vue-router'
const router=useRouter();
const handleBtn=(path:string)=>{
  router.push({
    path
  })
}

</script>

<style lang="less">

html,body,#app{
  width: 100%;
  height: 100%;
}
  .header{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &>*{
      flex: 1 0 auto;
    }
    &-left{
      display: flex;
      justify-content: space-around;
    }
  }
</style>