// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
  

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
 

//import store from './store'; // 或者用以下代码

import Vuex from 'vuex'
 
Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
    allProducts: [1,2,3,4,5],
    count:0
  },
  mutations: {
    increment (state) {
      state.count++
    },
     
    setProducts (state, products) {
      state.allProducts = products
    }
  }
})
// 只能通过定义mutaions 里的方法 再调用 this.$store.commit('setProducts', {//..options}) 再能修改 allProducts 等的值
// https://juejin.im/entry/5af3ab7b6fb9a07a9a10dd53 使用方法



 
Vue.prototype.bus = new Vue()

 
Vue.use(VueAxios, axios)
Vue.filter('trimStr', function (value) {
  if (!value) return ''
      value = value.toString()
      return value.replace(/\<[\d\D]+?\>/g,'')
})

Vue.filter('getUrlImg', function (value) {
  if (!value) return ''
      value = value.toString()
      value = value.replace( /^[\d\D]+src\=\"/ , '' )
      value = value.replace( /\"[\d\D]+$/ , '' )
      return value 
})







Vue.config.productionTip = false
 

 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
   
})

