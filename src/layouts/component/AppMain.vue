<script setup lang='ts'>
</script>

<template>
  <div class='app-main'>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang='scss' scoped>
</style>
