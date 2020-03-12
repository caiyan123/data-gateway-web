<template>
	<div class="hover-menu" :style="imgStyle">
		<div class="mask" @click="maskClick" v-if="show"></div>
		<div style="display: flex; margin-top: 20px;">
			<transition name="el-zoom-in-bottom">
				<div v-show="show" class="out-box" 
					@mouseenter="show3 = true"
					@mouseleave="tranMouseleave()">
					<div class="transition-box" :class="editing ? 'transition-box-edit' : ''">
						<el-row class="buttonBar">
							<el-button v-if="!editing" style="float: right" icon="el-icon-edit" type="primary" size="mini" @click="handleEdit()">编辑</el-button>
							<el-button v-if="editing" style="float: right" icon="el-icon-edit" type="primary" size="mini" @click="handleCancle()">取消</el-button>
							<el-button v-if="editing" style="float: right" icon="el-icon-edit" type="primary" size="mini" @click="handleSave()">保存</el-button>
						</el-row>
						<draggable
							class="used-group"
							:list="quickMenus"
							v-bind="dragOptions"
							group="people"
							:sort="editing"
							:disabled="!editing"
							@add="onAdd"
							@start="isDragging = true"
							@end="isDragging = false">
							<transition-group type="transition" name="flip-list">
								<template v-for="menu in quickMenus">
									<!-- <el-tooltip effect="light" 
										transition="el-zoom-in-top" 
										:enterable="false"
										:content="menu.menuName" 
										placement="top" 
										v-bind:key="menu.order"> -->
										<div class="boxMenu" 
											:class="mouseHover && !editing ? 'shake shake-slow' : ''"
											:style="menu.bgc" 
											:key="menu.order"
											@mouseenter="boxMouseenter">
											<el-image class="del-img" v-if="editing"
												:src="quickDel" fit="fill"
												@click.native="delQuickMenu(menu)"></el-image>
											<el-image class="el-img" :src="menu.menuIcon" fit="fill"
												@click.native="goMenu(menu.menuUrl)"></el-image>
											<div style="margin-top: 1px;">{{ menu.menuName }}</div>
										</div>
									<!-- </el-tooltip> -->
								</template>
								<div style="width: 300px; height: 20px;" 
									key="0" v-if="quickMenus.length == 0">
								</div>
							</transition-group>
						</draggable>
					</div>
				</div>
			</transition>
			<transition name="el-zoom-in-bottom">
				<div v-show="allShow" class="out-box">
					<div class="transition-box" 
						:class="editing ? 'transition-box-all' : ''">
						<draggable
							:list="allMenus"
							v-bind="dragOptions"
							:group="{ name: 'people', pull: 'clone', put: false }"
							draggable=".draggable-item"
							:clone="cloneDog"
							@start="isDragging = true"
							@end="isDragging = false">
							<transition-group type="transition" name="flip-list">
								<template v-for="menu in allMenus">
									<div class="boxMenu" style="width: 15%"
										:class="menu.draggable ? 'draggable-item' : 'undraggable-item'"
										:style="menu.bgc" 
										:id="menu.menuId"
										:key="menu.order">
										<el-image class="el-img"
											:src="menu.menuIcon" fit="fill" ></el-image>
										<div style="margin-top: 1px;">{{ menu.menuName }}</div>
										<el-image class="suc-img" :class="menu.menuName.length > 7 ? 'suc-img_' : ''" v-if="!menu.draggable"
											:src="quickSuc" fit="fill"></el-image>
									</div>
								</template>
							</transition-group>
						</draggable>
					</div>
				</div>
			</transition>
		</div>
		<el-tooltip 
			:disabled="disabled"
			:value="value"
			effect="dark"
			:enterable="false"
			content="这是快捷菜单" 
			placement="right">
			<el-image :src="quickImg" fit="fill"
				class="quick-img" 
				:class="imgXz ? 
					(show2 ? 'img-xz img-click' : 'img-xz') : 
					(show2 ? 'img-click' : '')"
				@click.native="quickClick"
				@mousedown="move" 
				>
			</el-image>
		</el-tooltip>
	</div>
</template>

<script>
	import draggable from 'vuedraggable';
	
	const quickMenus = [];
	const allMenus = [];
	
	export default {
		components: {
			draggable
		},
		data: () => ({
			pHeight: 0,
			value: false,
			disabled: true,
			show2: false,
			show3: false,
			allShow: false,
			rows: 4,
			cols: 6,
			imgXz: false, // 控制自动旋转的
			moving: false, // 快捷按钮是否正在移动
			mouseHover: false, // 鼠标覆盖在菜单上
			editing: false, // 是否正在编辑菜单
			imgStyle: {
				left: '-40px',
				bottom: '30px'
			},
			quickImg: require('../../../../assets/qmenu.png'),
			quickMenus: [],
			quickMenusBack: [],
			quickDel: require('../../../../assets/quickMenu/error.png'),
			quickSuc: require('../../../../assets/quickMenu/success.png'),
			allMenus: [],
			cloneMenu: null,
			isChange: false
		}),
		mounted() {
			var _this = this
			this.xuanzhuanyixia()
			// this.tishichuxianyixia()
			// 每隔10s旋转一下，以示尊敬
			setInterval(function() {
				_this.xuanzhuanyixia()
				// _this.tishichuxianyixia()
			}, 10000)
			this.pHeight = document.body.clientHeight 
				| document.documentElement.clientHeight;
			// this.imgStyle.top = (this.pHeight - 30 - 25) + 'px'
			setTimeout(function() {
				_this.imgStyle.left = '20px'
			}, 2000);
			
			this.getUserMenusInfo()
			// 加载全部快捷菜单数据
			this.getAllMenusInfo()
		},
		watch: {
			editing(newValue, oldValue) {
				var _this = this
				if (newValue) {
					setTimeout(function() {
						_this.allShow = true
					}, 500);
				} else {
					// this.allShow = false
				}
			},
			quickMenus() {
				this.isChange = true
				// 搞一个，每次变化都更新下全部菜单的状态
				for (var i = 0; i < this.allMenus.length; i ++) {
					this.updateAllMenuStatus(
						this.allMenus[i].menuName, true)
					for (var j = 0; j < this.quickMenus.length; j ++) {
						if (this.allMenus[i].menuName 
							== this.quickMenus[j].menuName) {
							this.updateAllMenuStatus(
								this.allMenus[i].menuName, false)
							// 设置下位移高度
							console.log(this.allMenus[i].menuName + ':' + this.allMenus[i].menuName.length)
							if (this.allMenus[i].menuName.length > 7) {
								this.top_ = -70
							}
							break
						}
					}
				}
			}
		},
		computed: {
			show() {
				return this.show2 || this.show3
			},
			quickRows: function() {
				// 每行6个菜单，计算行数
				// 向上取整
				let length = Math.ceil(
					this.quickMenus.length / this.cols)
				return length
			},
			dragOptions() {
				return {
					animation: 200,
					group: "description",
					disabled: false,
					ghostClass: "ghost"
				};
			}
		},
		methods: {
			cloneDog(obj) {
				this.cloneMenu = obj
				return obj;
			},
			onAdd: function(evt) {
				//this.cloneMenu
				// 移动结束，对所有菜单栏中拖动的菜单设置✔
				// this.updateAllMenuStatus(this.cloneMenu.name, false)
			},
			move(e) {
				let odiv = e.target; //获取目标元素
				//阻止默认事件的方法,如果不阻止默认事件onmouseup会无法触发
				e.preventDefault();
				//算出鼠标相对元素的位置
				let disX = e.clientX - odiv.offsetLeft;
				let disY = e.clientY - odiv.offsetTop;
				document.onmousemove = (e) => { //鼠标按下并移动的事件
					this.moving = true
					//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
					let left = e.clientX - 12;
					let top = e.clientY - 12;
					//移动当前元素
					this.imgStyle.left = left + 'px'
					// this.imgStyle.top = top + 'px'
					this.imgStyle.bottom = this.pHeight - top - 30 + 'px'
				};
				document.onmouseup = (e) => {
					document.onmousemove = null;
					document.onmouseup = null;
					var _this = this
					setTimeout(function() {
						_this.moving = false
					}, 10);
				};
			},
			goMenu(url) {
				if (url == undefined || url == null
					|| url == '') {
					this.$message.error('URL暂未配置!');
					return
				}
				
				if (!this.editing) {
					this.show2 = false
					this.show3 = false
					this.$router.push(url);
				}
			},
			quickClick() {
				if (!this.moving) {
					this.show2 = !this.show2
				}
				this.allShow = false
				this.editing = false
			},
			imgMouseleave() {
				let _this = this
				setTimeout(function() {
					_this.show2 = false
				}, 200);
			},
			tranMouseleave() {
				let _this = this
				setTimeout(function() {
					_this.show3 = false
				}, 200);
			},
			boxMouseenter() {
				if (!this.moving) {
					this.mouseHover = true
					let _this = this
					setTimeout(function() {
						_this.mouseHover = false
					}, 500);
				}
			},
			xuanzhuanyixia() {
				// 来回旋转一下
				var _this = this
				setTimeout(function() {
					_this.imgXz = true
				}, 1000);
				setTimeout(function() {
					_this.imgXz = false
				}, 2000);
			},
			tishichuxianyixia() {
				// 每隔多长时间出现一下提示
				var _this = this
				setTimeout(function() {
					_this.disabled = false
					_this.value = true
				}, 1000);
				setTimeout(function() {
					_this.disabled = true
					_this.value = false
				}, 2000);
			},
			handleEdit() {
				this.editing = true
				// 备份一下菜单
				this.quickMenusBack = 
					JSON.parse(JSON.stringify(this.quickMenus))
			},
			handleCancle() {
				if (this.isChange) {
					this.$confirm('您的操作还未保存，是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '已取消!'
						});
						this.cancleMethod()
					});
				} else {
					this.cancleMethod()
				}
			},
			handleSave() {
				// 多了个保存操作
				this.$confirm('确认保存吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 保存操作
					var params = {};
					params['condition'] = JSON.stringify(this.quickMenus);
					this.$api.menu.saveUserQuickMenus(params).then(res => {
						this.$message({
							type: 'success',
							message: '保存成功!'
						});
						this.quickMenusBack = 
							JSON.parse(JSON.stringify(this.quickMenus))
						var _this = this
						setTimeout(function() {
							// 页面变化与取消操作一样的
							_this.allShow = false
							setTimeout(function() {
								_this.editing = false
								_this.isChange = false
							}, 500);
						}, 500);
					})
				});
			},
			cancleMethod() {
				this.allShow = false
				// 取消操作，恢复原样
				this.quickMenus =
					JSON.parse(JSON.stringify(this.quickMenusBack))
				var _this = this
				setTimeout(function() {
					_this.editing = false
					_this.isChange = false
				}, 500);
			},
			maskClick() {
				if (this.isChange) {
					this.$confirm('您的操作还未保存，是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '已取消!'
						});
						this.cancleMethod()
						this.show2 = false
					});
				} else {
					this.cancleMethod()
					this.show2 = false
				}
			},
			delQuickMenu(menu) {
				this.quickMenus.splice(
					this.quickMenus.indexOf(menu), 1)
				// this.updateAllMenuStatus(menu.name, true)
			},
			updateAllMenuStatus(name, bl) {// true设置可拖拽，false不能拖拽
				for (var i = 0; i < this.allMenus.length; i ++) {
					if (this.allMenus[i].menuName == name) {
						this.allMenus[i].draggable = bl // 可拖拽
						break
					}
				}
			},
			getAllMenusInfo() {
				this.$api.menu.findQuickMenus().then(res => {
					// 全部快捷菜单
					this.allMenus = res.json.data.map((item, index) => {
						item.order = index + 1
						item.draggable = true
						item.iconName = item.menuIcon
						item.menuIcon = require(
							'../../../../assets/quickMenu/' + item.menuIcon)
						// 判断哪些是不可拖拽的
						for (var i = 0; i < this.quickMenus.length; i ++) {
							if (this.quickMenus[i].menuName == item.menuName) {
								item.draggable = false // 不可拖拽
								break
							}
						}
						return item;
					})
				})
			},
			getUserMenusInfo() {
				this.$api.menu.findUserQuickMenus().then(res => {
					// 获取用户的快捷菜单
					this.quickMenus = res.json.data.map((item, index) => {
						item.iconName = item.menuIcon
						item.menuIcon = require(
							'../../../../assets/quickMenu/' + item.menuIcon)
						item.order = 100 + index + 1
						return item;
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '../../../../style/csshack/csshake.css';
	
	.hover-menu {
		position: absolute;
		// left: 20px;
		// bottom: 30px;
		// top: 400px;
		z-index: 2000;
	}
	
	.draggable-item {
	}
	.undraggable-item {
		// background-color: #99A9BF;
	}
	
	.quick-img {
		width: 25px; 
		height: 25px;
		z-index: 2001;
		-webkit-transition: -webkit-transform 0.5s ease-out;
		-moz-transition: -moz-transform 0.5s ease-out;
		-o-transition: -o-transform 0.5s ease-out;
		-ms-transition: -ms-transform 0.5s ease-out;
	}
	
	.quick-img:hover {
		width: 35px;
		height: 35px;
		cursor: pointer;
		-webkit-transform: rotateZ(360deg);
		-moz-transform: rotateZ(360deg);
		-o-transform: rotateZ(360deg);
		-ms-transform: rotateZ(360deg);
		transform: rotateZ(360deg);
	}
	
	.img-xz {
		-webkit-transform: rotateZ(360deg);
		-moz-transform: rotateZ(360deg);
		-o-transform: rotateZ(360deg);
		-ms-transform: rotateZ(360deg);
		transform: rotateZ(360deg);
	}
	.img-click {
		width: 35px;
		height: 35px;
	}
	
	.el-img {
		width: 50px; 
		height: 50px; 
		vertical-align: middle; 
		cursor: pointer;
	}
	
	.suc-img {
		position: relative;
		top: -65px;
		left: 60px;
		display: block;
		width: 16px;
		height: 16px;
	}
	.suc-img_ {
		top: -81px;
	}
	.del-img {
		position: relative;
		top: 10px;
		left: 50px;
		display: block;
		width: 16px;
		height: 16px;
		z-index: 1;
	}
	
	.transition-box {
	    // margin-bottom: 10px;
	    width: 400px;
	    height: 300px;
	    border-radius: 5px;
	    background-color: #FFFFFF;// #409EFF;
	    text-align: center;
	    color: #fff;
	    padding: 20px 20px;
		padding-top: 10px;
	    box-sizing: border-box;
		// z-index: 2001;
	    margin-right: 10px;
		transition:height 0.5s; 
		-moz-transition:height 0.5s; /* Firefox 4 */ 
		-webkit-transition:height 0.5s; /* Safari and Chrome */ 
		-o-transition:height 0.5s; /* Opera */
	}
	.transition-box-edit {
		height: 500px;
		transition:height 0.5s;
		-moz-transition:height 0.5s; /* Firefox 4 */ 
		-webkit-transition:height 0.5s; /* Safari and Chrome */ 
		-o-transition:height 0.5s; /* Opera */
	}
	.transition-box-all {
		width: 650px;
		height: 500px;
		padding-top: 20px;
	}
	
	.boxMenu {
		display: inline-block;
		float: left;
		width: 18%;
		height: 70px;
		// line-height: 40px;
		font-size: 40px;
		// margin: 10px auto;
		// left: 50%;
		margin: 3px;
		cursor: pointer;
		text-align: center;
		color: #333;
		// background-color: #fff;
	}
	
	.boxMenu {
		span {
			-webkit-transition: font-size 0.25s linear, width 0.25s linear;
			-moz-transition: font-size 0.25s linear, width 0.25s linear;
			transition: font-size 0.25s linear, width 0.25s linear;
			margin-top: 8px;
			color: #FFFFFF;
		}
	
		div {
			font-size: 10px;
			margin-top: -3px;
			-webkit-transition: font-size 0.25s linear, width 0.25s linear;
			-moz-transition: font-size 0.25s linear, width 0.25s linear;
			transition: font-size 0.25s linear, width 0.25s linear;
		}
	}
	
	.flip-list-move {
		transition: transform 0.5s;
	}
	.no-move {
		transition: transform 0s;
	}

	.buttonBar {
		background-color: #FFFFFF;// #409EFF;
		padding: 5px;
		border-radius: 5px 5px 0 0;
	}

	.buttonBar .el-button--primary {
		// color: #FFF;
		background-color: #FFFFFF;// #409EFF;
		border-color: #FFFFFF;// #409EFF;
	}
	
	.out-box {
		padding-bottom: 10px; 
		z-index: 2001;
	}
	
	.mask{
	    position:fixed;
	    top     : 0;
	    left    : 0;
	    bottom  : 0;
	    right   : 0;
	    background:rgba(0,0,0,.5); 
		// z-Index:1000
	}
	
	.used-group {
		min-height: 100px;
	}

</style>
