import {get, post} from '../../axios'

/* 
 * 菜单管理模块
 */
export const findMenuTree = () => {
    return get('/menu/index', {})
}

export const findQuickMenus = () => {
    return get('/menu/findQuickMenus', {})
}

export const findUserQuickMenus = () => {
    return get('/menu/findUserQuickMenus', {})
}

export const saveUserQuickMenus = (params) => {
    return post('/menu/saveUserQuickMenus', params)
}