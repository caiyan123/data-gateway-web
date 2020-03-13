<!-- 数据目录 -->
<template>
	<div>

		<div class="top_spacing"></div>

		<el-container>
			<el-aside class="aside_info">
				<el-tabs type="border-card" width="350px" height="720px" :stretch="true">
					<el-tab-pane label="总行部门">
						<div>
							<span style="margin-left: 10px;color: royalblue;font-size: 15px;">全部</span>
							<span style="float: right;color:darkgray;margin-right: 10px;font-size: 15px;">目录数</span>
						</div>
						<div style="height: 629px;">
							<el-table :data="allDepartment" style="width: 100%;" :show-header="false">
								<el-table-column>
									<template slot-scope="scope">
										<el-popover placement="right" width="5" trigger="manual" :content="scope.row.nd">
											<span slot="reference">{{ scope.row.title }}</span>
										</el-popover>
									</template>
								</el-table-column>
								<el-table-column prop="name" align="right" :show-overflow-tooltip="true"></el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
					<el-tab-pane label="经营单位">
						<div>
							<span style="margin-left: 10px;color: royalblue;font-size: 15px;">全部</span>
							<span style="float: right;color:darkgray;margin-right: 10px;font-size: 15px;">目录数</span>
						</div>
						<div style="height: 629px;">
							<el-table :data="businessDepartment" style="width: 100%;" :show-header="false">
								<el-table-column>
									<template slot-scope="scope">
										<el-popover placement="right" width="5" trigger="manual" :content="scope.row.nd">
											<span slot="reference">{{ scope.row.title }}</span>
										</el-popover>
									</template>
								</el-table-column>
								<el-table-column prop="name" align="right" :show-overflow-tooltip="true"></el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-aside>
			<el-main class="main_info">
				<div style="height: 720px;">
					<data-content-info></data-content-info>
				</div>

			</el-main>
		</el-container>



	</div>
	<!-- 34px的间距 -->

</template>

<script>
	import dataContentInfo from '~/components/pages/dataMenu/dataContents/dataContentInfo.vue';
	export default {
		components: {
			dataContentInfo
		},
		data() {
			return {
				//总行
				allDepartment: [{
						title: '总行计划财务部',
						name: '16'
					},
					{
						title: '总行风险管理部',
						name: '10'
					},
					{
						title: '总行公司业务部',
						name: '9'
					},
					{
						title: '总行海外业务部',
						name: '7'
					}
				],
				//经营
				businessDepartment: [{
						title: '财务部',
						name: '6'
					},
					{
						title: '风控部',
						name: '1'
					}
				]
			};
		},
		mounted() {

		},
		methods: {}
	};
</script>

<style>
	/* 点击前 */
	.el-tabs--border-card>.el-tabs__header .el-tabs__item {
		font-size: 14px;
		font-weight: 600;
		background-color: rgb(25, 142, 248);
		color: rgb(255, 255, 255);
		text-align: center;
		border-width: 0;
	}

	/* 点击后的效果 */
	.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
		font-size: 15px;
		font-weight: 800;
		background-color: rgb(25, 100, 200);
		color: rgb(255, 255, 255);
		text-align: center;
		border-width: 0;
	}


	.top_spacing {
		height: 34px;
		width: 100%;
	}

	.aside_info {
		float: left;
		padding: 0;
		margin-left: 140px;
		height: 720px;
	}

	.main_info {
		float: left;
		padding: 0;
		margin-right: 140px;
		height: 720px;
	}
</style>
