import {get, post} from '../../axios'

/**********数据集模块*************/

export const getData = (params) => {
    return get('/custQuery/index', params)
	//后台对应的地址
}