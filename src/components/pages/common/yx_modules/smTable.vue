<template>
	<el-col :span="24">
	<div class="yx_table" id="tableId">
		<el-table :data="tableData" stripe border v-loading="loading" ref="yxTable" @row-click="clickRow" @select="clickChk"
		 highlight-current-row element-loading-text="努力加载中..." element-loading-spinner="el-icon-loading" :header-cell-style="{background: '#AAC8E2', color: '#364759'}"
		 :style="{width: tableWidth + 'px'}" :height="tableHeight">
			<el-table-column v-if="tableColumn.checkBox || false" type="selection" width="35">
			</el-table-column>
			<el-table-column v-if="tableColumn.index || false" type="index" :index="index" :fixed="tableColumn.indexFixed" width="50" label="序号">
			</el-table-column>
			<el-table-column v-for="(column, index) in tableColumn.columnModel" :key="index" :prop="column.id" :fixed="column.fixed || false" v-if="!column.hidden || false"
			 :sortable="column.sort" :label="column.name" :width="column.width" :show-overflow-tooltip="column.overflowTooltip" align="center">
				<!--点击查询出的数据执行操作-->
				<template slot-scope="scope">
					<div v-if="column.handleOperate" style="color:#ff0000;text-decoration:underline;cursor:pointer;" @click="handleOperate(scope.row)">{{ scope.row[column.id] }}</div>
					<div v-else>{{ scope.row[column.id] }}</div>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handleCurrentChange"
			 @next-click="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 500, 1000]" :page-size="10"
			 layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
			</el-pagination>
		</el-col>
	</div>
	</el-col>
</template>

<script>
	/**
	 * 参数tableColumn属性解释：
	 *   autoLoad：     是否自动加载数据 true-加载 false-不加载
	 *   checkBox：     是否展示多选框
	 *   index：        是否显示排序数
	 *   indexFixed     序号框固定
	 *   hidden:        是否隐藏该列
	 *   columnModel：  列模块
	 *         属性说明--name：   列名
	 *                  id：     对应后端数据名
	 *                  width：  列宽度
	 *                  sort：   该列是否排序
	 *                  fixed:   固定列需要使用fixed属性，它接受 Boolean 值或者leftright，表示左边固定还是右边固定。
	 *                  ...... 暂时只做了这几个，后续有时间再加几个
	 * 
	 * 参数tableData结构解释：
	 *   {json: {data: [{a: 1, b: 2}, {a: 1, b: 2}, {a: 1, b: 2}, {a: 1, b: 2}, {a: 1, b: 2}]}, count: 100}
	 *   data是具体数据， count是符合条件的总数目
	 * 
	 */
	import Exchange from './exchange.js' //这里是引入exchange.js，作为中转站

	export default {
		name: 'YxTable',
		props: {
			tableColumn: {
				type: Object
			},
			tableData: {
				type: Array
			},
			tHeight: {
              type: Number
          }
		},
		data() {
			return {
				sels: [], //列表选中列
				currentPage: 1,
				limit: 10,
				totalCount: 0,
				index: 1, // 表格序号，默认1开始
				// pageInfo: {
				// 	currentPage: 1, //当前页数
				// 	limit: 10 // 默认每页限制数据数
				// },
				// autoLoad: true
				loading: false,
				selRows: [],
				tableHeight: 0,
				tableWidth: 0
			}
		},
		created() {
			var that = this;
			Exchange.$on('initPageInfo', infor => {
				// 从第一页开始，currentPage变为1，limit不变
				this.currentPage = 1;
				this.setIndex();
			})

			// 设置表格宽度
			this.tableWidth = document.body.clientWidth - 100 - 5;
			// 设置表格高度
			var rect = document.getElementById('tableId').getBoundingClientRect();
			// const { top, bottom, left, right, height, width } = rect
			var pHeight = document.body.clientHeight | document.documentElement.clientHeight;
			// this.tableHeight = pHeight - 140;

			//2019年8月20日17:20:17 zj 接收百分比改变table高度
			if(this.tHeight == null || this.tHeight == ''){
				this.tableHeight = pHeight - rect.top - 40 - 5;
			}else{
				this.tableHeight = pHeight*(this.tHeight*1);
			}
		},
		mounted() {
			if (this.tableColumn.autoLoad || false) {
				this.$emit('query');
			}
		},
		methods: {
			getPageInfo() {
				var params = {
					start: this.currentPage,
					limit: this.limit
				};
				return params;
			},
			getData() {
				this.$emit('query');
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.setIndex();
				this.$emit('query');
			},
			handleSizeChange(val) {
				this.limit = val;
				this.setIndex();
				this.$emit('query');
			},
			setIndex() {
				this.index = this.limit * (this.currentPage - 1) + 1;
			},
			clickRow(row) {
				this.selRows = []; // 此处是单点
				this.selRows.push(row);
				this.$refs.yxTable.clearSelection();
				this.$refs.yxTable.toggleRowSelection(row, true); // 如果两次点击同一行，不取消选中状态
			},
			clickChk(selection, row) {
				this.selRows = [];
				this.selRows = selection;
			},
			handleOperate(row)
			{
				this.$emit('handleOperate', row);//执行自定义事件，传入点击单元格数据所在行数据
			}
		}
	}
</script>

<style>
	.yx_table {
		/* width: 100%; */
/* 		display: flex;
		flex: 1; */
	}
	.yx_table .toolbar {
		margin: 0;
		padding: 0;
		border-radius: 0;
	}

	/* 	.el-table--striped .el-table__body tr.el-table__row--striped td {
		background: #D3E3F2 !important
	} */

	.yx_table .el-table__body tr.current-row>td {
		background: #2573B5 !important;
		color: #FFFFFF;
	}

	.yx_table tr.el-table__row--striped>td {
		background: #D3E3F2 !important;
	}

	.yx_table .el-table__header th {
		padding: 0;
		height: 40px;
	}

	.yx_table .el-table__body tr,
	.yx_table .el-table__body td {
		padding: 0;
		height: 40px;
	}

	.yx_table .el-table .sort-caret.descending {
		border-top-color: #FFFFFF;
	}

	.yx_table .el-table .sort-caret.ascending {
		border-bottom-color: #FFFFFF;
	}

	.el-table .cell.el-tooltip>div {
		overflow: hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
</style>
