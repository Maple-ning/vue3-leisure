import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>("123");

  /** 登录 */
  const login = () => {};
  return { token, login };
});
