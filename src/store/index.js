
import Vue from "vue"
import Vuex from "vuex";


Vue.use(Vuex)

import Header from "./Header/Header"
import User from "./User/User"


export default new Vuex.Store({
  modules:{
    Header,
    User
  }
})
