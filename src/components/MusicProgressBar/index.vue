<script setup lang="ts">
import { ref, toRefs, computed, onMounted } from "vue";
import debounce from "lodash/debounce";

const props = withDefaults(defineProps<{ percentage: number }>(), {});

const emits = defineEmits<{
  /** 调整进度 */
  (e: "change-percentage", innerPercentage: number, percentage?: number): void;
  /** 是否正在调整 */
  (e: "change-darging-state", isDraging: boolean): void;
}>();

const { percentage } = toRefs(props);

const progressContainerRef = ref<HTMLAudioElement>(); /** 进度条容器 */
const isDisplay = ref<boolean>(false); /** 进度条拖拽按钮是否显示 */
const dragState = reactive<{
  innerPercentage: number | null;
  dragging: boolean;
  startX: number;
}>({
  innerPercentage: null,
  dragging: false /** 是否正在拖拽进度条 */,
  startX: 0 /** 记录最开始点击的X轴坐标 */,
});

const currentPercentage = computed(() => {
  if (dragState.innerPercentage === null) {
    return percentage.value;
  }
  return dragState.innerPercentage;
});

const toggleDragBtnDisplay = (status: boolean) => {
  isDisplay.value = status;
  if (!isDisplay.value) {
    /** 鼠标移出之前正在拖拽则触发 */
    if (dragState.dragging) {
      emits("change-darging-state", false);
    }
    /** 停止拖拽时，把拖拽时的进度置空，使用外部传入的进度 */
    dragState.dragging = false;
    dragState.innerPercentage = null;
  }
};

const handleProgressChange = debounce(
  (endX = 0, isDraging = true, withPercentage = false) => {
    /** 获取进度条的长度 */
    const eleWidth = progressContainerRef.value?.getBoundingClientRect()
      .width as number;
    const eleToLeft = progressContainerRef.value?.getBoundingClientRect()
      .left as number;
    /** 计算鼠标距离进度条底部的百分比 */
    let percent = ((endX - eleToLeft) / eleWidth) * 100;
    if (percent > 100) {
      percent = 100;
    } else if (percent < 0) {
      percent = 0;
    }
    dragState.dragging = isDraging;
    if (isDraging) {
      dragState.innerPercentage = percent;
    } else {
      dragState.innerPercentage = null;
    }
    if (!withPercentage) {
      emits("change-percentage", percent / 100);
    } else {
      emits("change-percentage", percent / 100, percent / 100);
    }
  },
  10
);

const handleDragStart = (e: MouseEvent | TouchEvent) => {
  if (e instanceof TouchEvent) {
    dragState.startX = e.changedTouches[0].clientX;
  } else {
    dragState.startX = e.clientX;
  }
  handleProgressChange(dragState.startX);
  // 为元素添加鼠标移动和松开事件
  window.addEventListener("mousemove", handleOnDrag);
  window.addEventListener("touchmove", handleOnDrag);
  window.addEventListener("mouseup", handleDragEnd);
  window.addEventListener("touchend", handleDragEnd);
};

const handleOnDrag = (e: MouseEvent | TouchEvent) => {
  if (!dragState.dragging) {
    return false;
  }
  /** 获取进度条到浏览器的距离 */
  let endX = 0;
  if (e instanceof TouchEvent) {
    endX = e.changedTouches[0].clientX;
  } else {
    endX = e.clientX;
  }
  handleProgressChange(endX);
};

const handleDragEnd = (e: MouseEvent | TouchEvent) => {
  /** 获取进度条到浏览器的距离 */
  let endX = 0;
  if (e instanceof TouchEvent) {
    endX = e.changedTouches[0].clientX;
  } else {
    endX = e.clientX;
  }
  handleProgressChange(endX, false, true);
  /** 移除事件监听 */
  window.removeEventListener("mousemove", handleOnDrag);
  window.removeEventListener("touchmove", handleOnDrag);
  window.removeEventListener("mouseup", handleDragEnd);
  window.removeEventListener("touchend", handleDragEnd);
};

const moveHandler = (e: MouseEvent | TouchEvent) => {
  if (e.type === "mousedown" || e.type === "touchstart") {
    // 开始拖拽
    handleDragStart(e);
  } else if (e.type === "mousemove" || e.type === "touchmove") {
    // 拖拽中
    handleOnDrag(e);
  } else if (e.type === "mouseup" || e.type === "touchend") {
    // 拖拽结束
    handleDragEnd(e);
  }
};

onMounted(() => {
  progressContainerRef.value?.addEventListener("mousedown", moveHandler);
});
</script>

<template>
  <div
    ref="progressContainerRef"
    class="progress-container"
    @mouseenter="toggleDragBtnDisplay(true)"
    @mouseleave="toggleDragBtnDisplay(false)"
  >
    <!-- 进度条-->
    <div
      class="play-progress-bar"
      :style="{ width: `${currentPercentage}%` }"
    ></div>
    <!-- 进度条拖拽按钮-->
    <div
      class="play-draw-btn"
      :style="{
        display: !isDisplay ? 'none' : 'initial',
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.progress-container {
  height: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.play-progress-bar {
  height: 5px;
  background-color: #d33a30;
}
.play-draw-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #d33a30;
}
</style>
