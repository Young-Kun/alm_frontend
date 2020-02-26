import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/iview.js'
import 'font-awesome/css/font-awesome.min.css'
import api from '@/api'
import filters from "@/filters";
import VCharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/polar';


Vue.component('v-chart', VCharts);

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
