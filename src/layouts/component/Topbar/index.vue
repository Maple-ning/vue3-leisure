<script setup lang="ts">
import { ref, computed } from "vue";
import { ButtonGroup } from "../index";
import UserLogin from "@/components/UserLogin/index.vue";
import SettingPanel from "@/components/SettingPanel/index.vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchMusic = ref("");

/** 路由前进一步 */
const goForward = () => {
  router.go(1);
};

/** 路由后退一步 */
const goRecoil = () => {
  router.go(-1);
};

/** 路由能否后退的标志 */
const canRecoil = computed(() => window.history.length > 1);

/** 路由能否前进的标志 */

const loginVisible = ref<boolean>(false);

const openLogin = () => {
  loginVisible.value = true;
};

const drawerVisible = ref<boolean>(false);

/** 打开设置面板 */
const openSetting = () => {
  drawerVisible.value = true;
};
</script>

<template>
  <div class="topbar-container">
    <div class="advance-arrow">
      <SvgIcon
        name="leftArrow"
        @click="goRecoil"
        class="left-arrow"
        :class="canRecoil ? 'light-icon' : 'dark-icon'"
      />
      <SvgIcon name="rightArrow" @click="goForward" class="right-arrow" />
    </div>
    <div class="search-box">
      <el-input
        v-model="searchMusic"
        style="width: 240px"
        size="small"
        placeholder="搜索音乐"
        :suffix-icon="Search"
      />
    </div>
    <div class="right-setting">
      <ButtonGroup @openSetting="openSetting" @openLogin="openLogin" />
    </div>
  </div>
  <UserLogin v-model="loginVisible" />
  <SettingPanel v-model="drawerVisible" :title="'设置'" :size="200" />
</template>

<style lang="scss" scoped>
.topbar-container {
  display: flex;
  height: 60px;
  position: relative;
  border-bottom: 1px solid rgba(84, 84, 84, 0.48);
  z-index: 9;
  background-color: var(--el-bg-color-page);
  color: var(--website-text-primary);
}

.advance-arrow {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.left-arrow {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
}

.right-arrow {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.search-box {
  display: flex;
  align-items: center;
}

.right-setting {
  position: absolute;
  display: flex;
  right: 10px;
  height: 100%;
}
</style>
