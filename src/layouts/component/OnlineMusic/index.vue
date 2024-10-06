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
    title: "推荐",
    icon: "home",
    path: "recommend",
  },
  {
    title: "乐馆",
    icon: "MusicHall",
    path: "musicHall",
  },
  {
    title: "视频",
    icon: "video",
    path: "video",
  },
  {
    title: "雷达",
    icon: "radar",
    path: "radar",
  },
];

const changePath = (path: string) => {
  emit("changePath", path);
};
</script>

<template>
  <div class="list-title">在线音乐</div>
  <NavbarList
    :items="arr"
    :selectPath="props.selectPath"
    @changePath="changePath"
  />
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.music-classify {
  margin-bottom: 36px;
  @extend %itemHoverBack;
}

.list-title {
  font-size: 16px;
  font-weight: 700;
  padding-top: 10px;
  color: var(--website-text-primary);
}
</style>
