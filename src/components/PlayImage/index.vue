<script setup lang="ts">
import { usePlayStore } from "@/store/modules/play";

const playStore = usePlayStore();

const { addSongToPlayList } = playStore;

defineOptions({
  name: "PlayImage",
});

type ImageFit = "fill" | "contain" | "cover" | "none" | "scale-down";

interface Props {
  src: string /** 图片路径 */;
  playSize?: number /** 播放按钮大小 */;
  fit?: ImageFit /** 图片缩放方式 */;
  song: SongObjData;
}

withDefaults(defineProps<Props>(), {
  src: "",
  playSize: 40,
  fit: "fill",
});
</script>

<template>
  <div class="play-image-container">
    <el-image class="element-image" :src="src" fit="fill" />
    <SvgIcon
      @click="addSongToPlayList(song)"
      class="play-button"
      :style="{ width: `${playSize}px`, height: `${playSize}px` }"
      name="play"
    />
  </div>
</template>

<style lang="scss" scoped>
.play-image-container {
  position: relative;
  &:hover .play-button {
    display: block;
  }
}
.element-image {
  width: 100%;
  height: 100%;
}
.play-button {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  &:hover {
    color: green;
  }
}
</style>
