import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		cover:{
			title: {
				tip:'主标题',
				value: ''
			},
			subtitle: {
				tip:'副标题',
				value: '测试'
			},
			reporterName: {
				tip:'汇报人',
				value: '测试'
			},
			reportTime: {
				tip:'时间',
				value: '测试'
			},
		},
		picWithText:{
			title:{
				tip: '概括',
				value: '',
			},
			paragraph: {
				tip: '详细内容',
				value:''
			},
			pictureUrls: {
				tip: '图片url',
				value: []
			},
		}, 
		ending: {
			title: {
				tip:'结束语',
				value: ''
			}
		},
		catalog:{
			titles:{
				tip:'分目录',
				value:['','']
			}
		},
		text: {
			title:{
				tip:'标题',
				value:''
			},
			paragraph:{
				tip:'正文',
				value:''
			}
		},
		userInfo:{
			userId: {
				tip: '用户在业务服务器上唯一标识',
				value: ''
			}
		},
		productInfo:{
			fileId: {
				tip: '本次PPT的唯一标识',
				value: ''
			},
			templateId:{
				tip: '本次使用的模板id',
				value: ''
			},
			filePath: {
				tip: '本次生成的文件路径',
				value: ''
			},
			fileName: {
				tip: '本次生成的文件名字',
				value: ''
			},
			fileNumber: {
				tip: '本次生成的文件数量',
				value: ''
			},
		},
	},
	mutations: {
		changeItem(state, data) {
			state[data.page][data.key].value = data.value;
		},
		changeArray(state,data) {
			Vue.set(state[data.page][data.key].value, data.index, data.value)
		}
	}
})