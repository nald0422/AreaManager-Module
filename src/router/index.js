import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store/index.js'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

import { Cookies } from 'quasar';

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    // console.log('Cookie token: ' + Cookies.get('authToken'))
    
    const publicPages = ['/login',''];
    const authRequired = !publicPages.includes(to.path);
    const authOff = publicPages.includes(to.path);
    
    const loggedIn = Cookies.get('authToken');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }

    if (authOff && loggedIn) {
        Cookies.remove('authToken')
    }
    
    next();
  })

  return Router
}
