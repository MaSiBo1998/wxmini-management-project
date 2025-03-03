<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="query.username" clearable size="small" filterable placeholder="请输入用户姓名" class="filter-item"
              style="width: 100%">
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-select v-model="query.departmentId" @change="crud.toQuery()" clearable size="small" filterable
              placeholder="请选择部门" class="filter-item" style="width: 100%">
              <el-option v-for="item in departmentSelectList" :key="item.val" :label="item.key" :value="item.val" />
            </el-select>
          </el-col>
          <el-col :span="12">
            <rrOperation />
          </el-col>
        </el-row>
      </div>
      <crudOperation :isHaveAdd="true">
      </crudOperation>
    </div>

    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="username" align="center" label="用户名">
        </el-table-column>
        <el-table-column prop="departmentName" align="center" label="部门">
        </el-table-column>
        <el-table-column prop="updateBy" align="center" label="操作人">
        </el-table-column>
        <el-table-column prop="updateTime" align="center" label="操作时间">
        </el-table-column>
        <el-table-column prop="loanCount" align="center" label="操作" width="250">
          <template slot-scope="scope" align="center">
            <udOperation :data="scope.row" style="display: inline-block" />
            <el-tooltip placement="top">
              <div slot="content">重置密码</div>
              <el-button style="text-align: right; margin-left: 3px; display: inline-block"
                :loading="crud.status.cu === 2" type="success" @click="doRepwd(scope.row.userId)">重置密码</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--表单渲染 :rules="rules"-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="590px">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="crud.status.edit > 0" placeholder="用户名" style="width: 180px" />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="form.departmentId" placeholder="请选择部门" style="width: 180px">
            <el-option v-for="item in departmentSelectList" :key="item.val" :label="item.key" :value="item.val" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import crudUser, { getDepartmentSelect, rePassw } from '@/api/userManagement/user'
import { mapState } from "vuex";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import pagination from "@crud/Pagination";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
const defaultForm = {
  username: null,
  departmentId: null
};
export default {
  name: "",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/query/user",
      method: "post",
      crudMethod: { ...crudUser },
      idField: 'userId'
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      departmentSelectList: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {

  },
  created() {
    this.getDepartmentSelect()
  },
  methods: {
    doRepwd(userId) {
      rePassw({ userId: userId }).then((res) => {
        console.log(res)
        this.crud.notify(
          res.data.msg,
          CRUD.NOTIFICATION_TYPE.SUCCESS
        );
      });
    },
    getDepartmentSelect() {
      getDepartmentSelect().then(res => {
        this.departmentSelectList = res.data.data
      })
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

