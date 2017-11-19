import 'babel-polyfill'
import Vue from 'vue'
import App from './modules/App.vue'
import VueAnalytics from 'vue-analytics'
import VueSweetalert2 from 'vue-sweetalert2';



import router from "./router"
import http from './util/http';
import jquery_extend from './util/jquery_extend';
import private_mode_warning from './util/private_mode_warning'
import store from './store'


Vue.use(require('vue-script2'))
Vue.use(VueSweetalert2);

if(process.env.NODE_ENV === 'production') {
    Vue.use(VueAnalytics, {
      id: ['UA-79751510-7'],
      router,
      autoTracking: {
        exception: true
      }
    })
}



new Vue({
    el: '#app',
    store,
    router,
    http,
    render: h => h(App)
})
