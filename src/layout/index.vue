<template>
  <div>
    <transition name="el-zoom-in-top">
      <TabMenu></TabMenu>
    </transition>
    <app-main />
  </div>
</template>

<script>
import { AppMain } from "./components";
import TabMenu from './components/TabMenu/index.vue'
import Cookies from "js-cookie";
export default {
  name: "Layout",
  components: {
    AppMain,
    TabMenu
  },
  data() {
    return {
      timer: null,
      tokenFlag: false,
      tokenCookies: Cookies.get("BBF-ADMIN-TOEKN"),
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped></style>
