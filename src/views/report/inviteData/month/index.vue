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
            <el-button
              :loading="crud.downloadLoading"
              :disabled="!crud.data.length"
              class="filter-item"
              size="mini"
              type="warning"
              icon="el-icon-download"
              @click="
                crud.doExport('/export',6,1)
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
        <el-table-column prop="platformStr" align="center" label="平台" fixed>
        </el-table-column>
        <el-table-column prop="inviteMonthStr" align="center" label="日期" width="100px" fixed>
        </el-table-column>
        <el-table-column prop="homeIconPv" align="center" label="首页icon(PV)" width="100px">
        </el-table-column>
        <el-table-column width="100px" prop="homeIconUv" align="center" label="首页icon(UV)">
        </el-table-column>
        <el-table-column width="100px" prop="homeAlertPv" align="center" label="首页弹窗(PV)">
        </el-table-column>
        <el-table-column width="100px" prop="homeAlertUv" align="center" label="首页弹窗(UV)">
        </el-table-column>
        <el-table-column width="100px" prop="userInfoPv" align="center" label="个人中心(PV)">
        </el-table-column>
        <el-table-column width="100px" prop="userInfoUv" align="center" label="个人中心(UV)">
        </el-table-column>
        <el-table-column prop="registerNum" align="center" label="注册人数">
        </el-table-column>
        <el-table-column width="100px" prop="pageRequestNum" align="center" label="页面访问人数">
        </el-table-column>
        <el-table-column width="150px" prop="reuqestRegisterRate" align="center" label="页面访问人数/注册人数">
        </el-table-column>
        <el-table-column width="100px" prop="sendInviteNum" align="center" label="发起邀请人数">
        </el-table-column>
        <el-table-column width="110px" prop="sendInviteRate" align="center" label="发起邀请转化率">
        </el-table-column>
        <el-table-column width="100px" prop="inviteRegisterNum" align="center" label="邀请注册人数">
        </el-table-column>
        <el-table-column width="110px" prop="inviteRegisterRate" align="center" label="邀请注册转化率">
        </el-table-column>
        <el-table-column width="100px" prop="inviteLoginNum" align="center" label="邀请登录人数">
        </el-table-column>
        <el-table-column width="110px" prop="inviteLoginRate" align="center" label="邀请登录转化率">
        </el-table-column>
        <el-table-column width="100px" prop="invalidInviteNum" align="center" label="无效邀请人数">
        </el-table-column>
        <el-table-column width="150px" prop="reallyLoginNum" align="center" label="实际邀请登录成功人数">
        </el-table-column>
        <el-table-column width="150px" prop="inviteApplySuccessCount" align="center" label="邀请申贷成功人数">
        </el-table-column>
        <!-- <el-table-column width="150px" prop="inviteApplySuccessRate" align="center" label="邀请申贷转化率">
        </el-table-column> -->
        <el-table-column width="150px" prop="inviteLoanSuccessCount" align="center" label="邀请放款成功人数">
        </el-table-column>
        <!-- <el-table-column width="150px" prop="inviteLoanSuccessRate" align="center" label="邀请放款转化率">
        </el-table-column> -->
        <el-table-column width="150px" prop="inviteReLoanSuccessCount" align="center" label="邀请还款成功人数">
        </el-table-column>
        <!-- <el-table-column width="150px" prop="inviteReLoanSuccessRate" align="center" label="邀请还款转化率">
        </el-table-column> -->
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
  name: "smsMarketing",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/inviteFriend/reportByMonth",
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
        crud.query.startMonth = this.query.createTime[0];
        crud.query.endMonth = this.query.createTime[1];
      } else {
        crud.query.startMonth = undefined;
        crud.query.endMonth = undefined;
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

