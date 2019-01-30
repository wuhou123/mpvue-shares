import config from '../config'
const host = config.host
import { GET, POST} from '../utils'
export default class AllApi {
  //demo api
  static demo (params){
    const url = `${host}/demo.do`
    return POST(url,params)
  } 
}