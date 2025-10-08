import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/theme.css'

// 注册FontAwesome图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDna, faLaptopCode, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faDna, faLaptopCode, faPlus)

// 创建Vue应用实例
const app = createApp(App)

// 注册全局组件
app.component('font-awesome-icon', FontAwesomeIcon)

// 安装路由插件
app.use(router)

// 挂载应用
app.mount('#app')
