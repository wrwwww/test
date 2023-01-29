<template>
   <div v-show="isLogin" class="card">
     <h1>登录</h1>
     <m-input v-model="username" placeholder="user" type="text"  />
     <m-input type="password" v-model="password"   placeholder="password"/>
      <button class="m-button" @click="handleLogin">登录</button>
     <hr/>

     <button @click="isLogin=!isLogin">register</button>
   </div>
  <div v-show="!isLogin" class="card">
     <h1>注册</h1>
     <m-input v-model="username" placeholder="user" type="text"  />
     <m-input type="password" v-model="password"   placeholder="password"/>
     <m-input type="email" v-model="email"   placeholder="email"/>
      <button class="m-button" @click="handleRegister">注册</button>
    <hr/>
      <button @click="isLogin=!isLogin">login</button>
   </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
import MInput from "@/components/MInput/index.vue";
import {userLogin, userRegister} from "@/api";
const isLogin=ref(true)
const username=ref('')
const password=ref('')
const email=ref('')

const handleRegister=async ()=>{
  await userRegister({
    username:username.value,
    password:password.value,
    email:email.value
  })
}
const handleLogin=()=>{
  userLogin({
    username:username.value,
    password:password.value
  }).then(res=>{
    localStorage.setItem('token',res.token)
    localStorage.setItem('user_id',res.user[0]._id)
  }).catch(err=>{
    console.log('异常')
  })
}


</script>

<style lang="less" scoped>
.card{
  margin: 0 auto;
  width: 50%;
  height: 40%;
  border-radius: 8px;
  text-align: center;
  box-shadow: 2px 2px 6px rgba(0,0,0,.4),-1px -1px 6px rgba(0,0,0,.4);
  &>*+*{
    margin-top: 1em;
  }
}
.m-button{
  border-radius: 8px;
  padding: .5em ;
  background: dodgerblue;
  border: 2px solid dodgerblue;
  width: 193px;

}
</style>