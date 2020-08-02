import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import './bus'
import currencyFilter from './filters/currency'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBoxOpen, faStopwatch, faCog, faBell, faTimes, faPen, faCheck, faList, faPlay, faPause, faStepForward, faHome, faEllipsisH, faHeart, faStar, faFlag, faSpinner, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLine, faFacebookSquare, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

import VuePageTransition from 'vue-page-transition'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import draggable from 'vuedraggable'

import './styles/style.scss'
import 'noto-sans-tc/noto_sans_tc_regular/css.css'
import VAnimateCss from 'v-animate-css'
import VueWow from 'vue-wow'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true

Vue.use(VueSidebarMenu)

Vue.use(VueAxios, axios)
Vue.use(VueWow)
Vue.use(VAnimateCss)

Vue.use(VuePageTransition)
Vue.use(VueSweetalert2)

library.add(faBoxOpen, faStopwatch, faCog, faBell, faTimes, faPen, faCheck, faList, faPlay, faPause, faStepForward, faHome, faEllipsisH, faLine, faFacebookSquare, faInstagram, faYoutube, faHeart, faStar, faFlag, faSpinner, faShoppingCart)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('draggable', draggable)
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  // ...
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
