// import axios from "axios"
// import {API_URL} from "@utils/url/Constants.js" 

// export const getAxiosInstance = () => {

//      const instance = axios.create({
//         baseURL: `${API_URL}`,
//         timeout: 10000,
//         params: {} 
//     });

//     instance.interceptors.request.use(function (config) {

//         let basicAuthHeader = 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbjI4bWludXRlcyIsImV4cCI6MTYzOTgzMTk0MywiaWF0IjoxNjM5MjI3MTQzfQ.k_KrkWzB50PAlgzpGTCKEKiCD2ATETDVuKtaojVMk2_T9y7UaF_U1D_u0nX7SHjOXys4e5_Kf8505HqQWlTh_A"
    
//         config.headers.authorization = basicAuthHeader
    
//          return config;
    
//      }, function (error) {
//          // Do something with request error
//          return Promise.reject(error)
//      })

//     return instance;

// }


