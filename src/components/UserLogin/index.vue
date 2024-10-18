<script setup lang="ts">
const visible = defineModel({ type: Boolean, default: false });
</script>

<template>
  <el-dialog v-model="visible" width="500" center>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
