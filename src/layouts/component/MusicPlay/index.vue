<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAudio } from "./hooks/index";
import { getNextSong } from "@/utils/play";
import { usePlayStore } from "@/store/modules/play.ts";
import MusicProgressBar from "@/components/MusicProgressBar/index.vue";

defineOptions({
  name: "MusicPlay",
});

const store = usePlayStore();

const {
  isPause,
  currentDuration,
  currentTime,
  currentSong,
  playSongType,
  songList,
  currentPlayId,
  playVolume,
} = storeToRefs(store);

/** 播放器元素 */
const audioPlayerRef = ref<HTMLAudioElement>();

/** 当前播放的歌曲的url */
const currentSongUrl = computed(() => {
  if (currentSong.value) {
    return currentSong.value.songUrl;
  }
  return "";
});

/** 当前歌曲播放状态 */
const songState = reactive({
  isAdjusting: false,
});

/** 当前歌曲的播放进度 */
const currentPlayRate = computed(
  () => currentTime.value / currentDuration.value
);

const handlePlayRateChange = (innerPercentage: number, percentage?: number) => {
  if (percentage !== undefined) {
    songState.isAdjusting = false;
    currentTime.value = currentDuration.value * percentage;
    if (audioPlayerRef.value) {
      audioPlayerRef.value.currentTime = currentTime.value;
    }
  } else {
    songState.isAdjusting = true;
    currentTime.value = currentDuration.value * innerPercentage;
  }
};

/** 控制是否在拖拽进度 */
const handleIsDragingChange = (isDraging: boolean) => {
  songState.isAdjusting = isDraging;
  if (audioPlayerRef.value) {
    audioPlayerRef.value.currentTime = currentDuration.value;
  }
};

/** 播放上一首音乐 */
const playPrev = () => {
  const findIndex = songList.value.findIndex(
    (song: SongObjData) => song.id === currentPlayId.value
  );
  /**
   * 当前无播放歌曲或者当前播放歌曲在列表中找不到，则播放列表的第一首歌曲
   */
  if (currentPlayId.value === -1 || findIndex === -1) {
    currentPlayId.value = songList.value[0].id;
    currentSong.value = songList.value[0];
    return;
  } else if (findIndex === 0) {
    /** 当前播放的是第一首，点击播放上一首歌曲则播放列表中的最后一首 */
    const length = songList.value.length;
    currentPlayId.value = songList.value[length - 1].id;
    currentSong.value = songList.value[length - 1];
    return;
  }
  const nextSong = songList.value[findIndex - 1];
  currentPlayId.value = nextSong.id;
  currentSong.value = nextSong;
};

/** 播放下一首音乐 */
const playNext = () => {
  /** 按照播放顺序，返回当前播放的歌曲 */
  const nextSong = getNextSong(
    songList.value,
    currentSong.value,
    playSongType.value
  );
  if (!nextSong) {
    playPause();
  } else {
    currentPlayId.value = nextSong.id;
  }
  currentSong.value = nextSong;
};

/** 歌曲播放完毕后，自动播放下一曲 */
const autoEndedPlayNext = () => {
  playNext();
  isPause.value = true;
};

/** 播放音乐 */
const playSong = (type: string) => {
  if (audioPlayerRef.value !== undefined) {
    isPause.value = false;
    // /** 如果当前歌曲已经播放，则设置当前播放时长 */
    if (type !== "newSong" && currentTime.value) {
      audioPlayerRef.value.currentTime = currentTime.value;
    }
    audioPlayerRef.value.play();
  }
};

/** 暂停播放 */
const playPause = () => {
  if (audioPlayerRef.value !== undefined) {
    isPause.value = true;
    audioPlayerRef.value.pause();
  }
};

defineExpose({ playSong, playPause, playPrev, playNext });

watch(
  () => currentSong.value,
  (newValue) => {
    if (newValue !== undefined) {
      currentPlayId.value = newValue.id;
      nextTick(() => {
        playSong("newSong");
      });
    }
  },
  { immediate: true }
);

watch(
  () => playVolume.value,
  (newVal) => {
    if (audioPlayerRef.value !== undefined) {
      audioPlayerRef.value.volume = newVal;
    }
  },
  {}
);

onMounted(() => {
  if (audioPlayerRef.value !== undefined) {
    audioPlayerRef.value.volume = playVolume.value;
    isPause.value = true;
    const { initAudio } = useAudio(
      audioPlayerRef as Ref<HTMLAudioElement>,
      songState,
      playNext,
      autoEndedPlayNext
    );
    initAudio();
  }
});
</script>

<template>
  <div class="music-play-container">
    <audio
      ref="audioPlayerRef"
      class="audio-element"
      :src="currentSongUrl"
      controls
    ></audio>
    <MusicProgressBar
      :percentage="currentPlayRate * 100"
      :playVolume="playVolume"
      @change-percentage="handlePlayRateChange"
      @change-darging-state="handleIsDragingChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.music-play-container {
  position: absolute;
  top: -6px;
  width: 100%;
}

.audio-element {
  display: none;
}
</style>
