<template>
  <div class="app-container">
    <!--工具栏-->
    <div style="font-size: 20px;font-weight: 600;">演员管理</div>
    <div class="head-container" style="margin-top: 10px;">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="query.nameKey" clearable size="small" placeholder="演员名称" class="filter-item" />
          </el-col>
          <el-col :span="6">
            <el-cascader
              style="width: 100%;"
              size="small"
              placeholder="专业"
              v-model="skillKey"
              separator="-"
              :props="{
                value: 'label',
                label: 'label'
              }"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-col>
          <el-col :span="12">
            <rrOperation />
          </el-col>
        </el-row>
      </div>
      <crudOperation> </crudOperation>
    </div>
    <!-- 详情展示 -->
    <el-dialog style="overflow: hidden" :visible.sync="detailsDialog" title="演员详情" width="580px" :loading="loading">
      <el-row :gutter="15" class="detail-row">
        <el-col :span="4" class="detail-label">
          演员姓名
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.name }}
        </el-col>
        <el-col :span="4" class="detail-label">
          头像
        </el-col>
        <el-col :span="8" class="detail-value">
          <el-image
            style="width: 70px; height: 70px"
            :src="detail.homeImage ? detail.homeImage.split(',')[0] : ''"
            :preview-src-list="detail.homeImage ? detail.homeImage.split(',') : []"
          />
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="4" class="detail-label">
          代表图
        </el-col>
        <el-col :span="8" class="detail-value">
          <el-image
            style="width: 70px; height: 70px"
            :src="detail.coverImage ? detail.coverImage.split(',')[0] : ''"
            :preview-src-list="detail.coverImage ? detail.coverImage.split(',') : []"
          />
        </el-col>
        <el-col :span="4" class="detail-label">
          视频
        </el-col>
        <el-col :span="8" class="detail-value">
          <a :href="detail.videoClipUrl" target="_blank">查看视频</a>
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="4" class="detail-label">
          年龄
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.age }}
        </el-col>
        <el-col :span="4" class="detail-label">
          性别
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.gender == 1 ? "男" : "女" }}
        </el-col>
        <el-col :span="4" class="detail-label">
          电话
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.phoneNumber }}
        </el-col>
        <el-col :span="4" class="detail-label">
          特长1
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.primarySkillCategory }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="4" class="detail-label">
          特长2
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.secondarySkillCategory }}
        </el-col>
        <el-col :span="4" class="detail-label">
          特长3
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.thirdlySkillCategory }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="4" class="detail-label">
          其他特长
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.otherProfessionalCategory }}
        </el-col>
        <el-col :span="4" class="detail-label">
          毕业学校
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.graduationSchool }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="4" class="detail-label">
          工作年限
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.workingYears }}
        </el-col>
        <el-col :span="4" class="detail-label">
          身高
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.height }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="4" class="detail-label">
          体重
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.weight }}
        </el-col>
        <el-col :span="4" class="detail-label">
          过往经历
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.pastExperiences }}
        </el-col>
      </el-row>
      <el-row :gutter="15" class="detail-row">
        <el-col :span="4" class="detail-label">
          演出案例
        </el-col>
        <el-col :span="8" class="detail-value">
          {{ detail.performanceCases }}
        </el-col>
      </el-row>
    </el-dialog>
    <!--表格渲染-->
    <div class="table-box">
      <el-table ref="table" v-loading="crud.loading" max-height="600" stripe lazy :data="crud.data">
        <el-table-column prop="name" align="center" label="演员名称" width="90" fixed> </el-table-column>
        <el-table-column prop="gender" align="center" label="性别">
          <template slot-scope="scope">
            {{ scope.row.gender == 1 ? "男" : "女" }}
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" align="center" label="电话" width="100"> </el-table-column>
        <el-table-column prop="age" align="center" label="年龄"> </el-table-column>
        <el-table-column prop="height" align="center" label="身高"> </el-table-column>
        <el-table-column prop="weight" align="center" label="体重"> </el-table-column>
        <!-- <el-table-column prop="primarySkillCategory" align="center" label="特长1" >
        </el-table-column>
        <el-table-column prop="secondarySkillCategory" align="center" label="特长2" ></el-table-column>
        <el-table-column prop="thirdlySkillCategory" align="center" label="特长3" >
        </el-table-column>
        <el-table-column prop="otherProfessionalCategory" align="center" label="特长补充" >
        </el-table-column> -->
        <el-table-column prop="graduationSchool" align="center" label="毕业学校"> </el-table-column>
        <el-table-column prop="workingYears" align="center" label="工作年限"> </el-table-column>
        <!-- <el-table-column prop="pastExperiences" align="center" label="过往经历" > </el-table-column>

        <el-table-column prop="performanceCases" align="center" label="演出案例" > </el-table-column>
        <el-table-column prop="coverImage" align="center" label="代表图" >
        </el-table-column>
        <el-table-column prop="videoClipUrl" align="center" label="视频" >
        </el-table-column>
        <el-table-column prop="yetRegistered" align="center" label="已报名项目" > </el-table-column>
        <el-table-column prop="passRegistered" align="center" label="已通过项目" > </el-table-column> -->
        <el-table-column prop="gender" align="center" label="是否审核">
          <template slot-scope="scope">
            {{ scope.row.auditState == 1 ? "已审核" : "未审核" }}
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="是否显示" prop="isShow" width="80px" align="center">
          <template slot-scope="scope">
            <el-switch
              disabled
              v-model="scope.row.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @click.native="changeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="loanCount" align="center" label="操作" width="250">
          <template slot-scope="scope" align="center">
            <el-button type="warning" @click="toOpenDetail(scope.row)">详情</el-button>
            <el-button :disabled="scope.row.auditState == 1" type="primary" @click="examineActor(scope.row)"
              >审核</el-button
            >
            <udOperation :isHaveEdit="false" :data="scope.row" style="display: inline-block" />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudUser, { changeStatus, examineActor, getActorDetail } from "@/api/actor/index";
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
  editor: null
};
export default {
  name: "",
  components: { crudOperation, rrOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      url: "/admin/actor/list",
      method: "post",
      crudMethod: { ...crudUser }
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      detailsDialog: false,
      detail: {},
      loading: false,
      options: [
        {
          label: "歌手类",
          children: [
            {
              label: "音乐剧"
            },
            {
              label: "通俗"
            },
            {
              label: "美声"
            },
            {
              label: "民歌"
            },
            {
              label: "民族"
            },
            {
              label: "流行"
            },
            {
              label: "说唱"
            }
          ]
        },
        {
          label: "乐队类",
          children: [
            {
              label: "民乐"
            },
            {
              label: "流行音乐"
            },
            {
              label: "西洋古典"
            }
          ]
        },
        {
          label: "舞蹈",
          children: [
            {
              label: "民族舞"
            },
            {
              label: "古典舞"
            },
            {
              label: "芭蕾舞"
            },
            {
              label: "爵士舞"
            },
            {
              label: "现代舞"
            },
            {
              label: "流行热舞"
            }
          ]
        },
        {
          label: "非遗",
          children: [
            {
              label: "国家级"
            },
            {
              label: "省级"
            },
            {
              label: "其他"
            }
          ]
        },
        {
          label: "戏曲",
          children: [
            {
              label: "西洋乐器"
            },
            {
              label: "中国民乐"
            }
          ]
        },
        {
          label: "特技/绝技绝活",
          children: []
        },
        {
          label: "杂技",
          children: [
            {
              label: "高空"
            },
            {
              label: "传统"
            }
          ]
        },
        {
          label: "魔术",
          children: [
            {
              label: "大型魔术"
            },
            {
              label: "近景魔术"
            },
            {
              label: "互动魔术"
            }
          ]
        },
        {
          label: "武术",
          children: [
            {
              label: "武术套路"
            },
            {
              label: "拳"
            },
            {
              label: "太极"
            },
            {
              label: "剑"
            },
            {
              label: "刀"
            },
            {
              label: "棍"
            },
            {
              label: "枪"
            }
          ]
        },
        {
          label: "戏剧表演",
          children: []
        },
        {
          label: "舞美设计",
          children: []
        },
        {
          label: "灯光师",
          children: [
            {
              label: "灯光设计"
            },
            {
              label: "灯光技师"
            }
          ]
        },
        {
          label: "音响师",
          children: [
            {
              label: "音响设计"
            },
            {
              label: "音响技师"
            }
          ]
        },
        {
          label: "服装设计"
        },
        {
          label: "服装管理"
        },
        {
          label: "多媒体"
        },
        {
          label: "场务"
        },
        {
          label: "播音主持"
        }
      ],
      skillKey:''
    };
  },
  computed: {},
  created() {},
  methods: {
    handleChange(e) {
      console.log(e);
      // if (e.length == 2) {
      //   this.query.skillKey = e[0] + "-" + e[1];
      //   this.crud.toQuery()
      // }
    },
    toOpenDetail(data) {
      this.detailsDialog = true;
      let params = {
        userId: data.userId
      };
      this.loading = true;
      getActorDetail(params)
        .then(res => {
          console.log(res, "详情");
          this.detail = res;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    [CRUD.HOOK.beforeReset](crud) {
      this.skillKey = ''
    },
    [CRUD.HOOK.beforeRefresh](crud) {
      if (this.skillKey) {
        if (this.skillKey.length == 2) {
          crud.query.skillKey = this.skillKey[0] + "-" + this.skillKey[1];
        }else{
          crud.query.skillKey = this.skillKey[0]
        }
      }
      if (this.query.createTime) {
        crud.query.dateStart = this.query.createTime[0];
        crud.query.dateEnd = this.query.createTime[1];
      } else {
        crud.query.dateStart = undefined;
        crud.query.dateEnd = undefined;
      }
    },
    examineActor(row) {
      this.$confirm("确认审核通过该演员", "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 业务逻辑
        let params = (params = {
          id: row.id,
          auditState: 1
        });
        examineActor(params).then(res => {
          if (res.code == 0) {
            console.log(res, "结果");
            this.$message({
              duration: 3000,
              message: res.data,
              type: "success"
            });
          }
        });
        setTimeout(() => {
          this.crud.refresh();
        }, 600);
      });
    },
    // 改变状态
    changeStatus(row) {
      let msg = "";
      if (row.isShow === 1) {
        msg = "确认隐藏演员显示";
      } else {
        msg = "确认打开演员显示";
      }

      this.$confirm(msg, "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 业务逻辑
        let params = "";
        if (row.isShow === 1) {
          params = {
            id: row.id,
            isShow: 0
          };
        } else {
          params = {
            id: row.id,
            isShow: 1
          };
        }
        changeStatus(params).then(res => {
          if (res.code == 0) {
            console.log(res, "结果");
            this.$message({
              duration: 3000,
              message: res.data,
              type: "success"
            });
          }
        });
        setTimeout(() => {
          this.crud.refresh();
        }, 600);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
.table-box {
  padding: 20px;
  background-color: #fff;
  box-shadow: 5px;
}

/deep/.el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: 2px solid #23b7e5;
}

.el-switch.is-disabled {
  opacity: 1;
}

/deep/.el-switch.is-disabled .el-switch__core,
.el-switch.is-disabled .el-switch__label {
  cursor: pointer;
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
