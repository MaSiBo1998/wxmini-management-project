// import request from '@/utils/request'
import { request1, request2, request3 } from '@/utils/request'

export function initData(url, params, method = 'post') {
  const s = url.split('/')
  // let api
  if (s[0] === 'api2') {
    // const url = url.replace(s[0], '')
    return request2({
      url: url.replace(s[0], ''),
      method,
      data: params
    })
  } else if (s[0] === 'api3') {
    return request3({
      url: url.replace(s[0], ''),
      method,
      data: params
    })
  } else {
    return request1({
      url,
      method,
      data: params
    })
  }
}
// front/putin/pointDataToExcel
export function download(url, data, exportType, dayOrMonth) {
  return request1({
    url,
    method: 'post',
    data: {
      exportType: exportType,
      dayOrMonth: dayOrMonth,
      jsonParam: JSON.stringify(data)
    },
    resType: 'blob'
  })
}

