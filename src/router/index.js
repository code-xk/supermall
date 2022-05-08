import Vue from 'vue'
import Router from 'vue-router'


const Home = () => import('../views/home/home')
const Category = () => import('../views/category/category')
const Shopcart = () => import('../views/shopcart/shopcart')
const Profile = () => import('../views/profile/profile')
const Detail = () => import('../views/detail/detail')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/shopcart',
      component:Shopcart
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/detail/:id',
      component:Detail
    }
  ],
  mode:'history'
})
