<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="appNames" multiple clearable size="small" filterable placeholder="请选择APP名称"
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
            <el-select v-model="riskType" multiple clearable size="small" filterable placeholder="请选择首贷风控通过类型"
              class="filter-item" style="width: 100%">
              <el-option label="全部类型" :value="3" />
              <el-option label="机审通过" :value="1" />
              <el-option label="人审通过" :value="2" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="userLevel" multiple clearable size="small" filterable placeholder="请选择风险等级"
              class="filter-item" style="width: 100%">
              <el-option label="A" :value="1" />
              <el-option label="B" :value="2" />
              <el-option label="C" :value="3" />
              <el-option label="D" :value="4" />
              <el-option label="全部" :value="0" />
              <el-option label="没有" :value="-1" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="query.createTime" type="daterange" value-format="yyyy-MM-dd" range-separator=":"
              size="small" class="date-item" style="width: 100%" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-col>
          
        </el-row>
        <el-row style="margin-top: 10px" :gutter="20">
          <el-col :span="6">
            <el-select v-model="query.platform"  clearable size="small" filterable placeholder="请选择平台"
              class="filter-item" style="width: 100%" >
              <el-option label="Android" :value="1" />
              <el-option label="IOS" :value="2" />
            </el-select>
          </el-col>
          <el-col :span="18">
            <rrOperation />
          </el-col>
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
                crud.doExport('/export',1,0)
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
        <el-table-column prop="platform" align="center" label="平台" width="90" fixed>
        </el-table-column>
        <el-table-column prop="date" align="center" label="日期" fixed>
        </el-table-column>
        <el-table-column prop="type" align="center" label="首贷风控通过类型" width="120">
          <!-- <template slot-scope="scope">
            {{ scope.row.type==1?'机审通过':(scope.row.type==2?'人审通过':(scope.row.type==3?'全部类型':'-')) }}
          </template> -->
        </el-table-column>
        <el-table-column prop="userLevel" align="center" label="风险等级">
          <!-- <template slot-scope="scope">
            {{ scope.row.userLevel==1?'A':(scope.row.userLevel==2?'B':(scope.row.userLevel==3?'C':(scope.row.userLevel==4?'D':(scope.row.userLevel===0?'全部':(scope.row.userLevel==-1?'没有':'-'))))) }}
          </template> -->
        </el-table-column>
        <el-table-column prop="passCount" align="center" label="通过数">
        </el-table-column>
        <el-table-column prop="confirmCount" align="center" label="已确认借款数" width="110">
        </el-table-column>
        <el-table-column prop="passRate" align="center" label="已确认借款率" width="110">
          <template slot-scope="scope">
            {{ scope.row.passRate?scope.row.passRate+ '%':'-' }}
          </template>
        </el-table-column>
        <el-table-column prop="t0" align="center" label="T0">
          <template slot-scope="scope">
            {{ scope.row.t0}}%
          </template>
        </el-table-column>
        <el-table-column prop="t1" align="center" label="T1">
          <template slot-scope="scope">
            {{ scope.row.t1}}%
          </template>
        </el-table-column>
        <el-table-column prop="t2" align="center" label="T2">
          <template slot-scope="scope">
            {{ scope.row.t2}}%
          </template>
        </el-table-column>
        <el-table-column prop="t3" align="center" label="T3">
          <template slot-scope="scope">
            {{ scope.row.t3}}%
          </template>
        </el-table-column>
        <el-table-column prop="t4" align="center" label="T4">
          <template slot-scope="scope">
            {{ scope.row.t4}}%
          </template>
        </el-table-column>
        <el-table-column prop="t5" align="center" label="T5">
          <template slot-scope="scope">
            {{ scope.row.t5}}%
          </template>
        </el-table-column>
        <el-table-column prop="t6" align="center" label="T6">
          <template slot-scope="scope">
            {{ scope.row.t6}}%
          </template>
        </el-table-column>
        <el-table-column prop="t7" align="center" label="T7">
          <template slot-scope="scope">
            {{ scope.row.t7}}%
          </template>
        </el-table-column>
        <el-table-column prop="t15" align="center" label="T15">
          <template slot-scope="scope">
            {{ scope.row.t15}}%
          </template>
        </el-table-column>
        <el-table-column prop="t30" align="center" label="T30">
          <template slot-scope="scope">
            {{ scope.row.t30}}%
          </template>
        </el-table-column>
        <el-table-column prop="t30More" align="center" label="T30+">
          <template slot-scope="scope">
            {{ scope.row.t30More}}%
          </template>
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
      url: "/v2/firstLoan/reportByDay",
      method: "get"
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      appNames:[],
      riskType:[],
      userLevel:[],
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
     [CRUD.HOOK.beforeReset](crud) {
      this.appNames = []
      this.riskType = []
      this.userLevel = []
    },
    [CRUD.HOOK.beforeRefresh](crud) {
      if (this.query.createTime) {
        crud.query.dateStart = this.query.createTime[0];
        crud.query.dateEnd = this.query.createTime[1];
      } else {
        crud.query.dateStart = undefined;
        crud.query.dateEnd = undefined;
      }
      if(this.appNames){
        crud.query.appNames = this.appNames.join(',');
      }
      if(this.riskType){
        crud.query.riskType = this.riskType.join(',');
      }
      if(this.userLevel){
        crud.query.userLevel = this.userLevel.join(',');
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

