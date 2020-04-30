<template>
	<view class="content">
		<text class="topText">一键生成专业级PPT</text>
		<uni-icons class="addIcon" type="plus" size="30" @tap="routerLink"></uni-icons>
		<view class="stepProgress">
		<uni-steps :options="[{title:'StepOne',desc:'输入文本'},{title:'StepTwo',desc:'选择模板'},{title:'StepThree',desc:'生成导出'}]" direction="column" :active="2"></uni-steps>	
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
	.stepProgress {
		padding-top:30px
	}
</style>
