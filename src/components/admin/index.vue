<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        后台管理系统
      </el-header>

      <el-container>
        <el-aside width="auto">
          <el-button @click="isCollapse=!isCollapse">按钮</el-button>
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              :collapse="isCollapse"
              @open="handleOpen"
              @close="handleClose"
          >
            <router-link to="/admin/index">
              <el-menu-item  index="1">
                  <el-icon><location /></el-icon>
                  <template #title> <span>用户管理</span> </template>
              </el-menu-item >
            </router-link>
            <router-link to="/admin/index2">
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <template #title> 权限管理</template>
              </el-menu-item>
            </router-link>

            <router-link to="/admin/index3">
              <el-menu-item index="3">
                <el-icon><setting /></el-icon>
                <template #title>电影管理</template>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'


const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.common-layout{
  width: 100%;
  height: 100%;
  position: relative;
}
.el-header{
  display: flex;
  justify-content: center;
  align-items: center;
  //box-shadow: 2px 2px 4px rgba(0,0,0,.6) ;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-main{
  padding:  20px;
  height: 100%;
}
</style>