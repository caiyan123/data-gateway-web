<template>
	<div>
		<el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom: 20px;"></el-input>
		<el-tree class="filter-tree" :data="menuTree" :props="defaultProps" @node-click="handleNodeClick" style="height: 100%;" ref="menuTree" :filter-node-method="filterNode" 
		:highlight-current="true" :expand-on-click-node="false" node-key="menuId" show-checkbox  default-expand-all
		:default-checked-keys="checkMenu"></el-tree>
	</div>
</template>

<script>
export default {
	props: {
	  menuMsg: {
	      type: Object
	  }
	},
	data() {
		return {
			filterText: '',
			menuTree: [],
			checkMenu:[],
			defaultProps: {
				children: 'childMenu',
				label: 'menuName'
			}
		};
	},
	mounted() {
		this.$api.roleManage.searchMenu(this.menuMsg.menuType).then(res => {
			this.menuTree = res;
		});
		this.$api.roleManage.getMenuByRoleId(this.menuMsg.roleId,this.menuMsg.menuType).then(res => {
			this.checkMenu = res
		})
	},
	methods: {
		handleNodeClick(data) {
			console.log(data)
        },
		filterNode(value, data) {
			if (!value) return true;
			return data.menuName.indexOf(value) !== -1;
		},
	},
	watch: {
		filterText(val) {
			this.$refs.menuTree.filter(val);
		}
	}
};
</script>

<style scoped="scoped">
.el-alert--success.is-light {
	background-color: #1e90ff;
	color: #ffffff;
	border-radius: 4px 4px 0 0 !important;
}
</style>
