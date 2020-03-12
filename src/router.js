import Vue from "vue";
import VueRouter from "vue-router";

//数据模块
import dataContents from './components/pages/dataMenu/dataContents/dataContent.vue'
import dataInterface from './components/pages/dataMenu/dataInterface/dataInterface.vue'
import dataMap from './components/pages/dataMenu/dataMap/dataMap.vue'
import dataSet from './components/pages/dataMenu/dataSet/dataSet.vue'

import Login from './components/login.vue'
import Home from './components/HomePage.vue'
import mainpage from './components/pages/main.vue'

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
Vue.component('Login', Login)

const routes = [{
		path: "/home",
		component: Home,
		name: '首页',
		redirect: '/',
		children: [{
				path: '/',
				component: mainpage,
				// name: '首页'
			},
			{
				path: "/dataMenu/dataContents",
				component: dataContents,
				name: '数据目录'
			},
			{
				path: "/dataMenu/dataInterface",
				component: dataInterface,
				name: '数据接口'
			},
			{
				path: "/dataMenu/dataMap",
				component: dataMap,
				name: '数据地图'
			},
			{
				path: "/dataMenu/dataSet",
				component: dataSet,
				name: '数据集'
			}

		]
	},
	{
		path: "/",
		component: Login
	},
	{
		path: "/login",
		component: Login
	},


]

var router = new VueRouter({
	routes
})

export default router;
