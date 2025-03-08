<template>
  <div class="app-container">
    <!--工具栏-->
    <div style="font-size: 20px;font-weight: 600;">演出预告</div>
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
    <!--表单渲染 :rules="rules"-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      title="演出预告"
      width="590px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name" placeholder="活动名称" style="width: 360px" />
        </el-form-item>
        <el-form-item label="活动主题" prop="subject">
          <el-input v-model="form.subject" placeholder="活动主题" style="width: 360px" />
        </el-form-item>
        <el-form-item label="封面图片" prop="coverImage">
          <el-input v-model="form.coverImage" placeholder="封面图片" style="width: 360px" />
        </el-form-item>
        <el-form-item label="活动开始时间" prop="activityStartTime">
          <el-date-picker
            v-model="form.activityStartTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="活动开始时间"
            style="width: 360px"
          />
        </el-form-item>
        <el-form-item label="活动结束时间" prop="activityEndTime">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.activityEndTime"
            type="datetime"
            placeholder="活动结束时间"
            style="width: 360px"
          />
        </el-form-item>
        <el-form-item label="活动地址" prop="location">
          <el-input v-model="form.location" placeholder="活动地址(多个地址以,分割)" style="width: 360px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="name" align="center" label="活动名称"> </el-table-column>
        <el-table-column prop="subject" align="center" label="活动主题"> </el-table-column>
        <el-table-column prop="location" align="center" label="活动地址"> </el-table-column>
        <el-table-column prop="activityStartTime" align="center" label="活动开始时间"> </el-table-column>
        <el-table-column prop="activityEndTime" align="center" label="活动结束时间"> </el-table-column>

        <el-table-column prop="loanCount" align="center" label="操作" fixed="right">
          <template slot-scope="scope" align="center">
            <el-button :disabled="scope.row.releaseState == 1" type="primary" @click="sendNotice(scope.row)"
              >发布</el-button
            >
            <udOperation :data="scope.row" style="display: inline-block" />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudUser, { sendNotice } from "@/api/notice";
import { mapState } from "vuex";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import pagination from "@crud/Pagination";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
const defaultForm = {
  name: null,
  subject: null,
  coverImage: null,
  activityStartTime: null,
  activityEndTime: null,
  location: null
};
export default {
  name: "",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/admin/preview/listByAdmin",
      method: "post",
      crudMethod: { ...crudUser }
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        subject: [{ required: true, message: "请输入活动主题", trigger: "blur" }],
        coverImage: [{ required: true, message: "请输入封面图片", trigger: "blur" }],
        activityStartTime: [{ required: true, message: "请选择活动开始时间", trigger: "change" }],
        activityEndTime: [{ required: true, message: "请选择活动结束时间", trigger: "change" }],
        location: [{ required: true, message: "请输入活动地址", trigger: "blur" }]
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    [CRUD.HOOK.beforeToAdd](crud, form) {
      this.form.id = null;
    },
    sendNotice(row) {
      this.$confirm("是否发布该活动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = (params = {
            id: row.id,
            releaseState: 1
          });
          sendNotice(params).then(res => {
            this.$message({
              type: "success",
              message: "发布成功!"
            });
            this.crud.refresh();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
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
