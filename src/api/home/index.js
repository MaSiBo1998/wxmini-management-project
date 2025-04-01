import { request1 } from '@/utils/request'

export function edit(data) {
  return request1({
    url: '/admin/enterprise/edit',
    method: 'post',
    data
  })
}
export function getHomeInfo(data) {
  return request1({
    url: '/admin/enterprise/getInfo',
    method: 'post',
    data
  })
}


export default {  edit, getHomeInfo }
