<script setup lang="ts">
import { ref } from "vue";

const isTouch = ref<boolean>(false);

const touchStart = () => {
  isTouch.value = true;
};

const touchEnd = () => {
  isTouch.value = false;
};
</script>

<template>
  <div class="progress-container">
    <input
      type="range"
      min="0"
      max="50"
      step="1"
      class="input-progress"
      :class="{ active: isTouch }"
      @touchstart="touchStart"
      @touchend="touchEnd"
    />
    <div class="progress-time">
      <div class="left">1</div>
      <div class="right">12</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 20px;
  color: rgba(245, 245, 245, 1);
}
.input-progress {
  position: absolute;
  z-index: 2;
}
.progress-time {
  position: absolute;
  color: var(--website-text-primary);
  top: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
/*横条样式*/
input[type="range"] {
  /*清除系统默认样式*/
  -webkit-appearance: none; /*清除系统默认样式*/
  width: 80%;
  background: #ddd;
  height: 3px;
  /* border-radius: 80%; */
  outline: none;
}
/*拖动块的样式*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 10px;
  width: 10px;
  background: #ddd;
  border-radius: 50%;
  border: solid 1px #eee;
}
input[type="range"].active::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
}
</style>
