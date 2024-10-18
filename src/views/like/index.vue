<script setup lang="ts">
import { ref } from "vue";
import { useLikeStore } from "@/store/modules/like";
import { usePlayStore } from "@/store/modules/play";
import { storeToRefs } from "pinia";
import useTableHeight from "@/hooks/useTableHeight";

const listStore = useLikeStore();
const { likeList } = storeToRefs(listStore);

const likeType = ref<string>("first");

const handleClick = () => {};

const tableWrapperRef = ref();
const { tableHeight } = useTableHeight(tableWrapperRef);

const playStore = usePlayStore();

const { addSongToPlayList } = playStore;

const playSong = (song: SongObjData) => {
  addSongToPlayList(song);
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // 使用 padStart 确保分钟和秒都是两位数字
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};
</script>

<template>
  <div class="app-container like-container">
    <div class="container-title">喜欢</div>
    <el-tabs v-model="likeType" class="type-tabs" @tab-click="handleClick">
      <el-tab-pane label="歌曲" name="first"></el-tab-pane>
      <el-tab-pane label="歌单" name="second"></el-tab-pane>
      <el-tab-pane label="专辑" name="third"></el-tab-pane>
    </el-tabs>
    <div class="like-list" ref="tableWrapperRef">
      <el-table
        :data="likeList"
        :default-sort="{ prop: 'songName', order: 'ascending' }"
        :height="tableHeight"
        :row-class-name="'song-table-row'"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          :sortable="true"
          label="歌名/歌手"
          min-width="300"
        >
          <template #default="scope">
            <div class="song-info">
              <div class="play-button" @click="playSong(scope.row)">
                <SvgIcon name="playButton" />
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="scope.row.imgUrl"
                fit="fill"
              />
              <div class="song-info-item">
                <div class="song-name">{{ scope.row.songName }}</div>
                <div class="singer-name">{{ scope.row.singerName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="albumName" label="专辑" min-width="150" />
        <el-table-column prop="duration" label="时长" min-width="150">
          <template #default="scope">
            {{ formatTime(scope.row.duration) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.like-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .container-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .type-tabs {
    :deep(.el-tabs__nav-wrap:after) {
      height: 0;
    }
  }
  .like-list {
    flex: 1;
  }
  .song-table-row:hover .play-button {
    display: block;
  }
  .song-info {
    position: relative;
    display: flex;
    .play-button {
      display: none;
      position: absolute;
      top: 50%;
      left: 20px;
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
    .song-info-item {
      margin-left: 20px;
    }
    .song-name {
      line-height: 22px;
      color: var(--website-text-primary);
    }
    .singer-name {
      line-height: 22px;
      color: var(--website-text-desc);
    }
  }
}
</style>
