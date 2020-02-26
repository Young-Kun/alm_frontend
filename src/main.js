import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/iview.js'
import 'font-awesome/css/font-awesome.min.css'
import api from '@/api'
import filters from "@/filters";


const echarts = require('echarts');

Vue.prototype.$echarts = echarts;
Vue.prototype.$api = api;
Vue.config.productionTip = false;
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
