<script setup lang="ts">
import { ref } from "vue";
import { useDownloadStore } from "@/store/modules/download";
import { usePlayStore } from "@/store/modules/play";
import { useLikeStore } from "@/store/modules/like";
import { storeToRefs } from "pinia";
import useTableHeight from "@/hooks/useTableHeight";

const downloadStore = useDownloadStore();
const { downloadList } = storeToRefs(downloadStore);

const playStore = usePlayStore();
const { addSongToPlayList } = playStore;

const likeStore = useLikeStore();
const { addLikeList, deleteById } = likeStore;
const changeLikeHandle = (song: SongObjData) => {
  song.isLike ? changeDislike(song) : changeLike(song);
};
const changeLike = (song: SongObjData) => {
  song.isLike = true;
  addLikeList(song);
};
const changeDislike = (song: SongObjData) => {
  song.isLike = false;
  deleteById(song.id);
};

const downloadType = ref<string>("first");
const handleClick = () => {};

const tableWrapperRef = ref();
const { tableHeight } = useTableHeight(tableWrapperRef);

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
  <div class="app-container download-container">
    <div class="container-title">本地和下载</div>
    <el-tabs v-model="downloadType" class="type-tabs" @tab-click="handleClick">
      <el-tab-pane label="本地歌曲" name="first"></el-tab-pane>
      <el-tab-pane label="下载歌曲" name="second"></el-tab-pane>
      <el-tab-pane label="正在下载" name="third"></el-tab-pane>
    </el-tabs>
    <div class="download-list" ref="tableWrapperRef">
      <el-table
        :data="downloadList"
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
        <el-table-column width="180">
          <template #default="scope">
            <div class="evaluate-icon">
              <SvgIcon
                :name="scope.row.isLike ? 'redLike' : 'like'"
                @click="changeLikeHandle(scope.row)"
              />
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
.download-container {
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
  .download-list {
    flex: 1;
  }
}
</style>
