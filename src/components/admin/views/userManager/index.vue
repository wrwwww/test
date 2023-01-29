<template>
用户管理
  <el-table v-loading="userTableIsLoading" :data="userData" height="250" stripe style="width: 100%">
    <el-table-column prop="_id" label="id" width="250" />
    <el-table-column prop="username" label="Date" width="180" />
    <el-table-column prop="email" label="Name" width="180" />
    <el-table-column prop="userAdmin" label="userAdmin"  />
    <el-table-column prop="userPower" label="userPower"  />
    <el-table-column prop="userStop" label="userStop" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleUserInfo">Edit</el-button>
        <el-button link type="primary" size="small" @click="handleUserInfo">Detail</el-button>
      </template>
    </el-table-column>
  </el-table>



  <el-dialog v-model="dialogFormVisible" title="编辑">
    <el-form :model="form">
      <el-form-item label="username" :label-width="140">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="email" :label-width="140">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import {useAsyncState} from "@vueuse/core";
import {allUsers} from "@/api";
import { reactive, ref } from 'vue'
const { state:userData,  isLoading:userTableIsLoading } = useAsyncState(allUsers,[])
const handleUserInfo=function (){
  dialogFormVisible.value = true
}


const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)


const form = reactive({
  username:'',
  email:'',
  userAdmin:false,
  userPower:false,
  userStop:false
})


</script>

<style lang="less" scoped>

</style>