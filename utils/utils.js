import $http from '../js_sdk/zhouWei-request/requestConfig';
let baseUrl = 'https://minimalist.net.cn/';
let url = {
	LOGIN: baseUrl + 'minimalist/login/wx',
	PREVIEW: baseUrl + 'onlinePreview?url=',
	COVER: baseUrl + 'minimalist/ppt/cover/make',
	TRANSITION: baseUrl + 'minimalist/ppt/transition/make',
	CATALOG:  baseUrl + 'minimalist/ppt/contents/make',
	TEXT:  baseUrl + 'minimalist/ppt/text/make',
	PICWITHTEXT: baseUrl + 'minimalist/ppt/image/make',
	ENDING: baseUrl + 'minimalist/ppt/end/make',
	NEWPREVIEW: baseUrl + 'minimalist/ppt/page/filePreview',
	MOVE: baseUrl + 'minimalist/ppt/page/move'
}
let DATA = {
	baseUrl,url
}
export { DATA };
function setLocalData(key,value){
	uni.setStorage({
		key:key,
		data:JSON.stringify(value)
	})
}
function getLocalData(key) {
	return uni.getStorageSync(key)
}
export function movePPT(id,from,to) {
	return $http.post(url.MOVE,{
		fileId:id,
		formPageNum:from,
		toPageNum: to
	})
}
export function login(code) {
	return $http.post(url.LOGIN,code).then((res)=>{
		if(res.data && res.data.token);
		setLocalData('token',res.data.token);
		return res;
	}).catch((err)=>{
		throw err;
	});
}
export function makeCover(data) {
	return $http.post(url.COVER,data)
}
export function newPreview(fileId) {
	return $http.get(url.NEWPREVIEW,{
		fileId:fileId
	})
}

// 提交某页数据,生成具体的一页PPT
// data有该页的数据项.
export function generateOnePage(addUrl,data) {
	return $http.post(url[addUrl.toUpperCase()],data)
	
}