import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '图书管理',
    component:() =>import("../views/index.vue"),
    redirect:"/book",
    children:[
        {
          path:"/book",
          name:"查询图书",
          component:()=>import("../views/BookManage.vue")
        },
        {
          path:"/add",
          name:"添加图书",
          component:()=>import("../views/AddBook.vue")
        }
        ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
