import axios from 'axios'
import ElementUI from 'element-ui'
import router from './router'
import store from  './store'

axios.defaults.baseURL = 'http://localhost:8888'

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
        let res = response.data;
        console.log("==========")
        console.log(res)
        console.log("==========")

        if (res.code === 200) {
            return response // 往下走
        } else {
            ElementUI.Message.error('密码错误', {duration: 2000});
            return Promise.reject(response.data.msg)
        }
    },
    error => {
    console.log(error)
        if (error.response.data){
            error.message = error.response.data.msg
        }
        if (error.response.status === 401){
            // 用户名不存在 则清空全局变量
            store.commit("REMOVE_INFO")
            router.push("/login")
        }else {
            ElementUI.Message.error(error.message, {duration: 2000});
            return Promise.reject(error)
        }
    }
)
