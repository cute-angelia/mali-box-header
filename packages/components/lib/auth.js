import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const InfoKey = 'Admin-Info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getUser() {
  return Cookies.get(InfoKey)
}

export function setUser(infostr) {
  return Cookies.set(InfoKey, infostr)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
