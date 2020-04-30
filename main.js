import Vue from 'vue'
import App from './App'
import store from './store'
import $http from './js_sdk/zhouWei-request/requestConfig';

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$http = $http;
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()

