import { ref } from "vue";
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", () => {
  const pickPath = ref<string>("recommend"); /** 左侧选中的模块，默认选中推荐 */
  return {
    pickPath,
  };
});
