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
            <el-select
              v-model="verifyCodeTypes"
              clearable
              size="small"
              multiple
              filterable
              placeholder="请选择验证码类型"
              class="filter-item"
              style="width: 100%"
            >
              <el-option v-for="(item,index) in verifyCodeType" :label="item.key" :value="item.value" :key="item.key" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="verifyOperators"
              clearable
              size="small"
              multiple
              filterable
              placeholder="请选择运营商"
              class="filter-item"
              style="width: 100%"
            >
              <el-option v-for="(item,index) in verifyOperator" :label="item.key" :value="item.value" :key="item.key" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="query.createTime" type="monthrange" value-format="yyyy-MM" range-separator=":"
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
                crud.doExport('/export',9,1)
              "
              >导出</el-button
            >
          </div>
        </template>
      </crudOperation>
    </div>

    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" 
      max-height="600"  stripe lazy :data="crud.data">
      <el-table-column prop="appName" align="center" label="App名称" fixed>
        </el-table-column>
        <el-table-column prop="platform" align="center" label="平台" width="90" fixed>
        </el-table-column>
        <el-table-column prop="date" align="center" label="日期" width="90" fixed>
        </el-table-column>
        <el-table-column prop="verifyCodeType" align="center" label="验证码类型">
        </el-table-column>
        <el-table-column prop="verifyOperator" align="center" label="运营商">
        </el-table-column>
        <el-table-column
          prop="sendCount"
          align="center"
          label="发送验证码成功数"
          width="180"
        >
        </el-table-column
        ><el-table-column prop="registerCount" align="center" label="注册人数">
        </el-table-column
        ><el-table-column prop="backFillRate" align="center" label="回填率">
        </el-table-column>
    </el-table>
    </div>
    
  </div>
</template>

<script>
import { reWriteGetParams } from "@/api/base.js";
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
  name: "month",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/verifyCodeAndRegister/queryDetailMonth",
      method: "get"
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      appNames:[],
      platforms:[],
      registerWays:[],
      verifyCodeType: [],
      verifyOperator: [],
      verifyCodeTypes:[],
      verifyOperators:[]
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
    getSelectList() {
      reWriteGetParams().then((res) => {
        this.verifyCodeType = res.data.data.verifyCodeType;
        this.verifyOperator = res.data.data.verifyOperator;
      });
    },
     [CRUD.HOOK.beforeReset](crud) {
      this.appNames = []
      this.verifyCodeTypes=[]
      this.verifyOperators=[]
    },
    [CRUD.HOOK.beforeRefresh](crud) {
      this.getSelectList();
      if (this.query.createTime) {
        crud.query.monthStart = this.query.createTime[0];
        crud.query.monthEnd = this.query.createTime[1];
      } else {
        crud.query.monthStart = undefined;
        crud.query.monthEnd = undefined;
      }
      if(this.appNames){
        crud.query.appNames = this.appNames.join(',');
      }
      if(this.verifyCodeTypes){
        crud.query.verifyCodeTypes = this.verifyCodeTypes.join(',');
      }
      if(this.verifyOperators){
        crud.query.verifyOperators = this.verifyOperators.join(',');
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
/deep/.el-table th.el-table__cell.is-leaf, .el-table td.el-table__cell {
  border-bottom: 2px solid #23b7e5;
}
</style>

