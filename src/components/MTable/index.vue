<template>
  <el-table :data="tableData" style="width: 100%" height="400px">
    <el-table-column prop="id" label="Date"/>
    <el-table-column prop="name" label="Name"/>
  </el-table>
  <el-pagination  :page-size=" pageSize" v-model:current-page="idx"   layout="prev, pager, next" :total="len" />
<el-button @click="add">add</el-button>
</template>

<script  lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {oneToTwo} from '@/utils/array'

interface IData{id:number,name:string}
// 数据量大的数据
const rawData=ref<IData[]>([])
// 分组后的数据量小的数据
const modRawData=ref<IData[][]>([])
// 数据量小的数据
const tableData=ref<IData[]>([])
// 页面大小
const pageSize=ref(10)
// 下标
const idx=ref<number>(1)

const len=computed(()=>{
  return rawData.value.length
})
// 下标改变显示的数组也要改变
watch(idx,(value)=>{
  tableData.value=modRawData.value[idx.value-1];
})

watch(rawData.value,()=>{
  modRawData.value= oneToTwo(rawData.value, pageSize.value);
})
watch(modRawData,(value)=>{
  tableData.value=modRawData.value[idx.value-1]
})

const add=()=>{
  rawData.value.push({id:1,name:'1'})

}



</script>

<style lang="less" scoped >

</style>