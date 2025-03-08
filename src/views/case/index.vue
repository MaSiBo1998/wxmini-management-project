<template>
  <div class="app-container">
    <div style="font-size: 20px;font-weight: 600;">经典案例</div>
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
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
      title="经典案例"
      width="590px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
        <el-form-item label="活动主题" prop="subject">
          <el-input v-model="form.subject" placeholder="活动主题" style="width: 360px" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="排序" style="width: 360px" />
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
        <el-form-item label="详细描述" prop="detailDesc">
          <el-input v-model="form.detailDesc" placeholder="详细描述" style="width: 360px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>

    <!-- 详情展示 -->
    <el-dialog style="overflow: hidden" :visible.sync="detailsDialog" title="经典案例" width="580px" :loading="loading">
      <el-row :gutter="15" class="detail-row">
        <el-col :span="7" class="detail-value">
          {{ detail.sort }}
        </el-col>
        <el-col :span="5" class="detail-label">
          活动主题
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
        <el-col :span="7" class="detail-value">
          {{ detail.detailDesc }}
        </el-col>
      </el-row>
    </el-dialog>
    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="subject" align="center" label="案例名称"> </el-table-column>
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
      total: 0
    };
  },
  computed: {},
  created() {
    console.log(this.crud.data);
  },
  methods: {
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
