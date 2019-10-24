import Vue from 'vue'
import Vuex from 'vuex'

import module_example from './module-example'
import util from './util'
import components from './components'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ( /* { ssrContext } */ ) {
  const Store = new Vuex.Store({
    modules: {
      module_example,
      util,
      components
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
