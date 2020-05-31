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
		<uni-list >
			<view v-for="(obj, index) in centerData" :key="index" @click="routerLink">
				<uni-list-item :title="obj.text" :show-extra-icon="true" :extra-icon="obj.style">
					
				</uni-list-item>
			</view>
		</uni-list>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniList,  uniListItem, uniIcons},
		data() {
			return {
				centerData:[
					{
						text:'帮助',
						style:{
							size:'22',
							type:'help'
						}
					},
					{
						text:'专属客服',
						style:{
							size:'22',
							type:'chatbubble'
						}
					},
					{
						text:'关于',
						style:{
							size:'22',
							type:'info'
						}
					}
				]
			}
		},
		onLoad() {
			this.clearStorage();
		},
		methods: {
			clearStorage(){
				uni.getSavedFileList({
					
				  success: function (res) {
					  console.log("本地文件")
					  console.log(res);
					  
				    if (res.fileList.length > 0) {
				      uni.removeSavedFile({
				        filePath: res.fileList[0].filePath,
				        complete: function (res) {
				          console.log(res);
				        }
				      });
				    }
				  }
				});
			},
			routerLink(e) {
				console.log(e)
			},
			
			
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
	  height: 240rpx;  
	  color: #fff;  
	  display: flex;  
	  align-items: center; 
	  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	  background-color: #f7f7f7; 
	}  
	  
	.userinfo-avatar {  
	  overflow:hidden; 
	  width: 160rpx;  
	  height: 160rpx;  
	  border-radius: 50%;  
	  border: 2px solid #fff;  
	  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);  
	  margin:0 40rpx;
	}  
	.userinfo-name {
		color: #000000;
		text-align: center;
		padding-right: 120rpx;
		margin:0 40rpx;
	}
</style>
