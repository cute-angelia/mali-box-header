// todo 配置三个地址
// SY_APPLICATION_ENV
// SY_APPLICATION_API_URL
// SY_APPLICATION_BOX_URL

import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'

// 获取环境变量
var env = localStorage['app_env']

var getEnv = function (name) {
  var req = new XMLHttpRequest()
  req.open('GET', window.location.href, false)
  req.send(null)
  var env = req.getResponseHeader(name)
  return env && env.toLowerCase()
}

if (env.length <= 0) {
  env = localStorage['app_env'] = getEnv('SY_APPLICATION_ENV') || 'local'
}

var baseUrl = localStorage['app_box_api_url'] = getEnv('SY_APPLICATION_BOX_API_URL') || 'http://127.0.0.1:8004'

localStorage['app_box_url'] = getEnv('SY_APPLICATION_BOX_URL') || 'http://box.test.com:8700'

localStorage['app_login_url'] = getEnv('SY_APPLICATION_LOGIN_URL') || ''

// switch (env) {
//   case 'local':
//   case 'dev':
//     baseUrl = 'http://127.0.0.1:8004'
//     break
//   case 'prerelease':
//     baseUrl = 'http://pre-qiming-api-manage.bestmali.cn'
//     break
//   case 'master':
//     baseUrl = '' // todo
//     break
//   default:
//     baseUrl = 'http://127.0.0.1:8004' // todo
//     break
// }
// 获取环境变量 end

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  transformRequest: [
    function (data) {
      let ret = ''
      for (const it in data) {
        ret +=
          encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret.substr(0, ret.length - 1)
    }
  ]

})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Authorization'] = 'Bearer ' + getToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
