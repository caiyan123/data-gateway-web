<template>
	<el-container style="height: auto; border: 1px solid #eee">
		
	  <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
		  <div >
		      <el-radio-group v-model="radio1" size="medium">
		        <el-radio-button label="领域" style=""></el-radio-button>
		        <el-radio-button label="主题"></el-radio-button>
		        <el-radio-button label="行业"></el-radio-button>
		        <el-radio-button label="服务"></el-radio-button>
		      </el-radio-group>
		    </div>
	    
		<el-table :data="leftData" :show-header='false' size="small">
		      <el-table-column prop="titles" ></el-table-column>
			  <el-table-column prop="apiNum" align="right"></el-table-column>
			  
		 </el-table>
		
	  </el-aside>
	  
	  <el-container>
	    <el-header style="text-align: left;height: 3.125rem;font-size: 0.9375rem;">
	      <span>共<span style="color:#1E90FF;">3</span>个</span>&nbsp;<span>|</span>&nbsp;
		  <span>市级<span style="color:#1E90FF;">3</span>个</span>&nbsp;<span>|</span>&nbsp;
		  <span>区级<span style="color:#1E90FF;">0</span>个</span>
	    </el-header>
	    
	    <el-main>
			<el-table :data="detailData" style="width: 100%;font-size:22px;height:auto;font-family: STHeiti;" :show-header="false" >
				<el-table-column>
					<template slot-scope="props">
						<el-row style="height: 50px;font-size:20px">
							<el-col :span="10">
								<span class="title">{{ props.row.title }}</span>
							</el-col>
						</el-row>
						<el-row style="height: 50px;font-size:14px">
							<el-col :span="1.5"><span>更新日期：</span></el-col>
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
							</el-col>
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
								<span>订阅</span>
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
			<!-- <el-card style="margin-bottom: 5px;margin-left: 50px; height:850px;width: 85%;font-size: 16px;">
				  <el-table :data="tableData">
					<el-table-column prop="date" label="日期" width="140">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="120">
					</el-table-column>
					<el-table-column prop="address" label="地址">
					</el-table-column>
				  </el-table>
			</el-card> -->
		  
	    </el-main>
	  </el-container>
	  
	</el-container>
	</template>
	<style>
	  .el-header {
	    background-color: #ffffff;
	    color: #333;
	    line-height: 40px;
	  }
	  
	  .el-aside {
	    color: #333;
	  }
	</style>
	
	<script>
	  export default {
	    data() {
	      const item = {
	        date: '2016-05-02',
	        name: '王小虎',
	        address: '上海市普陀区金沙江路 1518 弄'
	      };
	      return {
			currentPage: 1,
			limit: 10,
			totalCount: 2,
	        tableData: Array(20).fill(item),
			radio1: '领域',
			leftData:[{
				titles:'教育科技',
				apiNum:'10',
			},{
				titles:'交通运输',
				apiNum:'3',
			},
			{
				titles:'文体休闲',
				apiNum:'2',
			},
			{
				titles:'财税金融',
				apiNum:'55',
			},
			{
				titles:'信用服务',
				apiNum:'42',
			}
			],
				detailData:[{
					title: '2020年第一季度复工复产计划',
					date: '2020-03-12',
					orgName: '上海市人民政府',
					dataField: '经济生产',
					downLoadNum: '11',
					lookNum: '200',
					dataNum: '11'
				},
				{
					title: '2020年第一季度复工复产计划',
					date: '2020-03-12',
					orgName: '上海市人民政府',
					dataField: '经济生产',
					downLoadNum: '11',
					lookNum: '200',
					dataNum: '11'
				}
				]
	      }
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
</style>
