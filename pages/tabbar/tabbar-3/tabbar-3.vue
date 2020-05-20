<template>
	<view class="">
		<view class="userinfo">
		  <view class="userinfo-avatar">
		    <open-data  type="userAvatarUrl"></open-data>
		  </view>
		  <view class="userinfo-name">
		  	<open-data type="userNickName"></open-data>
		  </view>
		</view>
		<view v-for="(value,index) in savedFileList" :key="index">
			<view class="" @tap="openDoc">
				{{value.filePath}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				savedFileList:[]
			}
		},
		onLoad() {
			this.getSavedFileList();
		},
		methods: {
			getSavedFileList() {
				var self = this;
				uni.getSavedFileList({
				  success: function (res) {
					  console.log("文件列表")
					  console.log(res)
				    res.fileList.forEach(item=>{
						self.savedFileList.push(item);
					})
				  }
				});
			},
			openDoc() {
				wx.openDocument({
					filePath:this.savedFileList[0].filePath,
					fileType:'pptx,',
					showMenu:true
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		
	}
	.userinfo {  
	  position: relative;  
	  width: 750rpx;  
	  height: 320rpx;  
	  color: #fff;  
	  display: flex;  
	  flex-direction: column;  
	  align-items: center; 
	  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	  background-color: #f7f7f7; 
	}  
	  
	.userinfo-avatar {  
	  overflow:hidden; 
	  display: block;  
	  width: 160rpx;  
	  height: 160rpx;  
	  margin: 20rpx;  
	  margin-top: 50rpx;  
	  border-radius: 50%;  
	  border: 2px solid #fff;  
	  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);  
	}  
	.userinfo-name {
		color: #000000;
		text-align: center;
	}
</style>
