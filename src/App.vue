<template>
	<div id="app" @click="clicked">
		<transition name="fade" mode="out-in"><router-view></router-view></transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			lTime: new Date().getTime(), // 最后一次点击的时间
			ctTime: new Date().getTime(), //当前时间
			tOut: 60 * 60 * 1000 //超时时间10min
		};
	},
	mounted() {
		window.setInterval(this.tTime, 5000);
	},
	methods: {
		clicked() {
			this.lTime = new Date().getTime(); //当界面被点击更新点击时间
		},

		tTime() {
			var route = this.$route.path;
			this.ctTime = new Date().getTime();
			if (route != '/' && route != '/login') {
				if (this.ctTime - this.lTime > this.tOut) {
					var _this = this;
					this.$api.login.sessionTimeout().then(res => {
						_this.$router.push('/login');
					});
					// this.$alert('会话超时！请重新登陆。', '提示', {
					// confirmButtonText: '确定',
					// 
     //    });
				}				
			}
		}
	}
};
</script>

<style>
body {
	height: 100%;
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	/* background: #1F2D3D;*/
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
	background-color: #e5e6e8;
}

.el-submenu [class^='fa'] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^='fa'] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #ffffff;
	padding: 10px;
	/* border:1px solid #dfe6ec; */
	border-radius: 5px;
	/* margin: 10px 0px; */

	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

.buttonBar {
	background-color: #ffffff;
	padding: 5px;
	border-radius: 5px 5px 0 0;
}

.buttonBar .el-button--primary {
	color: #000;
	background-color: #ffffff;
	border-color: #ffffff;
}

.buttonBar .el-button--mini,
.el-button--mini.is-round {
	padding: 5px 4px;
}
</style>
