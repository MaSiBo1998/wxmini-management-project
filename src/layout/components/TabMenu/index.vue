<template>
  <div class="nav-box">
    <el-menu router :default-active="$router.path" class="el-menu-demo" mode="horizontal"
      background-color="#333f88" text-color="#a8b0df" active-text-color="#ffffff">
      <el-menu-item index="/actor">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>演员管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/home">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>招募管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/home">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>演出预告</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/home">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>经典案例</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/home">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>账号管理</span>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-data-analysis"></i>
          <span>报表</span>
        </template>
        <el-submenu index="2-1">
          <template slot="title">产品</template>
          <el-menu-item index="/installRegisterRate">安装注册率</el-menu-item>
          <el-menu-item index="/codeReWriteRate">验证码回填率</el-menu-item>
          <el-menu-item index="/registerStep">注册完件率</el-menu-item>
          <el-menu-item index="/firstLoanConfirm">首贷确认报表</el-menu-item>
          <el-menu-item index="/firstLoanOptimizeRate">首贷优化确认率</el-menu-item>
          <el-menu-item index="/reLoanApplyRate">复贷申请转化率</el-menu-item>
          <el-menu-item index="/reloanRepaymentRate">首复贷申请率</el-menu-item>
          <el-menu-item index="/reloanConfirmRate">首复贷确认率</el-menu-item>
          <el-menu-item index="/paymentFailRate">放款失败率</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">运营</template>
          <el-menu-item index="/inviteData">邀请数据(墨西哥)</el-menu-item>
          <el-menu-item index="/inviteDataCo">邀请数据(哥伦比亚)</el-menu-item>
        </el-submenu>
        <el-submenu index="2-3">
          <template slot="title">风控</template>
          <el-menu-item index="/newOldUserPassRate">新老客通过率</el-menu-item>
          <el-menu-item index="/overdueTrackSummary">逾期追踪汇总</el-menu-item>
          <el-menu-item index="/androidPassRateNew">安卓通过率(新)</el-menu-item>
          <el-menu-item index="/androidPassRateOld">安卓通过率(老)</el-menu-item>
          <el-menu-item index="/androidRiskPrice">安卓风险定价</el-menu-item>
        </el-submenu>

      </el-submenu>
      <el-menu-item index="/userManagement">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </template>
      </el-menu-item>
    </el-menu>
    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          <span class="usname">{{ ` ${user.userInfo || '未知'}` }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <span style="display:block;height-line" @click="dialog = true">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </span>
          <span style="display:block;" @click="open">
            <el-dropdown-item>
              退出登录
            </el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog  :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" title="修改密码" append-to-body width="700px" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="200px">
        <el-form-item label="旧密码"  prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" auto-complete="on" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" auto-complete="on" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="确认密码" prop="reNewPassword">
          <el-input v-model="form.reNewPassword" type="password" auto-complete="on" style="width: 370px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import { updatePwd } from '@/api/login'
import { mapGetters } from 'vuex'
export default {
  name: "TabMenu",
  data() {
    const confirmPwd = (rule, value, callback) => {
      if (value) {
        if (this.form.newPassword !== value) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请再次输入密码'))
      }
    }
    return {
      activeIndex2: '2',
      loading: false,
      dialog: false,
      title: '修改密码',
      form: {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        reNewPassword: [
          { required: true, validator: confirmPwd, trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  created() {
    console.log(this.user,123)
  },
  methods: {
    open() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        // location.reload()
        location.href = '/login'
      })
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          updatePwd(this.form).then(res => {
            this.resetForm()
            this.$notify({
              title: '密码修改成功，请重新登录',
              type: 'success',
              duration: 1500
            })
            setTimeout(() => {
              store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }, 1500)
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { pwdOld: '', pwdNew: '', confirmPwd: '' }
    }

  }
}
</script>

<style lang="scss" scoped>
// /deep/.el-menu-item {
//   line-height: 22px !important;
//   padding: 8px 0;
// }

// /deep/.el-submenu__title {
//   line-height: 22px !important;
// }
.nav-box {
  position: relative;
  height: 60px;
}
.avatar-container {
  position: absolute;
  top: 20px;
  right: 20px;
  .avatar-wrapper {
    display: flex;
    align-items: center;
    color: rgb(168, 176, 223);
    .usname {
      padding: 0 8px;
    }
  }
  .avatar-wrapper :hover {
    cursor: pointer;
  }
}
.el-menu-demo {
  padding: 0 20px;
}

.tab-item {
  text-align: center;
  width: 150px;

  .tab-item-title {
    width: 150px;
    height: 20px;
  }
}
</style>
