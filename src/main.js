import Vue from 'vue'
import App from './App.vue'
import elementUI from 'element-ui'
// 自定义element-ui主题
import './styles/element-variables.scss'
import './styles/common.scss'
import './registerServiceWorker'
import store from './store'
import router from './router'

Vue.config.productionTip = false


Vue.use(elementUI, {
  size: 'mini'
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
