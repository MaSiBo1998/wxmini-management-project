import axios from 'axios'
import objKeySort from '../api/config'
import { Notification } from 'element-ui'
import qs from 'qs'
// export const root1 = 'http://bi.szzptech.cn'
export const root1 = 'http://bisystem.rapipeso.mx'
import store from '../store'
import { getToken } from '@/utils/auth'
export function request({ method, url, data, resType }) {
  return axios({
    method: method,
    baseURL: root1,
    headers: {
      'token': getToken()
    },
    url: url,
    data: method === 'post' ? qs.stringify(objKeySort(data)) : null,
    params: method === 'get' ? objKeySort(data) : null,
    responseType: resType === 'blob' ? 'blob' : 'json'
  })
}

export function request1({ method, url, data, resType }) {
  return axios({
    method: method,
    baseURL: root1,
    headers: {
      'token': getToken()
    },
    url: url,
    data: method === 'post' ? qs.stringify(objKeySort(data)) : null,
    params: method === 'get' ? objKeySort(data) : null,
    responseType: resType === 'blob' ? 'blob' : 'json'
  })
}
axios.interceptors.response.use(
  response => {
    // 接口请求路径
    // const url = response.config.url
    const code = response.status
    if (response.config.responseType == 'blob') {
      return response
    }
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else if (code == 403) {
      if (response.data.msg == '请重新登入') {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      } else {
        if (response.data.msg == 'No Login') {
          return Promise.reject('error')
        } else {
          Notification.error({
            title: response.data.msg
          })
        }
      }
      return Promise.reject('error')
    } else if (!response.data.flag) {
      if (response.data.msg == 'No Login') {
        return Promise.reject('error')
      } else {
        Notification.error({
          title: response.data.msg
        })
      }
    } else {
      return response
    }
  },
  error => {
    if (error.toString().indexOf('403') != -1) {
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      Notification.error({
        title: '登录过期',
        duration: 2000
      })
      return
    }
    try {
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络异常',
          duration: 5000
        })
      }
      return Promise.reject(error)
    }
  }
)
