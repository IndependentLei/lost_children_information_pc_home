// 注册请求

import axios from "../axios";

/**
 * 首页展示前五个儿童信息
 * @param query
 * @returns {AxiosPromise}
 */
export const register = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/add',
    method:'post',
    data:query
  })
}
