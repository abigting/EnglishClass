import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/home", component: "home" },
    { path: "/practise", component: "practise" },
    { path: "/lessonManagement", component: "lesson-management" },
    { path: "/classDetail", component: "class-detail" },
    { path: "/learning/:type", component: "learning" },
  ],
  npmClient: 'yarn',
});
