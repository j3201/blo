import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/index/home.vue'),
    redirect:'/index',
    //头部导航栏的子组件路由
    children:[
      {
        path:'/index',
        name:'index',
        component:()=>import('../components/Nav/menuNav/index.vue'),
      },
      {
        path:'/blog',
        name:'blog',
        component:()=>import('../components/Nav/menuNav/blog.vue')
      },
      {
        path:'/loginRes',
        name:"loginRes",
        component:()=>import('../components/Nav/menuNav/loginRes.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
