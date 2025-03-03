<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="id" maxlength="50" placeholder="ID" clearable size="small" class="filter-item" />
          </el-col>
          <el-col :span="6">
            <el-input v-model="desc" maxlength="50" placeholder="说明" clearable size="small" class="filter-item" />
          </el-col>
          <el-col :span="6">
            <el-select v-model="tag" clearable size="small" filterable placeholder="请选择标签" class="filter-item"
              style="width: 100%" @change="toSearch">
              <el-option label="产品" value="产品" />
              <el-option label="催收" value="催收" />
              <el-option label="运营" value="运营" />
              <el-option label="风控" value="风控" />
            </el-select>
          </el-col>
          <!-- 创建人 -->
          <el-col :span="6">
            <el-button class="search-button" size="mini" type="success" icon="el-icon-search"
              @click="toSearch()">搜索</el-button>
            <el-button class="reset-button" size="mini" type="warning" icon="el-icon-refresh-left"
              @click="toReset()">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="table-box">
      <!--表格渲染-->
      <el-table ref="table" stripe :data="dataList">
        <el-table-column prop="id" width="80px" align="center" label="ID">
        </el-table-column>
        <el-table-column prop="desc" align="center" label="说明">
        </el-table-column>
        <el-table-column prop="tag" align="center" label="标签">
        </el-table-column>
        <el-table-column prop="date" width="180px" align="center" label="更新时间">
        </el-table-column>
        <el-table-column width="200px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button class="search-button" size="mini" type="success" icon="el-icon-search"
              @click="toOpenPage(scope.row.path)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <!-- <pagination /> -->
    </div>
  </div>
</template>
<script>
const dataList = [{ id: 'P0001', desc: '安装注册率', tag: '产品', date: '2023-04-09 14:32:22', path: 'installRegisterRate' },
{ id: 'P0002', desc: '验证码回填率', tag: '产品', date: '2023-06-29 19:32:22', path: 'codeReWriteRate' },
{ id: 'P0003', desc: '注册完件率', tag: '产品', date: '2023-04-09 14:32:22', path: 'registerStep' },
{ id: 'P0004', desc: '首贷确认报表', tag: '产品', date: '2023-04-09 14:32:22', path: 'firstLoanConfirm' },
{ id: 'P0005', desc: '首贷优化确认率', tag: '产品', date: '2023-06-29 19:32:22', path: 'firstLoanOptimizeRate' },
{ id: 'P0006', desc: '复贷申请转化率', tag: '产品', date: '2023-04-09 14:32:22', path: 'reLoanApplyRate' },
{ id: 'P0007', desc: '首复贷申请率', tag: '产品', date: '2023-06-21 14:32:22', path: 'reloanRepaymentRate' },
{ id: 'P0008', desc: '首复贷确认率', tag: '产品', date: '2023-06-21 14:32:22', path: 'reloanConfirmRate' },
{ id: 'P0009', desc: '放款失败率', tag: '产品', date: '2023-04-09 14:32:22', path: 'paymentFailRate' },
{ id: 'P0010', desc: '邀请数据(墨西哥)', tag: '运营', date: '2023-04-09 14:32:22', path: 'inviteData' },
{ id: 'P0015', desc: '邀请数据(哥伦比亚)', tag: '运营', date: '2023-04-09 14:32:22', path: 'inviteDataCo' },
{ id: 'P0011', desc: '新老客通过率', tag: '风控', date: '2023-06-29 19:32:22', path: 'newOldUserPassRate' },
{ id: 'P0012', desc: '逾期追踪汇总', tag: '风控', date: '2023-06-29 19:32:22', path: 'overdueTrackSummary' },
{ id: 'P0013', desc: '安卓通过率(新)', tag: '风控', date: '2023-06-29 19:32:22', path: 'androidPassRateNew' },
{ id: 'P0013', desc: '安卓通过率(老)', tag: '风控', date: '2023-06-29 19:32:22', path: 'androidPassRateOld' },
{ id: 'P0014', desc: '安卓风险定价', tag: '风控', date: '2023-06-29 19:32:22', path: 'androidRiskPrice' }]
export default {
  name: "smsMarketing",
  data() {
    return {
      dataList: dataList,
      desc: '',
      id: '',
      tag: ''
    };
  },
  computed: {

  },
  created() {

  },
  methods: {
    toOpenPage(path) {
      this.$router.push({ name: path });
      // this.$router
    },
    toSearch() {
      this.dataList = dataList
      if (this.id) {
        let arr = []
        this.dataList.forEach(item => {
          if (item.id == this.id) {
            arr.push(item)
          }
        })
        this.dataList = arr
      }
      if (this.desc) {
        let arr = []
        this.dataList.forEach(item => {
          if (item.desc.indexOf(this.desc) !== -1) {
            arr.push(item)
          }
        })
        this.dataList = arr
      }
      if (this.tag) {
        let arr = []
        this.dataList.forEach(item => {
          if (item.tag == this.tag) {
            arr.push(item)
          }
        })
        this.dataList = arr
      }
    },
    toReset() {
      this.desc = '',
        this.id = '',
        this.tag = ''
      this.dataList = dataList
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-box {
  margin-top: 20px;
  padding: 20px;
  background-color: #FFF;
  box-shadow: 5px;
}

/deep/.el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: 2px solid #23b7e5;
}

.search-button {
  background-color: #23b7e5;
  border-color: #23b7e5;
  color: #ffffff;
}

.btn {
  float: right;
}

.search-button {
  background-color: #3fcbca;
  border-color: #3fcbca;
  color: #ffffff;
}

.reset-button {
  background-color: #c2d5ea;
  border-color: #c2d5ea;
  color: #000000;
}
</style>
