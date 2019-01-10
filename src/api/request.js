/**
 * axios 请求接口 
 */

import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: "https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican",
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-type': 'application/json;charset=UTF-8',
    'Accept': 'application/json'
  }
})

// // request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     // 让每个请求携带自定义token 请根据实际情况自行修改
//     config.headers['Authorization'] = getToken()

//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// // response拦截器
// service.interceptors.response.use(
//   response => {
//     return response.data

//   },
//   error => {
//     // 401:需要认证
//     if (error.response.code === 401) {
//       MessageBox.confirm('need login', 'logout', {
//         confirmButtonText: 'login',
//         cancelButtonText: 'cancel',
//         type: 'warning'
//       }).then(() => {
//         store.dispatch('FedLogout').then(() => {
//           location.reload() // 为了重新实例化vue-router对象 避免bug
//         })
//       })
//     } else {
//       Message({
//         message: error.response.data.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//     }
//     return Promise.reject(error)
//   }
// )
export default service
