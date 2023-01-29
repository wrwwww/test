<template>
  <m-head class="header" />
  <div style="height: 100%">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import MHead from '@/components/layout/MHead/index.vue'
import Discovery from '@/views/discovery/index.vue'

</script>

<style lang="less" scoped>
.header{
  height: 80px;
  width: 100%;
  background: dodgerblue;
}
</style>