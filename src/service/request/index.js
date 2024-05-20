import axios from 'axios'
import useMainStore from '@/stores/storeModules/main'
import { BASE_URL, TIMEOUT } from './config'

const mainStore = useMainStore()
class HYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
      // headers: {
      //   "Content-Type": "application/json;charset=UTF-8",
      //   //"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      // }
    })

    this.instance.interceptors.request.use(
      (config) => {
        mainStore.isLoading = true
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const status = res
        switch(status) {
          case 500: 
            console.log('服务器500')
            break;
          case 404:
            console.log('请确定url是否正确')
            break
          case 400:
            console.log('请确定请求参数')
            break 
          case 302:
            console.log('302----')
            break
          default:
            break
        }
        mainStore.isLoading = false
        return res
      },
      (err) => {
        mainStore.isLoading = false
        return err
      }
    )
  }

  request(config) {
    // mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
          // mainStore.isLoading = false
        })
        .catch((err) => {
          reject(err)
          // mainStore.isLoading = false
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }

  put(config) {
    return this.request({ ...config, method: 'put' })
  }
  
}

export default new HYRequest(BASE_URL, TIMEOUT)
