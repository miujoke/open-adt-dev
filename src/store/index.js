import Vue from 'vue'
import VueX from 'vuex'
import tab from './tab.js'

Vue.use(VueX)

export default new VueX.Store({
    state:{
        token:'',
        userInfo:JSON.parse(sessionStorage.getItem("userInfo"))
    },
    mutations:{
      // set
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo)) // session不能存储对象 所以需要序列化
        },
        REMOVE_INFO: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem("token", '')
            sessionStorage.setItem("userInfo", JSON.stringify(''))
        }
    },
    getters:{
      // get
        getUser: state => {
            return state.userInfo
        }

    },
    modules:{
        tab
    }
})