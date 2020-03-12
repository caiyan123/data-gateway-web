/**
 * axios封装：请求拦截，响应拦截，错误编码
 */
import axios from 'axios'
import qs from 'qs'

/**
 * 环境切换
 */
/**
 * 环境切换
 */
// const burl = window.location.host;
// var http_ = 'http://';
// if (burl == '120.195.21.233:9080') { // 外网
// 	http_ = 'https://';
// }
// axios.defaults.baseURL = http_ + burl + '/dweb';
axios.defaults.baseURL = 'http://127.0.0.1:8888/dweb';//本地开发环境
// axios.defaults.baseURL = 'http://66.6.58.37:9080/dweb';//业务测试环境
// axios.defaults.baseURL = 'http://66.6.55.155:9080/dweb';//开发测试【服务器】




axios.defaults.withCredentials = true;

/**
 * 默认100S请求超时
 */

axios.defaults.timeout = 1000000;


/**
 * 设置post请求头
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';



/**
 * 请求拦截器
 */
axios.interceptors.request.use(

	config => {
		// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		const sessionId = sessionStorage.getItem("sessionId");
		config.headers.token = sessionId;
		// config.baseURL = config.baseURL + '/hhh'
		// console.log(JSON.stringify(config))
		return config;
	},
	error => {
		return Promise.error(error);
	}
)

// 响应拦截器
axios.interceptors.response.use(
	response => {
		// var res = eval(response);
		// var res = JSON.stringify(response);
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是200的情况    
	error => {
		if (error.response.status) {
			// switch (error.response.status) {
			// 	// 401: 未登录                
			// 	// 未登录则跳转登录页面，并携带当前页面的路径                
			// 	// 在登录成功后返回当前页面，这一步需要在登录页操作。                
			// 	case 401:
			// 		var win = window;
			// 		while (win != win.top) {
			// 			win = win.top;
			// 		}

			// 		win.location.href = "/gmweb/#/login";
			// 		break;
			// 		// 403 token过期                
			// 		// 登录过期对用户进行提示                
			// 		// 清除本地token和清空vuex中token对象                
			// 		// 跳转登录页面                
			// 	case 403:
			// 		Toast({
			// 			message: '登录过期，请重新登录',
			// 			duration: 1000,
			// 			forbidClick: true
			// 		});
			// 		// 清除token                    
			// 		// localStorage.removeItem('token');
			// 		// store.commit('loginSuccess', null);
			// 		// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
			// 		setTimeout(() => {
			// 			this.$router.replace({
			// 				path: '/login',
			// 				query: {
			// 					redirect: this.$router.currentRoute.fullPath
			// 				}
			// 			});
			// 		}, 1000);
			// 		break;
			// 		// 404请求不存在                
			// 	case 404:
			// 		// Toast({
			// 		//     message: '网络请求不存在',
			// 		//     duration: 1500,
			// 		//     forbidClick: true
			// 		// });
			// 		// this.$message({
			// 		//   message: '警告哦，这是一条警告消息',
			// 		//   type: 'warning'
			// 		// });
			// 		break;
			// 		// 其他错误，直接抛出错误提示                
			// 	default:
			// 		// Toast({
			// 		//     message: error.response.data.message,
			// 		//     duration: 1500,
			// 		//     forbidClick: true
			// 		// });
			// 		// alert('这是一条消息提示222');
			// }
			return Promise.reject(error.response);
		}
	}
)

export default axios



/**
 * get请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(params)).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data).then(
			response => {
				resolve(response.data)
			},
			err => {
				reject(err)
			}
		)
	})
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then(
			response => {
				resolve(response.data)
			},
			err => {
				reject(err)
			}
		)
	})
}
