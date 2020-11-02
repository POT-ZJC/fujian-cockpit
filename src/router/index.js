import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/bridge-cockpit/bridgeManage/maintenance-panoramic",
    name: 'Home',
    component: Home
  }, 
]
 
const routeFiles = require.context('./modules', true, /\.js$/)
const modules = routeFiles
    .keys()
    .map(path => routeFiles(path).default)
    .sort((a, b) => (a.sort > b.sort ? 1 : -1))
 
const router = new VueRouter({
  routes: modules,
})

export default router
