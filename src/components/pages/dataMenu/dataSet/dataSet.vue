<template>
	<el-container>
		<el-aside width="350px" style="margin-left: 10%;">
			<div style="width: 350px;font-size: 25px;margin-top: 50px;">
				<el-tabs type="border-card" width="350px" :stretch="true">
					<el-tab-pane label="领域">
						<div style="height: 600px;">
							<el-table :data="tableData1" style="width: 100%;" :show-header="false">
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
					<el-tab-pane label="主题">
						<div style="height: 600px;">
							<div style="height: 600px;">
								<el-table :data="tableData2" style="width: 100%;" :show-header="false">
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
						</div>
					</el-tab-pane>
					<el-tab-pane label="行业">
						<div style="height: 600px;">
							<div style="height: 600px;">
								<el-table :data="tableData3" style="width: 100%;" :show-header="false">
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
						</div>
					</el-tab-pane>
					<el-tab-pane label="服务">
						<div style="height: 600px;">
							<div style="height: 600px;">
								<el-table :data="tableData4" style="width: 100%;" :show-header="false">
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
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-aside>
		<el-main>
			<data-set-info></data-set-info>
		</el-main>
	</el-container>
</template>

<script>
	import dataSetInfo from '~/components/pages/dataMenu/dataSet/dataSetInfo.vue';
	export default {
		components: {
			dataSetInfo
		},
		data() {
			return {
				//领域
				tableData1: [{
						title: '教育科技',
						name: '102/480'
					},
					{
						title: '交通运输',
						name: '55/260'
					},
					{
						title: '文体休闲',
						name: '108/586'
					},
					{
						title: '财税金融',
						name: '49/245'
					}
				],
				//主题
				tableData2: [{
						title: '综合政务',
						name: '102/480'
					},
					{
						title: '经济管理',
						name: '55/260'
					},
					{
						title: '国土资源/能源',
						name: '108/586'
					},
					{
						title: '工业、交通、邮政',
						name: '49/245'
					}
				],
				//行业
				tableData3: [{
						title: '采矿业',
						name: '102/480'
					},
					{
						title: '制造业',
						name: '55/260'
					},
					{
						title: '建筑业',
						name: '108/586'
					},
					{
						title: '批发和零售业',
						name: '49/245'
					}
				],
				//服务
				tableData4: [{
						title: '惠民服务',
						name: '102/480'
					},
					{
						title: '服务交付方式',
						name: '55/260'
					},
					{
						title: '服务交付的支撑',
						name: '108/586'
					},
					{
						title: '政府资源管理',
						name: '49/245'
					}
				]
			};
		}
	};
</script>

<style>
	.el-tabs__item {
		font-size: 18px;
	}

	.el-tabs--border-card>.el-tabs__header .el-tabs__item {
		background-color: rgb(25, 142, 248);
		color: rgb(255, 255, 255);
	}

	.el-main {
		padding: 0 0 0 5px;
	}
</style>
