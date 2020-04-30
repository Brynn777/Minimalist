<template>
	<view class="content">
		<view>
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="100">
						<swiper-item>
							<image src="../../../static/img/slideOne.png" mode="widthFix" ></image>
						</swiper-item>
						<swiper-item>
							<image src="../../../static/img/slideTwo.png" mode="widthFix" ></image>
						</swiper-item>
						<swiper-item>
							<image src="../../../static/img/slideThree.png" mode="widthFix" ></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
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
import { login } from '../../../utils/utils.js'
export default {
	data() {
		return {
			userInfo:{
				name:"",
				avatarUrl:"",
			},
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500
		};
	},
	onLoad() {
		this.getUserInfo();
		this.gotologin();
	},
	methods: {
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
					self.$store.state.userInfo.code = res.code;
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
</style>
