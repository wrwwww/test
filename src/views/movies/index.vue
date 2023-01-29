<template>
  <button @click="handleAllUsers">按钮</button>
  <div v-for="item in users">
    {{item}}
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {allUsers, IUser} from "@/api";

const users=ref<IUser[]>([])
const handleAllUsers= ()=>{
  allUsers().then(res=>{
    users.value=res
  })
}

</script>

<style lang="less" scoped>

</style>