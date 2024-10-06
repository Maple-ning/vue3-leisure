<script setup lang="ts">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import useTableHeight from "@/hooks/useTableHeight";

const tableWrapperRef = ref();

const { tableHeight } = useTableHeight(tableWrapperRef);

const activeName = ref<string>("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const tableData = [
  {
    songName: "喜欢你",
    singerName: "邓紫棋",
    isLike: true,
    albumName: "喜欢你",
    duration: 190,
  },
  {
    songName: "Blinding Lights",
    singerName: "The Weeknd",
    isLike: true,
    albumName: "After Hours",
    duration: 200,
  },
  {
    songName: "Levitating",
    singerName: "Dua Lipa",
    isLike: true,
    albumName: "Future Nostalgia",
    duration: 203,
  },
  {
    songName: "Watermelon Sugar",
    singerName: "Harry Styles",
    isLike: false,
    albumName: "Fine Line",
    duration: 174,
  },
  {
    songName: "drivers license",
    singerName: "Olivia Rodrigo",
    isLike: true,
    albumName: "SOUR",
    duration: 242,
  },
  {
    songName: "Peaches",
    singerName: "Justin Bieber",
    isLike: true,
    albumName: "Justice",
    duration: 198,
  },
  {
    songName: "Good 4 U",
    singerName: "Olivia Rodrigo",
    isLike: true,
    albumName: "SOUR",
    duration: 178,
  },
  {
    songName: "Stay",
    singerName: "The Kid LAROI & Justin Bieber",
    isLike: true,
    albumName: "F*CK LOVE 3",
    duration: 141,
  },
  {
    songName: "Kiss Me More",
    singerName: "Doja Cat feat. SZA",
    isLike: false,
    albumName: "Planet Her",
    duration: 208,
  },
  {
    songName: "Montero (Call Me By Your Name)",
    singerName: "Lil Nas X",
    isLike: true,
    albumName: "MONTERO",
    duration: 137,
  },
  {
    songName: "Shivers",
    singerName: "Ed Sheeran",
    isLike: false,
    albumName: "Equals",
    duration: 207,
  },
  {
    songName: "Leave The Door Open",
    singerName: "Bruno Mars, Anderson .Paak, Silk Sonic",
    isLike: true,
    albumName: "An Evening with Silk Sonic",
    duration: 242,
  },
  {
    songName: "Save Your Tears",
    singerName: "The Weeknd & Ariana Grande",
    isLike: true,
    albumName: "After Hours",
    duration: 215,
  },
  {
    songName: "Bad Habits",
    singerName: "Ed Sheeran",
    isLike: false,
    albumName: "Equals",
    duration: 230,
  },
  {
    songName: "Deja Vu",
    singerName: "Olivia Rodrigo",
    isLike: true,
    albumName: "SOUR",
    duration: 215,
  },
  {
    songName: "Take My Breath",
    singerName: "The Weeknd",
    isLike: true,
    albumName: "After Hours",
    duration: 220,
  },
  {
    songName: "Heat Waves",
    singerName: "Glass Animals",
    isLike: true,
    albumName: "Dreamland",
    duration: 238,
  },
  {
    songName: "Butter",
    singerName: "BTS",
    isLike: false,
    albumName: "Butter",
    duration: 165,
  },
  {
    songName: "Industry Baby",
    singerName: "Lil Nas X & Jack Harlow",
    isLike: true,
    albumName: "MONTERO",
    duration: 212,
  },
  {
    songName: "Don't Go Yet",
    singerName: "Camila Cabello",
    isLike: true,
    albumName: "Familia",
    duration: 189,
  },
  {
    songName: "Falling",
    singerName: "Harry Styles",
    isLike: true,
    albumName: "Fine Line",
    duration: 240,
  },
];
const url =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

const sortByChinese = (a, b) => {
  return a.name.localeCompare(b.name, "zh-Hans-CN");
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // 使用 padStart 确保分钟和秒都是两位数字
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};
</script>

<template>
  <div class="song-list-container app-container">
    <div class="top-song-info">
      <el-image class="album-picture" :src="url" fit="fill" />
      <div class="album-info">
        <div class="album-name">休闲歌单</div>
        <div class="album-desc">这是一段描述</div>
        <div class="button-group">
          <div class="button-item">
            <SvgIcon name="play" />
            播放
          </div>
          <div class="button-item">
            <SvgIcon name="share" />
            播放
          </div>
        </div>
      </div>
    </div>
    <el-tabs
      class="song-tab-group"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="歌曲" name="first"></el-tab-pane>
      <el-tab-pane label="最近收藏" name="second"></el-tab-pane>
      <el-tab-pane label="评论" name="third"></el-tab-pane>
    </el-tabs>
    <div class="song-info-list" ref="tableWrapperRef">
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'songName', order: 'ascending' }"
        :height="tableHeight"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          :sortable="true"
          :sort-method="sortByChinese"
          label="歌名/歌手"
          min-width="300"
        >
          <template #default="scope">
            <div class="song-info">
              <el-image
                style="width: 40px; height: 40px"
                :src="url"
                fit="fill"
              />
              <div class="song-info-item">
                <div class="song-name">{{ scope.row.songName }}</div>
                <div class="singer-name">{{ scope.row.singerName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template #default="scope">
            <div class="evaluate-icon">
              <SvgIcon
                :name="scope.row.isLike ? 'redLike' : 'like'"
                @click="scope.row.isLike = !scope.row.isLike"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="albumName" label="专辑" min-width="150" />
        <el-table-column prop="duration" label="时长" min-width="150">
          <template #default="scope">
            {{ formatTime(scope.row.duration) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.song-list-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.top-song-info {
  height: 150px;
  display: flex;
  font-family: "yahei";
  .album-picture {
    width: 150px;
    height: 150px;
    background-color: skyblue;
  }
  .album-info {
    flex: 1;
    margin-left: 20px;
    position: relative;
    .album-name {
      font-size: 20px;
      color: var(--website-text-primary);
      margin-bottom: 10px;
    }
    .album-desc {
      font-size: 14px;
      color: var(--website-text-desc);
      margin-bottom: 10px;
    }
    .button-group {
      position: absolute;
      bottom: 0;
      display: flex;
      .button-item {
        padding: 8px 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgb(220, 223, 230);
        font-size: 14px;
        &:not(:last-child) {
          margin-right: 30px;
        }
      }
      svg {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
  }
}
:deep(.song-tab-group) {
  margin: 16px 0;
  .el-tabs__nav-wrap:after {
    height: 0;
  }
}
.song-info-list {
  flex: 1;
}
.song-info {
  display: flex;
  .song-info-item {
    margin-left: 20px;
  }
  .song-name {
    line-height: 22px;
    color: var(--website-text-primary);
  }
  .singer-name {
    line-height: 22px;
    color: var(--website-text-desc);
  }
}
.evaluate-icon {
  svg {
    width: 20px;
    height: 20px;

    cursor: pointer;
  }
  svg:hover {
    color: rgb(252, 120, 120);
  }
}
</style>
