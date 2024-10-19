<script setup lang="ts">
import useContextMenu from "@/hooks/useContextMenu";
defineProps({
  menu: {
    type: Array<MenuData>,
    default: () => [],
  },
});
const containerRef = ref(null);
const emit = defineEmits(["select"]);
const { x, y, id, showMenu } = useContextMenu(containerRef);
// 菜单的点击事件
function handleClick(item: MenuData) {
  // 选中菜单后关闭菜单
  showMenu.value = false;
  // 并返回选中的菜单
  emit("select", item, id.value);
}
</script>

<template>
  <div ref="containerRef">
    <slot></slot>
    <Teleport to="body">
      <div
        v-if="showMenu"
        class="context-menu"
        :style="{ left: x + 'px', top: y + 'px' }"
      >
        <div class="menu-list">
          <!-- 添加菜单的点击事件 -->
          <div
            @click="handleClick(item)"
            class="menu-item"
            v-for="item in menu"
            :key="item.label"
          >
            <SvgIcon :name="item.iconName" />{{ item.label }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  z-index: 999;
  background-color: white;
  width: 100px;
  padding: 6px 0;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
  font-size: 14px;
  .menu-item {
    padding-left: 10px;
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    > svg {
      margin-right: 10px;
    }
    &:hover {
      background-color: var(--website-item-hover);
    }
  }
}
</style>
