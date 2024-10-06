<script setup lang="ts">
import { ref } from "vue";
import { ButtonGroup } from "../index";
import { Search } from "@element-plus/icons-vue";

const input3 = ref("");
</script>

<template>
  <div class="topbar-container">
    <div class="advance-arrow">
      <SvgIcon name="leftArrow" class="left-arrow" />
      <SvgIcon name="rightArrow" class="right-arrow" />
    </div>
    <div class="search-box">
      <el-input
        v-model="input3"
        style="width: 240px"
        size="media"
        placeholder="搜索音乐"
        :suffix-icon="Search"
      />
    </div>
    <div class="right-setting">
      <ButtonGroup />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topbar-container {
  display: flex;
  height: 60px;
  position: relative;
  border-bottom: 1px solid rgba(84, 84, 84, 0.48);
  z-index: 9;
  background-color: var(--el-bg-color-page);
  color: var(--website-text-primary);
}

.advance-arrow {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.left-arrow {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
}

.right-arrow {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.search-box {
  display: flex;
  align-items: center;
}

.right-setting {
  position: absolute;
  display: flex;
  right: 10px;
  height: 100%;
}
</style>
