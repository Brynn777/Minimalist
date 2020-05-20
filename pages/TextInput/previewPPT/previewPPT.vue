<template>
	<view>
		<view class="stepBar">
			<uni-steps :options="[{title: '选择模板'}, {title: '输入文本'}, {title: '生成导出'}]" :active="2"></uni-steps>
		</view>
		<view class="forStepBar">
		</view>
		<view v-for="(value,key) in picUrl" :key="key" class="previewPic">
			<image :src="picUrl[key]" mode="aspectFit"></image>
		</view>
		<view class="forButton">
		</view>
		<button class="doneButton" type="primary" @click="downloadPPT">导&emsp;出</button>
	</view>
</template>

<script>
	import {newPreview} from '../../../utils/utils.js'
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		components: {uniSteps},
		data() {
			return {
					picUrl:[]
			}
		},
		methods: {
			downloadPPT() {
				var self = this;
				uni.getSavedFileList({
				  success: function (res) {
					  console.log("文件列表")
					  console.log(res)
				    res.fileList.forEach(item=>{
						uni.removeSavedFile({
						  filePath: item.filePath,
						  complete: function (res) {
							console.log(res);
						  }
						});
					})
				  }
				});
				
				wx.downloadFile({
					url:'https://minimalist.net.cn'+self.$store.state.productInfo.filePath.value,
					success(res){
						console.log(res);
						uni.saveFile({
						  tempFilePath:res.tempFilePath,
						  success: function (res) {
						    var savedFilePath = res.savedFilePath;
							console.log("本地文件");
							console.log(savedFilePath);
							console.log("打开文件")
							wx.openDocument({
								filePath:savedFilePath,
								fileType:'pptx,',
								showMenu:true
							})
						  },
						  fail:function (res) {
							  console.log("文件没有保存成功");
							  console.log(res);
							  
						  },
						  
						});
						
					},
					fail(res){
						console.log('https://minimalist.net.cn'+self.$store.state.productInfo.filePath.value);
						console.log(res);
					}
				})
			}
		},
		onLoad(options) {
			console.log('这里是预览页');
			newPreview(this.$store.state.productInfo.fileId.value).then(res=>{
				console.log(res);
				this.picUrl = res.data;
			})
			 var that = this
			 console.log("查看页面栈");
			console.log(getCurrentPages());
			        //判断页面栈里面的页面数是否大于2
			        if(getCurrentPages().length > 2) {
			            //获取页面栈
			            let pages = getCurrentPages()
			            //给上一个页面设置状态
			            let curPage = pages[pages.length - 2];
			            let data = curPage.data;
			            curPage.setData({'isBack': true});
			        }
			
		},
	}
</script>

<style>
.doneButton {
	position:fixed;
	bottom:0upx;
	width:100%;
	z-index:2;
}
.forButton{
	height:90rpx;
}
.stepBar{
	position: fixed;
	width:100%;
	z-index:2;
	background:white;
}
.forStepBar{
	height:60rpx;
}
.previewPic{
	margin-bottom: 10rpx;
}
</style>
