<template>
	<el-row id="homepage_container" class="container">
		<el-col :span="24" class="header">
			<el-col :span="8" class="logo logo-width">
				<el-image style="width: 300px; height: 35px; vertical-align: middle; cursor: pointer;" :src="url" fit="fill" @click.native="goMainPage"></el-image>
				<!-- <el-divider direction="vertical"></el-divider> -->
				<!-- <span>{{ sysName }}</span> -->
			</el-col>
			<el-col :span="12" class="menuinfo">
				<!-- 后台传入方式 -->
<!-- 				<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#2572B5" text-color="#fff" active-text-color="#ffd04b">
					<menu-tree v-for="item in menuTree" :key="item.menuId" :menu="item"></menu-tree>
				</el-menu> -->
				<el-menu :default-active="$route.path" router="router"  mode="horizontal" @select="handleSelect" background-color="#545c64"
				 text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item index="/home">首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title">数据</template>
						<el-menu-item index="/dataMenu/dataContents" >数据目录</el-menu-item>
						<el-menu-item index="/dataMenu/dataInterface">数据接口</el-menu-item>
						<el-menu-item index="/dataMenu/dataSet" >数据集</el-menu-item>
						<el-menu-item index="/dataMenu/dataMap" >数据图</el-menu-item>
					</el-submenu>
					<el-menu-item index="3" disabled>应用</el-menu-item>
					<el-menu-item index="4" disabled>资讯</el-menu-item>
					<el-menu-item index="5" disabled>互动</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-row>
					<el-col :span="20">
						<el-dropdown trigger="click" @visible-change="handleShow">
							<span v-popover:popover4 class="el-dropdown-link userinfo-inner">
								<img :src="this.sysUserAvatar" style="width: 25px; height: 25px;" />
								{{ sysUserName }}
							</span>
							<el-dropdown-menu slot="dropdown" :show-timeout="50" :hide-timeout="50">
								<!-- <el-dropdown-item>个人信息</el-dropdown-item> -->
								<el-dropdown-item @click.native="changePasswdDialog = true">修改密码</el-dropdown-item>
								<el-dropdown-item divided @click.native="logout">注销</el-dropdown-item>
							</el-dropdown-menu>
							<el-popover
							  ref="popover4"
							  placement="bottom"
							  width="200"
							  :disabled="show2"
							  popper-class="popper-cls"
							  trigger="hover">
							  <el-col :span="24">
								  <el-col :span="5">姓名:</el-col>
								  <el-col :span="19">{{sysUserName}}</el-col>
							  </el-col>
							  <el-col :span="24">
								  <el-col :span="5">角色:</el-col>
								  <el-col :span="19">{{roleList}}</el-col>
							  </el-col>
							  <el-col :span="24">
								  <el-col :span="5">机构:</el-col>
								  <el-col :span="19">{{orgName}}</el-col>
							  </el-col>
							</el-popover>
						</el-dropdown>
					</el-col>
				</el-row>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<section class="content-container" :style="sectionX">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container" v-if="breadcrumb">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
							<template v-for="item in $route.matched">
								<el-breadcrumb-item v-bind:key="item.path" v-if="item.path !== '/home'">{{ item.name }}</el-breadcrumb-item>
							</template>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper" style="background-color: #E5E6E8;">
						<transition name="fade" mode="out-in"><router-view></router-view></transition>
					</el-col>
				</div>
			</section>
		</el-col>
		<el-dialog title="修改密码 " :visible.sync="changePasswdDialog" width="450px" :before-close="handleClose" center>
			<el-form :model="changePasswdForm">
				<h3>为了保障您的账号安全，请及时修改初始密码。</h3>
				<el-form-item label="初始密码:" :label-width="formLabelWidth">
					<el-input type="password" auto-complete="off" style="width:250px" v-model="changePasswdForm.oldPasswd" @focus="clearErrMsg" clearable maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="新密码:" :label-width="formLabelWidth">
					<el-input type="password" auto-complete="off" style="width:250px" v-model="changePasswdForm.newPasswd" @focus="clearErrMsg" clearable maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码:" :label-width="formLabelWidth">
					<el-input type="password" auto-complete="off" style="width:250px" v-model="changePasswdForm.newPasswd2" @focus="clearErrMsg" clearable maxlength="20"></el-input>
				</el-form-item>
				<p id="errMsg" v-if="test" style="color:red ;font-size:16px;margin-left:120px">{{ errMsg }}!</p>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changePasswd">确 定</el-button>
			</div>
		</el-dialog>


		
		<!-- 悬浮菜单 -->
		<!-- <quick-menu></quick-menu> -->
	</el-row>
</template>

<script>
import MenuTree from './menu';
import QuickMenu from '~/components/pages/common/yx_modules/quickMenu';
import { mapState } from 'vuex';

export default {
	components: {
		MenuTree,
		QuickMenu
	},
	data() {
		const item = {
			date: '2016-05-02',
			name: '王小虎',
			src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
			address: '上海市普陀区金沙江路 1518 弄'
		};
		return {
			show2: false,
			changePasswdDialog: false,
			formLabelWidth: '120px',
			test: false,
			errMsg: '',
			url: require('../assets/logo.png'),
			androidUrl: require('../assets/qmenu.png'),
			iosUrl: require('../assets/qmenu.png'),
			// sysName: '数聚合|洞悉更有可能的未来',
			collapsed: false,
			sysUserName: '',
			orgName: '',
			roleList: '',
			sysUserAvatar: require('../assets/username.png'),
			tableData: Array(20).fill(item),
			activeIndex: '1',
			activeIndex2: '1',
			slideX: {
				left: ''
			},
			sectionX: {
				'padding-left': ''
			},
			mouseDiv: {
				width: ''
			},
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			changePasswdForm: {
				oldPasswd: '',
				newPasswd: '',
				newPasswd2: ''
			}
		};
	},
	methods: {
		fadeIn() {
			this.show = !this.show;
		},
		onSubmit() {
			console.log('submit!');
		},
		showSlide() {
			if (this.collapsed) {
				this.slideX.left = '0px';
				this.sectionX['padding-left'] = '20px';
				this.mouseDiv.width = '22px';
			}
		},
		hideSlide(e) {
			if (this.collapsed) {
				if (e.clientX >= 17 || e.clientY < 60) {
					this.slideX.left = '-17px';
					this.sectionX['padding-left'] = '5px';
				}
			}
		},
		handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleSelect: function(a, b) {},
		clickToFunc: function() {
			alert('还没开发哦，稍等');
		},
		slideStatus: function() {
			this.collapsed = !this.collapsed;
		},
		//退出登录
		logout: function() {
			var _this = this;
			this.$confirm('确认退出吗?', '提示', {
				//type: 'warning'
			})
				.then(() => {
					this.$api.login.loginOut();
					_this.$router.push('/login');
				})
				.catch(() => {});
		},
		handleShow(bl) {
			this.show2 = bl
		},
		changePasswd: function() {
			if (this.changePasswdForm.oldPasswd.length <5 || this.changePasswdForm.newPasswd.length <5 || this.changePasswdForm.newPasswd2.length <5) {
				this.test = true;
				this.errMsg = '请输入至少五位密码';
				return false;
			} else if (this.changePasswdForm.newPasswd != this.changePasswdForm.newPasswd2) {
				this.test = true;
				this.errMsg = '新密码前后输入不一致，请确认';
				return false;
			}
			var changePwdParams = {
				password: this.$api.md5.hex_md5(this.changePasswdForm.oldPasswd),
				newPasswd: this.$api.md5.hex_md5(this.changePasswdForm.newPasswd)
			};
			this.$api.passwdManage
				.changePasswd(changePwdParams)
				.then(res => {
					if (res.resMsg == '操作成功') {
						this.$message({
							message: '密码修改成功，请重新登陆',
							type: 'success'
						});
						this.$router.push({
							path: '/login'
						});
					} else {
						this.test = true;
						this.errMsg = res.resMsg;
					}
				})
				.catch(res => {});
			changePasswdDialog = false;
		},
		clearErrMsg: function() {
			this.test = false;
		},
		handleClose(done) {
			this.changePasswdForm.oldPasswd = '';
			this.changePasswdForm.newPasswd = '';
			this.changePasswdForm.newPasswd2 = '';
			done();
		},

		goMainPage: function() {
			var _this = this;
			_this.$router.push('/home');
		},
		//折叠导航栏
		collapse: function() {
			this.collapsed = !this.collapsed;
		},
		showMenu(i, status) {
			this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
		},
		findMenuTree: function() {
			this.$api.menu
				.findMenuTree()
				.then(res => {
					// alert(JSON.stringify(res))
					// this.$store.commit('setMenuTree', res.menuTree)
					this.$store.commit('setMenuTree', res.json.data);
				})
				.catch(function(res) {});
		},
		downloadApp() {
			// var params={path: 'data/__UNI__A0A330A_0930151905.apk'};
			// this.$api.download.download(params).then((res) => {
			// 	var response=res;
			// }).catch(function(res) {
			// 	
			// })
		}
	},
	watch: {
		collapsed(val) {
			if (!val) {
				this.slideX.left = '';
			}
		}
	},
	computed: mapState([
		// 采用的数组方式	//  mapState({	//对象方式    也可以直接调用，不在这写了
		'menuTree', //		menuTree: state => state.menuTree
		'breadcrumb' //		breadcrumb: state => state.breadcrumb
	]), //  })
	mounted() {
		// 设置用户
		this.sysUserName = sessionStorage.getItem('userName');
		//用户机构
		this.orgName = sessionStorage.getItem('orgName');
		//用户角色
		this.roleList = sessionStorage.getItem('roleList');
		
		// alert(this.$store.state)
		// 加载菜单
		this.findMenuTree();
	}
};
</script>

<style scoped lang="scss">
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;

	.header {
		height: 60px;
		line-height: 60px;
		background: #545c64;
		color: #fff;

		.menuinfo {
			background-color: #475669;
		}

		.userinfo {
			text-align: right;
			// padding-right: 35px;
			float: right;

			.userinfo-inner {
				cursor: pointer;
				color: #fff;

				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 18px 10px 10px 15px;
					float: left;
				}
			}

			.nav-gap {
				width: 1px;
				height: 60px;
				padding: 0 10px;
				// color: #475669;
			}
		}

		.logo {
			//width:230px;
			height: 60px;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;
			border-color: rgba(238, 241, 146, 0.3);

			// border-right-width: 1px;
			// border-right-style: solid;
			img {
				width: 40px;
				float: left;
				margin: 10px 10px 10px 18px;
			}

			.txt {
				color: #fff;
			}
		}

		.logo-width span {
			font-size: 16px;
		}

		.logo-collapse-width {
			width: 60px;
		}

		.tools {
			padding: 0px 23px;
			width: 14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}

	.main {
		display: flex;
		// background: #324057;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;

		aside {
			flex: 0 0 70px;
			width: 70px;
			margin-top: 10px;
			margin-bottom: 10px;
			z-index: 2000;
			border-top-right-radius: 5px;

			// padding-top: 5px;
			// background-color: #FEC423;
			// position: absolute;
			// top: 0px;
			// bottom: 0px;
			.menuBox {
				height: 60px;
				// border: 1px solid #fff;
				// background-color: #2572B5;
				padding-top: 5px;
				cursor: pointer;
			}

			// .menuBox :hover {
			// 	background-color: #2572B5;
			// }

			.el-menu {
				height: 100%;
			}

			.collapsed {
				width: 60px;

				.item {
					position: relative;
				}

				.submenu {
					position: absolute;
					top: 0px;
					left: 60px;
					z-index: 99999;
					height: auto;
					display: none;
				}
			}
		}

		.slideCls {
			position: fixed;
			width: 17px;
			background-color: #fff;
			bottom: 45%;
			font-size: 20px;
			padding-top: 12px;
			padding-bottom: 12px;
			color: #2572b5;
			transition: all 0.5s;
			cursor: pointer;
		}

		.slideCls-collapsed {
			left: -17px;
		}

		.slideCls-expanded {
			left: 65px;
		}

		.menu-collapsed {
			flex: 0 0 0px;
			width: 0px;
			-webkit-transition: all 1s;
			-moz-transition: all 1s;
			transition: all 1s;
		}

		.menu-expanded {
			flex: 0 0 70px;
			width: 70px;
			-webkit-transition: all 1s;
			-moz-transition: all 1s;
			transition: all 1s;
		}
		
		section {
			padding-right: 5px;
			padding-left: 5px;
		}

		.content-container {
			// background: #f1f2f7;
			flex: 1;
			// position: absolute;
			// right: 0px;
			// top: 0px;
			// bottom: 0px;
			// left: 230px;
			// overflow-y: auto;
			padding: 10px;
			padding-right: 5px;
			padding-left: 5px;
			-webkit-transition: all 1s;
			-moz-transition: all 1s;
			transition: all 1s;

			.breadcrumb-container {
				// border-radius: 5px;
				// margin-left: 5px;
				// margin-bottom: 5px;
				// margin-right: 15px;
				// padding-top: 5px;
				// padding-left: 5px;
				// background-color: #FFFFFF;
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}

				.breadcrumb-inner {
					float: left;
					margin-bottom: 5px;
					// height: 25px;
					// line-height: 25px;
					margin-left: 5px;
					// margin-right: 5px;
					// padding-left: 5px;
					// background-color: #FFFFFF;
					// width: 99%;
				}
			}

			.content-wrapper {
				background-color: #fff;
				box-sizing: border-box;
			}
		}
	}
}

.boxMenu {
	display: block;
	height: 60px;
	// line-height: 40px;
	font-size: 40px;
	// margin: 10px auto;
	// left: 50%;
	margin: 3px;
	cursor: pointer;
	text-align: center;
	color: #333;
	background-color: #fff;
}

.boxMenu {
	span {
		-webkit-transition: font-size 0.25s linear, width 0.25s linear;
		-moz-transition: font-size 0.25s linear, width 0.25s linear;
		transition: font-size 0.25s linear, width 0.25s linear;
		margin-top: 8px;
		color: #ffffff;
	}

	div {
		font-size: 10px;
		margin-top: -3px;
		-webkit-transition: font-size 0.25s linear, width 0.25s linear;
		-moz-transition: font-size 0.25s linear, width 0.25s linear;
		transition: font-size 0.25s linear, width 0.25s linear;
	}
}

.boxMenu:hover {
	background-color: #aac8e2;

	span {
		font-size: 50px;
		margin-top: 4px;
	}

	div {
		font-size: 15px;
		margin-top: -7px;
	}
}

.boxMenu:visited {
	// background-color: #AAC8E2 !important;
}

.el-divider--vertical {
	height: 35px;
	margin: 0 auto;
	margin-left: 5px;
	margin-right: 5px;
}

.mouseCls {
	position: absolute;
	width: 5px;
	height: 100%;
	left: 0;
}
.transition-box {
    margin-bottom: 10px;
    width: 500px;
    height: 350px;
    border-radius: 4px;
    background-color: #E0E0E0;
    text-align: center;
    color: #000000;
    padding: 20px 20px;
    box-sizing: border-box;
    
  }
</style>
<style>
#homepage_container .el-dialog__header {
	background: #2572b5;
	height: 15px;
	bottom-top: 15px;
	padding-bottom: 15px;
}

#homepage_container .el-dialog__title {
	color: #ffffff;
	font-size: 15px;
}

#homepage_container .el-form-item__label {
	font-size: 16px;
}

/* .el-form-item__label{
		text-align: left;
		}
	.el-input__inner{
		text-align: left;
	} */

.el-dialog__header {
	background: #2572b5;
}

.el-dialog__title {
	color: #ffffff;
}
.el-dialog__headerbtn {
	background-color: #ffffff;
	border-radius: 9px;
	height: 18px;
	width: 18px;
}
.app-layout {
		display: flex;
		flex-direction: column;
		margin-left: 50px;
	}
	.popper-cls {
		top: 60;
	}
</style>
