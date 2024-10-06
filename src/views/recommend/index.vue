<script setup lang="ts">
import { ref, reactive } from "vue";
import peaches from "@/assets/images/peaches.jpg";
import RollImages from "@/components/RollImages/index.vue";

const mainList = [
  {
    songName: "爱你",
    singerName: "邓紫棋",
    pictureUrl: peaches,
    from: "猜你喜欢",
  },
  {
    songName: "悬溺",
    singerName: "葛东琪",
    pictureUrl: peaches,
    from: "猜你喜欢",
  },
  {
    songName: "夏夜最后的烟火",
    singerName: "颜人中",
    pictureUrl: peaches,
    from: "猜你喜欢",
  },
  {
    songName: "Peaches",
    singerName: "Justin Bieber",
    pictureUrl: peaches,
    from: "猜你喜欢",
  },
  {
    songName: "爱错",
    singerName: "王力宏",
    pictureUrl: peaches,
    from: "猜你喜欢",
  },
];

const treasureList = [
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
  {
    pictureUrl: peaches,
    desc: "热门精选",
  },
];

const images = [
  {
    name: "test",
    url: peaches,
  },
  {
    name: "test",
    url: peaches,
  },
  {
    name: "test",
    url: peaches,
  },
  {
    name: "test",
    url: peaches,
  },
  {
    name: "test",
    url: peaches,
  },
  {
    name: "test",
    url: peaches,
  },
  {
    name: "test",
    url: peaches,
  },
];
</script>

<template>
  <div class="app-container recommend-container">
    <div class="recommend-part">
      <div class="recommend-title">Hi，今日为你推荐。</div>
      <div class="recommend-main">
        <div
          class="recommend-main-item"
          v-for="(main, mainIndex) in mainList"
          :key="mainIndex"
          :class="{ 'pick-item': mainIndex === 0 }"
        >
          <el-image class="main-picture" :src="main.pictureUrl" fit="fill" />
          <div class="main-text">
            <div class="main-text-name">
              {{ main.songName }} - {{ main.singerName }}
            </div>
            <div class="main-text-from">{{ main.from }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-part">
      <div class="recommend-title">歌单宝藏库</div>
      <div class="recommend-treasure">
        <div
          class="recommend-treasure-item"
          v-for="(treasure, treasureIndex) in treasureList"
          :key="treasureIndex"
        >
          <el-image
            class="treasure-picture"
            :src="treasure.pictureUrl"
            fit="fill"
          />
          <div class="tresure-desc">{{ treasure.desc }}</div>
        </div>
      </div>
    </div>
    <div class="recommend-part">
      <div class="recommend-title">听【爱你】的也在听</div>
      <div class="recommend-close">
        <div class="recommend-close-item" v-for="item in 9" :key="item">
          <el-image class="close-picture" :src="peaches" fit="fill" />
          <div class="close-text">
            <div class="close-song-name">AYou</div>
            <div class="close-singer-name">小妹</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-part">
      <div class="recommend-title">歌单滚轮</div>
      <RollImages :images="images" />
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
