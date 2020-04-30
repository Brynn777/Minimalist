import $http from '../js_sdk/zhouWei-request/requestConfig';
let baseUrl = 'https://minimalist.net.cn/';
let url = {
	LOGIN: baseUrl + 'minimalist/login/wx',
	PREVIEW: baseUrl + 'onlinePreview?url=',
	COVER: baseUrl + 'minimalist/ppt/cover/make',
	CATALOG:  baseUrl + 'minimalist/ppt/contents/make',
	TEXT:  baseUrl + 'minimalist/ppt/text/make',
	PICWITHT: baseUrl + 'minimalist/ppt/image/make',
	ENDING: baseUrl + 'minimalist/ppt/end/make'
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
export function previewPage(addUrl,data) {
	return $http.post(url[addUrl.toUpperCase()],data)
	// .then(res=>{
	// 	var rawUrl = baseUrl+res.data.filePath;
	// 	var previewUrl = url.PREVIEW+encodeURIComponent(rawUrl);
	// 	console.log(previewUrl);
	// 	console.log("看这里");
	// 	console.log(res);
		
	// 	// $http.get(previewUrl, {},{isFactory:false}).then(res=>{
	// 	// 	console.log(res);
	// 	// 	var imgReg = /<img.*?(?:>|\/>)/gi;
	// 	// 	var srcReg = /data-src=[\'\"]?([^\'\"]*)[\'\"]?/i;
	// 	// 	var arr = res.data.match(imgReg);
	// 	// 	console.log("看这里");
	// 	// 	console.log(arr);
	// 	// 	for (var i = 0; i < arr.length; i++) {
	// 	// 	 var src = arr[i].match(srcReg);
	// 	// 		console.log(src);
	// 	// 	}
	// 	// }).catch(err=>{
	// 	// 	console.log(err);
	// 	// });
		
	// }).catch(err=>{
	// 	console.log(err)
	// })
}