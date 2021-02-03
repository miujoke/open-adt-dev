import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


export default new Router({
    routes: [

        {path: '/', redirect: '/login'},
        // 登录
        {path: '/login', component: () => import('@/views/Login.vue')},
        // 首页
        {path: '/index', component: () => import('@/views/index/Index.vue')},
        // 美食
        {path: '/cate', component: () => import('@/views/index/Cate.vue')},
        // 电子产品
        {path: '/electronic', component: () => import('@/views/index/Electronic.vue')},
        // 公益
        {path: '/publicService', component: () => import('@/views/index/PublicService.vue')},
        // 旅游
        {path: '/tour', component: () => import('@/views/index/Tour.vue')},

        // 后台
        {path: '/admin', component: () => import('@/views/admin/Admin.vue')},

        {path: '/admin', component: () => import('@/views/admin/Admin.vue'),
            children:[
                {path: '/userM', component: () => import('@/views/admin/UserM.vue')},
                {path: '/publicM', component: () => import('@/views/admin/PublicM.vue')},
                {path: '/mainlyM', component: () => import('@/views/admin/MainlyM.vue')},
                {path: '/cateM', component: () => import('@/views/admin/CateM.vue')},
                {path: '/eleM', component: () => import('@/views/admin/ElectronicM.vue')},
                {path: '/tourM', component: () => import('@/views/admin/TourM.vue')},
                {path: '/indexM', component: () => import('@/views/admin/IndexM.vue')},

            ]

        },

    ]

})
