<script setup lang="ts">
import { ref, computed } from "vue";
import type { TabsPaneContext } from "element-plus";
import useTableHeight from "@/hooks/useTableHeight";
import { useLikeStore } from "@/store/modules/like";
import { useMySongListStore } from "@/store/modules/mySongList";
import { usePlayStore } from "@/store/modules/play";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

/** 获取歌单id */
const route = useRoute();
const songListId = computed(() => Number(route.params.id));

/** 在数据中获取当前歌单信息 */
const mySongListStore = useMySongListStore();
const { mySongList } = storeToRefs(mySongListStore);

const songListInfo = computed(() => {
  if (!songListId.value) {
    return {};
  }
  return mySongList.value.find(
    (list: AlbumData) => list.id === songListId.value
  );
});

const songList = computed(() => {
  if (Object.keys(songListInfo).length === 0) {
    return [];
  }
  return songListInfo.value.songList;
});

const playStore = usePlayStore();

const { addSomeSongToPlay, addSongToPlayList } = playStore;

const tableWrapperRef = ref();

const { tableHeight } = useTableHeight(tableWrapperRef);

const activeName = ref<string>("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const playSong = (song: SongObjData) => {
  addSongToPlayList(song);
};

const playAll = () => {
  if (!songList.value.length) {
    return false;
  }
  addSomeSongToPlay(songList.value);
};

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

const url =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // 使用 padStart 确保分钟和秒都是两位数字
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};
</script>

<template>
  <div class="song-list-container app-container">
    <div class="top-song-info">
      <el-image class="album-picture" :src="url" fit="fill" />
      <div class="album-info">
        <div class="album-name">{{ songListInfo.albumName }}</div>
        <div class="album-desc">{{ songListInfo.albumDesc }}</div>
        <div class="button-group">
          <div class="button-item" @click="playAll">
            <SvgIcon name="play" />
            播放
          </div>
          <div class="button-item">
            <SvgIcon name="share" />
            分享
          </div>
        </div>
      </div>
    </div>
    <el-tabs
      class="song-tab-group"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="歌曲" name="first"></el-tab-pane>
      <el-tab-pane label="最近收藏" name="second"></el-tab-pane>
      <el-tab-pane label="评论" name="third"></el-tab-pane>
    </el-tabs>
    <div class="song-info-list" ref="tableWrapperRef">
      <el-table
        :data="songList"
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
@import "@/styles/mixins.scss";
.song-list-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.top-song-info {
  height: 150px;
  display: flex;
  font-family: "yahei";
  .album-picture {
    width: 150px;
    height: 150px;
    background-color: skyblue;
  }
  .album-info {
    flex: 1;
    margin-left: 20px;
    position: relative;
    .album-name {
      font-size: 20px;
      color: var(--website-text-primary);
      margin-bottom: 10px;
    }
    .album-desc {
      font-size: 14px;
      color: var(--website-text-desc);
      margin-bottom: 10px;
    }
    .button-group {
      position: absolute;
      bottom: 0;
      display: flex;
      .button-item {
        padding: 8px 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgb(220, 223, 230);
        font-size: 14px;
        &:not(:last-child) {
          margin-right: 30px;
        }
      }
      svg {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
  }
}
:deep(.song-tab-group) {
  margin: 16px 0;
  .el-tabs__nav-wrap:after {
    height: 0;
  }
}
.song-info-list {
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
.evaluate-icon {
  svg {
    width: 20px;
    height: 20px;

    cursor: pointer;
  }
  svg:hover {
    color: rgb(252, 120, 120);
  }
}
</style>
