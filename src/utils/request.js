import axios from 'axios'
import objKeySort from '../api/config'
import { Notification } from 'element-ui'
import qs from 'qs'
// export const root1 = 'http://bi.szzptech.cn'
export const root1 = 'http://xcxapi.yiwaixiao.net'
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
      'content-type': 'application/json;',
      'token': getToken()
    },
    url: url,
    data: method === 'post' ? data : null,
    params: method === 'get' ? objKeySort(data) : null,
    responseType: resType === 'blob' ? 'blob' : 'json'
  })
}
axios.interceptors.response.use(
  response => {
    // 接口请求路径
    // const url = response.config.url
    console.log(response)
    const code = response.status
    if (response.config.responseType == 'blob') {
      return response.data.data
    }
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else if (code == 200) {
      if (response.data.code == 0) {
        return response.data.data
      } else if (response.data.code == 301) {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      } else {
        Notification.error({
          title: response.data.msg
        })
        return Promise.reject('error')
      }
    } else {
      return Promise.reject('error')

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
