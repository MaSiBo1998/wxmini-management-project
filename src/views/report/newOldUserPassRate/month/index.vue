<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="query.appName" @change="crud.toQuery()" clearable size="small" filterable
              placeholder="请选择APP名称" class="filter-item" style="width: 100%">
              <el-option label="Rapipeso" :value="1"></el-option>
              <el-option label="Rapicash" :value="2"></el-option>
              <el-option label="Efipeso" :value="10" />
              <el-option label="Urgecredi" :value="11" />
              <el-option label="Meprestas" :value="3"></el-option>
              
              <el-option label="Pesoplus" :value="7" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="query.platform" @change="crud.toQuery()" clearable size="small" filterable
              placeholder="请选择平台" class="filter-item" style="width: 100%">
              <el-option label="全部" value="" />
              <el-option label="Android" :value="1" />
              <el-option label="IOS" :value="2" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="query.createTime" type="monthrange" value-format="yyyy-MM" range-separator=":"
              size="small" class="date-item" style="width: 100%" start-placeholder="开始月份" end-placeholder="结束月份" />
          </el-col>
          <el-col :span="6">
            <rrOperation />
          </el-col>
        </el-row>
      </div>
      <crudOperation>
        <template slot="right">
          <div style="display: inline-block">
            <el-button :loading="crud.downloadLoading" :disabled="!crud.data.length" class="filter-item" size="mini"
              type="warning" icon="el-icon-download" @click="
                crud.doExport('/export', 11, 1)
              ">导出</el-button>
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
            {{ scope.row.platform == 1 ? 'Android' : (scope.row.platform == 2 ? 'IOS' : scope.row.platform) }}
          </template>
        </el-table-column>
        <el-table-column prop="date" align="center" label="日期" width="90" fixed>
        </el-table-column>
        <el-table-column prop="nApplyCount" align="center" label="申请订单笔数新" width="120">
        </el-table-column>
        <el-table-column prop="nLoanCount" align="center" label="放款成功订单数新" width="120">
        </el-table-column>
        <el-table-column prop="nPassRate" align="center" label="总当天通过率新" width="120">
        </el-table-column>
        <el-table-column prop="nLoanPassRate" align="center" label="当天放款通过率新" width="120">
        </el-table-column>
        <el-table-column prop="nCaijieOrJinguoPassRate" align="center" label="总风控通过率新" width="120">
        </el-table-column>
        <el-table-column prop="nJinguoPassRate" align="center" label="金果风控通过率新" width="120"></el-table-column>
        <el-table-column prop="nCaijiePassRate" align="center" label="才杰风控通过率新" width="120">
        </el-table-column>
        <el-table-column prop="oApplyCount" align="center" label="申请订单笔数老" width="120">
        </el-table-column>
        <el-table-column prop="oLoanCount" align="center" label="放款成功订单数老" width="120">
        </el-table-column>
        <el-table-column prop="oPassRate" align="center" label="总当天通过率老" width="120">
        </el-table-column>
        <el-table-column prop="oLoanPassRate" align="center" label="当天放款通过率老" width="120">
        </el-table-column>
        <el-table-column prop="oCaijieOrJinguoPassRate" align="center" label="总风控通过率老" width="120">
        </el-table-column>
        <el-table-column prop="oJinguoPassRate" align="center" label="金果风控通过率老" width="120">
        </el-table-column>
        <el-table-column prop="oCaijiePassRate" align="center" label="才杰风控通过率老" width="120">
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
      url: "/risk/queryDetailMonth",
      method: "get",
      query: {
        tableName: 'NEW_OLD_PASS_RATE'
      }
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {

    };
  },
  computed: {

  },
  created() {
  },
  methods: {
    [CRUD.HOOK.beforeReset](crud) {

    },
    [CRUD.HOOK.beforeRefresh](crud) {
      if (this.query.createTime) {
        crud.query.monthStart = this.query.createTime[0];
        crud.query.monthEnd = this.query.createTime[1];
      } else {
        crud.query.monthStart = undefined;
        crud.query.monthEnd = undefined;
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

