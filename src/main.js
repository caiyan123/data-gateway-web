import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import {
	store
} from './store/store'

// import MainHeader from './components/header.vue'
// import MainFooter from './components/footer.vue'
import api from './http/api'
import axios from './http/axios'
Vue.use(axios);
Vue.prototype.$axios = axios;
Vue.prototype.$axios.baseURL=axios.defaults.baseURL;


// import Mock from './mock/mock'
// Mock.bootstrap();

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;


// 引入路由
import router from "./router.js" // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错

Vue.use(ElementUI)
Vue.use(api);
// 要告诉 vue 使用 vueRouter
// Vue.component('MainHeader', MainHeader)
// Vue.component('MainFooter', MainFooter)

Vue.prototype.$api = api

router.beforeEach((to, from, next) => {
	//会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转了
	// if (router.app.$children.length > 0) {
		if (to.path == '/home') {
			store.state.breadcrumb = false;
		} else {
			store.state.breadcrumb = true;
		}
	// }
	//
	next()
})

new Vue({
	el: '#app',
	store: store, //使用store
	router, // 注入到根实例中
	render: h => h(App)
})


