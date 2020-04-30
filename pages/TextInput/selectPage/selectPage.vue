<template>
	<view>
		<uni-steps :options="[{title: '输入文本'}, {title: '选择模板'}, {title: '生成导出'}]" :active="0"></uni-steps>
		<uni-list>
			<view v-for="(value, key) in pageType" :key="key" @click="routerLink(key)">
				<uni-list-item :title="value" note="描述信息"></uni-list-item>
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
				pageType:{
					cover:'封面页',
					catalog:'目录页',
					// trans:'过渡页',
					text: '正文页',
					picWithText:'图文页', 
					ending: '结束页'
				}
				
			}
		},
		methods: {
			routerLink(pageType) {
				console.log("传入")
				console.log(pageType)
				uni.navigateTo({
				  url: '/pages/TextInput/stepOne/stepOne?pageType='+pageType,
				 })
			},
		},
		components: {uniSteps,uniList,uniListItem,uniIcons}
	}
</script>

<style>

</style>
