<template>
  <div class="app-container">
    <div style="font-size: 20px;font-weight: 600;">账号管理</div>
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <rrOperation />
          </el-col>
        </el-row>
      </div>
      <crudOperation :isHaveAdd="true"> </crudOperation>
    </div>

    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="userName" align="center" label="登录账号"> </el-table-column>
        <el-table-column prop="realName" align="center" label="真实姓名"> </el-table-column>
        <el-table-column prop="mobile" align="center" label="手机号码"> </el-table-column>
        <el-table-column prop="addBy" align="center" label="创建人"> </el-table-column>
        <el-table-column prop="updateBy" align="center" label="更新人"> </el-table-column>
        <el-table-column prop="updateTime" align="center" label="更新时间"> </el-table-column>
        <el-table-column prop="loanCount" align="center" label="操作" width="250">
          <template slot-scope="scope" align="center">
            <udOperation :data="scope.row" style="display: inline-block" />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
    <!--表单渲染 :rules="rules"-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      title="账户"
      width="590px"
    >
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="登录账号" prop="userName">
          <el-input
            v-model="form.userName"
            :disabled="crud.status.edit > 0"
            placeholder="登录账号"
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="真实姓名" style="width: 180px" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" type="number" placeholder="手机号码" style="width: 180px" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" placeholder="登录密码" style="width: 180px" />
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
import crudUser from "@/api/user/user";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import pagination from "@crud/Pagination";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
const defaultForm = {
  userName: null,
  realName: null,
  mobile: null,
  password: null,
  roleCode: 2
};
export default {
  name: "",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/admin/user/list",
      method: "post",
      crudMethod: { ...crudUser }
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      departmentSelectList: [],
      rules: {
        userName: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
        realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        password: [{ required: true, message: "请输入登录密码", trigger: "blur" }]
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    [CRUD.HOOK.beforeToAdd](crud, form) {
      this.form.id = null;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-box {
  padding: 20px;
  background-color: #fff;
  box-shadow: 5px;
}

/deep/.el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: 2px solid #23b7e5;
}
</style>
