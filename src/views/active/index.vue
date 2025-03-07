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
            <el-button :loading="crud.downloadLoading" :disabled="!crud.data.length" class="filter-item" size="mini"
              type="warning" icon="el-icon-download" @click="
                crud.doExport('/export', 13, 0)
              ">导出</el-button>
          </div>
        </template>
      </crudOperation>
    </div>

    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="name" align="center" label="演员名称" width="90" fixed>
        </el-table-column>
        <el-table-column prop="gender" align="center" label="性别" width="120">
          <template slot-scope="scope">
            {{
              scope.row.gender ==1?'男':'女'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="age" align="center" label="年龄" width="120">
        </el-table-column>
        <el-table-column prop="height" align="center" label="身高" width="120">
        </el-table-column>
        <el-table-column prop="weight" align="center" label="体重" width="120">
        </el-table-column>
        <el-table-column prop="primarySkillCategory" align="center" label="特长1" width="120">
        </el-table-column>
        <el-table-column prop="secondarySkillCategory" align="center" label="特长2" width="120"></el-table-column>
        <el-table-column prop="thirdlySkillCategory" align="center" label="特长3" width="120">
        </el-table-column>
        <el-table-column prop="otherProfessionalCategory" align="center" label="特长补充" width="120">
        </el-table-column>
        <el-table-column prop="graduationSchool" align="center" label="毕业学校" width="120">
        </el-table-column>
        <el-table-column prop="workingYears" align="center" label="工作年限" width="120">
        </el-table-column>
        <el-table-column prop="pastExperiences" align="center" label="过往经历" width="120">
        </el-table-column>
        <el-table-column prop="phoneNumber" align="center" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="performanceCases" align="center" label="演出案例" width="120">
        </el-table-column>
        <!-- <el-table-column prop="coverImage" align="center" label="代表图" width="120">
        </el-table-column>
        <el-table-column prop="videoClipUrl" align="center" label="视频" width="120">
        </el-table-column> -->
        <el-table-column prop="yetRegistered" align="center" label="已报名项目" width="120">
        </el-table-column>
        <el-table-column prop="passRegistered" align="center" label="已通过项目" width="120">
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
      url: "/admin/actor/list",
      method: "post",
      query: {
        tableName: 'PASS_RATE_NEW'
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

