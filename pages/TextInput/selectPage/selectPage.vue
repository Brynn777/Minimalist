<template>
	<view>
		<view class="stepBar">
			<uni-steps :options="[{title: '选择模板'}, {title: '输入文本'}, {title: '生成导出'}]" :active="1"></uni-steps>
		</view>
		<view class="forStepBar">
		</view>
		<uni-list>
			<view v-for="(obj, index) in PPT" :key="index" @click="routerLink(obj.pageType,index)">
				<uni-list-item :title="obj.pageType | enToCh" :note="obj | getMainInfo"></uni-list-item>
				<view v-if="obj.pageType=='transition'">
					<view class="contentButton"><uni-icons type="email" size="30" @tap.stop="addOnePage('text',index)"></uni-icons></view>
					<view class="contentButton"><uni-icons type="image" size="25" @tap.stop="addOnePage('picWithText',index)"></uni-icons></view>
					<view class="contentButton"><uni-icons type="compose" size="30" @tap.stop="addOnePage('table',index)"></uni-icons></view>
					<view class="contentButton buttonText" @tap.stop="addOnePage('text',index)">文字页</view>
					<view class="contentButton buttonText" @tap.stop="addOnePage('picWithText',index)">图文页</view>
					<view class="contentButton buttonText" @tap.stop="addOnePage('table',index)">图表页</view>
				</view>
				
			</view>
		</uni-list>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
			}
		},
		computed:{
			PPT(){
				return this.$store.state.PPT
			}
		},
		methods: {
			routerLink(type,index) {
				uni.navigateTo({
				  url: '/pages/TextInput/input/input?pageType='+type+'&pageIndex='+index,
				 })
			},
			addOnePage(type,index) {
				console.log(type+index)
				this.$store.commit('addContentPage',{
					pageType:type,
					index:index+1
				})
			}
		},
		components: {uniSteps,uniList,uniListItem,uniIcons}
	}
</script>

<style>
.stepBar{
	position: fixed;
	width:100%;
	z-index:2;
	background:white;
}
.forStepBar{
	height:60rpx;
}
.contentButton{
	width:33.3%;
	display: inline-block;
	text-align: center;
}
.buttonText{
	font-size:24rpx;
}
</style>
