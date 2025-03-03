<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">&nbsp;&nbsp;{{ `${company} - ${title}` }} </h1> -->
        <img v-if="appType == 1" class="sidebar-logo" src="https://mx1.obs.na-mexico-1.myhuaweicloud.com/reloan/Rapipeso.png" alt="">
          <img v-if="appType == 2" class="sidebar-logo" src="https://mx1.obs.na-mexico-1.myhuaweicloud.com/reloan/Rapicash.png" alt="">
          <img v-if="appType == 3" class="sidebar-logo" src="https://mx1.obs.na-mexico-1.myhuaweicloud.com/reloan/Meprestas.png" alt="">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo"> -->
        <img v-if="appType == 1" class="sidebar-logo" src="https://mx1.obs.na-mexico-1.myhuaweicloud.com/reloan/Rapipeso.png" alt="">
          <img v-if="appType == 2" class="sidebar-logo" src="https://mx1.obs.na-mexico-1.myhuaweicloud.com/reloan/Rapicash.png" alt="">
          <img v-if="appType == 3" class="sidebar-logo" src="https://mx1.obs.na-mexico-1.myhuaweicloud.com/reloan/Meprestas.png" alt="">
        <h1 class="sidebar-title">&nbsp;&nbsp;{{$t('system.appname') }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import Logo from '@/assets/images/logo.png'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo: Logo,
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
    company() {
      return this.$t('system.company')
    },
    title() {
      return this.$t('system.name')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // text-align: center;
  margin-left:12px;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      // margin-right: 15px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
