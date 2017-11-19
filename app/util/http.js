import Vue from 'vue'

import VueResource from 'vue-resource';
import router from "../router"
import auth from './auth'
import config from "./config"

let localStorage = window.localStorage;
Vue.use(VueResource);

Vue.http.options.credentials = true
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next) => {

    request.url =  request.url.match(/^http/) ? request.url : config.api_path + request.url
    request.timeout = request.timeout || 60000;
    if (request.method.toLowerCase() === 'get') {
        request.url_raw = request.url;


        if(request.ttl > 0 ){
            var cache = localStorage.getItem(`CACHE_${request.url_raw}`);
            cache = JSON.parse(cache)
            if (cache) {
                console.log('cache hit', request.url_raw);
                next(request.respondWith(cache, { status: 200, statusText: 'Ok' }));
                request.client = function(request) {
                    return request.respondWith(cache, { status: 200, statusText: 'Ok' })
                }
            } else {
                console.log('cache miss', request.url_raw);

            }
        }
        request.url += (request.url.indexOf('?') > 0 ? '&' : '?') + `_=${new Date().getTime()}`

    }


    next(function(response) {
        let { status, statusText, body } = response;
        response.body = response.body || {}

        if (status === 200 && response.body.flag === "success" &&request.ttl > 0 && !localStorage.getItem(`CACHE_${request.url_raw}`)) {
            console.log('cache save', request.url_raw);
            localStorage.setItem(`CACHE_${request.url_raw}`, JSON.stringify(body));
        }
        // modify response
        if (response.status !== 200) {
            response.ok = false
            response.body = {
                msg:"System Error, Please try later!",
                flag:"fail"
            }
            return console.log("System Error, Please try later!")
        }
        if (response.body.flag === "fail") {
            response.ok = false
            response.body.msg = response.body.msg || "Unknow error occured."
            if (response.body.msg === "You have not logged in yet!") {
                if (!router.currentRoute.fullPath.match(/^\/login/)) {
                    router.replace("/logout?redirect="+ location.pathname+location.search )
                }
            }  else if (response.body.msg === "This account has been logged in elsewhere, for this login session will be terminated.") {
                localStorage.setItem("mtlLogin", 1);
                if (!router.currentRoute.fullPath.match(/^\/login/)) {
                    router.replace("/logout?redirect="+ location.pathname+location.search )
                }
            }
        }

        request.respondWith(body, { status, statusText })
    });
});
