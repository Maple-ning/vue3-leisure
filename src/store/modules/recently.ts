import { ref } from "vue";
import { defineStore } from "pinia";

export const useRecentlyStore = defineStore("recently", () => {
  const recentlyList = ref<SongObjData[]>([]);

  const addRecentlySong = (song: SongObjData) => {
    const idExit = recentlyList.value?.some((item) => item.id === song.id);
    if (idExit) return false;
    recentlyList.value?.push(song);
  };
  return {
    recentlyList,
    addRecentlySong,
  };
});
