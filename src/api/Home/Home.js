// 首页信息

import axios from "../axios";

/**
 * 首页数据
 * @param query
 * @returns {AxiosPromise}
 */
export const homeInfo = ()=>{
  return axios.request({
    url: '/lostchildinfo/frontHome/all',
    method:'get',
  })
}
