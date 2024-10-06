<script setup lang="ts">
import NavbarList from "@/components/Navbar/List/index.vue";

const props = defineProps({
  selectPath: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["changePath"]);

const arr = [
  {
    title: "喜欢",
    icon: "like",
    path: "like",
  },
  {
    title: "最近播放",
    icon: "recently",
    path: "recently",
  },
  {
    title: "本地和下载",
    icon: "download",
    path: "download",
  },
  {
    title: "已购音乐",
    icon: "buy",
    path: "buy",
  },
  {
    title: "视听列表",
    icon: "list",
    path: "list",
  },
];

const changePath = (path: string) => {
  emit("changePath", path);
};
</script>

<template>
  <div class="list-title">我的音乐</div>
  <NavbarList
    :items="arr"
    :selectPath="props.selectPath"
    @changePath="changePath"
  />
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.my-music {
  margin-bottom: 36px;
  @extend %itemHoverBack;
}

.list-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--website-text-primary);
}
</style>
