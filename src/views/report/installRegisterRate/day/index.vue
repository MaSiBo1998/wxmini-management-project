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
            <el-select v-model="platforms" multiple clearable size="small" filterable placeholder="请选择平台"
              class="filter-item" style="width: 100%" >
              <el-option label="全部" value="" />
              <el-option label="Android" :value="1" />
              <el-option label="IOS" :value="2" />
              <el-option label="H5" :value="3" />
            </el-select>
          </el-col>
          <!-- <el-col :span="6">
            <el-select v-model="registerWays" multiple clearable size="small" filterable placeholder="请选择验证码类型"
              class="filter-item" style="width: 100%" >
              <el-option label="全部" value="" />
              <el-option label="SMS" :value="1" />
              <el-option label="whatsapp" :value="2" />
            </el-select>
          </el-col> -->
          <el-col :span="6">
            <el-date-picker v-model="query.createTime" type="daterange" value-format="yyyy-MM-dd" range-separator=":"
              size="small" class="date-item" style="width: 100%" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-col>
          <el-col :span="6">
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
                crud.doExport('/export',3,0)
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
        <el-table-column prop="date" align="center" label="日期" width="90" fixed>
        </el-table-column>
        <el-table-column prop="installCount" align="center" label="安装数">
        </el-table-column>
        <el-table-column prop="activationCount" align="center" label="激活数">
        </el-table-column>
        <el-table-column prop="registerCount" align="center" label="注册人数">
        </el-table-column>
        <el-table-column prop="aIRate" align="center" label="激活/安装"></el-table-column>
        <el-table-column prop="rIRate" align="center" label="注册/安装">
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
      url: "/iar/queryDetail",
      method: "get"
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      appNames:[],
      platforms:[],
      registerWays:[],
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
    [CRUD.HOOK.beforeReset](crud) {
      this.appNames = []
      this.platforms = []
      this.registerWays = []
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
      if(this.platforms){
        crud.query.platforms = this.platforms.join(',');
      }
      if(this.registerWays){
        crud.query.registerWays = this.registerWays.join(',');
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

