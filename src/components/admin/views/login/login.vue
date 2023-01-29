<template>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>后台管理系统</span>
      </div>
    </template>
    <el-space direction="vertical" >
      <el-input v-model="username" placeholder="用户名"/>
      <el-input v-model="password" placeholder="密码"/>
      <el-button style="width: 198px"  type="primary" class="button" @click="handleAdminLogin" >登录</el-button>
    </el-space>

  </el-card>

</template>

<script setup lang="ts">
import MInput from '@/components/MInput/index.vue'
import {ref} from "vue";
import {userLogin} from "@/api";
import {useRouter} from "vue-router";
const password=ref('')
const username=ref('')
const router=useRouter()
const handleAdminLogin=async ()=>{
  let data={
      username:username.value,
      password:password.value
  };
  // 登录并获取管理员路由
   userLogin(data).then(res=>{
     if (res){
       localStorage.setItem('token',res.token)
       localStorage.setItem('user_id',res.user[0]._id)
       router.push('/admin')
     }
   })
}


</script>

<style lang="less" scoped>

.box-card{
  text-align: center;
  min-width: 60%;
  width: 60%;
  min-height: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  .el-input{
    width: 60%;
  }
}
</style>