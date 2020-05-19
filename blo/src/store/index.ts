import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import navModules from './navModules'
import contextModules from './contextModules'
export default new Vuex.Store({
  modules: {
    navModules,
    contextModules
  }
})
