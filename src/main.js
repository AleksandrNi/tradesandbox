import Vue from 'vue'
import './plugins/vuetify'
import './plugins/chart'
import './plugins/editor'
import './plugins/table'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'

// router.beforeEach((to, from, next) => {
//   console.log(global beforeEach);
//   next('/')
//   or
//   next({path:'/'})
//   or
//   next(false)
// })


const router = new VueRouter({
  mode: 'history',
  routes
})
console.clear();

import { store } from './store/store'

Vue.use(VueRouter)

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),

})
