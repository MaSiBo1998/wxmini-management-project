<template>
  <div>
    <el-button   v-if="isHaveEdit" :loading="crud.status.cu === 2" :disabled="disabledEdit"  type="primary" @click="crud.toEdit(data)" >编辑</el-button>
    <el-popover v-model="pop" placement="top" width="180" trigger="manual" @show="onPopoverShow" @hide="onPopoverHide">
      <p>{{ msg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button  type="text" @click="doCancel">取消</el-button>
        <el-button :loading="crud.dataStatus[crud.getDataId(data)].delete === 2" type="primary"  @click="crud.doDelete(data)">确定</el-button>
      </div>
      <el-button slot="reference" :disabled="disabledDle" type="danger"  @click="toDelete">删除</el-button>
    </el-popover>
    <slot></slot>
  </div>
  
</template>
<script>
import CRUD, { crud } from '@crud/crud'
export default {
  mixins: [crud()],
  props: {
    data: {
      type: Object,
      required: true
    },
    // permission: {
    //   type: Object,
    //   required: true
    // },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    isHaveEdit: {
      type: Boolean,
      default: () => { return true }
    },
    disabledDle: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    }
  },
  data() {
    return {
      pop: false
    }
  },
  methods: {
    doCancel() {
      this.pop = false
      this.crud.cancelDelete(this.data)
    },
    toDelete() {
      this.pop = true
    },
    [CRUD.HOOK.afterDelete](crud, data) {
      if (data === this.data) {
        this.pop = false
      }
    },
    onPopoverShow() {
      setTimeout(() => {
        document.addEventListener('click', this.handleDocumentClick)
      }, 0)
    },
    onPopoverHide() {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    handleDocumentClick(event) {
      this.pop = false
    }
  }
}
</script>
