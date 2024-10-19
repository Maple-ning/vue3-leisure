import { onMounted, onUnmounted, ref } from "vue";
export default function (containerRef: any) {
  const showMenu = ref(false);
  const x = ref<number>(0);
  const y = ref<number>(0);
  const id = ref<number>();
  const handleContextMenu = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    showMenu.value = true;
    /** 获取被右击元素的id */
    const parts = e.target.className.split(":");
    if (parts.length > 1) {
      id.value = Number(parts[1]);
    }
    x.value = e.clientX;
    y.value = e.clientY;
  };
  function closeMenu() {
    showMenu.value = false;
  }
  onMounted(() => {
    const div = containerRef.value;
    div.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", closeMenu, true);
    window.addEventListener("contextmenu", closeMenu, true);
  });
  onUnmounted(() => {
    const div = containerRef.value;
    div?.removeEventListener("contextmenu", handleContextMenu);
    window.removeEventListener("click", closeMenu, true);
    window.removeEventListener("contextmenu", closeMenu, true);
  });
  return {
    showMenu,
    x,
    y,
    id,
  };
}
