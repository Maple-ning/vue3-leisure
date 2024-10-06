<script setup lang='ts'>
import { isDark, toggleDark } from '@/composables'
</script>

<template>
  <div class='button-group'>
    <div class="button-item"
         @click="toggleDark()">
      <SvgIcon :name="isDark?'sun':'moon'" />
    </div>
    <div class="button-item">
      <SvgIcon name="setting" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.button-group {
  height: 100%;
  display: flex;
  align-items: center;
  .button-item {
    margin: 0 16px;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
