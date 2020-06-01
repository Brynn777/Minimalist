<template>
	<view class="content">
		<!-- 顶部导航栏 -->
		<view class="status_bar">
			<uni-nav-bar :fixed="true" title="极简主义">
				<view slot="left">
					<view class="userinfo-avatar" @tap="enterCenter">
						<open-data  type="userAvatarUrl"></open-data>
					</view>
				</view>
			</uni-nav-bar>
		</view>
		<!-- 悬浮按钮 -->
		<uni-fab
			:content="buttonArray"
			:pattern="buttonPattern"
			horizontal="right"
			vertical="bottom"
			direction="vertical"
			@trigger="clickText"
			@fabClick="clickButton"
		></uni-fab>
	</view>
</template>

<script>
import { login2 } from '@/utils/utils.js';
import uniFab from '@/components/uni-fab/uni-fab.vue';
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default {
	components: {
		uniFab, uniNavBar
	},
	data() {
		return {
			buttonArray: [{
						text: '制作',
						active: false
					},
					{
						text: '客服',
						active: false
					}
			],
			buttonPattern:{
				backgroundColor: "#ffffff",
				buttonColor: "#4169E1",
				color: "#696969",
				selectedColor: "#007AFF"
			}
		};
	},
	onLoad() {
		this.gotologin();
	},
	methods: {
		enterCenter(){
			console.log("进入个人中心页面");
			uni.navigateTo({
				url:"../../center/center"
			})
		},
		clickButton(){
			console.log("展开菜单");
		},
		clickText(e){
			console.log("选择制作方式");
			console.log(e);
			if(e.index==0){
				uni.navigateTo({
					url: "/pages/tabbar/tabbar-2/tabbar-2"
				})
			}
		},
		gotologin(){
			var self = this;
			login2().then((res)=>{
				// console.log("用户成功登录信息");
				self.$store.commit('changeItem',{
					page:'userInfo',
					key:'userId',
					value:res.data.user.userId
				})
			}).catch((err)=>{
				// console.log("用户登录失败信息")
			})
		}
	}
};
</script>

<style>
/* 头像 */
.userinfo-avatar {  
  overflow: hidden;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  border: 1px solid #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  margin-left: 20rpx;
}  
/* 导航栏 */
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
/* 为了适配自定义的导航栏 */
.content {
	margin-top: 50upx;
}
</style>
