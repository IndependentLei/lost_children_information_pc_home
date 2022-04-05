import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home/Home'
import MainPage from '../views/mainPage'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', //hash模式
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage,
      // 是否需要鉴权
      meta:{
        Auth:false
      },
      children:[
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            Auth: false
          }
        },
        {
          path: '/childrens',
          name: 'childrens',
          component: () => import('@/views/Childrens/Childrens'),
          meta: {
            Auth: false
          }
        },
        {
          path:'/goHomeDream',
          name:'goHomeDream',
          component: () => import('@/views/GoHomeDream/GoHomeDream'),
          meta:{
            Auth:false
          }
        },
        {
          path:'/volunteer',
          name:'volunteer',
          component: () => import('@/views/Volunteer/Volunteer'),
          meta:{
            Auth:false
          }
        },
        {
          path:'/me',
          name:'me',
          component: () => import('@/views/Me/Me'),
          meta:{
            Auth:false
          }
        },
        {
          path:'/childrenInfo',
          name:'childrenInfo',
          component: () => import('@/views/ChildrenInfo/ChildrenInfo'),
          meta:{
            Auth:false
          }
        },
      ]
    }
  ]
})
