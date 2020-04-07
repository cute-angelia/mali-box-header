/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import request from './request'
import auth from './auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  MessageBox,
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

const { Secure } = require("mali-secure")
const secure = new Secure("cid", "123456", "192006250b4c09247ec02edce69f6a2d")

const apiMap = {
  SsoAuthCheck: '/sso/auth/authcheck',
  SsoLogout: '/sso/auth/logout',
  AppList: '/box/app/getList', // app list
  menuListByPage: '/box/menu/lists', // 菜单列表
}

export function goPost(url, postdata, fsuccess, ferror) {
  const uri = apiMap[url]

  if (uri === undefined) {
    console.log('goPost url', url, apiMap[url])
    ferror({ message: '无此路径' })
    return
  }

  NProgress.start()

  request({
    method: 'POST',
    url: secure.getSign(uri),
    data: postdata
  })
    .then(res => {
      NProgress.done()
      if (res.code === 0) {
        const decryptJson = secure.decrypt(res)
        fsuccess(secure.checkBase64(decryptJson.data), res.msg)
      } else if (res.code === -999) {
        MessageBox.confirm('您已注销，您可以取消停留在此页，或重新登录', '认证过期提醒', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // reset token
          // location.reload()
          window.location.href = localStorage["app_box_url"] + "/#/login"
        }).catch(() => {
          ferror(res)
        })
      } else {
        if (res.code && res.msg) {
          Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        ferror(res)
      }
    })
    .catch(res => {
      NProgress.done()
      if (res.response && (res.response.status === 403 || res.response.status === 500)) {
        const data = {
          code: 403,
          msg: res.response.data.message,
          data: false
        }
        Message({
          message: res.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      if (ferror) {
        ferror(res)
      }
    })
}
