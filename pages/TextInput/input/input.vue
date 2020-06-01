<template>
	<view class="inputPage">
		<view>
			<!-- 步骤 -->
			<view class="stepBar">
				<uni-steps :options="[{title: '选择模板'}, {title: '输入文本'}, {title: '生成导出'}]" :active="1"></uni-steps>
			</view>
			<view class="forStepBar">
			</view>
			<image src="../../../static/img/moduleOne.jpg" mode="aspectFit"></image>
			<!-- 目录页专用 -->
			<view v-if="pageType=='catalog'">
				<view v-for="(item, index) in content.catalog.titles" :key="'item'+index">
					<view v-if="item!='-'">
						<view class="inputBox">
							<view v-if="index==0">
								<uni-icons  class="addIcon" type="plus" size="30" @tap="addOneMenuItem(index)"></uni-icons>
							</view>
							<view v-else>
								<uni-icons  class="addIcon" type="minus" size="30" @tap="deleteOneMenuItem(index)"></uni-icons>
							</view>
							<input :value="content.catalog.titles[index]" @input="inputOneMenuItem($event,index)" 
							:placeholder="index|itemTip(pageType)" class="inputContent" ></input>
						</view>
					</view>
				</view>
			</view>
			<!-- 普通页面 -->
			<view v-else>
				<view v-for="(obj, key) in content[pageType]" :key="obj.tip">
					<!-- 图片输入框 -->
					<view v-if="key=='pictureUrls'" class="inputBox">
						<view class="inputTip">{{key | itemTranslate(pageType)}}</view>
						<sun-ui-upimg @change="getImageInfo1" :upload_auto="true" ref="upimg1" :upload_count="2"></sun-ui-upimg>
					</view>
					<!-- 正文部分 -->
					<view v-else-if="key=='paragraph'" class="inputBox">
						<view class="inputTip">{{key | itemTranslate(pageType)}}</view>
						<textarea :value="content[pageType][key]" @input="changeContent($event, key)"
						:maxlength="-1" :show-confirm-bar="false" auto-height="true" class="inputContent"/>
					</view>
					<!-- 输入框 -->
					<view v-else class="inputBox">
						<view class="inputTip">{{key | itemTranslate(pageType)}}</view>
						<input :value="content[pageType][key]" @input="changeContent($event, key)"
							:placeholder="key|itemTip(pageType)" class="inputContent">
						</input>
					</view>
				</view>
			</view>
		</view>
		<button class="doneButton" type="primary" :loading="buttonLoading" @click="turnPreviewPage">预&emsp;览</button>
	</view>
</template>

<script>
	import { Content } from './content.js'
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniInput from '@/components/hnfly-input//uni-input.vue';
	import uniIcons from "components/uni-icons/uni-icons.vue";
	import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
	import { generateOnePage, newPreview, DATA, movePPT } from '../../../utils/utils.js'
	export default {
		data() {
			return {
				// 以下两个数据用来判断第二次进入页面是否要重新post数据和存到本地
				// dataExsit:true&&changeInput:false,页面直接跳转,不post数据,也不用重新存储,
				// dataExit:false&&changeInput:false,同上
				// dataExit:true&&changeInput:true,页面先存储,post,再跳转,
				// dataExit:false&&changeInput:true,同上
				//本页面是否已经提交过
				dataExsit:false,
				// 二次进入时是否修改内容
				changeInput:false,
				// 图文页的图片url
				imageList:[],
				// 本次的页面类型和页面次序，由selectPage传入
				pageType:'',
				pageIndex: '',
				buttonLoading:false,
				// 每次填写完将相应的页面对象 存在本地vuex+post后端
				content:Content,
			}
		},
		computed:{
			
		},
		onLoad(options) {
			this.pageType = options.pageType;
			this.pageIndex = options.pageIndex;
			this.InputedData();
		},
		onUnload() {
			if(this.changeInput) {
				this.storeDataToVuex();
				this.postPageData();
			}
		},
		onShow() {
			let pages = getCurrentPages()
			let curPage = pages[pages.length - 1];
			let data = curPage.data;
			if(data.isBack) {
			    wx.navigateBack()
			}
		},
		methods: {
			getImageInfo1(e) {
				console.log('图片返回1：', e)
				this.content.picWithText.pictureUrls = e;
			},
			uploadImage() {
				var self = this;
				uni.chooseImage({
					success:function(chooseImageRes){
						self.imageList = chooseImageRes.tempFilePaths;
						console.log(chooseImageRes)
						const tempFilePaths = chooseImageRes.tempFilePaths;
							uni.uploadFile({
								url: 'https://minimalist.net.cn/minimalist/image/upload', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[0],
								header:{
									token:uni.getStorageSync('token')
								},
								name: 'uploadFile',
								success: (uploadFileRes) => {
									console.log("上传图片成功");
									console.log(uploadFileRes);
								},
								fail:(res)=>{
									console.log("上传图片失败")
									console.log(res)
								}
							});
					}
				})
			},
			// 获取已经填写的数据
			InputedData(){
				for(let it in this.$store.state.PPT[this.pageIndex]){
					if(it!='pageType') {
						this.content[this.pageType][it] = this.$store.state.PPT[this.pageIndex][it]
					}
				}
			},
			
			// 一般填写内容
			changeContent(e, key){
				this.changeInput = true;
				if(this.pageType=='picWithText'&&key=='pictureUrls'){
					this.content[this.pageType][key].push(e.target.value);
				}
				else{
					this.content[this.pageType][key] = e.target.value;
				}
			},
			
			// 目录页添加空白
			addOneMenuItem(index){
				this.content.catalog.titles.push('');
			},
			// 目录页填写内容
			inputOneMenuItem(e,index){
				this.changeInput = true;
				this.content.catalog.titles[index] = e.target.value;
			},
			// 目录页删除条目
			deleteOneMenuItem(index){
				this.changeInput = true;
				this.content.catalog.titles[index] = '-';
			},
			
			// 跳转到预览页
			async turnPreviewPage() {
				if(this.changeInput) {
					this.storeDataToVuex();
					await this.postPageData();
				}
				this.changeInput = false;
				uni.navigateTo({
				  url: '/pages/TextInput/previewPPT/previewPPT',
				 })
			},
			// 将本页面数据提交
			postPageData() {
				console.log("post数据了！！！")
				return new Promise((resolve, reject)=>{
					this.buttonLoading = true;
					var postData = this.processPostData()
					var self = this;
					generateOnePage(this.pageType, postData).then(res=>{
						// 根据返回的数据存储到vuex
						this.$store.commit('changeItem',{
							page: 'productInfo',
							key: 'fileId',
							value: res.data.fileId
						});
						this.$store.commit('changeItem',{
							page: 'productInfo',
							key: 'fileNumber',
							value: res.data.pageCounts
						});
						this.$store.commit('changeItem',{
							page: 'productInfo',
							key: 'filePath',
							value: res.data.filePath
						});
						console.log("查看vuex中PPT相关信息");
						console.log(this.$store.state.productInfo)
						// 如果是目录页，还要post生成过渡页
						if(this.pageType=='catalog') {
							this.geneTransitionPage(resolve);
						}
						else {
							// 如果本次post的是内容页,要调整页面顺序
							if(this.pageType=='text'||this.pageType=='picWithText') {
								movePPT(this.$store.state.productInfo.fileId,this.$store.state.productInfo.fileNumber,parseInt(this.pageIndex)+1).then(res=>{
									resolve()
								})
							}
							else{
								resolve()
							}
							
						}
						
					})
				})
				
				
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
			// 在post完目录页再post过渡页
			async geneTransitionPage(resolve) {
				var postData = this.processPostData()
				for(let i = 0; i<postData.titles.length; i++){
					await generateOnePage('transition',{
						fileId:postData.fileId,
						title:postData.titles[i]
					})
					
				}
				resolve()
			},
			
			// 将本次填写的数据存在本地
			storeDataToVuex() {
				// 存储过渡页
				if(this.pageType == 'catalog') {
					// 过滤掉无效的目录项
					let remain = this.content.catalog.titles.filter((item)=>{
						if(item!=''&&item!='-'){
							return item
						}
					})
					this.content.catalog.titles = remain;
					// for(let )
					this.$store.commit('addTransitionPage',remain);
				}
				// 存储当前页
				var all = {
					...this.content[this.pageType],
					pageType:this.pageType,
				}
				this.$store.commit('changePPTContent',{
					content:all,
					index:this.pageIndex
				})
			},
			// 处理post的所有数据，加上用户信息，去掉多余信息
			processPostData() {
				var adhereInfo = {
					userId: this.$store.state.userInfo.userId,
					fileId: this.$store.state.productInfo.fileId,
					templateId: 1
				};
				var mainInfo = {};
				// 如果是目录页，要过滤无效数据
				if(this.pageType == 'catalog') {
					let remain = this.content.catalog.titles.filter((item)=>{
						if(item!=''&&item!='-'){
							return item
						}
					})
					this.$set(mainInfo,'titles',remain);
					console.log(remain);
				}
				else{
					for(let it in this.content[this.pageType]){
						this.$set(mainInfo,it,this.content[this.pageType][it]);
					}
				}
				var allInfo = {
					...adhereInfo,
					...mainInfo
				};
				if(this.pageType == 'cover'){
					delete allInfo.fileId
				}
				else {
					delete allInfo.templateId;
					delete allInfo.userId;
				}
				console.log("本次post所有信息")
				console.log(allInfo)
				return allInfo
			},
			
		},
		components: {uniSteps, uniIcons, sunUiUpimg}
	}
</script>

<style>
	page{
		background-color: #f8f8f8;
	}
	.inputBox{
		margin: 25rpx 0rpx;
	}
	.inputTip{
		padding:0rpx 40rpx
	}
	.addIcon {
		float:right;
		position:relative;
		top:0rpx;
	}
	.inputContent {
		background-color: #ffffff;
		padding:10rpx 40rpx 4rpx 40rpx;
		margin: 10rpx 0rpx
	}
.stepBar{
	position: fixed;
	width:100%;
	z-index:2;
	background: #f8f8f8;
}
.forStepBar{
	height:60rpx;
}
.title {
	text-align: center;
}


.divLine{
 background: #8a8c86;
 width: 100%;
 height: 1rpx;
}
.doneButton {
	position:fixed;
	bottom:0upx;
	width:100%;
	z-index:2;
}


</style>
