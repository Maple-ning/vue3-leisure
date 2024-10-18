import { ref } from "vue";
import { defineStore } from "pinia";

export const useDownloadStore = defineStore("download", () => {
  const downloadList = ref([]);
  return { downloadList };
});
