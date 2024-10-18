import { ref } from "vue";
import { defineStore } from "pinia";

export const useLikeStore = defineStore("likeList", () => {
  const likeList = ref<SongObjData[]>([]);

  const addLikeList = (song: SongObjData) => {
    const idExit = likeList.value?.some((item) => item.id === song.id);
    if (idExit) return false;
    likeList.value?.push(song);
  };
  const deleteById = (id: number) => {
    if (!likeList.value) {
      return false;
    }
    const index = likeList.value?.findIndex((item) => item.id === id);
    if (index !== -1) {
      likeList.value.splice(index, 1);
    }
  };
  return {
    likeList,
    addLikeList,
    deleteById,
  };
});
