import { computed, reactive, type Ref } from "vue";
import { storeToRefs } from "pinia";
import type { IUseAudioReturn } from "./interface";
import _ from "lodash";
import { usePlayStore } from "@/store/modules/play";

export const useAudio = (
  audioRef: Ref<HTMLAudioElement>,
  songState: SongState,
  playNext: () => void,
  autoEndedPlayNext: () => void
): IUseAudioReturn => {
  const playStore = usePlayStore();
  const { isPause, currentTime, currentDuration } = storeToRefs(playStore);

  /** 初始化音乐播放器 */
  const initAudio = () => {
    const ele = audioRef.value;

    /** 当 paused 属性由 true 转换为 false 时触发 play 事件，事件触发原因一般为 play() 方法调用，或者 autoplay 标签设置。 */
    // 开始播放音乐
    ele.onplay = (ev: Event) => {};
    // 获取当前播放时间
    ele.ontimeupdate = () => {
      if (!songState.isAdjusting) {
        _.debounce(() => {
          currentTime.value = Number(ele.currentTime.toFixed(3));
        }, 1000)();
        currentTime.value = ele.currentTime;
      }
    };
    // 当前音乐播放完毕
    ele.onended = () => {
      autoEndedPlayNext();
    };
    // 音乐播放出错
    ele.onerror = () => {
      if (!isPause.value) {
        console.log("播放出错啦！");

        const timer = setTimeout(() => {
          clearTimeout(timer);
          playNext();
        }, 1000);
      }
    };
    // 音乐进度拖动大于加载时重载音乐
    ele.onstalled = () => {};
    // 将能播放的音乐加入播放历史
    ele.oncanplay = () => {};
    // 音频数据不可用时
    ele.onstalled = () => {
      console.log("音频数据不可用时");
    };
    // 当音频已暂停时
    ele.onpause = () => {};

    // 监听音频完成加载，获取音频时长
    ele.addEventListener("loadedmetadata", () => {
      try {
        if (ele.buffered.length > 0) {
          currentDuration.value = Number(ele.duration.toFixed(3));
        }
      } catch (error) {
        console.log("error", error);
      }
    });
  };
  return { initAudio };
};
