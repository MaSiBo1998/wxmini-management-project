import { request1 } from '@/utils/request'
// import objKeySort from './config'
// import qs from 'qs'

export function getDepartmentSelect(data) {
  return request1({
    url: '/getDepartmentBySelect',
    method: 'post',
    data
  })
}
export function add(data) {
  return request1({
    url: '/add/user',
    method: 'post',
    data
  })
}

export function del(ids) {
  console.log(ids)
  const idsStr = ids.toString()
  return request1({
    url: '/del/user',
    method: 'post',
    data: {
      userId: idsStr
    }
  })
}

export function edit(data) {
  return request1({
    url: '/update/user',
    method: 'post',
    data
  })
}

export function rePassw(data) {
  return request1({
    url: '/reset/password',
    method: 'post',
    data
  })
}

export default { add, edit, del }
