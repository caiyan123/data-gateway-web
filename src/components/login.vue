<template>
	<div id="login_container" style="position: relative;z-index: 1;">
		<!-- 背景图片 -->
		<div style="position:absolute;z-index:2;left:50%;margin-left:-750px;margin-top: 100px;">
			<el-image :src="backgroundImage" fit="fill" style="width:1500px;height:730px;"></el-image>
		</div>
		<!-- form表单 -->
		<div style="position:absolute; z-index: 3;left:58%;margin-top: 100px;">
			<el-form :model="ruleForm2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
				<!-- logo图片 -->
				<div style="margin-left:40px;position: absolute;font-size: 0;"><el-image :src="logo" style="width:300px;height:auto;margin-top:25px"></el-image></div>
				<!-- 用户名输入 -->
				<div style="margin-top:90px;width:100%;position: relative;">
					<!-- 用户名icon -->
					<div style="position: absolute;z-index: 5;margin-top:32px;margin-left:8px;"><el-image :src="userNameLogo" style="width:22px;height:auto"></el-image></div>
					<div style="position: absolute;width:100%;">
						<el-form-item prop="account">
							<el-input
								style="margin-top:20px"
								type="text"
								v-model="ruleForm2.account"
								auto-complete="off"
								placeholder="账号"
								@keyup.enter.native="handleSubmit2"
								@focus="clearErrMsg"
								size="large"
								clearable
							></el-input>
						</el-form-item>
					</div>
				</div>
				<!-- 密码输入 -->
				<div style="margin-top:180px;width:100%;position: relative;">
					<!-- 密码icon -->
					<div style="position: absolute;z-index: 5;margin-top:10px;margin-left:8px;"><el-image :src="passWordLogo" style="width:22px;height:auto"></el-image></div>
					<div style="position: absolute;width:100%;">
						<el-form-item prop="checkPass">
							<el-input
								type="password"
								v-model="ruleForm2.checkPass"
								auto-complete="off"
								placeholder="密码"
								@keyup.enter.native="handleSubmit2"
								@focus="clearErrMsg"
								size="large"
								clearable
								maxlength="20"
							></el-input>
						</el-form-item>
					</div>
				</div>
				<div style="margin-top:240px;height: 40px;">
					<p id="errMsg" v-if="test" style="color:red ;font-size:18px">{{ errMsg }}!</p>
				</div>
				<div style="margin-top:20px;">
					<el-checkbox v-model="checked" class="remember" size="medium">记住用户</el-checkbox>
					<!-- <el-link @click="resetPasswd" type="primary" :underline="false" style="float: right;font-size:15px">忘记密码？</el-link> -->
				</div>
				<!-- 登录按钮 -->
				<el-form-item style="width:100%;margin:0 auto;margin-top:20px;">
					<el-button
						type="primary"
						style="width:100%;height:50px;font-family: SimHei;font-size:20px;letter-spacing:10px;"
						@click.native.prevent="handleSubmit2"
						:loading="logining"
					>
						登录
					</el-button>
					<!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
// import { requestLogin } from '../api/api';
//import NProgress from 'nprogress'
// import crypto from 'crypto'
import axios from 'axios';
export default {
	data() {
		return {
			userNameLogo: require('../assets/username.png'),
			passWordLogo: require('../assets/password.png'),
			backgroundImage: require('../assets/dl.png'),
			logo: require('../assets/loginLogo.png'),
			test: false,
			errMsg: '',
			logining: false,
			checked: false,
			ruleForm2: {
				account: '',
				checkPass: ''
			}

		};
	},
	mounted() {
		this.getCookie();
	},
	methods: {
		handleReset2() {
			this.$refs.ruleForm2.resetFields();
		},
		resetPasswd() {
			if (this.ruleForm2.account == '') {
				this.test = true;
				this.errMsg = '请先输入账号';
				return false;
			}
			this.$router.push({
				path: '/resetPasswd',
				query: {
					account: this.ruleForm2.account
				}
			});
		},
		handleSubmit2(ev) {
			this.$router.replace('/home')
			// var _this = this;
			// if (_this.ruleForm2.account == '' || _this.ruleForm2.checkPass == '') {
			// 	_this.test = true;
			// 	_this.errMsg = '账号和密码不能为空';
			// 	return false;
			// }

			// this.$refs.ruleForm2.validate(valid => {
			// 	if (valid) {
			// 		//_this.$router.replace('/table');
			// 		this.logining = true;
			// 		/* const md5 = crypto.createHash('md5');
			// 			md5.update(this.ruleForm2.checkPass);
			// 			let md5password = md5.digest('hex'); */
			// 		//NProgress.start();

			// 		String.prototype.endWith = function(endStr) {
			// 			var d = this.length - endStr.length;
			// 			return d >= 0 && this.lastIndexOf(endStr) == d;
			// 		};
			// 		var loginParams = {
			// 			username: this.ruleForm2.account,
			// 			password: this.$api.md5.hex_md5(this.ruleForm2.checkPass) /* md5password */
			// 		};

			// 		// let form = new FormData();
			// 		// form.append('j_username', this.ruleForm2.account);
			// 		// form.append('j_password', this.ruleForm2.checkPass);
			// 		// loginParams = new URLSearchParams(form);
			// 		this.$api.login
			// 			.requestLogin(loginParams)
			// 			.then(res => {
			// 				this.logining = false;
			// 				//NProgress.done();
			// 				var result = '';
			// 				result = res.resMsg;
			// 				if (result == 'validate success' || result == 'isLogined') {
			// 					// console.log(res.sessionId);
			// 					this.handleCookie('ruleForm2');
			// 					// sessionStorage.setItem("token", res.PCtoken);
			// 					sessionStorage.setItem('userName', res.userName);
			// 					sessionStorage.setItem('roleId', res.roleId);
			// 					sessionStorage.setItem('frId', res.frId);
			// 					sessionStorage.setItem('orgNo', res.orgNo);
			// 					sessionStorage.setItem('orgName', res.orgName);
			// 					sessionStorage.setItem('roleList', res.roleList);
			// 					sessionStorage.setItem('sessionId', res.sessionId);
			// 					sessionStorage.setItem('custManagerNo', res.custManagerNo);
			// 					this.$router.push({
			// 						path: '/home'
			// 					});
			// 				} else {
			// 					_this.test = true;
			// 					_this.errMsg = result;
			// 				}
			// 			})
			// 			.catch(res => {
			// 				this.$message({
			// 					message: '登陆失败！',
			// 					type: 'warning'
			// 				});
			// 				this.logining = false;
			// 			});
			// 	} else {
			// 		return false;
			// 	}
			// });
		},
		handleCookie(formName) {
			const self = this;
			//判断复选框是否被勾选 勾选则调用配置cookie方法
			if (self.checked == true) {
				//传入账号名，密码，和保存天数3个参数
				/* const md5 = crypto.createHash('md5');
					md5.update(self.ruleForm2.checkPass);
					let md5password = md5.digest('hex'); */
				self.setCookie(self.ruleForm2.account, 7);
			} else {
				//清空Cookie
				self.clearCookie();
			}

			//与后端请求代码，本功能不需要与后台交互所以省略
		},
		//设置cookie
		setCookie(c_name, exdays) {
			var exdate = new Date(); //获取时间
			exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
			//字符串拼接cookie
			window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString();
		},
		//读取cookie
		getCookie: function() {
			if (document.cookie.length > 0) {
				var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
				for (var i = 0; i < arr.length; i++) {
					var arr2 = arr[i].split('='); //再次切割
					//判断查找相对应的值
					if (arr2[0] == 'userName') {
						this.ruleForm2.account = arr2[1]; //保存到保存数据的地方
					}
				}
			}
		},
		//清除cookie
		clearCookie: function() {
			this.setCookie('', -1); //修改2值都为空，天数为负1天就好了
		},
		clearErrMsg: function() {
			this.test = false;
		}
	}
};
</script>

<style scoped>
.login-container {
	font-family: 'SimHei';
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin: 70px auto;
	height: 420px;
	width: 380px;
	padding: 20px 20px 20px 20px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;

	.title {
		margin: 0px auto 40px auto;
		text-align: center;
		color: #505458;
	}

	.remember {
		margin: 0px 0px 35px 0px;
	}
}
</style>
<style>
#login_container .el-input__inner {
	padding: 0 35px;
	height: 50px;
	font-size: 18px;
}

#login_container .el-checkbox__inner {
	height: 20px;
	width: 20px;
}

#login_container .el-checkbox__label {
	font-size: 15px;
}

#login_container .el-link--inner {
	font-size: 15px;
}

#login_container .el-input .el-input__clear {
	font-size: 18px;
}

#login_container .el-checkbox__inner::after {
	width: 6px;
	top: 3px;
}
</style>
