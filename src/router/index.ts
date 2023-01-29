import {createRouter, createWebHistory} from 'vue-router'
import {getRoutes} from "@/api";

const modules = import.meta.glob('../components/admin/views/*/index.vue')

const routes: any = [
    {
        path: '/',
        component: () => import('@/views/index.vue'),
        redirect: 'discovery',
        children: [
            {
                name: 'discovery',
                path: 'discovery',
                component: () => import('@/views/discovery/index.vue'),
            }
            , {
                path: 'movies',
                component: () => import('@/views/movies/index.vue'),
                name: 'movies'
            }, {
                path: 'tv',
                component: () => import('@/views/tv/index.vue'),
                name: 'tv'
            }, {
                path: 'user',
                component: () => import('@/components/layout/Login/index.vue'),
                name: 'user'
            }
        ],
        name: 'index'
    },
    {
        path: '/admin/login',
        name: 'adminLogin',
        component: () => import('@/components/admin/views/login/login.vue')
    }, {
        path: '/admin',
        name: 'admin',

        component: () => import('@/components/admin/index.vue')

    }
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

const whiteList=['/admin/login']


router.beforeEach(async (to,from)=>{

    if(!router.hasRoute(to.name as string)){
        return from.path
    }

    // 要去的地址需要登录不需要
    // 如果不需要直接跳转,如果需要的话本地有没有登录了的token
    // 如果有则直接跳转
    // 如果没有则需要跳转到登录页
    console.log({modules})

    if (to.path.includes('admin')){

        let token=localStorage.getItem('token')
        let user_id=localStorage.getItem('user_id');
        console.log(router.getRoutes())
        // 有没有登录
        if (token && user_id){
            if (router.getRoutes().length<=7){
                let res=await getRoutes()
                router.addRoute({
                    name:'admin',
                    path:'/admin',
                    component:()=>import('../components/admin/index.vue'),
                    redirect:'/admin/index',
                })
                for (let r=0;r<res.length;r++){

                    router.addRoute('admin',{
                        path:res[r].path,
                        name:res[r].name,
                        component:()=>modules[`${res[r].component}`](),
                    });
                }
            }
            if (to.name==='adminLogin'){
                return '/admin/index'
            }
        }else{
            // 说明没有登录
            // 跳到登录页面
            //     return from.path

        }
    }
})


router.afterEach((to, from, failure)=>{
    console.log(router.getRoutes());
})

export default router;