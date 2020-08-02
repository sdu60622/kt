import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../components/Dashboard.vue'
import Products from '../components/Products.vue'

// import { component } from 'vue/types/umd'

// import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'KT TAIWAN'
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Menu.vue'),
    meta: {
      title: 'KT | 精選菜單'
    }
  },
  {
    path: '/menu/:id',
    name: 'ItemCheck',
    component: () => import(/* webpackChunkName: "settings" */ '../views/ItemCheck.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Contact.vue'),
    meta: {
      title: 'KT | 聯絡我們'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Login.vue'),
    meta: {
      title: 'KT | 店家登入'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Cart.vue'),
    meta: {
      title: 'KT | 結帳'
    }
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
    },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { title: 'KT | 店家後台', requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
    // path: '*',
    // name: 'NotFound',
    // component: NotFound,
    // meta: {
    //   title: '404'
    // }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
