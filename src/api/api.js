import * as apiAuth from './modules/auth'
import * as apiGetData from './modules/getData'
import * as apiSearch from './modules/search'
import * as apiNotice from './modules/notice'
import * as apiUser from './modules/user'
import * as apiWork from './modules/work'
import * as apiStorage from './modules/storage'
import * as apiWareHouse from './modules/warehouse'
import * as apiDelivery from './modules/delivery'

const apiList = {
  auth: { ...apiAuth },
  getData: { ...apiGetData },
  search: { ...apiSearch },
  notice: { ...apiNotice },
  user: { ...apiUser },
  work: { ...apiWork },
  storage: { ...apiStorage },
  warehouse: { ...apiWareHouse },
  delivery: { ...apiDelivery }
}

export default apiList
