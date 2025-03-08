import { request1 } from '@/utils/request'

export function changeStatus(data) {
  return request1({
    url: '/admin/actor/show',
    method: 'post',
    data
  })
}
export function examineActor(data) {
  return request1({
    url: '/admin/actor/audit',
    method: 'post',
    data
  })
}
export function getActorDetail(data) {
  return request1({
    url: '/admin/actor/getOneByAdmin',
    method: 'post',
    data
  })
}
export function del(ids) {
  console.log(ids)
  const idsStr = ids.toString()
  return request1({
    url: '/admin/actor/delete',
    method: 'post',
    data: {
      id: idsStr
    }
  })
}


export default { del,changeStatus,examineActor,getActorDetail }
