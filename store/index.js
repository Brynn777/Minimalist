import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		// 用户填写的所有数据,数据来源于input页面的commit changePPTContent，数据结构来自content.js
		// {
		// 	pageType: 'cover',
		// 	title: '123',
		// 	subtitle:'456',
		// 	reporterName:  '',
		// 	reportTime: '',
		// }
		PPT:[
			{pageType:'cover'},
			{pageType:'catalog'},
			{pageType:'ending'}
		],
		userInfo:{
			// 用户在业务服务器上唯一标识',在进入tab1时获取,并commit changeItem
			userId: ''
		},
		productInfo:{
			// tip: '本次PPT的唯一标识',
			fileId:'',
			// tip: '本次使用的模板id',
			templateId:'',
			// tip: '本次生成的文件路径',
			filePath  : '',
			// tip: '本次生成的文件名字',
			fileName:'',
			// tip: '本次生成的文件数量',
			fileNumber:'',
		},
	},
	mutations: {
		// 将单个数据项添加
		changeItem(state, data) {
			state[data.page][data.key] = data.value;
		},
		addArray(state) {
			Vue.set(state.PPT, state.PPT.length, {})
		},
		// 添加一个一般页面缓存
		changePPTContent(state,data) {
			Vue.set(state.PPT, data.index, data.content);
		},
		addContentPage(state,data) {
			state.PPT.splice(data.index,0,{
				pageType:data.pageType
			})
		},
		// 在填写目录页后调用,将本次的目录分成多个过渡页逐一缓存
		addTransitionPage(state,data) {
			// 清除之前的目录(过渡页)
			for(let i = state.PPT.length-1;i>=0;i--) {
				if(state.PPT[i].pageType=='transition')
				state.PPT.splice(i,1)
			}
			// 逐一插入过渡页缓存
			for(let it in data) {
				state.PPT.splice(2+parseInt(it),0,{
					pageType:'transition',
					title: data[it]
				})
			}
		}
	}
})