
// 儿童信息请求

import axios from "../axios";

/**
 * 首页展示前五个儿童信息
 * @param query
 * @returns {AxiosPromise}
 */
export const homeChildInfo = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfo/list',
    method:'post',
    data:query
  })
}

/**
 * 更具id查询丢失儿童的图片
 * @param query
 * @returns {AxiosPromise}
 */
export const getChildAttachById = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfoAttach/'+query,
    method:'get',
  })
}

/**
 * 更具儿童信息id查询评论
 * @param query
 * @returns {AxiosPromise}
 */
export const getCommentById = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfo/commentById/'+query,
    method:'get',
  })
}

/**
 * 发送父子评论
 * @param query
 * @returns {AxiosPromise}
 */
export const sendFatherComment = (query)=>{
  return axios.request({
    url: '/lostchildinfo/fatherComment/add',
    method:'post',
    data:query
  })
}

/**
 * 发送子评论
 * @param query
 * @returns {AxiosPromise}
 */
export const sendSonComment = (query)=>{
  return axios.request({
    url: '/lostchildinfo/sonComment/add',
    method:'post',
    data:query
  })
}


/**
 * 分页查找儿童信息
 * @param query
 * @returns {AxiosPromise}
 */
export const selectChildByPage = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfo/listAndPicAttach',
    method:'post',
    data:query
  })
}


