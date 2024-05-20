
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
// css重置
import "normalize.css"
// css引入
import "./assets/css/index.css"

const app = createApp(App)

app.use(router).use(pinia)

app.mount('#app')
