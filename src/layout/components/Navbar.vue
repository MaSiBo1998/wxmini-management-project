<template>
  <div class="navbar">

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <el-tooltip content="项目文档" effect="dark" placement="bottom">
          <Doc class="right-menu-item hover-effect" />
        </el-tooltip> -->


<!--         <el-tooltip content="布局设置" effect="dark" placement="bottom">-->
<!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
<!--        </el-tooltip>-->

      </template>
      <!-- <div class="notify-box"> -->
      <!-- <div class="noReady" v-if="isAleradyRead"></div>
      </div> -->
      <!-- <div class="avatar-container right-menu-item hover-effect">111</div> -->
      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <el-dropdown-menu slot="dropdown">
          <span style="display:block;height-line" @click="$refs.pass.dialog = true">
            <el-dropdown-item>
            </el-dropdown-item>
          </span>
          <span style="display:block;" @click="open">
            <el-dropdown-item>
            </el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'
import Avatar from '@/assets/images/logo.png'
export default {
  components: {
    // SizeSelect,
    // Search
  },
  data() {
    return {
      Avatar: Avatar,
      dialogVisible: false,
      timer: null,
      isAleradyRead: false,
      appType: 1,//app分类,1:rapipeso 2: rapicash 
    }
  },
  created(){
    let type = localStorage.getItem('appName')
    if (type === 'rapipeso') {
      this.appType = 1
    } else if (type === 'rapicash') {
      this.appType = 2
    }
    else if (type === 'meprestas') {
      this.appType = 3
    } else {
      this.appType = 1
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'baseApi'
    ]),
    show: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  methods: {
    // getAlerady(val){
    //   if(val === '更新成功'){
    //     this.isAleradyRead = false
    //   }
      
    // },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
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
        location.href='/login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// .notify-box {
//   position: relative;
// }
// .noReady {
//   width: 7px;
//   position: absolute;
//   border-radius: 50%;
//   top: 16px;
//   right: 8px;
//   height: 7px;
//   background-color: red;
// }
.notify {
  font-size:18px;

  display:inline-block;
  cursor:pointer;
  margin-right: 10px;
}
.set-language {
  // position: absolute;
  // top: 0;
  font-size: 18px;
  margin-right: 10px;
  // right: 0px;
  cursor: pointer;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    text-align:right;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    // float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      // margin-left: 20px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .usname{
          vertical-align: middle;
          display:inline-block;
          margin-top:-30px;
          margin-right: 10px
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
