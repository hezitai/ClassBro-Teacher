import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getSession(key) {
    return window.sessionStorage.getItem(key)
}
export function setSession(key, value) {
    return window.sessionStorage.setItem(key, value)
}
export function removeSession(key) {
    return window.sessionStorage.removeItem(key)
}

export function getLocal(key) {
    const val = window.localStorage.getItem(key)
    if (typeof val === 'string') {
        return JSON.parse(val)
    } else {
        return val
    }
}
export function setLocal(key, value) {
    return window.localStorage.setItem(key, value)
}
export function removeLocal(key) {
    return window.localStorage.removeItem(key)
}
export function getCookie(name) {
    var arr; var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) { return (arr[2]) } else { return null }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 删除cookie
export function delCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = getCookie(name)
    if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
}

