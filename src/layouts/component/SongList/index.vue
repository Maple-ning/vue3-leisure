<script setup lang="ts">
import { useMySongListStore } from "@/store/modules/mySongList";
import { usePlayStore } from "@/store/modules/play";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useThrottleFn } from "@vueuse/core";
import ContextMenu from "@/components/ContextMenu/index.vue";

defineProps<{ selectPath: string }>();

const emit = defineEmits(["changePath"]);

const mySongListStore = useMySongListStore();
const { mySongList } = storeToRefs(mySongListStore);

const playStore = usePlayStore();
const { addSomeSongToPlay } = playStore;

const changePath = (id: number) => {
  emit("changePath", "mySongList/" + id);
};

const addList = () => {
  if (mySongList.value[0].type === "add") {
    return false;
  }
  mySongList.value.unshift({
    id: mySongList.value.length + 1,
    albumName: "新建歌单",
    editName: "新建歌单",
    type: "edit",
    imgUrl: "",
    songList: [],
  });
};

const confirmAlbumName = useThrottleFn(
  (songList: AlbumData, songIndex: number) => {
    /** 确定的时候首先要确定，没有名称上的重复 */
    const otherList = mySongList.value.filter(
      (_: AlbumData, i: number) => i !== songIndex
    );
    const isDuplicate = otherList.some(
      (list: AlbumData) => list.albumName === songList.editName
    );
    if (isDuplicate) {
      ElMessage({
        message: "歌单名称重复，建议修改名称。",
        type: "warning",
      });
    } else {
      songList.albumName = songList.editName;
      Reflect.deleteProperty(songList, "editName");
      Reflect.deleteProperty(songList, "type");
    }
  },
  1000
);

const menu = [
  { label: "播放", iconName: "play" },
  { label: "删除", iconName: "delete" },
  { label: "重命名", iconName: "rename" },
];

const menuSelect = (item: MenuData, id: number) => {
  switch (item.label) {
    case "播放":
      playById(id);
      break;
    case "删除":
      deleteById(id);
      break;
    case "重命名":
      renameById(id);
      break;
    default:
      break;
  }
};

const playById = (id: number) => {
  const index = mySongList.value.findIndex((song: AlbumData) => song.id === id);
  if (index !== -1) {
    addSomeSongToPlay(mySongList.value[index].songList);
  }
};

const deleteById = (id: number) => {
  const index = mySongList.value.findIndex((song: AlbumData) => song.id === id);
  if (index !== -1) {
    mySongList.value.splice(index, 1);
  }
};

const renameById = (id: number) => {
  const index = mySongList.value.findIndex((song: AlbumData) => song.id === id);
  if (index !== -1) {
    mySongList.value[index].type = "edit";
    mySongList.value[index].editName = mySongList.value[index].albumName;
  }
};

const getClassName = (id: number) => {
  return "songList:" + id;
};
</script>

<template>
  <div class="top-tab">
    <div class="tab-item">我的歌单</div>
    <div class="tab-button">
      <SvgIcon name="plus" @click="addList" />
    </div>
  </div>
  <ContextMenu :menu="menu" @select="menuSelect">
    <ul class="song-list-container">
      <li
        v-for="(songList, songIndex) in mySongList"
        :key="songList.id"
        :class="getClassName(songList.id)"
      >
        <el-input
          size="small"
          v-if="songList.type === 'edit'"
          v-model="songList.editName"
          @blur="confirmAlbumName(songList, songIndex)"
          @keyup.enter="confirmAlbumName(songList, songIndex)"
        />
        <div
          v-else
          class="album-item"
          :class="getClassName(songList.id)"
          @click="changePath(songList.id)"
        >
          {{ songList.albumName }}
        </div>
      </li>
    </ul>
  </ContextMenu>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.top-tab {
  line-height: 32px;
  display: flex;
  position: relative;
  .tab-item {
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
  .tab-item + .tab-item::before {
    display: inline-block;
    content: "|";
    margin: 0 12px;
  }
}
.tab-button {
  position: absolute;
  right: 10px;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.song-list-container {
  @extend %itemHoverBack;
  > li {
    height: 30px;
  }
}
</style>
