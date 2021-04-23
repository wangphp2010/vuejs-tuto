 
import Vue from 'vue'

import Vuex from 'vuex'
 

 

Vue.use(Vuex)

export default  new Vuex.Store({
  state: {
    allProducts: [1,2,3,4,5],
    count:0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

