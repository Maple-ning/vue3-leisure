import {
  type Router,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const test = "hash";

// 路由模式
export const history =
  test === "hash" ? createWebHashHistory() : createWebHistory();
