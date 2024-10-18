<script setup lang="ts">
import { ref } from "vue";
import type { DrawerProps } from "element-plus";
import { usePlayStore } from "@/store/modules/play";
import { storeToRefs } from "pinia";
import peaches from "@/assets/images/peaches.jpg";

const store = usePlayStore();
const { songList } = storeToRefs(store);

const playSong = (songId: number) => {
  store.setCurrentSongById(songId);
};

defineProps({ size: { type: Number, default: 400 }, title: { type: String } });

const visible = defineModel({ type: Boolean, default: false });

const direction = ref<DrawerProps["direction"]>("rtl");

const handleClose = () => {
  visible.value = false;
};
</script>

<template>
  <div class="drawer-root">
    <el-drawer
      v-model="visible"
      :direction="direction"
      :size="size"
      :before-close="handleClose"
    >
      <template #header>
        <span class="drawer-title">{{ title }}</span>
      </template>
      <div class="list-num">共{{ songList.length }}首歌曲</div>
      <div class="list-container">
        <div class="song-item" v-for="song in songList" :key="song.id">
          <el-image class="song-image" :src="peaches" fit="fill" />
          <div class="play-button" @click="playSong(song.id)">
            <SvgIcon name="playButton" />
          </div>
          <div class="song-info">
            <div class="song-name">{{ song.songName }}</div>
            <div class="singer-name">{{ song.singerName }}</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/mixins.scss" as *;
.drawer-title {
  color: var(--website-text-primary);
}
.drawer-root:deep(.el-drawer__header) {
  margin-bottom: 0px;
}
.drawer-root:deep(.el-drawer__body) {
  display: flex;
  flex-direction: column;
  padding-right: 8px;
}
.list-num {
  font-size: 12px;
  color: var(--website-text-desc);
  margin-bottom: 10px;
}
.list-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 8px;
  @extend %scrollbar;
  .song-item {
    display: flex;
    padding: 10px;
    height: 60px;
    border-radius: 4px;
    position: relative;
    .play-button {
      display: none;
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translate(-50%, -50%);
      z-index: 2;
      color: white;
      &:hover {
        color: green;
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
    &:hover {
      background-color: var(--website-item-hover);
    }
    &:hover .play-button {
      display: block;
    }
    &:not(.last-child) {
      margin-bottom: 10px;
    }
  }
  .song-image {
    width: 40px;
    height: 40px;
  }
  .song-info {
    margin-left: 10px;
    line-height: 22px;
    font-size: 14px;
    .song-name {
      color: var(--website-text-primary);
    }
    .singer-name {
      color: var(--website-text-desc);
    }
  }
}
</style>
