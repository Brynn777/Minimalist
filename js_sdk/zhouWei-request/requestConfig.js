import request from "./request";
let baseUrl = "https://minimalist.net.cn/";
//可以new多个request来支持多个域名请求
let $http = new request({
	//接口请求地址
	baseUrl: baseUrl,
	//服务器本地上传文件地址
	fileUrl: baseUrl,
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	headers: {
		'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
	},
	//以下是默认值可不写
	//是否提示--默认提示
	isPrompt: true,
	//是否显示请求动画
	load: true,
	//是否使用处理数据模板
	isFactory:  true
});
//当前接口请求数
let requestNum = 0;
//请求开始拦截器
$http.requestStart = function (options) {
	if (requestNum <= 0) {
		uni.showNavigationBarLoading();
		if (options.load) {
			// #ifndef APP-PLUS
			//打开加载动画
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			// #endif
		}
	}
	requestNum += 1;
	//请求前加入token
	if(uni.getStorageSync('token'))
	options.headers['token'] = uni.getStorageSync('token');
	return options;
}
//请求结束
$http.requestEnd = function (options, resolve) {
	//判断当前接口是否需要加载动画
	requestNum = requestNum - 1;
	if (requestNum <= 0) {
		uni.hideLoading();
		uni.hideNavigationBarLoading();
	}
	if (resolve.errMsg && (resolve.errMsg != "request:ok" || resolve.statusCode && resolve.statusCode != 200)) {
		setTimeout(() => {
			uni.showToast({
				title: "网络错误，请检查一下网络",
				icon: "none"
			});
		}, 500);
	}
}
//登录弹窗次数
let loginPopupNum = 0;
//所有接口数据处理（可在接口里设置不调用此方法）
//此方法需要开发者根据各自的接口返回类型修改，以下只是模板
$http.dataFactory = function (res) {
	console.log("接口请求数据", {
		// httpUrl:res.httpUrl,
		// response:res.response,
		headers:res.headers,
		// data:res.data,
		// method:res.method,
	});
	// 判断接口请求是否成功
	if (res.response.statusCode && res.response.statusCode == 200) {
		
		// response是微信封装的返回信息,response.data是业务服务器返回的信息
		let httpData = res.response.data;
		
		if (httpData.code == "1" || httpData.code == '2000') {
			// 返回正确的结果(then接受数据)
			res.resolve(httpData);
		} else if (httpData.code == "2003" || httpData.code == "2002") { //未登录或登录已失效
			if (loginPopupNum <= 0) {
				loginPopupNum++;
				uni.showModal({
					title: '温馨提示',
					content: '此时此刻需要您登录喔~',
					confirmText: "去登录",
					cancelText: "再逛会",
					success: res2 => {
						loginPopupNum--;
						if (res.confirm) {
							uni.navigateTo({
								url:"'/pages/login"
							});
						}
					}
				});
			}
		} else { //其他错误提示
			if (res.isPrompt) { //设置可以提示的时候
				setTimeout(function () {
					uni.showToast({
						title: httpData.info, //提示后台接口抛出的错误信息
						icon: "none",
						duration: 3000
					});
				}, 500);
			}
			// 返回错误的结果(catch接受数据)
			res.reject(httpData);
		}
		
		/*********以上只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
		
	}else{
		// 返回错误的结果(catch接受数据)
		res.reject(res.response);
	}
};
export default $http;
