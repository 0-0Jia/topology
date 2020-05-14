import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/hello',
    name: 'hello',
    component: resolve => require(['@/view/hello/hello'], resolve)
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/view/index/index'], resolve),
    children: [
      {
        path: '/index',
        name: 'entire',
        component: resolve => require(['@/components/entire'], resolve),
      },
      {
        path: '/index/part',
        name: 'part',
        component: resolve => require(['@/components/part'], resolve)
      }
    ]
  }, {
    path: '/',
    redirect: '/hello'
  }
  ]
})