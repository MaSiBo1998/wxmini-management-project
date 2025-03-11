<template>
  <div class="app-container">
    <div style="font-size: 20px;font-weight: 600;">Banner配置</div>
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
    <!--表单渲染 :rules="rules"-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      title="Banner配置"
      width="590px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
        <el-form-item label="选择图片上传">
          <el-upload
            class="upload-demo"
            ref="upload"
            :headers="{
              token: token
            }"
            :action="uploadUrl"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="true"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="banner图片" prop="coverImage">
          <el-input v-model="form.coverImage" placeholder="banner图片" style="width: 360px" />
        </el-form-item>
        <el-form-item label="跳转类型" prop="activityStartTime">
          <el-select
            v-model="form.type"
            size="small"
            filterable
            placeholder="请选择跳转类型"
            class="filter-item"
            style="width: 180px"
          >
            <el-option label="内部活动" :value="1" />
            <el-option label="外部外部链接" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接" prop="detailDesc">
          <el-input v-model="form.detailDesc" placeholder="跳转链接" style="width: 360px" />
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
        <el-table-column prop="coverImage" align="center" label="banner图片" width="100">
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 70px"
              :src="scope.row.coverImage ? scope.row.coverImage.split(',')[0] : ''"
              :preview-src-list="scope.row.coverImage ? scope.row.coverImage.split(',') : []"
            />
          </template>
        </el-table-column>
        <el-table-column prop="activityStartTime" align="center" label="跳转类型"> </el-table-column>
        <el-table-column prop="activityStartTime" align="center" label="跳转活动名称"> </el-table-column>
        <el-table-column prop="activityStartTime" align="center" label="跳转链接"> </el-table-column>
        <el-table-column prop="addBy" align="center" label="创建人"> </el-table-column>
        <el-table-column prop="loanCount" align="center" label="操作" width="280" fixed="right">
          <template slot-scope="scope" align="center">
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
import { getToken } from "@/utils/auth";
import { root1 } from "@/utils/request";
import crudUser, { examineCase, getCaseDetail } from "@/api/case";
import { mapState } from "vuex";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import pagination from "@crud/Pagination";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
const defaultForm = {
  subject: null,
  coverImage: null,
  activityStartTime: null,
  activityEndTime: null,
  detailDesc: null,
  sort: null
};
export default {
  name: "",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/admin/classical/listByAdmin",
      method: "post",
      crudMethod: { ...crudUser }
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      rules: {
        subject: [{ required: true, message: "请输入活动主题", trigger: "blur" }],
        coverImage: [{ required: true, message: "请输入封面图片", trigger: "blur" }],
        activityStartTime: [{ required: true, message: "请选择活动开始时间", trigger: "change" }],
        activityEndTime: [{ required: true, message: "请选择活动结束时间", trigger: "change" }],
        detailDesc: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      detailsDialog: false,
      detail: {},
      loading: false,
      tableLoading: false,
      tableDialog: false,
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      activityId: "",
      total: 0,
      uploadUrl: "",
      token: '',
      fileList: []
    };
  },
  computed: {},
  created() {
    console.log(this.crud.data);
    this.uploadUrl = root1 + "/admin/upload/uploadVideo";
    this.token = getToken();
  },
  methods: {
    handleSuccess(response, file, fileList) {
      if(response.code === 0) {
        this.form.coverImage = response.data.httpPath;
        this.fileList[0].url = response.data.httpPath;
      }else{
        this.form.coverImage = '';
        this.fileList = []
      }
    },
    handleRemove(file, fileList) {
      this.fileList = [];
      this.form.coverImage = '';
    },
    [CRUD.HOOK.beforeToAdd](crud, form) {
      this.form.id = null;
    },
    toOpenDetail(data) {
      this.detailsDialog = true;
      let params = {
        id: data.id
      };
      this.loading = true;
      getCaseDetail(params)
        .then(res => {
          console.log(res, "详情");
          this.detail = res;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    examineActive(row) {
      this.$confirm("是否发布该案例?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = (params = {
            id: row.id,
            releaseState: 1
          });
          examineCase(params).then(res => {
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
.detail-row {
  margin-bottom: 10px;
}

.detail-label {
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.detail-value {
  color: #666;
  margin-bottom: 10px;
}

.detail-value a {
  color: #409eff;
  text-decoration: none;
}

.detail-value a:hover {
  text-decoration: underline;
}
</style>
