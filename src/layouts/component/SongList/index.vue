<script setup lang="ts">
import { useMySongListStore } from "@/store/modules/mySongList";
import { storeToRefs } from "pinia";

defineProps<{ selectPath: string }>();

const emit = defineEmits(["changePath"]);

const mySongListStore = useMySongListStore();
const { mySongList } = storeToRefs(mySongListStore);

const changePath = (id: number) => {
  emit("changePath", "mySongList/" + id);
};
</script>

<template>
  <div class="top-tab">
    <div class="tab-item">我的歌单</div>
    <div class="tab-button">
      <SvgIcon name="plus" />
    </div>
  </div>
  <ul class="song-list-container">
    <li
      v-for="songList in mySongList"
      :key="songList.id"
      @click="changePath(songList.id)"
    >
      {{ songList.albumName }}
    </li>
  </ul>
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
}
</style>
