<template>
<div class="m-input">
  <label for="input">{{title}}</label>
  <input id="input" autocomplete="off"  :placeholder="placeholder" :type="type?type:'text'"  :value="modelValue" @input="$emit('update:modelValue',$event.target.value)" required>
</div>
</template>

<script setup lang="ts">


defineProps(['modelValue','placeholder','type','title'])
defineEmits(['update:modeValue'])

</script>

<style lang="less" scoped>

input{
  outline: none;
  padding: .5em 1em;
  border: 2px solid transparent;
  border-radius: 8px;
  &:hover,&:focus{
    border: 2px solid red;
  }
}
</style>