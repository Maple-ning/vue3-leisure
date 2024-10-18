<script setup lang="ts">
import type { DrawerProps } from "element-plus";

const visible = defineModel({ type: Boolean, default: false });

defineProps({ size: { type: Number, default: 400 }, title: { type: String } });

const direction = ref<DrawerProps["direction"]>("rtl");

const handleClose = () => {
  visible.value = false;
};
</script>

<template>
  <div class="drawer-root">
    <el-drawer
      v-model="visible"
      :direction="direction"
      :size="size"
      :before-close="handleClose"
    >
      <template #header>
        <span class="drawer-title">{{ title }}</span>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/mixins.scss" as *;
.drawer-title {
  color: var(--website-text-primary);
}
</style>
