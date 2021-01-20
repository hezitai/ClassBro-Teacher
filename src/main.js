import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import qs from 'qs'
Vue.prototype.$qs = qs
import '@/icons' // icon
// import '@/permission' // permission control
import Api from '@/api/api'
Vue.prototype.$api = Api
import axios from 'axios'
// import plupload from 'plupload'
// Vue.prototype.$plup = plupload
// axios.defaults.baseURL = 'http://192.168.1.83/'
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [
        function(data) {
            let ret = ''
                // debugger
            if (typeof data !== 'string') {
                for (const it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
            } else {
                ret = data
            }
            // ret = data

            return ret
        }
    ]
    /* 请求拦截器 */
    // const url = 'http://192.168.1.83/'
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('teactoken')
        if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = `${token}`
        }
        // if (config.url.indexOf(url) === -1) {
        //     config.url = url + config.url /* 拼接完整请求路径*/
        // }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
axios.interceptors.response.use(
    function(response) {
        if (response.data.body != undefined) {
            if (response.data.body.code === 4011) {
                localStorage.clear()
                router.push({
                    path: "/login"
                })
            }
            return response
        } else {
            return response
        }
        // token 已过期，重定向到登录页面

    },
    function(error) {
        return Promise.reject(error)
    }
)

Vue.prototype.$axios = axios
    /**
     * If you don't want to use mock-server
     * you want to use MockJs for mock api
     * you can execute: mockXHR()
     *
     * Currently MockJs will be used in the production environment,
     * please remove it before going online! ! !
     */
    // import {
    //     mockXHR
    // } from '../mock'
    // if (process.env.NODE_ENV === 'production') {
    //     mockXHR()
    // }

// set ElementUI lang to EN
Vue.use(ElementUI, {
    locale
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})