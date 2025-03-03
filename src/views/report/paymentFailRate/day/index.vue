<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="appNames" multiple clearable size="small" filterable placeholder="请选择APP名称"
              class="filter-item" style="width: 100%" >
              <el-option label="Rapipeso" :value="1"></el-option>
              
              <el-option label="prestapronto" :value="5" />
              <el-option label="credayuda" :value="6" />
              <el-option label="Platayuda" :value="12" />
              <el-option label="Pesoplus" :value="7" />
              <el-option label="pesoportuna" :value="8" />
              
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="platform" multiple clearable size="small" filterable placeholder="请选择平台"
              class="filter-item" style="width: 100%" >
              <el-option label="全部" :value="0" />
              <el-option label="Android" :value="1" />
              <el-option label="IOS" :value="2" />
              <el-option label="H5" :value="3" />
            </el-select>
          </el-col>
          
          <el-col :span="6">
            <el-date-picker v-model="query.createTime" type="daterange" value-format="yyyyMMdd" range-separator=":"
              size="small" class="date-item" style="width: 100%" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-col>
          <el-col :span="6">
            <rrOperation />
          </el-col>
          <!-- 创建人 -->
          
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
                crud.doExport('/export',5,0)
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
        <el-table-column prop="platform" align="center" label="平台" fixed>
          <template slot-scope="scope">
            {{ scope.row.platform==1?'Android':(scope.row.platform==2?'IOS':(scope.row.platform==3?'H5':(scope.row.platform===0?'全部':'-'))) }}
          </template>
        </el-table-column>
        <el-table-column prop="dateDay" align="center" label="日期" fixed>
        </el-table-column>
        <el-table-column width="160" prop="failCount" align="center" label="放款失败订单总数">
        </el-table-column>
        <el-table-column width="160" prop="shouldCount" align="center" label="应放款订单总数">
        </el-table-column>
        <el-table-column width="160" prop="failRate" align="center" label="放款失败率">
          <template slot-scope="scope">
            {{ scope.row.failRate?scope.row.failRate+'%':'-'}}
          </template>
        </el-table-column>
        <el-table-column width="160" prop="againLoanCount" align="center" label="重新放款成功订单数">
        </el-table-column>
        <el-table-column width="160" prop="againSuccessRate" align="center" label="重新放款成功率">
          <template slot-scope="scope">
            {{ scope.row.againSuccessRate?scope.row.againSuccessRate+'%':'-'}}
          </template>
        </el-table-column>
        <el-table-column width="160" prop="firstLoanFailCount" align="center" label="首贷放款失败数">
        </el-table-column>
        <el-table-column width="160" prop="reLoanFailCount" align="center" label="复贷放款失败数">
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
  name: "",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/loanFail/reportByDay",
      method: "get"
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      appNames:[],
      platform:[],
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
    [CRUD.HOOK.beforeReset](crud) {
      this.appNames = []
      this.platform = []
    },
    [CRUD.HOOK.beforeRefresh](crud) {
      if (this.query.createTime) {
        crud.query.startAt = this.query.createTime[0];
        crud.query.endAt = this.query.createTime[1];
      } else {
        crud.query.startAt = undefined;
        crud.query.endAt = undefined;
      }
      if(this.appNames){
        crud.query.appNames = this.appNames.join(',');
      }
      if(this.platform){
        crud.query.platform = this.platform.join(',');
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

