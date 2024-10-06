<script setup lang="ts">
import { Sidebar, Topbar, AppMain, BottomBar } from "./component";
</script>

<template>
  <div class="app-wrapper">
    <!-- 左侧边栏 -->
    <Sidebar />
    <!-- 主容器 -->
    <div class="main-container">
      <!-- 头部导航栏和搜索栏 -->
      <Topbar />
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
    <!-- 歌曲播放操作栏 -->
    <BottomBar />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.main-container {
  min-height: 100%;
  margin-left: 200px;
  position: relative;
}

.app-main {
  min-height: calc(100vh - 60px);
  position: relative;
  overflow: hidden;
}
</style>
