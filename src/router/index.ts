import { type RouteRecordRaw, createRouter } from "vue-router";
import { history } from "./helper";

const Layouts = () => import("@/layouts/index.vue");

/**
 * 普通路由
 * 非动态路由
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/recommend",
    children: [
      {
        path: "buy",
        name: "Buy",
        component: () => import("@/views/buy/index.vue"),
        meta: {
          title: "已购音乐",
          svgIcon: "buy",
          affix: true,
        },
      },
      {
        path: "like",
        name: "Like",
        component: () => import("@/views/like/index.vue"),
        meta: {
          title: "喜欢",
          svgIcon: "like",
          affix: true,
        },
      },
      {
        path: "recently",
        name: "Recently",
        component: () => import("@/views/recently/index.vue"),
        meta: {
          title: "最近播放",
          svgIcon: "recently",
          affix: true,
        },
      },
      {
        path: "download",
        name: "Download",
        component: () => import("@/views/download/index.vue"),
        meta: {
          title: "最近播放",
          svgIcon: "download",
          affix: true,
        },
      },
      {
        path: "list",
        name: "List",
        component: () => import("@/views/list/index.vue"),
        meta: {
          title: "试听列表",
          svgIcon: "list",
          affix: true,
        },
      },
      {
        path: "recommend",
        name: "Recommend",
        component: () => import("@/views/recommend/index.vue"),
        meta: {
          title: "推荐",
          svgIcon: "recommend",
          affix: true,
        },
      },
      {
        path: "musicHall",
        name: "MusicHall",
        component: () => import("@/views/musicHall/index.vue"),
        meta: {
          title: "乐馆",
          svgIcon: "musicHall",
          affix: true,
        },
      },
      {
        path: "video",
        name: "Video",
        component: () => import("@/views/video/index.vue"),
        meta: {
          title: "视频",
          svgIcon: "video",
          affix: true,
        },
      },
      {
        path: "radar",
        name: "Radar",
        component: () => import("@/views/radar/index.vue"),
        meta: {
          title: "雷达",
          svgIcon: "radar",
          affix: true,
        },
      },
      {
        path: "songlist/:id",
        component: () => import("@/views/songlist/index.vue"),
      },
    ],
  },
];

const router = createRouter({ history, routes: constantRoutes });

export default router;
