<template>
	<el-row class="toolbar" style="padding-bottom: 0px; margin-bottom: 5px;">
		<el-form :inline="true" :model="searchForm" ref="searchForm" label-position="right" size="mini">
			<el-col :span="24" v-for="(childItem, index) in searchModel" :key="index">
				<el-col :span="12" v-for="(domain, key) in searchForm['domains' + index]" :key="key">
					<el-form-item v-if="domain.type == 'text'" :label="domain.labelName" :prop="'domains' + index + '.' + key + '.value'">
						<el-input v-model="domain.value"  style="width:140px" clearable></el-input>
					</el-form-item>
					<el-form-item v-else-if="domain.type == 'date'" :label="domain.labelName" :prop="'domains' + index + '.' + key + '.value'">
                        <el-date-picker v-model="domain.value" type="date" placeholder="选择日期" style="width:300px">
                        </el-date-picker>
					</el-form-item>				
					<el-form-item v-else-if="domain.type == 'select'" :label="domain.labelName" :prop="'domains' + index + '.' + key + '.value'" > 
						<el-select v-model="domain.value" placeholder="请选择" style="width:300px" clearable filterable>
							<el-option v-for="op in domain.option" :key="op.value" :label="op.label" :value="op.value" >

							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-col>
		</el-form>
		<div style="float: right; margin-bottom: 10px;">
			<el-button type="primary"  size="mini" @click="search()" style="width: 100px; height: 32px; font-size: 16px; font-weight: bold;">查询</el-button>
			<el-button type="danger"  size="mini" @click="resetForm('searchForm' )" style="width: 100px; height: 32px; font-size: 16px; font-weight: bold;">重置</el-button>
		</div>
	</el-row>
</template>

<script>
	import Exchange from './exchange.js' //这里是引入exchange.js，作为中转站

	export default {
		name: 'SearchPanel',
		props: {
			searchModel: {
				type: Array
			},
		},
		data() {
			return {
				value: '',
				spanVal: '',
				custTypeVal: '',
				searchForm: {
					domains0: []
				}
			}
		},
		created() {
			// 这里是动态生成v-model
			for (var i = 0; i < this.searchModel.length; i++) {
				var items = this.searchModel[i].items;
				this.searchForm['domains' + i] = [];
				for (var j = 0; j < items.length; j++) {
					this.searchForm['domains' + i].push({
						id: items[j].id,
						labelName: items[j].labelName,
						value: items[j].value,
						type: items[j].type,
						option:items[j].option
					});
				}
			}
		},
		// mounted() {
		// 	// this.spanVal = 24 / searchList.panelList;
		// 	// alert(this.searchModel[0].items.length + ' ssss')
		// 	// 参数传进来时，
		// 	for (var i = 0; i < this.searchModel.length; i ++) {
		// 		var items = this.searchModel[i].items;
		// 		for (var j = 0; j < items.length; j ++) {
		// 			this.searchForm[items[j].id] = '';
		// 		}
		// 	}
		// },
		methods: {
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getSearchParams() {
				// 获取查询版参数
				var params = {};
				for (var key in this.searchForm) {
					var condition = this.searchForm[key];
					for (var m = 0; m < condition.length; m++) {
						params[condition[m].id] = condition[m].value;
					}
				}
				return params;
			},
			search() {
				// 向yxTable组件传递信息，设置分页信息为初始
				Exchange.$emit('initPageInfo', 1)
				this.$emit('query');
			}
		}
	}
</script>

<style>

	.toolbar .el-col-8 {
		text-align: right ;
		padding-right: 100px;
		margin-bottom: -10px;
	}
</style>
