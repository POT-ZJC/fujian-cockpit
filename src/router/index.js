import Vue from "vue";
import VueRouter from "vue-router"; 

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/cockpit-overview",
    name: "Home",
    // component: Home,
  },
  
  {
    path: "/demo",
    name: "demo",
    component: () => import("@/views/demo/index.vue"),
  },
 
];

const routeFiles = require.context("./modules", true, /\.js$/);
const modules = routeFiles
  .keys()
  .map((path) => routeFiles(path).default)
  .sort((a, b) => (a.sort > b.sort ? 1 : -1));

const router = new VueRouter({
  routes: modules.concat(routes),
});

export default router;
