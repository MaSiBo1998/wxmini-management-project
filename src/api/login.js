import { request1 } from '@/utils/request'
// import objKeySort from './config'
// import qs from 'qs'

export function login(loginAccount, loginPassword) {
  return request1({
    url: '/admin/user/login',
    method: 'post',
    data: { loginAccount, loginPassword,loginType: 2, }
  })
}

export function getInfo() {
  return request1({
    url: '/front/jcl/getUserInfo',
    method: 'post',
    data: {}
  })
}

export function updatePwd(data) {
  return request1({
    url: '/change/password',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request1({
    url: '/toLogout',
    method: 'post',
    data
  })
}

export function testToken(token) {
  return request1({
    url: '/front/jcl/checkToken',
    method: 'post',
    data: {}
  })
}
