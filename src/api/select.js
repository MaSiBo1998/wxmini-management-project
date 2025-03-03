import { request1 } from '@/utils/request'

// 申请状态
export function loanStatus() {
  return request1({
    url: '/front/base/loanStatus',
    method: 'get'
  })
}

// 贷款类型
export function loanTypeList() {
  return request1({
    url: '/front/base/loanTypeList',
    method: 'get'
  })
}

// 拒绝原因(终审原因)
export function refuseReason() {
  return request1({
    url: '/front/base/refuseReason',
    method: 'get'
  })
}

// 产品
export function productList() {
  return request1({
    url: '/front/base/getProductList',
    method: 'get'
  })
}

// 用户等级
export function userLevelList() {
  return request1({
    url: '/front/base/getUserLevelList',
    method: 'get'
  })
}

// 申请渠道
export function channelList() {
  return request1({
    url: '/front/base/channelList',
    method: 'get'
  })
}

// 授权隐私数据
export function authList() {
  return request1({
    url: '/front/base/getAuthList',
    method: 'get'
  })
}

// APP包名
export function appPackageList() {
  return request1({
    url: '/front/base/appPackageList',
    method: 'get'
  })
}
// APP版本
export function appVersionList() {
  return request1({
    url: '/front/base/appVersionList',
    method: 'get'
  })
}

// 申请方式
export function applyTypeList() {
  return request1({
    url: '/front/base/getApplyTypeList',
    method: 'get'
  })
}

// 标签
export function tagList() {
  return request1({
    url: '/front/base/getTagList',
    method: 'get'
  })
}

// 复借
export function isRepay() {
  return request1({
    url: '/front/base/getIsRepay',
    method: 'get'
  })
}

// 催收日志类型
export function collectionType() {
  return request1({
    url: '/front/base/getCollectionType',
    method: 'get'
  })
}

// 还款方式
export function repayType() {
  return request1({
    url: '/front/base/getRepayType',
    method: 'get'
  })
}

// 还款渠道
export function repayChannel() {
  return request1({
    url: '/front/base/getRePay',
    method: 'get'
  })
}

// 任务状态
export function getCollectionTask() {
  return request1({
    url: '/front/base/getCollectionTask',
    method: 'get'
  })
}

// 是否
export function isOrNo() {
  return request1({
    url: '/front/base/getIsOrNo',
    method: 'get'
  })
}

// 平账类型
export function flatType() {
  return request1({
    url: '/front/base/getFlatType',
    method: 'get'
  })
}

// 获取审批员
export function reviewUserList(type = 4) {
  return request1({
    url: `/front/base/${type}/getReviewUserList`,
    method: 'get'
  })
}

// 支付渠道
export function paymentChannelList(type = 4) {
  return request1({
    url: '/front/base/getPay',
    method: 'get'
  })
}

// 催收阶段
export function collectionStageList() {
  return request1({
    url: '/front/base/collectionStage',
    method: 'get'
  })
}

// 催收阶段获取所有，先获取100条，一般只有几条
export function getCollectionStageList100(data) {
  return request1({
    url: '/front/collectionStage/getCollectionStageList',
    data,
    method: 'post'
  })
}

// 拒绝阶段
export function refuseStageList(type = 4) {
  return request1({
    url: '/front/base/getRefuseStage',
    method: 'get'
  })
}

// 还款方式
export function repaymentLinkType(type = 4) {
  return request1({
    url: '/front/base/getReimbursementMeansWay',
    method: 'get'
  })
}

// 放款状态
export function getLoanRecord() {
  return request1({
    url: '/front/base/getLoanRecord',
    method: 'get'
  })
}

// 催收员
export function collectionUser(status) {
  return request1({
    url: `/front/base/${status}/getCollectionUserList`,
    method: 'get'
  })
}

// 银行列表
export function getBankList() {
  return request1({
    url: `/front/base/getPayBankList`,
    method: 'get'
  })
}

// 风控列表
export function getRiskList() {
  return request1({
    url: `/front/risk/selectRisk`,
    method: 'get'
  })
}

// 审核部门
export function getApprovalDept() {
  return request1({
    url: `/front/base/getApprovalDept`,
    method: 'get'
  })
}

// 催收部门
export function getCollectionDept() {
  return request1({
    url: `/front/base/getCollectionDept`,
    method: 'get'
  })
}

// 联系人关系
export function getContactRelation() {
  return request1({
    url: `/front/base/getContactRelation`,
    method: 'get'
  })
}

// 联系方式
export function getContactWay() {
  return request1({
    url: `/front/base/getContactWay`,
    method: 'get'
  })
}

// 催收小组
export function getGroup() {
  return request1({
    url: `/front/base/getGroup`,
    method: 'get'
  })
}

// 电子钱包名称
export function getWalletName() {
  return request1({
    url: `/front/base/getWalletName`,
    method: 'get'
  })
}

// 通过角色code获取管理员
export function getAdminUserListByCode(code) {
  return request1({
    url: `/front/base/${code}/getAdminUserList`,
    method: 'get'
  })
}

// 获取app版本
export function getMyAppVersion() {
  return request1({
    url: `/front/base/getAllAppVersion`,
    method: 'get'
  })
}

// 获取是否上传
export function getIsUpload() {
  return request1({
    url: `/front/base/isUpload`,
    method: 'get'
  })
}

// 获取处理状态
export function getHandleStatus() {
  return request1({
    url: `/front/base/handleList`,
    method: 'get'
  })
}

// 获取平账状态
export function getFlatStatus() {
  return request1({
    url: `/front/base/flatStatusList`,
    method: 'get'
  })
}

// 拒绝原因(所有原因)
export function refuseReason2() {
  return request1({
    url: '/front/base/refuseReason2',
    method: 'get'
  })
}

// 打款失败原因
export function getLoanFailReason() {
  return request1({
    url: '/front/base/getLoanFailReason',
    method: 'get'
  })
}

// 还款处理人
export function getRepayLogByUser() {
  return request1({
    url: '/front/base/getRepayLogByUser',
    method: 'get'
  })
}

// 用户还款处理人
export function getUserFlatByUser() {
  return request1({
    url: '/front/base/getUserFlatByUser',
    method: 'get'
  })
}

// 获取银行名称
export function getBankName() {
  return request1({
    url: '/front/base/getBankFlatList',
    method: 'get'
  })
}

// mkt用户列表
export function getMKTuserList(data) {
  return request1({
    url: `/front/jcl/getAdminUserAndRole`,
    method: 'post',
    data
  })
}
