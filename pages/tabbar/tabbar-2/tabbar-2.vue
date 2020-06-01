<template>
	<view class="content">
		<!-- <view class="stepBar">
		<uni-steps :options="[{title: '选择模板'}, {title: '输入文本'}, {title: '生成导出'}]" :active="0"></uni-steps>	
		</view>
		<view class="forStepBar"></view> -->
		<!-- 选择模板 -->
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
			}
		},
		components:{
			uniIcons, uniSteps,
		},
		onLoad() {

		},
		methods: {
			routerLink() {
				uni.navigateTo({
				  url: '/pages/TextInput/selectPage/selectPage',
				 })
			},
		}
	}
</script>

<style>
.content {
	height: 400rpx;
	margin-top: 10rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
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
.stepBar{
	position: fixed;
	width:100%;
	z-index:2;
	background:white;
}
.forStepBar{
	height:60rpx;
}

</style>
