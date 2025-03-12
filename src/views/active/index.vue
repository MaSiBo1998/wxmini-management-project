<template>
  <div class="app-container">
    <div style="font-size: 20px;font-weight: 600;">招募管理</div>
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select
              v-model="query.releaseState"
              @change="crud.toQuery()"
              clearable
              size="small"
              filterable
              placeholder="请选择发布状态"
              class="filter-item"
              style="width: 100%"
            >
              <el-option label="已发布" :value="1" />
              <el-option label="未发布" :value="0" />
            </el-select>
          </el-col>
          <el-col :span="18">
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
      title="招募活动"
      width="750px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="130px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name" placeholder="活动名称" style="width: 560px" />
        </el-form-item>
        <el-form-item label="活动主题" prop="subject">
          <el-input v-model="form.subject" placeholder="活动主题" style="width: 560px" />
        </el-form-item>
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
        <el-form-item label="封面图片" prop="coverImage">
          <el-input v-model="form.coverImage" placeholder="封面图片" style="width: 560px" />
        </el-form-item>
        <el-form-item label="活动开始时间" prop="activityStartTime">
          <el-date-picker
            v-model="form.activityStartTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="活动开始时间"
            style="width: 560px"
          />
        </el-form-item>
        <el-form-item label="活动结束时间" prop="activityEndTime">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.activityEndTime"
            type="datetime"
            placeholder="活动结束时间"
            style="width: 560px"
          />
        </el-form-item>
        <el-form-item label="活动地址" prop="location">
          <el-input v-model="form.location" placeholder="活动地址(多个地址以,分割)" style="width: 560px" />
        </el-form-item>
        <el-form-item label="报名截止时间" prop="registrationDeadline">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.registrationDeadline"
            type="datetime"
            placeholder="报名截止时间"
            style="width: 560px"
          />
        </el-form-item>
        <el-form-item label="需要的总人数" prop="requiredTotalNumber">
          <el-input v-model="form.requiredTotalNumber" placeholder="需要的总人数" style="width: 560px" />
        </el-form-item>
        <el-form-item label="需要的男性人数" prop="requiredMaleNumber">
          <el-input v-model="form.requiredMaleNumber" placeholder="需要的男性人数" style="width: 560px" />
        </el-form-item>
        <el-form-item label="需要的女性人数" prop="requiredFemaleNumber">
          <el-input v-model="form.requiredFemaleNumber" placeholder="需要的女性人数" style="width: 560px" />
        </el-form-item>
        <el-form-item label="节目要求" prop="programRequirements">
          <el-input v-model="form.programRequirements" placeholder="节目要求" style="width: 560px" />
        </el-form-item>
        <el-form-item label="其他要求描述" prop="otherRequirementsDesc">
          <el-input v-model="form.otherRequirementsDesc" placeholder="其他要求描述" style="width: 560px" />
        </el-form-item>
        <el-form-item label="详细描述" prop="detailDesc">
          <quill-editor v-model="form.detailDesc" ref="myQuillEditor"></quill-editor>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="排序" style="width: 560px" />
        </el-form-item>
        <!-- <el-form-item label="发布状态" prop="releaseState">
          <el-input v-model="form.releaseState" placeholder="发布状态" style="width: 560px" />
        </el-form-item>
        <el-form-item label="发布时间" prop="releaseTime">
          <el-date-picker v-model="form.releaseTime" type="datetime" placeholder="发布时间" style="width: 560px" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!-- 报名人列表展示 -->
    <el-dialog
      style="overflow: hidden"
      :visible.sync="tableDialog"
      title="演员详情"
      width="580px"
      :loading="tableLoading"
    >
      <el-table ref="table" v-loading="tableLoading" max-height="600" stripe lazy :data="tableData">
        <el-table-column prop="userId" align="center" label="报名人姓名" width="120"> </el-table-column>
        <el-table-column prop="registrationStatus" align="center" label="报名状态" width="120">
          <template slot-scope="scope">
            {{ scope.row.registrationStatus == 0 ?'已报名' : (scope.row.registrationStatus == 1 ?'已通过' : (scope.row.registrationStatus == 2 ?'已拒绝' :scope.row.registrationStatus == 0 ? "未审核" : "")) }}
          </template>
        </el-table-column>
        <el-table-column prop="registrationTime" align="center" label="报名时间" width="150"> </el-table-column>
        <el-table-column prop="remarks" align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="success" @click="examineActor(scope.row,1)">通过</el-button>
            <el-button type="warning" @click="examineActor(scope.row,2)">拒绝</el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      />
    </el-dialog>
    <!-- 详情展示 -->
    <el-dialog style="overflow: hidden" :visible.sync="detailsDialog" title="演员详情" width="750px" :loading="loading">
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          封面图片
        </el-col>
        <el-col :span="7" class="detail-value">
          <el-image
            style="width: 70px; height: 70px"
            :src="detail.coverImage ? detail.coverImage.split(',')[0] : ''"
            :preview-src-list="detail.coverImage ? detail.coverImage.split(',') : []"
          />
        </el-col>
        <el-col :span="5" class="detail-label">
          活动名称
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.name }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          活动主题
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.subject }}
        </el-col>
        <el-col :span="5" class="detail-label">
          活动开始时间
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.activityStartTime }}
        </el-col>
      </el-row>

      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          活动结束时间
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.activityEndTime }}
        </el-col>
        <el-col :span="5" class="detail-label">
          活动地址
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.location }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          报名截止时间
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.registrationDeadline }}
        </el-col>
        <el-col :span="5" class="detail-label">
          需要的总人数
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.requiredTotalNumber }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          需要的男性人数
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.requiredMaleNumber }}
        </el-col>
        <el-col :span="5" class="detail-label">
          需要的女性人数
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.requiredFemaleNumber }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          节目要求
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.programRequirements }}
        </el-col>
        <el-col :span="5" class="detail-label">
          其他要求描述
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.otherRequirementsDesc }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">

        <el-col :span="5" class="detail-label">
          排序
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.sort }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          发布状态
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.releaseState == 1 ? "已发布" : "未发布" }}
        </el-col>
        <el-col :span="5" class="detail-label">
          发布时间
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.releaseTime }}
        </el-col>

      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          详细描述
        </el-col>
        <el-col :span="19" class="detail-value" >
          <div v-html="detail.detailDesc"></div>
          <!-- {{ detail.detailDesc }} -->
        </el-col>
      </el-row>
    </el-dialog>
    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="name" align="center" label="活动名称" width="90" fixed> </el-table-column>
        <el-table-column prop="subject" align="center" label="活动主题" width="120"> </el-table-column>
        <el-table-column prop="coverImage" align="center" label="封面图片" width="120">
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 70px"
              :src="scope.row.coverImage ? scope.row.coverImage.split(',')[0] : ''"
              :preview-src-list="scope.row.coverImage ? scope.row.coverImage.split(',') : []"
            />
          </template>
        </el-table-column>
        <el-table-column prop="activityStartTime" align="center" label="活动开始时间" width="150"> </el-table-column>
        <el-table-column prop="activityEndTime" align="center" label="活动结束时间" width="150"> </el-table-column>
        <el-table-column prop="location" align="center" label="活动地址" width="120"> </el-table-column>
        <el-table-column prop="registrationDeadline" align="center" label="报名截止时间" width="150"></el-table-column>
        <el-table-column prop="requiredTotalNumber" align="center" label="需要的总人数" width="120"> </el-table-column>
        <el-table-column prop="requiredMaleNumber" align="center" label="需要的男性人数" width="120"> </el-table-column>
        <el-table-column prop="requiredFemaleNumber" align="center" label="需要的女性人数" width="120">
        </el-table-column>
        <el-table-column prop="programRequirements" align="center" label="节目要求" width="120"> </el-table-column>
        <el-table-column prop="otherRequirementsDesc" align="center" label="其他要求描述" width="120">
        </el-table-column>
        <!-- <el-table-column prop="detailDesc" align="center" label="详细描述" width="120"> </el-table-column> -->
        <el-table-column prop="sort" align="center" label="排序" width="120"> </el-table-column>
        <el-table-column prop="releaseState" align="center" label="发布状态" width="120">
          <template slot-scope="scope">
            {{ scope.row.releaseState == 1 ? "已发布" : "未发布" }}
          </template>
        </el-table-column>
        <el-table-column prop="releaseTime" align="center" label="发布时间" width="150"> </el-table-column>
        <el-table-column prop="addBy" align="center" label="创建人" width="120"> </el-table-column>
        <el-table-column prop="loanCount" align="center" label="操作" width="420" fixed="right">
          <template slot-scope="scope" align="center">
            <el-button type="warning" @click="toOpenDetail(scope.row)">详情</el-button>
            <el-button type="success" @click="openActorList(scope.row)">报名人列表</el-button>
            <el-button :disabled="scope.row.releaseState == 1" type="primary" @click="examineActive(scope.row)"
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
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { getToken } from "@/utils/auth";
import { root1 } from "@/utils/request";
import crudUser, { examineActive, getActiveDetail, getActiveActorList,examineActor} from "@/api/active";
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
  location: null,
  registrationDeadline: null,
  requiredTotalNumber: null,
  requiredMaleNumber: null,
  requiredFemaleNumber: null,
  programRequirements: null,
  otherRequirementsDesc: null,
  detailDesc: null,
  sort: null
  // releaseState: null,
  // releaseTime: null
};
export default {
  name: "",
  components: { crudOperation, rrOperation, pagination, udOperation,quillEditor },
  cruds() {
    return CRUD({
      url: "/admin/activity/list",
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
        location: [{ required: true, message: "请输入活动地址", trigger: "blur" }],
        registrationDeadline: [{ required: true, message: "请选择报名截止时间", trigger: "change" }],
        requiredTotalNumber: [{ required: true, message: "请输入需要的总人数", trigger: "blur" }],
        requiredMaleNumber: [{ required: true, message: "请输入需要的男性人数", trigger: "blur" }],
        requiredFemaleNumber: [{ required: true, message: "请输入需要的女性人数", trigger: "blur" }]
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
      this.fileList = [];
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
      console.log(form, "form");
      this.fileList = [
        {
          name: "封面图片",
          url: form.coverImage
        }
      ];
      // this.fileList = [];
    },
    openActorList(row) {
      this.activityId = row.id;
      this.tableDialog = true;
      this.getActiveActorList(this.activityId);
    },
    getActiveActorList(activityId) {
      this.tableLoading = true;
      let params = {
        activityId: activityId,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      getActiveActorList(params).then(res => {
          console.log(res, "报名人列表");
          this.tableData = res.dataList;
          this.tableLoading = false;
          this.total = res.allPageNum;
        })
        .catch(err => {
          this.tableLoading = false;
        });
    },
    examineActor(row,type) {
      let str = type == 1?'是否通过该用户报名?':'是否拒绝该用户报名?'
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            userId: row.id,
            registrationStatus: type,
            activityId: this.activityId,
          };
          examineActor(params).then(res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getActiveActorList(this.activityId);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getActiveActorList(this.activityId);
    },
    toOpenDetail(data) {
      this.detailsDialog = true;
      let params = {
        id: data.id
      };
      this.loading = true;
      getActiveDetail(params)
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
          examineActive(params).then(res => {
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
