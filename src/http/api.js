/******************** 数据模块 ********************/
import * as dataContents from '~/http/moudules/dataMenu/dataContents.js'
import * as dataInterface from '~/http/moudules/dataMenu/dataInterface.js'
import * as dataMap from '~/http/moudules/dataMenu/dataMap.js'
import * as dataSet from '~/http/moudules/dataMenu/dataSet.js'

/**
 * 接口统一集成模块
 */
import * as menu from '~/http/moudules/common/menu'
import * as orgTree from '~/http/moudules/common/orgTree'

/******************** 系统中心 ********************/

import * as homepage from '~/http/moudules/systemManage/homepage.js'
import * as login from '~/http/moudules/systemManage/login.js'






export default {
	dataContents,
	dataInterface,
	dataMap,
	dataSet,
	menu,
	orgTree,
	homepage,
	login


}