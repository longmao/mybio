import Vue from 'vue'
import Vuex from 'vuex'


import plugins from './plugins'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
    },
    strict: debug,
    plugins
})




export default store
