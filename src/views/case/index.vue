<template>
  <div class="app-container">
    <div style="font-size: 20px;font-weight: 600;">案例与新闻</div>
    <!--工具栏-->
    <div class="head-container" style="margin-top: 10px;">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="query.keyword" clearable size="small" placeholder="关键字搜索" class="filter-item" />
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="releaseTime" type="daterange" value-format="yyyy-MM-dd" range-separator=":"
               size="small" class="date-item" style="width: 100%"
              start-placeholder="发布开始时间"
              end-placeholder="发布结束时间" />
          </el-col>
          <!-- <el-col :span="6">
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
          </el-col> -->
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
      title="案例与新闻"
      width="750px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
        <el-form-item label="名称" prop="subject">
          <el-input v-model="form.subject" placeholder="名称" style="width: 560px" />
        </el-form-item>

        <el-form-item label="类型" prop="caseType">
          <el-select
            v-model="form.caseType"
            size="small"
            placeholder="请选择类型"
            class="filter-item"
            style="width: 560px"
          >
            <el-option label="案例" :value="1" />
            <el-option label="新闻" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="案例副标题" prop="caseTitle" v-if="form.caseType == 1">
          <el-input
            :rows="3"
            maxlength="75"
            type="textarea"
            resize="none"
            v-model="form.caseTitle"
            placeholder="案例副标题"
            style="width: 560px"
          />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input type="number" v-model="form.sort" placeholder="排序" style="width: 560px" />
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
        <el-form-item label="详细描述" prop="detailDesc">
          <quill-editor v-model="form.detailDesc" ref="myQuillEditor" :options="editorOption"></quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>

    <!-- 详情展示 -->
    <el-dialog
      style="overflow: hidden"
      :visible.sync="detailsDialog"
      :title="detail.caseType == 1 ? '案例' : '新闻'"
      width="750px"
      :loading="loading"
    >
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          名称
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.subject }}
        </el-col>
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
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          排序
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.sort }}
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
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          报名截止时间
        </el-col>
        <el-col :span="7" class="detail-value">
          {{ detail.registrationDeadline }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="5" class="detail-label">
          详细描述
        </el-col>
        <el-col :span="19" class="detail-value">
          <div v-html="detail.detailDesc" style="height:200px;overflow-y: scroll;"></div>
        </el-col>
      </el-row>
    </el-dialog>
    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="subject" align="center" label="名称"> </el-table-column>
        <el-table-column prop="subject" align="center" label="类型">
          <template slot-scope="scope">
            {{ scope.row.caseType == 1 ? "案例" : "新闻" }}
          </template>
        </el-table-column>
        <el-table-column prop="coverImage" align="center" label="封面图片">
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 70px"
              :src="scope.row.coverImage ? scope.row.coverImage.split(',')[0] : ''"
              :preview-src-list="scope.row.coverImage ? scope.row.coverImage.split(',') : []"
            />
          </template>
        </el-table-column>
        <el-table-column prop="activityStartTime" align="center" label="活动开始时间"> </el-table-column>
        <el-table-column prop="activityEndTime" align="center" label="活动结束时间"> </el-table-column>
        <!-- <el-table-column prop="detailDesc" align="center" label="详细描述" width="120"> </el-table-column> -->
        <el-table-column prop="sort" align="center" label="排序"> </el-table-column>
        <el-table-column prop="releaseState" align="center" label="发布状态">
          <template slot-scope="scope">
            {{ scope.row.releaseState == 1 ? "已发布" : "未发布" }}
          </template>
        </el-table-column>
        <el-table-column prop="releaseTime" align="center" label="发布时间" width="150"> </el-table-column>
        <el-table-column prop="addBy" align="center" label="创建人"> </el-table-column>
        <el-table-column prop="loanCount" align="center" label="操作" width="280" fixed="right">
          <template slot-scope="scope" align="center">
            <el-button type="warning" @click="toOpenDetail(scope.row)">详情</el-button>
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
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend); //注册扩展模块
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
  sort: null,
  caseType: null,
  caseTitle: null
};
export default {
  name: "",
  components: { crudOperation, rrOperation, pagination, udOperation, quillEditor },
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
        subject: [{ required: true, message: "请输入名称", trigger: "blur" }],
        caseTitle: [{ required: true, message: "请输入案例副标题", trigger: "blur" }],
        coverImage: [{ required: true, message: "请输入封面图片", trigger: "blur" }],
        activityStartTime: [{ required: true, message: "请选择活动开始时间", trigger: "change" }],
        caseType: [{ required: true, message: "请选择类型", trigger: "change" }],
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
      token: "",
      fileList: [],
      editorOption: {},
      releaseTime:[]
    };
  },
  computed: {},
  created() {
    this.uploadUrl = root1 + "/admin/upload/uploadVideo";
    this.token = getToken();
    this.editorOption = {
      modules: {
        ImageExtend: {
          loading: true,
          name: "file",
          action: this.uploadUrl,
          headers: xhr => {
            xhr.setRequestHeader("token", this.token);
          }, // 可选参数 设置请求头部
          response: res => {
            return res.data.httpPath;
          }
        },
        toolbar: {
          container: container,
          handlers: {
            image: function() {
              QuillWatch.emit(this.quill.id);
            }
          }
        }
      }
    };
  },
  methods: {
    [CRUD.HOOK.beforeReset](crud) {
      this.releaseTime = []
    },
    [CRUD.HOOK.beforeRefresh](crud) {
      if (this.releaseTime) {
        crud.query.releaseTimeStartKey = this.releaseTime[0];
        crud.query.releaseTimeEndKey = this.releaseTime[1];
      } else {
        crud.query.releaseTimeStartKey = undefined;
        crud.query.releaseTimeEndKey = undefined;
      }
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.form.coverImage = response.data.httpPath;
        this.fileList[0].url = response.data.httpPath;
      } else {
        this.form.coverImage = "";
        this.fileList = [];
      }
    },
    handleRemove(file, fileList) {
      this.fileList = [];
      this.form.coverImage = "";
    },
    [CRUD.HOOK.beforeToAdd](crud, form) {
      this.form.id = null;
      this.fileList = [];
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.fileList = [
        {
          name: "封面图片",
          url: form.coverImage
        }
      ];
      // this.fileList = [];
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
          this.detail.detailDesc = res.detailDesc.replace(/<img/g, '<img style="width:100%"').replace(/<p/g, '<p style="color:rgb(153, 153, 153);font-size:26rpx"')
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
