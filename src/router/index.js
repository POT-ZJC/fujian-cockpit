import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [ 
  {
    path: '/',
    redirect: "/cockpit-normalScreen",
    name: 'Home',
    component: Home
  }, 
  {
		path: "/demo",
		name: "demo",
		component: () => import("@/views/demo/index.vue")
	},
  {
		path: "/cockpit-normalScreen",
		name: " normalScreen",
		component: () => import("@/views/cockpit-version-1/normalScreen.vue")
	},
]
 
const routeFiles = require.context('./modules', true, /\.js$/)
const modules = routeFiles
    .keys()
    .map(path => routeFiles(path).default)
    .sort((a, b) => (a.sort > b.sort ? 1 : -1))
   
const router = new VueRouter({
  routes:  modules.concat(routes),
})

export default router
