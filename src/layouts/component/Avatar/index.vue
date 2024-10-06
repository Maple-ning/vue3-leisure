<script setup lang='ts'>
</script>

<template>
  <div class='avatar-container'>
    <div class="avatar-box"></div>
  </div>
</template>

<style lang='scss' scoped>
.avatar-container {
  display: flex;
  align-items: center;
  margin-right: 30px;
  .avatar-box {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid var(--el-text-color-primary);
  }
}
</style>
