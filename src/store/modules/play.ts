import { ref, nextTick } from "vue";
import { defineStore } from "pinia";
import { useRecentlyStore } from "../modules/recently";

export const usePlayStore = defineStore("play", () => {
  const isPause = ref<boolean>(true); /** 歌曲是否已暂停 */
  const currentDuration = ref<number>(0); /** 当前播放处于的时间 */
  const currentTime = ref<number>(0); /** 当前播放到的时间 */
  const currentSong = ref<SongObjData>(); /** 当前播放的歌曲 */
  const playSongType = ref<playSongType>("list-order");
  const currentPlayId = ref(-1);
  const playVolume = ref(0.1); /** 歌曲音量 */

  const songList = ref<SongObjData[]>([]);

  const setCurrentSongById = (songId: number) => {
    isPause.value = false;
    currentSong.value = songList.value.find((song) => song.id === songId);
  };
  const setCurrentSongByName = (songName: string) => {
    isPause.value = false;
    currentSong.value = songList.value.find(
      (song) => song.songName === songName
    );
  };
  const setCurrentSongByIndex = (index: number) => {
    isPause.value = false;
    currentSong.value = songList.value[index];
  };
  /** 新增一些歌曲进入播放列表 */
  const addSomeSongToPlay = (songArr: Array<SongObjData>) => {
    const oldArr = songList.value;
    songList.value = [...oldArr, ...songArr];
    currentSong.value = songArr[0];
    // currentPlayId.value = songArr[0].id;
  };
  /** 新增一首歌曲进入播放列表 */
  const addSongToPlayList = (song: SongObjData) => {
    const { addRecentlySong } = useRecentlyStore();
    /** 如果播放中切换到下一首，要清空数据 */
    if (currentPlayId.value !== -1) {
      currentSong.value = undefined;
    }
    nextTick(() => {
      songList.value.push(song);
      currentSong.value = song;
      addRecentlySong(song);
    });
  };
  /**将某一首歌曲移除播放列表 */
  const removeOneSong = (songId: number) => {
    const index = songList.value.findIndex((item) => item.id === songId);
    if (index !== -1) {
      songList.value.splice(index, 1); // 直接修改原数组
    }
  };
  /** 清空播放列表 */
  const clearPlayList = () => {
    songList.value = [];
  };
  return {
    isPause,
    currentDuration,
    currentTime,
    currentSong,
    songList,
    playSongType,
    setCurrentSongById,
    setCurrentSongByName,
    setCurrentSongByIndex,
    addSomeSongToPlay,
    addSongToPlayList,
    removeOneSong,
    clearPlayList,
    currentPlayId,
    playVolume,
  };
});
