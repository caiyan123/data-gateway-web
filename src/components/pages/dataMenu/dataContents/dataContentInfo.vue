<template>
	<div style="overflow-y: auto;overflow-x: hidden; height: 720px;">
		<div class="title">
			<div class="before">共<span style="color: #0085FF;">{{number}}</span>个目录</div>
			<div style="float: right;">
				<el-button type="warning">目录下载</el-button>
			</div>
		</div>
		<el-card style="margin-left: 16px;  height:678px;font-size: 16px;">
			<el-table :data="tableData" style="width: 100%;font-size:22px;height:600px;font-family: STHeiti;" :show-header="false"
			 max-height="600px">
				<el-table-column>
					<template slot-scope="props">
						<el-row style="height: 50px;font-size:20px">
							<el-col :span="10">
								<el-image :src="url"></el-image>
								<span class="headline">{{ props.row.title }}</span>
							</el-col>
						</el-row>
						<el-row style="height: 30px;font-size:16px;margin-top: 15px;">
							<el-col :span="1.5"><span>更新日期：</span></el-col>
							<el-col :span="3">
								<span class="info">{{ props.row.date }}</span>
							</el-col>
							<el-col :span="1.5"><span>提供部门：</span></el-col>
							<el-col :span="4">
								<span class="info">{{ props.row.orgName }}</span>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
			</el-table>

			<el-col :span="24" class="toolbar">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handleCurrentChange"
				 @next-click="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100, 250, 500, 1000]"
				 :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</el-col>
		</el-card>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				url: require('../../../../assets/quickMenu/catalog_class_icon_1.png'),
				number: 3,
				currentPage: 1,
				limit: 10,
				totalCount: 3,
				form: {
					type: [],
					sortType: ''
				},
				tableData: [{
						title: '对公新开户清单',
						date: '2020-03-13',
						orgName: '计划财务部',


					},
					{
						title: '授权记录表',
						date: '2020-03-13',
						orgName: '计划财务部',

					},
					{
						title: '房地产监控',
						date: '2020-03-12',
						orgName: '计划财务部',

					}

				],
			};
		},
		mounted() {

		},
		methods: {
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
	.title {
		float: inherit;
		margin-left: 16px;
		height: 40px;
		background: white;
		font-size: 14px;
	}

	.before {
		float: left;
		font-size: 14px;
		padding: 10px 25px;
		font-weight: 500;
	}
	.headline{
		color: #0085ff;
		font-size: 20px;
		margin-left: 15px;
		font-weight: bold;
	}

	.toolbar {
		margin: auto;
		border-radius: 0;
	}
	.info{
		font-size: 14px;
	}
</style>
