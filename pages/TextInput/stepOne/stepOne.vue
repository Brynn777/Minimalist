<template>
	<view>
		<uni-steps :options="[{title: '输入文本'}, {title: '选择模板'}, {title: '生成导出'}]" :active="0"></uni-steps>
		<view v-if="pageType=='catalog'">
			<view v-for="(item, index) in content.catalog.titles.value" :key="'item'+index">
				
				<view v-if="item!='-'">
					<view class="inputBox">
						<view v-if="index==0">
							<uni-icons  class="addIcon" type="plus" size="30" @tap="addOneMenuItem(index)"></uni-icons>
						</view>
						<view v-else>
							<uni-icons  class="addIcon" type="minus" size="30" @tap="deleteOneMenuItem(index)"></uni-icons>
						</view>
						<input class="inputContent" :value="content.catalog.titles.value[index]" @input="inputOneMenuItem($event,index)" :placeholder="'请输入目录'+(index+1)"></input>
						<view class="divLine"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="inputBox" v-for="(obj, key) in content[pageType]" :key="obj.tip">
				<view>{{obj.tip}}</view>
				<input :value="content[pageType][key].value" @input="changeContent($event, key)"
				:placeholder="'请输入'+obj.tip" class="inputContent"></input>
				<view class="divLine"></view>
			</view>
		</view>
		
		
		
		<button class="doneButton" type="default" plain="true" :loading="buttonLoading" @click="previewThis">完&emsp;成</button>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniInput from '@/components/hnfly-input//uni-input.vue';
	import uniIcons from "components/uni-icons/uni-icons.vue";
	import { makeCover, previewPage, DATA } from '../../../utils/utils.js'
	export default {
		data() {
			return {
				testUrl:'1',
				baseUrl:'',
				pageType:'',
				buttonLoading:false,
				itemNum:[0,1],
				testData:'123',
			}
		},
		computed:{
			content() {
				return this.$store.state;
			},
		},
		onLoad(options) {
			console.log('页面类型');
			this.pageType = options.pageType;
			console.log(this.pageType);	
		},
		methods: {
			changeContent(e, key){
				this.$store.commit('changeItem',{
					page: this.pageType,
					key: key,
					value: e.target.value
				});
				console.log(this.$store.state[this.pageType][key])
			},
			addOneMenuItem(index){
				console.log("添加空白");
				this.$store.commit('changeArray',{
					page: 'catalog',
					key: 'titles',
					value: '',
					index: this.content.catalog.titles.value.length
				});
				console.log(this.content.catalog.titles.value);			
			},
			inputOneMenuItem(e,index){
				console.log("添加内容");
				this.$store.commit('changeArray',{
					page: 'catalog',
					key: 'titles',
					value: e.target.value,
					index: index
				});
				console.log(this.content.catalog.titles.value);	
			},
			deleteOneMenuItem(index){
				console.log("删除内容");
				this.$store.commit('changeArray',{
					page: 'catalog',
					key: 'titles',
					value: '-',
					index: index
				});
				console.log(this.content.catalog.titles.value);	
			},
			previewThis() {
				this.buttonLoading = true;
				var adhereInfo = {
					userId: this.content.userInfo.userId.value,
					fileId: this.content.productInfo.fileId.value,
					templateId: 1
				};
				var mainInfo = {};
				if(this.pageType == 'catalog') {
					console.log('目录页');
					let remain = this.content.catalog.titles.value.filter((item)=>{
						if(item!=''&&item!='-'){
							return item
						}
					})
					this.$set(mainInfo,'titles',remain);
					console.log(remain);
				}
				else{
					for(let it in this.content[this.pageType]){
						this.$set(mainInfo,it,this.content[this.pageType][it].value);
					}
				}
				var allInfo = {
					...adhereInfo,
					...mainInfo
				};
				if(this.pageType == 'cover'){
					console.log("封面页");
					delete allInfo.fileId
				}
				else {
					delete allInfo.templateId;
					delete allInfo.userId;
				}
				console.log("本次post所有信息")
				console.log(allInfo)
				var self = this;
				previewPage(this.pageType, allInfo).then(res=>{
					console.log(res)
					var fileName = res.data.filePath.split('/').pop().split('.')[0];
					console.log(fileName);
					this.$store.commit('changeItem',{
						page: 'productInfo',
						key: 'fileId',
						value: res.data.fileId
					});
					this.$store.commit('changeItem',{
						page: 'productInfo',
						key: 'fileName',
						value: fileName
					});
					this.$store.commit('changeItem',{
						page: 'productInfo',
						key: 'fileNumber',
						value: res.data.pageCounts
					});
				})
				uni.navigateTo({
				  url: '/pages/TextInput/previewPPT/previewPPT',
				 })
				// .then(res=>{
				// 	console.log(res);
				// 	if(this.pageType=='cover'){
				// 		console.log('存储文件id')
				// 		this.content.productInfo.fileId.value = res.data.fileId
				// 	}
				// 	console.log(this.content.productInfo.fileId.value)
				// })
				// .then(res=>{
				// 	var rawUrl = DATA.baseUrl+res.data.filePath;
				// 	var previewUrl = DATA.url.PREVIEW+encodeURIComponent(rawUrl);
				// 	console.log(previewUrl);
					
					
				// 	// wx.downloadFile({
				// 	// 	url:preview,
				// 	// 	success(res){
				// 	// 		console.log(res);
				// 	// 		console.log("打开文件")
				// 	// 		wx.openDocument({
				// 	// 			filePath:res.tempFilePath,
				// 	// 			fileType:'pptx,',
				// 	// 			// showMenu:true
				// 	// 		})
				// 	// 	}
				// 	// })
				// 	console.log(res);
				// }).catch(err=>{
				// 	console.log(err)
				// })
			},
		},
		components: {uniSteps, uniIcons}
	}
</script>

<style>
.title {
	text-align: center;
}
.inputBox{
	margin: 0upx 40upx;
	position: relative;
}
.inputContent {
	height:50px
}
.divLine{
 background: #8a8c86;
 width: 100%;
 height: 1rpx;
}
.doneButton {
	position:absolute;
	bottom:0upx;
	width:100%;
}
.addIcon {
	float:right;
	position:relative;
	top:10px;
	}
</style>
