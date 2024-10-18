/**
 * "list-order":"列表顺序播放"
 * "list-loop":"列表循环播放"
 * "single-song":"单曲循环"
 * "shuffle-song":"列表随机"
 */
type playSongType = "list-order" | "list-loop" | "single-song" | "shuffle-song";

interface SongState {
  isAdjusting: boolean /** 是否正在调整播放进度 */;
}
