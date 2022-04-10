// 登录请求

import axios from "../axios";

/**
 * 登录
 * @returns {AxiosPromise}
 * @param username
 * @param password
 */
export const login = (username,password)=>{
  return axios.request({
    url: '/login',
    method:'post',
    params:{
      username:username,
      password:password
    }
  })
}

/**
 * 根据用户账号获取用户所有信息
 * @param query
 * @returns {*}
 */
export const getUserByUserCode = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/getUserByUserCode/'+query,
    method:'get',
  })
}

