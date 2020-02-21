'use strict';

import Vue from 'vue';
import axios from 'axios';
import state from '@/store/state';

// Full config:  https://github.com/axios/axios#request-config
/**
 * 全局配置
 * api请求路径
 * post默认请求头
 */
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 实例单独配置
const config = {
    timeout: 10 * 1000 // Timeout
};

const _axios = axios.create(config);

/**
 * 请求拦截
 * 每次请求前，如果存在token则在请求头中携带token
 */
_axios.interceptors.request.use(
    function (config) {
        const token = state.user.token;
        token && (config.headers.Authorization = `JWT ${token}`);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 响应拦截：暂未设置
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error)
    }
);

Plugin.install = function (Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios
            }
        },
        $axios: {
            get() {
                return _axios
            }
        }
    })
};

Vue.use(Plugin);

export default Plugin
