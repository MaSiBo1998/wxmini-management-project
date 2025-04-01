<template>
  <div class="app-container">
    <!--工具栏-->
    <div style="font-size: 20px;font-weight: 600;">企业简介</div>
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px" style="width:680px ">
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
          <el-button slot="trigger" size="small" type="primary" :disabled="!toEdit">选取文件</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="封面图片" required>
        <el-input :disabled="!toEdit" v-model="form.coverImage" placeholder="封面图片" style="width: 560px" />
      </el-form-item>
      <el-form-item label="简介内容" required>
        <el-input
          :rows="12"
          maxlength="500"
          type="textarea"
          resize="none"
          v-model="form.detailDesc"
          placeholder="简介内容"
          style="width: 560px"
          :disabled="!toEdit"
        />
      </el-form-item>
      <div style="text-align: right;width:680px ">
        <el-button v-if="toEdit" type="warning" @click="cancel()">取消</el-button>
        <el-button v-if="!toEdit" :loading="loading" type="primary" @click="toEdit = true">编辑</el-button>
        <el-button v-if="toEdit" :loading="loading" :disabled="loading" type="primary" @click="submit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { root1 } from "@/utils/request";
import { edit, getHomeInfo } from "@/api/home";
export default {
  name: "",
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        subject: [{ required: true, message: "请输入活动主题", trigger: "blur" }],
        coverImage: [{ required: true, message: "请输入封面图片", trigger: "blur" }],
        activityStartTime: [{ required: true, message: "请选择活动开始时间", trigger: "change" }],
        activityEndTime: [{ required: true, message: "请选择活动结束时间", trigger: "change" }],
        location: [{ required: true, message: "请输入活动地址", trigger: "blur" }]
      },
      toEdit: false,
      form: {},
      loading: false,
      uploadUrl: "",
      token: "",
      fileList: []
    };
  },
  computed: {},
  created() {
    this.uploadUrl = root1 + "/admin/upload/uploadVideo";
    this.token = getToken();
    this.getHomeInfo();
  },
  methods: {
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
    cancel() {
      this.toEdit = false;
      this.getHomeInfo();
    },
    getHomeInfo() {
      getHomeInfo().then(res => {
        console.log(res);
        this.form = res;
      });
    },
    submit() {
      let params = {
        ...this.form
      };
      this.loading = true;
      edit(params)
        .then(res => {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.loading = false;
          this.cancel()
        })
        .catch(err => {
          this.loading = false;
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
