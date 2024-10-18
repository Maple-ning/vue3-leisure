<script setup lang="ts">
import { ref } from "vue";
import RollImages from "@/components/RollImages/index.vue";
import { useMySongListStore } from "@/store/modules/mySongList";
import { storeToRefs } from "pinia";

const mySongListStore = useMySongListStore();
const { mySongList } = storeToRefs(mySongListStore);

const mainList = ref<AlbumData>(); /** 主要推荐歌单 */
mainList.value = mySongList.value.slice(0, 4);
const mainText = (main: AlbumData) => {
  if (!main.songList.length) {
    return "--";
  }
  const firstItem = main.songList[0];
  return firstItem.songName + " - " + firstItem.singerName;
};

const treasureList = ref<AlbumData>(); /** 宝藏歌单 */
treasureList.value = mySongList.value;

const songRecommendList = ref<Array<SongObjData>>([]); /** 根据喜欢推荐的歌曲 */
songRecommendList.value = mySongList.value[0].songList;

const rollList = ref<AlbumData>(); /** 滚动歌单 */
rollList.value = mySongList.value;
</script>

<template>
  <div class="app-container recommend-container">
    <div class="recommend-part">
      <div class="recommend-title">Hi，今日为你推荐。</div>
      <div class="recommend-main">
        <div
          class="recommend-main-item relative-item"
          v-for="main in mainList"
          :key="main.id"
        >
          <PlayImage
            class="main-picture"
            :src="main.imgUrl"
            :song="main.songList[0]"
          />
          <div class="main-text">
            <div class="main-text-name">
              {{ mainText(main) }}
            </div>
            <!--<div class="main-text-from">{{ main.from }}</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-part">
      <div class="recommend-title">歌单宝藏库</div>
      <div class="recommend-treasure">
        <div
          class="recommend-treasure-item relative-item"
          v-for="(treasure, treasureIndex) in treasureList"
          :key="'treasure' + treasureIndex"
        >
          <PlayImage
            class="treasure-picture"
            :src="treasure.imgUrl"
            :song="treasure.songList[0]"
          />

          <div class="tresure-desc">{{ treasure.albumName }}</div>
        </div>
      </div>
    </div>
    <div class="recommend-part">
      <div class="recommend-title">根据您的喜欢为您推荐</div>
      <div class="recommend-close">
        <div
          class="recommend-close-item relative-item"
          v-for="(recommendSong, recommendIndex) in songRecommendList"
          :key="'recommend' + recommendIndex"
        >
          <PlayImage
            class="close-picture"
            :src="recommendSong.imgUrl"
            :play-size="30"
            :song="recommendSong"
          />
          <div class="close-text">
            <div class="close-song-name">{{ recommendSong.songName }}</div>
            <div class="close-singer-name">{{ recommendSong.singerName }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-part">
      <div class="recommend-title">歌单滚轮</div>
      <RollImages :Albums="rollList" />
    </div>
    <div style="height: 50px"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.app-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  @extend %scrollbar;
}
.recommend-title {
  margin-bottom: 20px;
  font-weight: 700;
  font-family: "yahei";
}
.recommend-main {
  overflow: hidden;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  .recommend-main-item {
    cursor: pointer;
    flex: 1;
    &:hover {
      transform: translateY(-10px);
    }
    &:hover .play-button {
      display: block;
    }
  }
  .main-picture {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
  }
  .main-text {
    font-size: 14px;
    line-height: 22px;
  }
  .pick-item {
    flex: 2;
  }
}
.recommend-treasure {
  display: flex;
  flex-wrap: wrap;
  gap: calc(4% / 5);
  row-gap: 20px;
  margin-bottom: 20px;
  .recommend-treasure-item {
    flex: 0 0 16%;
    &:hover {
      transform: translateY(-10px);
    }
  }
  .treasure-picture {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
  }
}
.recommend-close {
  display: flex;
  flex-wrap: wrap;
  gap: calc(4% / 2);
  row-gap: 20px;
  margin-bottom: 20px;
  .recommend-close-item {
    display: flex;
    flex: 0 0 32%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: rgb(239, 239, 239);
    }
  }
  .close-picture {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  .close-text {
    font-size: 12px;
    line-height: 22px;
  }
}
</style>
