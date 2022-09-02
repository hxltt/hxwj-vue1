import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Home from '../components/home/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import Register from '../components/Register'
// import Editor from '../components/admin/content/ArticleEditor'

Vue.use(Router)

export default new Router({
  // 把 Vue 中配置的路由从默认的 hash 模式切换为 histroy 模式
  mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          // 区分页面是否需要拦截
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/jotter',
          name: 'Jotter',
          component: () => import('../components/jotter/Jotter')
        },
        {
          path: '/jotter/detail',
          name: 'detail',
          component: () => import('../components/jotter/Detail.vue')
        },
        {
          path: '/jotter/jotterWrite',
          name: 'jotterWrite',
          component: () => import('../components/jotter/componet/JotterWrite')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../components/user/User')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
    // {
    //   path: '/admin/content/editor',
    //   name: 'Editor',
    //   component: Editor,
    //   meta: {
    //     requireAuth: true
    //   }
    // }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
