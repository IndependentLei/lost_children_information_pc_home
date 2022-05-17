import axios from "../axios";


/**
 * 更具用户名获取用户信息
 * @param query
 * @returns {AxiosPromise}
 */
export const getUserByUserCode = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/getUserByUserCode/'+query,
    method:'get'
  })
}

/**
 * 修改密码、重置密码
 * @param query
 * @returns {*}
 */
export const changePwd = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/changePwd',
    method:'post',
    data:query
  })
}


/**
 * 根据用户id获取用户角色
 * @param query
 * @returns {*}
 */
export const getRoleTypeByUserId = (query)=>{
  return axios.request({
    url: '/lostchildinfo/userrole/'+query,
    method:'get',
  })
}

/**
 * 根据用户id修改角色
 * @param query
 * @returns {*}
 */
export const exitRoleByUserId = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/update',
    method:'post',
    data:query
  })
}


/**
 * 编辑用户信息
 * @param query
 * @returns {*}
 */
export const exitUserInfo = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/update',
    method:'post',
    data:query
  })
}


