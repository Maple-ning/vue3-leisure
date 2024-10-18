import isEqual from "lodash/isEqual";

/**
 * @desc: 返回下一首歌曲
 * @param arr 原始数组
 * @param current 当前的数组元素
 * @param playSongType 播放类型
 */

export function getNextSong<T>(
  arr: T[],
  current: T,
  playSongType: playSongType
): T | undefined {
  const findIndex = arr.findIndex((item) => isEqual(item, current));
  if (findIndex === -1) {
    return arr[0];
  }
  const isLastOne = findIndex === arr.length - 1;
  if (playSongType === "list-order") {
    if (isLastOne) {
      return undefined;
    }
    return arr[findIndex + 1];
  }

  // 对于列表循环和单曲循环，处理逻辑相似
  if (playSongType === "list-loop" || playSongType === "single-song") {
    return isLastOne ? arr[0] : arr[findIndex + 1];
  }

  // 处理随机播放
  if (playSongType === "shuffle-song") {
    return undefined;
  }
}
