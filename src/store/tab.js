export default {
    state:{
        menu:[],
        currentMenu:{}
    },
    mutations:{
        selectMenu(state,value){
            // 过滤 掉首页的 显示
            value.name === 'home' ? state.currentMenu = null : state.currentMenu =value
        }
    },
    actions:{}
}