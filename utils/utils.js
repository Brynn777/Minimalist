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
	return $http.post(url.LOGIN,code)
	.then((res)=>{
		if(res.data && res.data.token)
			return res;
		else
			throw res;
	}).catch((err)=>{
		throw err;
	});
}

export function newPreview(fileId) {
	return $http.get(url.NEWPREVIEW,{
		fileId:fileId
	})
}

// 提交某页数据,生成具体的一页PPT
// data有该页的数据项.
export function generateOnePage(addUrl,data) {
	console.log("查看用于本页PPT的所有数据");
	console.log(data);
	return $http.post(url[addUrl.toUpperCase()],data)
}

export function login2() {
	var self = this;
	return new Promise((resolve,reject)=>{
		wx.login({
		  success (res) {
			// console.log("网络正常开始登录")
			// console.log(res);
		    if (res.code) {
				// console.log("获取临时登录凭证")
				// console.log(res)
		        //用获取的临时登录凭证code在业务服务器上换取openID
				login({code:res.code}).then(res=>{
					console.log("登录成功!获取用户ID");
					console.log(res);
					setLocalData('token',res.data.token);
					resolve(res);
			    }).catch(err=>{
				    console.log("登录失败");
				    console.log(err);
					reject(err);
			    })
		    } else {
		      console.log('微信开放接口失败' + res.errMsg);
			  reject(res)
		    }
		  }
		})
	})
}