import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/tailwindcss';
import './assets/theme.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDna, faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faDna, faLaptopCode)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
