import {get, post} from '../../axios'

/**********数据目录模块*************/

export const getData = (params) => {
    return get('/XXX/index', params)
	//后台对应的地址
}
