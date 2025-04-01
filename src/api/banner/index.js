import { request1 } from '@/utils/request'

export function add(data) {
  return request1({
    url: '/mini/banner/add',
    method: 'post',
    data
  })
}
export function getActivityList() {
  return request1({
    url: '/admin/activity/list',
    method: 'post',
    data:{
      pageSize:1000,
      pageNum:1
    }
  })
}
export function getCaseList() {
  return request1({
    url: '/admin/classical/listByAdmin',
    method: 'post',
    data:{
      pageSize:1000,
      pageNum:1,
      caseType:2
    }
  })
}

export function del(ids) {
  console.log(ids)
  const idsStr = ids.toString()
  return request1({
    url: '/mini/banner/delete',
    method: 'post',
    data: {
      id: idsStr
    }
  })
}

export function edit(data) {
  return request1({
    url: '/mini/banner/edit',
    method: 'post',
    data
  })
}


export default { add, edit, del,getActivityList,getCaseList }
