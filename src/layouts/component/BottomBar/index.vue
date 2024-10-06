<script setup lang="ts">
import { ref } from "vue";
import MusicProgressBar from "@/components/MusicProgressBar/index.vue";
import PlayList from "@/components/PlayList/index.vue";
import peaches from "@/assets/images/peaches.jpg";

const isOpen = ref<boolean>(true);

const changeOpen = (status: boolean): void => {
  isOpen.value = status;
};

const isListening = ref<boolean>(false);

const changeListen = (status: boolean): void => {
  isListening.value = status;
};

const drawerVisible = ref<boolean>(false);

const OpenPlayList = () => {
  drawerVisible.value = true;
};
</script>

<template>
  <div
    class="bottom-bar-container fixed-bottom"
    :class="{ 'close-bar': !isOpen }"
  >
    <div class="listen-bar" v-if="isOpen">
      <div class="song-info">
        <el-image class="song-image" :src="peaches" fit="fill" />
        <div class="song-text">
          <div class="song-name">我太笨</div>
          <div class="singer-name">锤娜丽莎</div>
        </div>
        <div class="operate-wrapper">
          <MusicProgressBar />
          <div class="button-group">
            <SvgIcon name="prev" />
            <SvgIcon
              v-if="isListening"
              @click="changeListen(false)"
              name="playing"
            />
            <SvgIcon v-else @click="changeListen(true)" name="listening" />
            <SvgIcon name="next" />
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
  <PlayList v-model="drawerVisible" title="播放队列" />
</template>

<style lang="scss" scoped>
.fixed-bottom {
  height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  z-index: 999;
  background-color: var(--website-bottombar-bg);
  box-shadow: 0 -8px 15px var(--website-bottombar-boxshadow);
  border-top: 1px solid white;
  transition: all 0.3s ease;
}

.listen-bar {
  display: flex;
  height: 60px;
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
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 40px;
    display: flex;
    align-items: flex-end;
  }
  .button-group {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    > svg {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
    svg:nth-child(2) {
      margin: 0 20px;
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
</style>
