import {get, post} from '../../axios'

/* 
 * 登录请求
 */
export const requestLogin = (param) => {
    return post('/login/validate', param)
}
export const loginOut = () => {
	return post('/login/loginout')
}
export const sessionTimeout = () => {
	return post('/login/sessionTimeout')
}
