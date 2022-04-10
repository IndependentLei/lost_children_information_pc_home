export default {
  namespaced:true,
  actions:{

  },
  mutations:{
    // 存入用户信息
    SETUSERINFO(state,val){
      state.userInfo = val
    },
    CHANGELOGINFLAG(state,val){
      state.loginFlag = val
    }
  },
  state:{
    userInfo:JSON.parse(localStorage.getItem("userInfo")),
    loginFlag:JSON.parse(localStorage.getItem("userInfo")) !== null ? true : false
  }
}
