// 单独引入指令文件
// import pkgName from '../packages/test-directive/index'
// 整体引入包
import Vue from 'vue'
import App from './App.vue'

import pkgName from '../packages/index'
Vue.use(pkgName)



new Vue({
  el: '#app',
  render: h => h(App)
})
