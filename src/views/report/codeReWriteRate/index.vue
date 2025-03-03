<template>
  <div class="app-container">
    <div class="title">BI列表/验证码回填率</div>
    <day></day>
    <div style="height: 100px"></div>
    <month></month>
  </div>
</template>

<script>
import Day from "@/views/report/codeReWriteRate/day/index";
import Month from "@/views/report/codeReWriteRate/month/index";
export default {
  name: "ReLoanApplyRate",
  components: { Day, Month },
  data() {
    return {
      
    };
  },
  computed: {},
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
    color: #909399;
  }
}
</style>



