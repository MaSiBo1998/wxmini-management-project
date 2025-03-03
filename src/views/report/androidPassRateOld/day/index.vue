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
              
              <el-option label="prestapronto" :value="5" />
              <el-option label="credayuda" :value="6" />
              <el-option label="Platayuda" :value="12" />
              <el-option label="Pesoplus" :value="7" />
              <el-option label="pesoportuna" :value="8" />
              
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
            <el-select v-model="loanTimes" @change="crud.toQuery()" clearable size="small" filterable placeholder="请选择贷次"
              class="filter-item" multiple style="width: 100%">
              <el-option label="1次" value="1次"></el-option>
              <el-option label="2次" value="2次"></el-option>
              <el-option label="3次" value="3次"></el-option>
              <el-option label="4次" value="4次"></el-option>
              <el-option label="5次" value="5次"></el-option>
              <el-option label="6~10次" value="6~10次"></el-option>
              <el-option label="10次以上" value="10次以上"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="query.createTime" type="daterange" value-format="yyyy-MM-dd" range-separator=":"
              size="small" class="date-item" style="width: 100%" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:15px">
          <el-col :span="24">
            <rrOperation />
          </el-col>

        </el-row>
      </div>
      <crudOperation>
        <template slot="right">
          <div style="display: inline-block">
            <el-button :loading="crud.downloadLoading" :disabled="!crud.data.length" class="filter-item" size="mini"
              type="warning" icon="el-icon-download" @click="
                crud.doExport('/export', 14, 0)
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
        <el-table-column prop="loanTimes" align="center" label="贷次" width="120">
        </el-table-column>
        <el-table-column prop="orderCount" align="center" label="申请订单数" width="120">
        </el-table-column>
        <el-table-column prop="personCount" align="center" label="申请人数" width="120">
        </el-table-column>
        <el-table-column prop="loanCount" align="center" label="放款成功人数" width="120">
        </el-table-column>
        <el-table-column prop="passRate" align="center" label="总当天通过率" width="120">
        </el-table-column>
        <el-table-column prop="loanRate" align="center" label="当天放款通过率" width="120">
        </el-table-column>
        <el-table-column prop="blackPassRate" align="center" label="黑名单通过率" width="120"></el-table-column>
        <el-table-column prop="totalPassRate" align="center" label="总风控通过率" width="120">
        </el-table-column>
        <el-table-column prop="unSubmitCount" align="center" label="未提交订单数" width="120">
        </el-table-column>
        <el-table-column prop="antiFraudCount" align="center" label="反欺诈拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="antiFraudRate" align="center" label="反欺诈拒绝率" width="120">
        </el-table-column>
        <el-table-column prop="channelRejectCount" align="center" label="渠道拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="channelRejectRate" align="center" label="渠道拒绝率" width="120">
        </el-table-column>
        <el-table-column prop="weeHoursRejectCount" align="center" label="凌晨申请拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="weeHoursRejectRate" align="center" label="凌晨申请拒绝率" width="120">
        </el-table-column>
        <el-table-column prop="blackRejectCount" align="center" label="黑名单拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="blackRejectRate" align="center" label="黑名单拒绝率" width="120">
        </el-table-column>
        <el-table-column prop="riskRejectCount" align="center" label="风控拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="riskRejectRate" align="center" label="风控拒绝率" width="120">
        </el-table-column>
        <el-table-column prop="riskPriceRejectCount" align="center" label="风险定价拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="riskPriceRejectRate" align="center" label="风险定价拒绝率" width="120">
        </el-table-column>
        <el-table-column prop="advanceRejectCount" align="center" label="advance拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="advanceRejectRate" align="center" label="advance拒绝率" width="120">
        </el-table-column>
        <el-table-column prop="personReviewCount" align="center" label="人审中" width="120">
        </el-table-column>
        <el-table-column prop="personReviewRejectCount" align="center" label="人审拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="personReviewRejectRate" align="center" label="人审拒绝率" width="120">
        </el-table-column>
        <el-table-column prop="unExpendedCount" align="center" label="未支用人数" width="120">
        </el-table-column>
        <el-table-column prop="unExpendedRate" align="center" label="未支用率" width="120">
        </el-table-column>
        <el-table-column prop="loaningCount" align="center" label="放款中人数" width="120">
        </el-table-column>
        <el-table-column prop="blackIdentifyRejectCount" align="center" label="黑名单_身份证拒绝" width="150">
        </el-table-column>
        <el-table-column prop="blackPhoneRejectCount" align="center" label="黑名单_手机号拒绝" width="150">
        </el-table-column>
        <el-table-column prop="blackDeviceRejectCount" align="center" label="黑名单_设备号拒接" width="150">
        </el-table-column>
        <el-table-column prop="blackBankCardRejectCount" align="center" label="黑名单_银行卡拒绝" width="150">
        </el-table-column>
        <el-table-column prop="blackIpRejectCount" align="center" label="黑名单_IP拒绝" width="150">
        </el-table-column>
        <el-table-column prop="otherBlackRejectCount" align="center" label="红桥黑名单拒绝数" width="120">
        </el-table-column>
        <el-table-column prop="loanFailureCount" align="center" label="放款失败数" width="120">
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
        tableName: 'PASS_RATE_OLD'
      }
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      loanTimes: []
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
    [CRUD.HOOK.beforeReset](crud) {
      this.loanTimes=[]
    },
    [CRUD.HOOK.beforeRefresh](crud) {
      if (this.query.createTime) {
        crud.query.dateStart = this.query.createTime[0];
        crud.query.dateEnd = this.query.createTime[1];
      } else {
        crud.query.dateStart = undefined;
        crud.query.dateEnd = undefined;
      }
      if (this.loanTimes) {
        crud.query.loanTimes = this.loanTimes.join(',');
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

