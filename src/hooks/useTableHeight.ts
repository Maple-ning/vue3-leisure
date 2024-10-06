import debounce from "lodash/debounce";
import { ref, onMounted } from "vue";

/**
 * table组件自适应hooks，用于table高度自适应
 * @param {Ref<HTMLElement>} tableWrapperRef 表格父容器ref
 */
export default function useTableHeight(
  tableWrapperRef: Ref<HTMLElement | undefined>
) {
  const tableHeight = ref<number>();

  const setTableHeight = () => {
    if (!tableWrapperRef.value) return;
    tableHeight.value = tableWrapperRef.value.clientHeight;
  };

  const resizeHandler = debounce(setTableHeight, 30, {
    trailing: true,
  });

  onMounted(() => {
    setTableHeight();
    window.addEventListener("resize", resizeHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
  });

  return {
    tableHeight,
    setTableHeight,
  };
}
