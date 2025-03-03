import {
  loanStatus,
  loanTypeList,
  refuseReason,
  productList,
  userLevelList,
  channelList,
  authList,
  appPackageList,
  appVersionList,
  applyTypeList,
  tagList,
  isRepay,
  collectionType,
  repayType,
  repayChannel,
  getCollectionTask,
  isOrNo,
  flatType,
  collectionUser,
  reviewUserList,
  paymentChannelList,
  collectionStageList,
  getCollectionStageList100,
  refuseStageList,
  repaymentLinkType,
  getLoanRecord,
  getBankList,
  getRiskList,
  getApprovalDept,
  getCollectionDept,
  getGroup,
  getWalletName,
  getAdminUserListByCode,
  getMyAppVersion,
  getIsUpload,
  getHandleStatus,
  getFlatStatus,
  refuseReason2,
  getLoanFailReason,
  getRepayLogByUser,
  getUserFlatByUser,
  getBankName,
  getMKTuserList
} from '@/api/select'

const state = {
  selectItem: {
    loanStatus: [],
    loanTypeList: [],
    refuseReason: [],
    productList: [],
    userLevelList: [],
    channelList: [], // 渠道
    authList: [],
    appPackageList: [],
    appVersionList: [],
    applyTypeList: [],
    tagList: [],
    isRepay: [],
    collectionType: [],
    repayType: [],
    repayChannel: [],
    collectionTask: [],
    isOrNo: [],
    flatType: [],
    getLoanRecord: [],
    collectionUser: [],
    reviewUserList: [], // 审批员列表
    paymentChannelList: [], // 支付渠道列表
    collectionStageList: [], // 催收阶段列表
    collectionStageList100: [], // 催收阶段列表,100条
    refuseStageList: [], // 拒绝阶段列表
    repaymentLinkList: [], // 还款方式
    bankList: [], // 银行列表
    selectRisk: [], // 风控列表
    approvalDept: [], // 审核部门列表
    collectionDept: [], // 催收部门列表
    groupList: [], // 催收小组列表
    walletList: [], // 电子钱包列表
    roleAdminList: [], // 角色对应的管理员列表
    myAppVersionList: [], // app版本列表
    isUploadList: [], // 是否上传
    hanleList: [], // 处理状态
    flatList: [], // 平账状态
    refuseReason2: [], // 拒绝原因
    loanFailReason: [], // 打款失败原因
    repayLogUserList: [], // 还款处理人列表
    userFlatUserList: [], // 用户还款处理人列表
    bankName: [], // 银行名称,
    MKTuserList: [] // mkt用户列表
  }
}

const mutations = {
  GET_LOADSTATUS(state, data) {
    state.selectItem.loanStatus = data
  },
  GET_LOADTYPELIST(state, data) {
    state.selectItem.loanTypeList = data
  },
  GET_REFUSEREASON(state, data) {
    state.selectItem.refuseReason = data
  },
  GET_PRODUCTLIST(state, data) {
    state.selectItem.productList = data
  },
  GET_USERLEVELLIST(state, data) {
    state.selectItem.userLevelList = data
  },
  GET_CHANNELLIST(state, data) {
    state.selectItem.channelList = data
  },
  GET_AUTHLIST(state, data) {
    state.selectItem.authList = data
  },
  GET_APPPACKAGELIST(state, data) {
    state.selectItem.appPackageList = data
  },
  GET_APPVERSIONLIST(state, data) {
    state.selectItem.appVersionList = data
  },
  GET_APPLYTYPELIST(state, data) {
    state.selectItem.applyTypeList = data
  },
  GET_TAGLIST(state, data) {
    state.selectItem.tagList = data
  },
  GET_ISREPAY(state, data) {
    state.selectItem.isRepay = data
  },
  GET_COLLECTIONTYPE(state, data) {
    state.selectItem.collectionType = data
  },
  GET_REPAYTYPE(state, data) {
    state.selectItem.repayType = data
  },
  GET_REPAYCHANNEL(state, data) {
    state.selectItem.repayChannel = data
  },
  GET_COLLECTIONTASK(state, data) {
    state.selectItem.collectionTask = data
  },
  GET_ISORNO(state, data) {
    state.selectItem.isOrNo = data
  },
  GET_FLATTYPE(state, data) {
    state.selectItem.flatType = data
  },
  GET_REVIEWUSERLIST(state, data) {
    state.selectItem.reviewUserList = data
  },
  GET_PAYMENTCHANNELLIST(state, data) {
    state.selectItem.paymentChannelList = data
  },
  GET_COLLECTIONSTAGELIST(state, data) {
    state.selectItem.collectionStageList = data
  },
  GET_COLLECTIONSTAGELIST100(state, data) {
    state.selectItem.collectionStageList100 = data
  },
  GET_REFUSESTAGELIST(state, data) {
    state.selectItem.refuseStageList = data
  },
  GET_LOANRECORD(state, data) {
    state.selectItem.getLoanRecord = data
  },
  GET_REPAYMENTLINKLIST(state, data) {
    state.selectItem.repaymentLinkList = data
  },
  GET_COLLECTIONUSER(state, data) {
    state.selectItem.collectionUser = data
  },
  GET_GETBANKLIST(state, data) {
    state.selectItem.bankList = data
  },
  GET_GETRISKLIST(state, data) {
    state.selectItem.selectRisk = data
  },
  GET_GETAPPROVAL(state, data) {
    state.selectItem.approvalDept = data
  },
  GET_GETCOLLECTION(state, data) {
    state.selectItem.collectionDept = data
  },
  GET_GETGROUPLIST(state, data) {
    state.selectItem.groupList = data
  },
  GET_GETWALLETLIST(state, data) {
    state.selectItem.walletList = data
  },
  GET_GETADMINUSERLIST(state, data) {
    state.selectItem.roleAdminList = data
  },
  GET_MYAPPVERSIONLIST(state, data) {
    state.selectItem.myAppVersionList = data
  },
  GET_ISUPLOADLIST(state, data) {
    state.selectItem.isUploadList = data
  },
  GET_HANDLELIST(state, data) {
    state.selectItem.hanleList = data
  },
  GET_FLATLIST(state, data) {
    state.selectItem.flatList = data
  },
  GET_REFUSEREASON2(state, data) {
    state.selectItem.refuseReason2 = data
  },
  GET_LOANFAILREASON(state, data) {
    state.selectItem.loanFailReason = data
  },
  GET_REPAYLOGUSERLIST(state, data) {
    state.selectItem.repayLogUserList = data
  },
  GET_USERFLATUSERLIST(state, data) {
    state.selectItem.userFlatUserList = data
  },
  GET_BankName(state, data) {
    state.selectItem.bankName = data
  },
  GET_MKTuserList(state, data) {
    state.selectItem.MKTuserList = data
  }
}

const actions = {
  async getLoanStatus({ commit }) {
    const { data } = await loanStatus()
    commit('GET_LOADSTATUS', data)
  },
  async getLoanTypeList({ commit }) {
    const { data } = await loanTypeList()
    commit('GET_LOADTYPELIST', data)
  },
  async getRefuseReason({ commit }) {
    const { data } = await refuseReason()
    commit('GET_REFUSEREASON', data)
  },
  async getProductList({ commit }) {
    const { data } = await productList()
    commit('GET_PRODUCTLIST', data)
  },
  async getUserLevelList({ commit }) {
    const { data } = await userLevelList()
    commit('GET_USERLEVELLIST', data)
  },
  async getChannelList({ commit }) {
    const { data } = await channelList()
    commit('GET_CHANNELLIST', data)
  },
  async getAuthList({ commit }) {
    const { data } = await authList()
    commit('GET_AUTHLIST', data)
  },
  async getAppPackageList({ commit }) {
    const { data } = await appPackageList()
    commit('GET_APPPACKAGELIST', data)
  },
  async getAppVersionList({ commit }) {
    const { data } = await appVersionList()
    commit('GET_APPVERSIONLIST', data)
  },
  async getApplyTypeList({ commit }) {
    const { data } = await applyTypeList()
    commit('GET_APPLYTYPELIST', data)
  },
  async getTagList({ commit }) {
    const { data } = await tagList()
    commit('GET_TAGLIST', data)
  },
  async getIsRepay({ commit }) {
    const { data } = await isRepay()
    commit('GET_ISREPAY', data)
  },
  async getCollectionType({ commit }) {
    const { data } = await collectionType()
    commit('GET_COLLECTIONTYPE', data)
  },
  async getRepayType({ commit }) {
    const { data } = await repayType()
    commit('GET_REPAYTYPE', data)
  },
  async getRepayChannel({ commit }) {
    const { data } = await repayChannel()
    commit('GET_REPAYCHANNEL', data)
  },
  async getCollectionTask({ commit }) {
    const { data } = await getCollectionTask()
    commit('GET_COLLECTIONTASK', data)
  },
  async getIsOrNo({ commit }) {
    const { data } = await isOrNo()
    commit('GET_ISORNO', data)
  },
  async getFlatType({ commit }) {
    const { data } = await flatType()
    commit('GET_FLATTYPE', data)
  },
  async getReviewUserList({ commit }, type) {
    const { data } = await reviewUserList(type)
    commit('GET_REVIEWUSERLIST', data)
  },
  async getPaymentChannelList({ commit }) {
    const { data } = await paymentChannelList()
    commit('GET_PAYMENTCHANNELLIST', data)
  },
  async getCollectionStageList({ commit }) {
    const { data } = await collectionStageList()
    commit('GET_COLLECTIONSTAGELIST', data)
  },
  async getCollectionStageList100({ commit }) {
    const { dataList: data } = await getCollectionStageList100({
      pageNum: 1,
      pageSize: 100
    })
    commit('GET_COLLECTIONSTAGELIST100', data)
  },
  async getRefuseStageList({ commit }) {
    const { data } = await refuseStageList()
    commit('GET_REFUSESTAGELIST', data)
  },
  async getLoanRecord({ commit }) {
    const { data } = await getLoanRecord()
    commit('GET_LOANRECORD', data)
  },
  async getRePaymentLinkList({ commit }) {
    const { data } = await repaymentLinkType()
    commit('GET_REPAYMENTLINKLIST', data)
  },
  async getCollectionUser({ commit }) {
    const { data } = await collectionUser(0)
    commit('GET_COLLECTIONUSER', data)
  },
  async bankList({ commit }) {
    const { data } = await getBankList(0)
    commit('GET_GETBNAKLIST', data)
  },
  async selectRisk({ commit }) {
    const { data } = await getRiskList()
    commit('GET_GETRISKLIST', data)
  },
  async getApprovalDept({ commit }) {
    const { data } = await getApprovalDept()
    commit('GET_GETAPPROVAL', data)
  },
  async getCollectionDept({ commit }) {
    const { data } = await getCollectionDept()
    commit('GET_GETCOLLECTION', data)
  },
  async getGroupList({ commit }) {
    const { data } = await getGroup()
    commit('GET_GETGROUPLIST', data)
  },
  async getWalletList({ commit }) {
    const { data } = await getWalletName()
    commit('GET_GETWALLETLIST', data)
  },
  async getAdminUserListByCode({ commit }, code) {
    const { data } = await getAdminUserListByCode(code)
    commit('GET_GETADMINUSERLIST', data)
  },
  async getMyAppVersion({ commit }, code) {
    const { data } = await getMyAppVersion(code)
    commit('GET_MYAPPVERSIONLIST', data)
  },
  async getIsUpload({ commit }, code) {
    const { data } = await getIsUpload(code)
    commit('GET_ISUPLOADLIST', data)
  },
  async getHandleStatus({ commit }, code) {
    const { data } = await getHandleStatus(code)
    commit('GET_HANDLELIST', data)
  },
  async getFlatStatus({ commit }, code) {
    const { data } = await getFlatStatus(code)
    commit('GET_FLATLIST', data)
  },
  async getRefuseReason2({ commit }, code) {
    const { data } = await refuseReason2(code)
    commit('GET_REFUSEREASON2', data)
  },
  async getLoanFailReason({ commit }, code) {
    const { data } = await getLoanFailReason(code)
    commit('GET_LOANFAILREASON', data)
  },
  async getRepayLogByUser({ commit }, code) {
    const { data } = await getRepayLogByUser(code)
    commit('GET_REPAYLOGUSERLIST', data)
  },
  async getUserFlatByUser({ commit }, code) {
    const { data } = await getUserFlatByUser(code)
    commit('GET_USERFLATUSERLIST', data)
  },
  async getBankName({ commit }, code) {
    const { data } = await getBankName(code)
    commit('GET_BankName', data)
  },
  async getMKTuserList({ commit }) {
    const { dataList: data } = await getMKTuserList({
      pageSize: 1000,
      pageNum: 1,
      roleName: '营销专员MKT',
      status: 1
    })
    commit('GET_MKTuserList', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
