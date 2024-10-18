<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Logo, OnlineMusic, MyMusic, SongList } from "../";
import { useUserStore } from "@/store/modules/user";
import { useSidebarStore } from "@/store/modules/sidebar";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const { token } = storeToRefs(userStore);

const sidebarStore = useSidebarStore();
const { pickPath } = storeToRefs(sidebarStore);

const changePath = (data: string) => {
  pickPath.value = data;
  router.push("/" + data);
};
</script>

<template>
  <div class="side-container">
    <Logo />
    <div class="sidebar-content">
      <OnlineMusic :selectPath="pickPath" @changePath="changePath" />
      <MyMusic :selectPath="pickPath" @changePath="changePath" />
      <SongList
        v-if="token !== ''"
        :selectPath="pickPath"
        @changePath="changePath"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.side-container {
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-primary);
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  display: flex;
  flex-direction: column;

  .sidebar-content {
    min-height: 0;
    padding: 0 10px;
    flex: 1;
    overflow-y: scroll;
    background-color: var(--website-sidebar-bg);
    font-family: "yahei";
    border-right: 1px solid rgba(84, 84, 84, 0.48);
    @extend %hiddenScollbar;
  }
}
</style>
