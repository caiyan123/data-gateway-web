import {get} from '../../axios'

/* 
 * 机构数
 */
export const findOrgTree = (param) => {
    return get('/orgTree/query', param)
}