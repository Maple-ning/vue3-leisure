<script setup lang="ts">
import { ref, unref, computed } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
import { MusicPlay } from "..";
import { usePlayStore } from "@/store/modules/play";
import { storeToRefs } from "pinia";
import PlayList from "@/components/PlayList/index.vue";
import peaches from "@/assets/images/peaches.jpg";

const playStore = usePlayStore();

const { currentSong, playVolume, isPause } = storeToRefs(playStore);

const MusicPlayRef = ref();

const isOpen = ref<boolean>(true);

const changeOpen = (status: boolean): void => {
  isOpen.value = status;
};

const changeListen = (status: boolean): void => {
  isPause.value = status;
  status ? MusicPlayRef.value?.playSong() : MusicPlayRef.value?.playPause();
};

const drawerVisible = ref<boolean>(false);

const OpenPlayList = () => {
  drawerVisible.value = true;
};

const playPrevSong = () => {
  MusicPlayRef.value?.playPrev();
};

const playNextSong = () => {
  MusicPlayRef.value?.playNext();
};

const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};

const volumeText = computed(() => Math.floor(playVolume.value * 100) + "%");
</script>

<template>
  <div
    v-if="currentSong"
    class="bottom-bar-container fixed-bottom"
    :class="{ 'close-bar': !isOpen }"
  >
    <div class="listen-bar" v-if="isOpen">
      <div class="song-info">
        <el-image class="song-image" :src="peaches" fit="fill" />
        <div class="song-text" v-if="currentSong">
          <div class="song-name">{{ currentSong.songName }}</div>
          <div class="singer-name">{{ currentSong.singerName }}</div>
        </div>
        <div class="operate-wrapper">
          <MusicPlay ref="MusicPlayRef" />
          <div class="button-group">
            <SvgIcon class="order-icon visible-item" name="order" />
            <SvgIcon name="prev" @click="playPrevSong" />
            <SvgIcon
              v-if="isPause"
              class="center-icon"
              @click="changeListen(true)"
              name="playing"
            />
            <SvgIcon
              class="center-icon"
              v-else
              @click="changeListen(false)"
              name="listening"
            />
            <SvgIcon name="next" @click="playNextSong" />
            <SvgIcon
              class="volume-icon visible-item"
              name="volume"
              ref="buttonRef"
              v-click-outside="onClickOutside"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="right-button" v-if="isOpen">
      <SvgIcon @click="OpenPlayList" class="right-open" name="rightOpen" />
      <SvgIcon @click="changeOpen(false)" class="packup-button" name="packup" />
    </div>
    <SvgIcon
      v-if="!isOpen"
      @click="changeOpen(true)"
      class="open-button"
      name="upopen"
    />
  </div>
  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    popper-class="volume-popup"
    trigger="click"
    :width="50"
    virtual-triggering
  >
    <el-slider
      v-model="playVolume"
      :show-tooltip="false"
      :min="0"
      :max="1"
      :step="0.01"
      vertical
      height="100px"
    />
    <div class="volume-num">{{ volumeText }}</div>
  </el-popover>
  <PlayList v-model="drawerVisible" title="播放队列" />
</template>

<style lang="scss">
.el-popover.volume-popup {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<style lang="scss" scoped>
.fixed-bottom {
  height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  background-color: var(--website-bottombar-bg);
  box-shadow: 0 -8px 15px var(--website-bottombar-boxshadow);
  border-top: 1px solid white;
  transition: all 0.3s ease;
}

.listen-bar {
  display: flex;
  height: 60px;
  padding: 10px;
  position: relative;
  .song-info {
    display: flex;
  }
  .song-image {
    width: 40px;
    height: 40px;
  }
  .song-text {
    font-size: 14px;
    margin-left: 10px;
    font-family: "yahei";
    line-height: 18px;
  }
  .operate-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-group {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > svg {
      width: 25px;
      height: 25px;
      cursor: pointer;
      &:hover {
        color: green;
      }
    }
    .center-icon {
      margin: 0 20px;
    }
    .order-icon {
      margin-right: 25px;
    }
    .volume-icon {
      margin-left: 25px;
    }
  }
}

.close-bar {
  height: 20px;
}

.right-button {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.right-open {
  width: 20px;
  height: 20px;
  margin-right: 30px;
}

.open-button {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

.packup-button {
  width: 18px;
  height: 18px;
}

.visible-item {
  display: none;
}

.operate-wrapper:hover .visible-item {
  display: block;
}

.volume-num {
  margin-top: 20px;
  font-size: 16px;
}
</style>
