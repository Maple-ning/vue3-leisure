<script setup lang='ts'>
interface NavItem {
  title: string
  icon: string
  path: string
}

const props = defineProps<{ items: NavItem[]; selectPath: String }>()

const emit = defineEmits(['changePath'])

// 改变选中的类别
const changePath = (item: NavItem) => {
  emit('changePath', item.path)
}
</script>

<template>
  <ul class='nav-list'>
    <li v-for="(item,index) in items"
        :key="index"
        :class="{'select-item':item.path === props.selectPath}"
        @click="changePath(item)">
      <SvgIcon :name="item.icon"
               class="icon-container" />
      {{ item.title  }}
    </li>
  </ul>
</template>

<style lang='scss' scoped>
@import '@/styles/mixins.scss';
.nav-list {
  @extend %itemHoverBack;
}

.select-item {
  color: #3dd68c;
}

.icon-container {
  margin-right: 8px;
}
</style>
