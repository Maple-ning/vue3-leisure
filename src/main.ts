// core
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// load
import { loadPlugins } from "@/plugins";
import { loadSvg } from "@/icons";

// css
import "normalize.css";
import "animate.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";

// 全局注册的组件
import PlayImage from "@/components/PlayImage/index.vue";

const app = createApp(App);

// 加载插件
loadPlugins(app);
/** 加载全局 SVG */
loadSvg(app);

app.use(store).use(router);
app.component(PlayImage);
router.isReady().then(() => {
  app.mount("#app");
});
