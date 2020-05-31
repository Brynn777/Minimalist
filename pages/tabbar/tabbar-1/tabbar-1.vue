<template>
	
	<view class="content">
		<view class="status_bar">
			<uni-nav-bar :fixed="true" title="极简主义">
				<view slot="left">
					<view class="userinfo-avatar" @tap="enterCenter">
						<open-data  type="userAvatarUrl"></open-data>
					</view>
				</view>
			</uni-nav-bar>
		</view>
		
		<!-- <view class="bottomBox">
			<view class="buttomButton">
				 -->
				<uni-fab
					:content="buttonArray"
					:pattern="buttonPattern"
					horizontal="right"
					vertical="bottom"
					direction="vertical"
					@trigger="clickText"
					@fabClick="clickButton"
				></uni-fab>
			<!-- 	<view class="clearFloat">
					
				</view> -->
	<!-- 		</view>
			
		</view> -->
		<!-- <view v-if="userInfo.name.length==0" @tap="login" class="loginImg">
			点击登录
		</view>
		<view v-else>
			<image :src="userInfo.avatarUrl" mode="" class="loginImg"></image>
			<view>{{userInfo.name}}</view>
		</view> -->
	</view>
</template>

<script>
import { login } from '@/utils/utils.js';
import uniFab from '@/components/uni-fab/uni-fab.vue';
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default {
	components: {
		uniFab, uniNavBar
	},
	data() {
		return {
			userInfo:{
				name:"",
				avatarUrl:"",
			},
			buttonArray: [{
						text: '制作',
						active: false
					},
					{
						text: '客服',
						active: true
					}
			],
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			buttonPattern:{
				backgroundColor: "#ffffff",
				buttonColor: "#4169E1",
				color: "#696969",
				selectedColor: "#007AFF"
			}
		};
	},
	onLoad() {
		// this.getUserInfo();
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
		getUserInfo(){
			var self = this;
			wx.getUserInfo({
					success(res) {
						console.log("获取用户信息！！");
						console.log(res);
						self.userInfo.name = res.userInfo.nickName;
						self.userInfo.avatarUrl = res.userInfo.avatarUrl
					}
			});
		},
		gotologin(){
			var self = this;
			
			//调用wx.login获取code
			wx.login({
			  // callback
			  success (res) {
				console.log("微信开放接口api")
				console.log(res);
			    if (res.code) {
					console.log("开始在用户服务器上登录")
					self.$store.state.userInfo.code = res.code;
					console.log(res)
			        //用获取的临时登录凭证code在业务服务器上换取openID
					// self.$http.post(self.$store.state.url.LOGIN,{code:res.code})
					login({code:res.code}).then(res=>{
						console.log("登录成功");
						console.log(res);
						// self.$store.state.userInfo.token = res.data.token;
						self.$store.commit('changeItem',{
							page:'userInfo',
							key:'userId',
							value:res.data.user.userId
						})
						// self.$store.state.userInfo.userId = res.data.user.userId;
						// self.$store.state.userInfo.openid = res.data.user.openid;
						// console.log(self.$store.state.userInfo);
				    })
				    .catch(err=>{
					    console.log("登录失败");
					    console.log(err);
				    })
			    } else {
			      console.log('微信开放接口失败' + res.errMsg)
			    }
			  }
			})
		}
	}
};
</script>

<style>
	
	.userinfo-avatar {  
	  overflow: hidden;
	  display: block;
	  width: 70rpx;
	  height: 70rpx;
	  border-radius: 50%;
	  border: 1px solid #fff;
	  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	  margin-left: 20rpx;

	}  
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	  }
.buttomButton{
	width:55px;
}
.bottomBox{
	height: 100px;
	border: 1px solid red;
	position: fixed;
	width: 100%;
	bottom: 0px;
	display: flex;
	justify-content: center;
}
.clearFloat{
	clear:both;
}
.content {
	text-align: center;
	height: 400upx;
	margin-top: 50upx;
}
.loginImg{
	border: 1px solid #d0d0d6;
	height:144upx;
	line-height:144upx;
	width:144upx;
	margin:auto;
	border-radius:50%;
	color:#8F8F94;
	background: #ebebeb;
	font-size:24upx
}
.swiper{
	display:block;
	height:400rpx
}
</style>
