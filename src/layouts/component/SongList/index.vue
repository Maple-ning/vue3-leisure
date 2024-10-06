<script setup lang="ts">
const props = defineProps<{ selectPath: string }>();

const emit = defineEmits(["changePath"]);

const arr = [
  {
    name: "周杰伦",
    id: 1,
  },
  {
    name: "林俊杰",
    id: 2,
  },
  {
    name: "泰勒",
    id: 3,
  },
  {
    name: "情歌",
    id: 4,
  },
  {
    name: "英文歌",
    id: 5,
  },
  {
    name: "汪苏泷",
    id: 6,
  },
  {
    name: "徐良",
    id: "7",
  },
];

const changePath = (item) => {
  emit("changePath", "songlist/" + item);
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
    <li v-for="item in arr" :key="item.id" @click="changePath(item.id)">
      {{ item.name }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.top-tab {
  margin-top: 30px;
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
  min-height: 600px;
  @extend %itemHoverBack;
}
</style>
