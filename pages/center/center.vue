<template>
	<view>
		<!-- 头像和名字 -->
		<view class="userinfo">
		  <view class="userinfo-avatar">
		    <open-data  type="userAvatarUrl"></open-data>
		  </view>
		  <view class="userinfo-name">
		  	<open-data type="userNickName"></open-data>
		  </view>
		</view>
		<!-- 服务项目 -->
		<view class="serviceList">
			<uni-list >
				<view v-for="(obj, index) in centerData" :key="index" @click="routerLink">
					<uni-list-item :title="obj.text" :show-extra-icon="true" :extra-icon="obj.style"></uni-list-item>
				</view>
			</uni-list>
		</view>
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
			// 清理本地缓存文件
			clearStorage(){
				uni.getSavedFileList({
				  success: function (res) {
					  console.log("清理本地缓存")
					  console.log(res);
					  res.fileList.forEach((item)=>{
						  uni.removeSavedFile({
						    filePath: item.filePath,
						    complete: function (res) {
						      console.log(res);
						    }
						  });
					  })
				  }
				});
			},
			// 测试点击服务列表
			routerLink(e) {
				console.log(e)
			},
			
			
		}
	}
</script>

<style>

.userinfo {  
  height: 240rpx;  
  display: flex;  
  align-items: center; 
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7; 
  margin-bottom: 10px;
}  
.serviceList{
   box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
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
	margin:0 40rpx;
}
</style>
