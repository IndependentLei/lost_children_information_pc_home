// 轮播图管理请求

import axios from "../axios";

/**
 * 轮播图播放
 * @param query
 * @returns {AxiosPromise}
 */
export const allSlideshow = ()=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/all',
    method:'get'
  })
}
