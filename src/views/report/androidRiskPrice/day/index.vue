<template>
  <div class="app-container">
    <!--工具栏-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新客" name="first">
      </el-tab-pane>
      <el-tab-pane label="老客" name="second">
      </el-tab-pane>
    </el-tabs>
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
              
              <el-option label="prestapronto" :value="5" />
              <el-option label="credayuda" :value="6" />
              <el-option label="Platayuda" :value="12" />
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
            <el-select v-model="query.riskLevel" @change="crud.toQuery()"  clearable size="small" filterable placeholder="请选择风险等级"
              class="filter-item" style="width: 100%">
              <el-option label="A" value="A" />
              <el-option label="B" value="B" />
              <el-option label="C" value="C" />
              <el-option label="D" value="D" />
              <el-option label="无" value="无" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="query.createTime" type="daterange" value-format="yyyy-MM-dd" range-separator=":"
              size="small" class="date-item" style="width: 100%" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:20px"><el-col :span="24">
            <rrOperation />
          </el-col></el-row>
      </div>
      <crudOperation>
        <template slot="right">
          <div style="display: inline-block">
            <el-button :loading="crud.downloadLoading" :disabled="!crud.data.length" class="filter-item" size="mini"
              type="warning" icon="el-icon-download" @click="
                crud.doExport('/export', 15, 0)
              ">导出</el-button>
          </div>
        </template>
      </crudOperation>
    </div>

    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="appName" align="center" label="App名称" width="120" fixed>
        </el-table-column>
        <el-table-column prop="platform" align="center" label="平台" fixed>
          <template slot-scope="scope">
            {{ scope.row.platform == 1 ? 'Android' : (scope.row.platform == 2 ? 'IOS' : scope.row.platform) }}
          </template>
        </el-table-column>
        <el-table-column prop="date" align="center" label="日期" width="90" fixed>
        </el-table-column>
        <el-table-column prop="riskLevel" align="center" label="风险定价等级" width="120">
        </el-table-column>
        <el-table-column prop="orderCount" align="center" label="到期订单数" width="120">
        </el-table-column>
        <el-table-column prop="avgPrincipal" align="center" label="件均" width="120">
        </el-table-column>
        <el-table-column prop="overdueRate" align="center" label="目前总逾期率" width="120">
        </el-table-column>
        <el-table-column prop="tn2OverdueRate" align="center" label="dTotalD-2" width="120">
        </el-table-column>
        <el-table-column prop="tn1OverdueRate" align="center" label="dTotalD-1" width="120"></el-table-column>
        <el-table-column prop="t0OverdueRate" align="center" label="dTotalD0" width="120">
        </el-table-column>
        <el-table-column prop="t1OverdueRate" align="center" label="dTotalD1" width="120">
        </el-table-column>
        <el-table-column prop="t2OverdueRate" align="center" label="dTotalD2" width="120">
        </el-table-column>
        <el-table-column prop="t3OverdueRate" align="center" label="dTotalD3" width="120">
        </el-table-column>
        <el-table-column prop="t7OverdueRate" align="center" label="dTotalD7" width="120">
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
      url: "/risk/queryDetail",
      method: "get",
      query: {
        tableName: 'RISK_PRICE',
        isRepetition: 0
      }
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      activeName: 'first',
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name == 'first') {
        this.query.isRepetition = 0
        this.crud.toQuery()
      }
      if (tab.name == 'second') {
        this.query.isRepetition = 1
        this.crud.toQuery()
      }
    },
    [CRUD.HOOK.beforeReset](crud) {

    },
    [CRUD.HOOK.beforeRefresh](crud) {
      if (this.query.createTime) {
        crud.query.dateStart = this.query.createTime[0];
        crud.query.dateEnd = this.query.createTime[1];
      } else {
        crud.query.dateStart = undefined;
        crud.query.dateEnd = undefined;
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

