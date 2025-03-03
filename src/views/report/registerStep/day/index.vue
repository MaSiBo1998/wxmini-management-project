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
            <el-date-picker v-model="query.createTime" type="daterange" value-format="yyyy-MM-dd" range-separator=":"
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
                crud.doExport('/export',4,0)
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
        </el-table-column>
        <el-table-column prop="dateDay" align="center" label="日期" fixed  width="160">
        </el-table-column>
        <el-table-column prop="regCount" align="center" label="注册人数">
        </el-table-column>
        <el-table-column prop="finishCount" align="center" label="完件数">
        </el-table-column>
        <el-table-column width="160" prop="finishRate" align="center" label="完件率(完件数/注册人数)">
        <template slot-scope="scope">
            {{ scope.row.finishRate}}%
          </template>
        </el-table-column>
        <el-table-column prop="applyLoanCount" align="center" label="申贷数">
        </el-table-column>
        <el-table-column width="160" prop="applyRate" align="center" label="申贷率（申贷数/完件数）">
         <template slot-scope="scope">
            {{ scope.row.applyRate}}%
          </template>
        </el-table-column>
        <el-table-column width="160" prop="jobCount" align="center" label="工作信息填写数">
        </el-table-column>
        <el-table-column width="160" prop="jobRate" align="center" label="工作信息完成率">
           <template slot-scope="scope">
            {{ scope.row.jobRate}}%
          </template>
        </el-table-column>
        <el-table-column width="160" prop="relationCount" align="center" label="联系人信息填写数">
        </el-table-column>
        <el-table-column width="160" prop="relationRate" align="center" label="联系人信息完成率">
           <template slot-scope="scope">
            {{ scope.row.relationRate}}%
          </template>
        </el-table-column>
        <el-table-column width="160" prop="personalCount" align="center" label="个人信息填写数">
        </el-table-column>
        <el-table-column width="160" prop="personalRate" align="center" label="个人信息填写完成率">
           <template slot-scope="scope">
            {{ scope.row.personalRate}}%
          </template>
        </el-table-column>
        <el-table-column width="160" prop="identityCount" align="center" label="身份信息填写数">
        </el-table-column>
        <el-table-column width="160" prop="identityRate" align="center" label="身份信息填写完成率">
           <template slot-scope="scope">
            {{ scope.row.identityRate}}%
          </template>
        </el-table-column>
        <el-table-column width="160" prop="selfieCount" align="center" label="自拍信息填写数">
        </el-table-column>
        <el-table-column width="160" prop="selfieRate" align="center" label="自拍信息填写完成率">
           <template slot-scope="scope">
            {{ scope.row.selfieRate}}%
          </template>
        </el-table-column>
        <el-table-column width="160" prop="bankCount" align="center" label="银行卡信息填写数">
        </el-table-column>
        <el-table-column prop="bankRate" align="center" label="银行卡信息填写完成率" width="160">
           <template slot-scope="scope">
            {{ scope.row.bankRate}}%
          </template>
        </el-table-column>
        <el-table-column prop="t0" align="center" label="T0完件率">
           <template slot-scope="scope">
            {{ scope.row.t0}}%
          </template>
        </el-table-column>
        <el-table-column prop="t3" align="center" label="T3完件率">
           <template slot-scope="scope">
            {{ scope.row.t3}}%
          </template>
        </el-table-column>
        <el-table-column prop="t7" align="center" label="T7完件率">
           <template slot-scope="scope">
            {{ scope.row.t7}}%
          </template>
        </el-table-column>

      </el-table>
      <!--分页组件-->
      <pagination />
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
      url: "/registerFinish/reportByDay",
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
        crud.query.dateStart  = this.query.createTime[0];
        crud.query.dateEnd = this.query.createTime[1];
      } else {
        crud.query.dateStart  = undefined;
        crud.query.dateEnd = undefined;
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

