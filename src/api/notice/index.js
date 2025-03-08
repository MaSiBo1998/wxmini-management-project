import { request1 } from '@/utils/request'

export function sendNotice(data) {
  return request1({
    url: '/admin/preview/release',
    method: 'post',
    data
  })
}
export function add(data) {
  return request1({
    url: '/admin/preview/add',
    method: 'post',
    data
  })
}

export function del(ids) {
  console.log(ids)
  const idsStr = ids.toString()
  return request1({
    url: '/admin/preview/delete',
    method: 'post',
    data: {
      id: idsStr
    }
  })
}

export function edit(data) {
  return request1({
    url: '/admin/preview/edit',
    method: 'post',
    data
  })
}


export default { add, edit, del,sendNotice }
