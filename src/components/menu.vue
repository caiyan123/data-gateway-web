<template>
	<!-- 写死 -->
	<el-menu :default-active="$route.path"  mode="horizontal" @select="handleSelect" background-color="#545c64"
	 text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item index="/home">首页</el-menu-item>
		<el-submenu index="2">
			<template slot="title">数据</template>
			<el-menu-item index="/data/dataContents" >数据目录</el-menu-item>
			<el-menu-item index="/data/dataInterface">数据接口</el-menu-item>
			<el-menu-item index="/data/dataSet" >数据集</el-menu-item>
			<el-menu-item index="/data/dataMap" >数据图</el-menu-item>
		</el-submenu>
		<el-menu-item index="3" disabled>应用</el-menu-item>
		<el-menu-item index="4">资讯</a></el-menu-item>
		<el-menu-item index="5">互动</a></el-menu-item>
	</el-menu>
	<!-- 后台获取 -->
	<!-- 	<el-submenu :show-timeout="100" :hide-timeout="100" v-if="menu.childMenus && menu.childMenus.length >= 1" :index="menu.menuId + ''">
		<template slot="title">
			<i :class="menu.icon"></i>
			<span slot="title">{{menu.menuName}}</span>
		</template>
		<MenuTree v-for="item in menu.childMenus" :key="item.menuId" :menu="item"></MenuTree>
	</el-submenu>
	<el-menu-item v-else :index="menu.menuId + ''" @click="handleRoute(menu)" @mousedown.native="move">
		<i :class="menu.icon"></i>
		<span slot="title">{{menu.menuName}}</span>
	</el-menu-item> -->
</template>

<script>
	export default {
		// name: 'MenuTree',
		// props: {
		// 	menu: {
		// 		type: Object,
		// 		required: true
		// 	}
		// },
		data() {
			return {
			}
		},
		methods: {
	
			// handleRoute(menu) {
			// 	// 通过菜单URL跳转至指定路由
			// 	this.$router.push(menu.url)
			// }
		}
	}
</script>

<style>

</style>


<!-- <template>
	<el-submenu :show-timeout="100" :hide-timeout="100" v-if="menu.childMenus && menu.childMenus.length >= 1" :index="menu.menuId + ''">
		<template slot="title">
			<i :class="menu.icon"></i>
			<span slot="title">{{menu.menuName}}</span>
		</template>
		<MenuTree v-for="item in menu.childMenus" :key="item.menuId" :menu="item"></MenuTree>
	</el-submenu>
	<el-menu-item v-else :index="menu.menuId + ''" @click="handleRoute(menu)" @mousedown.native="move">
		<i :class="menu.icon"></i>
		<span slot="title">{{menu.menuName}}</span>
	</el-menu-item>
</template>

<script>
	export default {
		name: 'MenuTree',
		props: {
			menu: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				positionX: 0,
				positionY: 0
			}
		},
		methods: {
			handleRoute(menu) {
				// 通过菜单URL跳转至指定路由
				this.$router.push(menu.url)
			},
			move(e) {
// 				let odiv = e.target; //获取目标元素
// 
// 				//算出鼠标相对元素的位置
// 				let disX = e.clientX - odiv.offsetLeft;
// 				let disY = e.clientY - odiv.offsetTop;
// 				document.onmousemove = (e) => { //鼠标按下并移动的事件
// 					//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
// 					let left = e.clientX - disX;
// 					let top = e.clientY - disY;
// 
// 					//绑定元素位置到positionX和positionY上面
// 					this.positionX = top;
// 					this.positionY = left;
// 
// 					//移动当前元素
// 					odiv.style.left = left + 'px';
// 					odiv.style.top = top + 'px';
// 				};
// 				document.onmouseup = (e) => {
// 					document.onmousemove = null;
// 					document.onmouseup = null;
// 				};
			}
		}
	}
</script>

<style>
	.el-submenu__title i {
		color: #FFFFFF;
	}
</style>
 -->