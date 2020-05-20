import Vue from 'vue'
import App from './App'
import store from './store'
import $http from './js_sdk/zhouWei-request/requestConfig';

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$http = $http;
App.mpType = 'app'

Vue.filter('enToCh', function(msg) {
	if(msg == 'cover')
		return '封面页'
	else if (msg == 'catalog')
		return '目录页'
	else if (msg == 'transition')
		return '过渡页'
	else if(msg == 'text')
		return '文字页'
	else if (msg == 'picWithText')
		return '图文页'
	else if(msg == 'ending')
		return '结束页'
	else if(msg == 'pictureUrls')
		return '插图'
	else
		return msg
})
Vue.filter('getMainInfo',function(obj) {
	for (let it in obj) {
		if(it != 'pageType'){
			return obj[it].value;
			}
	}
	return '详细信息'
})
Vue.filter('itemTranslate',(msg,type)=>{
	if(msg == 'title') {
		if(type=='cover')
			return '主标题'
		else if(type == 'ending')
			return '结束语'
		else 
			return '标题'
	}
	else if(msg == 'subtitle')
		return '副标题'
	else if(msg=='reporterName')
		return '汇报人'
	else if(msg=='reportTime')
		return '汇报时间'
	else if(msg=='paragraph')
		return '详细内容'
	
	else 
		return msg
})
Vue.filter('itemTip',(msg,type)=>{
	if(msg == 'title') {
		if(type=='cover')
			return '请输入主标题'
		else if(type == 'ending')
			return '请输入结束语'
		else 
			return '请输入标题'
	}
	else if(msg == 'subtitle')
		return '请输入副标题'
	else if(msg=='reporterName')
		return '请输入汇报人'
	else if(msg=='reportTime')
		return '请输入汇报时间'
	else if(msg=='paragraph')
		return '请输入详细内容'
	else 
		return '请输入目录'+(parseInt(msg)+1)
})
const app = new Vue({
    ...App,
	store
})
app.$mount()

