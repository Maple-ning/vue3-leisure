import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    svgIcon?: string;
    hidden?: boolean;
  }
}
