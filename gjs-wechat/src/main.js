// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './routes'
import Distpicker from 'v-distpicker'
Vue.config.productionTip = false


Vue.use(VueRouter)
Vue.component('v-distpicker', Distpicker)
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
