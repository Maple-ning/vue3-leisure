<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const modules = [Autoplay, Navigation, A11y];

const props = defineProps({
  Albums: {
    type: Array<AlbumData>,
  },
});
</script>

<template>
  <div class="roll-container">
    <swiper
      direction="horizontal"
      :slidesPerView="4"
      :spaceBetween="10"
      :loop="true"
      :centeredSlides="true"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 2500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :navigation="true"
      :modules="modules"
    >
      <swiper-slide v-for="item in props.Albums" :key="item.id">
        <PlayImage :src="item.imgUrl" :song="item.songList[0]" />
        <div class="swiper-text">{{ item.albumName }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.roll-container {
  height: 300px;
}
.swiper {
  padding: 20px 0;
}
.swiper-text {
  text-align: center;
  line-height: 32px;
}
:deep(.swiper-slide) {
  cursor: pointer;
  .el-image {
    height: 200px;
  }
  &:hover {
    transform: translateY(-10px);
  }
}
</style>
