<template>
	<view class="content">
		
		<view class="stepBar">
		<uni-steps :options="[{title: '选择模板'}, {title: '输入文本'}, {title: '生成导出'}]" :active="0"></uni-steps>	
		</view>
		<view class="forStepBar"></view>
		<view class="modulePic">
			<image src="../../../static/img/moduleOne.jpg" mode="aspectFit" @tap="routerLink"></image>
		</view>
		<view class="modulePic">
			<image src="../../../static/img/moduleOne.jpg" mode="aspectFit" @tap="routerLink"></image>
		</view>
		<view class="modulePic">
			<image src="../../../static/img/moduleOne.jpg" mode="aspectFit" @tap="routerLink"></image>
		</view>
		<view class="modulePic">
			<image src="../../../static/img/moduleOne.jpg" mode="aspectFit" @tap="routerLink"></image>
		</view>
	</view>
</template>

<script>
	import uniIcons from "components/uni-icons/uni-icons.vue";
	import uniSteps from "@/components/uni-steps/uni-steps.vue";
	export default {
		data() {
			return {
				
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#72b2ff',
					buttonColor: '#72b2ff'
				},
			}
		},
		components:{
			uniIcons, uniSteps,
		},
		onLoad() {

		},
		methods: {
			routerLink() {
				console.log("123")
				uni.navigateTo({
				  url: '/pages/TextInput/selectPage/selectPage',
				 })
			},
			test(event) {
				console.log(event)
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 10upx;
	}
	.topText {
		float: left;
		line-height: 30px;
		position:relative;
		left: 10px
	}
	.addIcon {
		position: absolute;
		right: 10px
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
.modulePic{
	margin-bottom: 10rpx;
	width: 45%;
	display: inline-block;
	padding: 2px;

}
.modulePic > image{
	height:100px
}
</style>
