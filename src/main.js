import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import toast from "./components/common/toast/index"

Vue.config.productionTip = false

//添加时间总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)  //使用Vue.use就证明使用了toast的install函数

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})