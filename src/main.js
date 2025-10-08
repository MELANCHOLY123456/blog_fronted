import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/tailwindcss';
import './assets/theme.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDna, faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 注册FontAwesome图标
library.add(faDna, faLaptopCode)

// 创建Vue应用实例
const app = createApp(App)

// 注册全局组件
app.component('font-awesome-icon', FontAwesomeIcon)

// 安装路由插件
app.use(router)

// 挂载应用
app.mount('#app')
