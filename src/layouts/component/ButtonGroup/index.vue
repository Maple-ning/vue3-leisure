<script setup lang="ts">
import { isDark, toggleDark } from "@/composables";

const emit = defineEmits(["openSetting", "openLogin"]);

const avatarSrc = ref<string>("");

/** 打开登录面板 */
const handleOpenLogin = () => {
  emit("openLogin");
};

const errorHandler = () => true;

/** 打开设置面板 */
const handleOpenSetting = () => {
  emit("openSetting");
};
</script>

<template>
  <div class="button-group">
    <div class="button-item">
      <el-avatar
        :src="avatarSrc"
        :size="22"
        @click="handleOpenLogin"
        @error="errorHandler"
      >
        <img src="@/assets/images/user.png" />
      </el-avatar>
    </div>
    <div class="button-item" @click="toggleDark()">
      <SvgIcon :name="isDark ? 'sun' : 'moon'" />
    </div>
    <div class="button-item" @click="handleOpenSetting">
      <SvgIcon name="setting" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-group {
  height: 100%;
  display: flex;
  align-items: center;
  .button-item {
    margin: 0 16px;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
