<template>
  <div class="wrap">
    <el-button  link><router-link :to="{name:'discovery'}">网站首页</router-link></el-button>
    <el-button  link><router-link to="/admin/login">后台管理</router-link></el-button>
    <router-view/>
  </div>
</template>

<script setup lang="ts">


</script>

<style lang="less">
html,body,#app{
  width: 100%;
  height: 100%;
  min-width: 1125px;
}
.wrap{

  height: 100%;
}

</style>