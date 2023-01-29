import { createApp } from 'vue'
import '@/assets/style/less/style.less'
import App from '@/App.vue'
import router from '@/router/index'
import loadComponents from '@/components/modules/loadComponents/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'




const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(loadComponents)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

