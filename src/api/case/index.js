import { request1 } from '@/utils/request'

export function examineCase(data) {
  return request1({
    url: '/admin/classical/release',
    method: 'post',
    data
  })
}
export function getCaseDetail(data) {
  return request1({
    url: '/admin/preview/getOneByAdmin',
    method: 'post',
    data
  })
}
export function add(data) {
  return request1({
    url: '/admin/classical/add',
    method: 'post',
    data
  })
}

export function del(ids) {
  console.log(ids)
  const idsStr = ids.toString()
  return request1({
    url: '/admin/classical/delete',
    method: 'post',
    data: {
      id: idsStr
    }
  })
}

export function edit(data) {
  return request1({
    url: '/admin/classical/edit',
    method: 'post',
    data
  })
}


export default { add, edit, del,examineCase,getCaseDetail }
