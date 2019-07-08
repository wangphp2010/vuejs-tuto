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
    count:0,
    kw : '' ,
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setKw(state, kw )
    {
      state.kw = kw
    }
     ,
    setProducts (state, products) {
      state.allProducts = products
    }
  }
})
/**
 *  commit=>mutations,用来触发同步操作的方法。
 *   dispatch =>actions,用来触发异步操作的方法。 比如向后台发送请求获取数据
 *
 * this.$store.state.kw ;
 * 只能通过定义mutaions 里的方法 再调用 this.$store.commit('setKw', 'okok'); 再能修改 allProducts 等的值
 * https://juejin.im/entry/5af3ab7b6fb9a07a9a10dd53 使用方法
 */

/** 
 * bus 传值法
 *  子传父 
 * 传值 this.bus.$emit( 'getMotcle' , this.motcle ) ;
 * 获取值 this.bus.$on("getMotcle", params => {
          this.motcle = params;
        });
*/
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

