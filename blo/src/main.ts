import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'

import './components/globals/globals'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import axios from 'axios'

Vue.prototype.axios=axios
Vue.use(elementUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
