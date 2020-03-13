<!-- 数据目录 -->
<template>
	<div>
		<div class="top_spacing"></div>
		<div>
			<el-container>
				<el-aside class="main_info">
					<el-tabs type="border-card" width="350px" :stretch="true">
						<el-tab-pane label="总行部门">
							<span style="margin-left: 30px;color: #0085FF;">全部</span>
							<span style="float: right;margin-right: 5px;color: gray;">目录数</span>
							<div style="height: 600px;">
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
							<div style="height: 600px;">
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
				<el-main>

				</el-main>
			</el-container>
		</div>

	</div>
	<!-- 34px的间距 -->

</template>

<script>
	// import XXX from 'XXX';
	export default {
		components: {

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
				businessDepartment: [
					{
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
	.top_spacing {
		height: 34px;
		width: 100%;
	}

	.main_info {
		float: left;
		width: 350px;
		margin-left: 140px;
		margin-right: 140px;
	}
</style>
