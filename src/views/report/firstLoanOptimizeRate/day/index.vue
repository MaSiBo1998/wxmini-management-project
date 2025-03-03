<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="appNames"  clearable size="small" filterable placeholder="请选择APP名称" multiple
              class="filter-item" style="width: 100%">
              <el-option label="Rapipeso" :value="1"></el-option>
              
              <el-option label="prestapronto" :value="5" />
              <el-option label="credayuda" :value="6" />
              <el-option label="Platayuda" :value="12" />
              <el-option label="Pesoplus" :value="7" />
              <el-option label="pesoportuna" :value="8" />
              
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="query.riskPassType" @change="crud.toQuery()"  clearable size="small" filterable placeholder="请选择首贷风控通过类型"
              class="filter-item" style="width: 100%">
              <el-option label="全部类型" value=" " />
              <el-option label="机审通过" :value="1" />
              <el-option label="人审通过" :value="2" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="riskLevels"  clearable size="small" filterable placeholder="请选择风险等级"
              class="filter-item" style="width: 100%" multiple>
              <el-option label="A" value="A" />
              <el-option label="B" value="B" />
              <el-option label="C" value="C" />
              <el-option label="D" value="D" />
              <el-option label="无" value="无" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="query.createTime" type="daterange" value-format="yyyyMMdd" range-separator=":"
              size="small" class="date-item" style="width: 100%" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-col>
          
        </el-row>
        <el-row style="margin-top:20px">
            <rrOperation />
          </el-row>
      </div>
      <crudOperation>
         <template slot="right">
          <div style="display: inline-block">
            <el-button
              :loading="crud.downloadLoading"
              :disabled="!crud.data.length"
              class="filter-item"
              size="mini"
              type="warning"
              icon="el-icon-download"
              @click="
                crud.doExport('/export',10,0)
              "
              >导出</el-button
            >
          </div>
        </template>
      </crudOperation>
    </div>

    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="appName" align="center" label="App名称" fixed>
        </el-table-column>
        <el-table-column prop="date" align="center" label="日期" width="120" fixed>
        </el-table-column>
        <el-table-column prop="riskPassType" align="center" label="首贷风控通过类型" width="120">
        </el-table-column>
        <el-table-column prop="riskLevel" align="center" label="风险等级">
        </el-table-column>
        <el-table-column prop="applyCount" align="center" label="首贷申请订单数" width="120">
        </el-table-column>
        <el-table-column prop="fcCount" align="center" label="首贷确认人数" width="110">
        </el-table-column>
        <el-table-column prop="fcRate" align="center" label="首贷确认率" width="110">
        </el-table-column>
        <el-table-column prop="fcRiskPassCount" align="center" label="风控通过数" width="110">
        </el-table-column>
        <el-table-column prop="fcRiskPassRate" align="center" label="通过率" width="110">
        </el-table-column>
        <el-table-column prop="fcLoanCount" align="center" label="首次确认后放款人数" width="150">
        </el-table-column>
        <el-table-column prop="fcRcCount" align="center" label="再次确认人数" width="110">
        </el-table-column>
        <el-table-column prop="fcRcRate" align="center" label="再次确认率" width="110">
        </el-table-column>
        <el-table-column prop="fcRcT0Rate" align="center" label="T0再次确认率" width="110">
        </el-table-column>
        <el-table-column prop="fcRcT3Rate" align="center" label="T3再次确认率" width="110">
        </el-table-column>
        <el-table-column prop="fcRcLoanCount" align="center" label="再次确认后放款人数" width="150">
        </el-table-column>
        <el-table-column prop="fcTotalLoanCount" align="center" label="总放款人数" width="110">
        </el-table-column>
        <el-table-column prop="fcTotalLoanRate" align="center" label="放款率" width="110">
        </el-table-column>
        <el-table-column prop="fcT0LoanRate" align="center" label="T0放款率" width="110">
        </el-table-column>
        <el-table-column prop="fcT3LoanRate" align="center" label="T3放款率" width="110">
        </el-table-column>
        <el-table-column prop="ufcCount" align="center" label="未首次确认人数（T1跑原流程）" width="200">
        </el-table-column>
        <el-table-column prop="ufcRiskPassCount" align="center" label="未首次确认-风控通过数" width="150">
        </el-table-column>
        <el-table-column prop="ufcConfirmCount" align="center" label="未首次确认-已确认人数" width="150">
        </el-table-column>
        <el-table-column prop="ufcT0ConfirmRate" align="center" label="T0确认率" width="110">
        </el-table-column>
        <el-table-column prop="ufcT3ConfirmRate" align="center" label="T3确认率" width="110">
        </el-table-column>

        <el-table-column prop="ufcLoanCount" align="center" label="未首次确认-放款人数" width="150">
        </el-table-column>
        <el-table-column prop="ufcT0LoanRate" align="center" label="T0放款率" width="110">
        </el-table-column>
        <el-table-column prop="ufcT3LoanRate" align="center" label="T3放款率" width="110">
        </el-table-column>
        
      </el-table>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import pagination from "@crud/Pagination";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
const defaultForm = {
  type: 2,
  content: null,
  creator: null,
  editor: null,
};
export default {
  name: "smsMarketing",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/floc/queryDetail",
      method: "get"
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      riskLevels:[],
      appNames:[]
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
     [CRUD.HOOK.beforeReset](crud) {
      this.riskLevels = []
      this.appNames = []
    },
    [CRUD.HOOK.beforeRefresh](crud) {
      if (this.query.createTime) {
        crud.query.dateStart = this.query.createTime[0];
        crud.query.dateEnd = this.query.createTime[1];
      } else {
        crud.query.dateStart = undefined;
        crud.query.dateEnd = undefined;
      }
      if (this.appNames) {
        crud.query.appNames = this.appNames.join(',');
      } 
      if (this.riskLevels) {
        crud.query.riskLevels = this.riskLevels.join(',');
      } 
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-box {
  padding: 20px;
  background-color: #FFF;
  box-shadow: 5px;
}

/deep/.el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: 2px solid #23b7e5;
}
</style>

