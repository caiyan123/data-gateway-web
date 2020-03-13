<template>
	<el-main>
		<div style="overflow-y: auto;height: 90vh;overflow-x: hidden;">
			<el-card style="margin-bottom: 5px;margin-left: 50px; height:850px;width: 85%;font-size: 16px;">
				<div style="width:100%;height:40px;">
					<el-form ref="form" :model="form">
						<el-form-item>
							<el-checkbox-group v-model="form.type">
								<el-checkbox label="全选" name="type"></el-checkbox>
								<el-checkbox label="XLSX" name="type"></el-checkbox>
								<el-checkbox label="XML" name="type"></el-checkbox>
								<el-checkbox label="JSON" name="type"></el-checkbox>
								<el-checkbox label="CSV" name="type"></el-checkbox>
								<el-checkbox label="RDF" name="type"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
				</div>
				<hr style="height:1px;border:none;border-top:1px double gainsboro;" />
				<div style="width:100%;height:40px;line-height: 40px;">
					<span>
						共
						<span style="color: #1E90FF;">102</span>
						个数据集 | 市级
						<span style="color: #1E90FF;">39</span>
						个 | 区级
						<span style="color: #1E90FF;">63</span>
						个
					</span>
					<span style="float: right;height: 40px;">
						<el-form ref="form" :model="form" label-width="100px">
							<el-form-item label="排序方式">
								<el-select v-model="form.sortType" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</span>
				</div>
				<hr style="height:1px;border:none;border-top:1px double gainsboro;" />
				<el-table :data="tableData" style="width: 100%;font-size:22px;height:650px;font-family: STHeiti;" :show-header="false" max-height="650px">
					<el-table-column>
						<template slot-scope="props">
							<el-row style="height: 50px;font-size:20px">
								<el-col :span="10">
									<span class="title">{{ props.row.title }}</span>
								</el-col>
							</el-row>
							<el-row style="height: 50px;font-size:14px">
<!-- 								<el-col :span="1.5"><span>更新日期：</span></el-col>
								<el-col :span="2">
									<span>{{ props.row.date }}</span>
								</el-col>
								<el-col :span="1.5"><span>提供部门：</span></el-col>
								<el-col :span="4">
									<span>{{ props.row.orgName }}</span>
								</el-col>
								<el-col :span="1.5"><span>数据领域：</span></el-col>
								<el-col :span="3">
									<span>{{ props.row.dataField }}</span>
								</el-col>
								<el-col :span="1.5"><span>下载量：</span></el-col>
								<el-col :span="2">
									<span>{{ props.row.downLoadNum }}</span>
								</el-col>
								<el-col :span="1.5"><span>浏览量：</span></el-col>
								<el-col :span="2">
									<span>{{ props.row.lookNum }}</span>
								</el-col>
								<el-col :span="1.5"><span>数据量：</span></el-col>
								<el-col :span="2">
									<span>{{ props.row.dataNum }}</span>
								</el-col> -->
							</el-row>
							<el-row style="height: 30px;font-size:14px">
								<el-col :span="2">
									<i class="el-icon-star-off"></i>
									<span>收藏</span>
								</el-col>
								<el-col :span="3">
									<i class="el-icon-question"></i>
									<span>数据纠错</span>
								</el-col>
								<el-col :span="2">
									<i class="el-icon-share"></i>
									<span>API</span>
								</el-col>
							</el-row>	
						</template>
					</el-table-column>
				</el-table>
				<el-col :span="24" class="toolbar">
					<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handleCurrentChange"
					 @next-click="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100, 250, 500, 1000]" :page-size="10"
					 layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
				</el-col>
			</el-card>
		</div>
	</el-main>
</template>

<script>
export default {
	data() {
		return {
			currentPage: 1,
			limit: 10,
			totalCount: 4,
			form: {
				type: [],
				sortType:''
			},
			options: [
				{
					value: '选项1',
					label: '按时间'
				},
				{
					value: '选项2',
					label: '按数据量',
					disabled: true
				},
				{
					value: '选项3',
					label: '按下载量'
				},
				{
					value: '选项4',
					label: '按访问量'
				},
				{
					value: '选项5',
					label: '按收藏量'
				}
			],
			tableData: [
				{
					title: '深圳市“新型肺炎” -每日确诊病例统计',
					date: '2020-03-12',
					orgName: '市政务服务数据管理局',
					dataField: '卫生健康',
					downLoadNum: '1316',
					lookNum: '5351',
					dataNum: '64'
					
				},
				{
					title: '深圳市“新型肺炎” -每日治疗情况',
					date: '2020-03-12',
					orgName: '市政务服务数据管理局',
					dataField: '卫生健康',
					downLoadNum: '1136',
					lookNum: '4802',
					dataNum: '67'
				},
				{
					title: '深圳市“新型肺炎” -每日确诊病例所属行政区',
					date: '2020-03-12',
					orgName: '市政务服务数据管理局',
					dataField: '卫生健康',
					downLoadNum: '997',
					lookNum: '3530',
					dataNum: '54'
				},
				{
					title: '截标数据',
					date: '2020-03-12',
					orgName: '市住房和建设局',
					dataField: '经济建设',
					downLoadNum: '103',
					lookNum: '4386',
					dataNum: '21572'
				}
			],
		};
	},
	methods:{
		handleSizeChange(val) {
			this.limit = val;
			this.setIndex();
			this.$emit('query');
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.setIndex();
			this.$emit('query');
		},
		setIndex() {
			this.index = this.limit * (this.currentPage - 1) + 1;
		},
	}
};
</script>

<style>
.overflow {
	overflow-y: auto;
	height: 780px;
}
.el-main {
	padding: 0;
}
.el-card {
	font-size: 20px;
	border-radius: 0px;
}

.character {
	width: 14rem;
	font-size: 1rem;
	font-family: 'book antiqua';
}
#selectAll,
.el-checkbox__label {
	font-size: 18px;
}
#homepage_container .el-form-item__label {
	font-size: 20px;
	font-weight: bold;
	color: rgb(93, 122, 158);
}
.title{
	color:#428bca;
	font-weight: bold;
}
.toolbar {
	/* 	margin: 0;
		padding: 0; */
		border-radius: 0;
	}
</style>
