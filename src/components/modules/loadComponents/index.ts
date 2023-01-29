import {App, createVNode, Directive, render} from "vue";
import loadingBar from '@/components/MLoading/index.vue'
import router from "@/router";


// vue插件
// 可以导出一个对像和函数,如果是对象的话需要install函数
export  default {
    install(app:App){
        //可以挂一个全局组件在app上
        // 挂载全局的$translate() 方法
        console.log('加载插件')
        // 这个仅仅是注册不是渲染
        // app.component('loading',loading)
        const node = createVNode(loadingBar)
        render(node, document.body)
        router.beforeEach(()=>{
            node.component?.exposed?.startLoading()
        })
        router.afterEach(()=>{
            node.component?.exposed?.endLoading()
        })

        // 批量注册组件
        const modules = import.meta.glob('../*/*.ts',)
        for (const path in modules) {
            modules[path]().then((mod: any) => {
                let temp=path.split('/')
                temp.pop()
                console.log(temp.pop(),mod)
                app.use(mod.default)
            })
        }
    }
}