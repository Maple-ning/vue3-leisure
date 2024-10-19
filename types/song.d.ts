// 歌曲信息标准格式
interface SongObjData {
  id: number;
  songUrl: string;
  songName: string;
  singerName: string;
  isLike: boolean;
  albumName: string;
  duration: number;
  imgUrl: string;
}

interface AlbumData {
  id: number;
  albumDesc?: string;
  albumName: string;
  imgUrl: string;
  songList: Arrary<SongObjData>;
  type?: string;
  editName: string;
}
