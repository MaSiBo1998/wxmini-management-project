<template>
  <div class="app-container">
    <div class="title">
      BI列表/邀请数据(哥伦比亚)
    </div>
    <day></day>
    <div style="height:100px;"></div>
    <month></month>
  </div>
</template>

<script>
import Day from '@/views/report/inviteDataCo/day/index'
import Month from '@/views/report/inviteDataCo/month/index'
export default {
  name: "InstallRate",
  components: { Day,Month },
  data() {
    return {
    };
  },
  computed: {

  },
  created() {
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.app-container {
  .title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
    color:#909399;
  }
}
</style>



