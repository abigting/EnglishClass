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
  // base:'./',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  history:{
    type:"hash"
  },
  proxy: {
    '/course/': {
              target: '/lccweb.natapp1.cc',
              changeOrigin: true,
              // pathRewrite: {'^/api': ''},
    },
}
});
