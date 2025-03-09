import { request1 } from '@/utils/request'

export function examineActive(data) {
  return request1({
    url: '/admin/activity/release',
    method: 'post',
    data
  })
}
export function getActiveDetail(data) {
  return request1({
    url: '/admin/activity/getOneByAdmin',
    method: 'post',
    data
  })
}
export function getActiveActorList(data) {
  return request1({
    url: '/admin/registration/registratList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request1({
    url: '/admin/activity/add',
    method: 'post',
    data
  })
}

export function del(ids) {
  console.log(ids)
  const idsStr = ids.toString()
  return request1({
    url: '/admin/activity/delete',
    method: 'post',
    data: {
      id: idsStr
    }
  })
}

export function edit(data) {
  return request1({
    url: '/admin/activity/edit',
    method: 'post',
    data
  })
}


export default { add, edit, del,examineActive,getActiveDetail }
