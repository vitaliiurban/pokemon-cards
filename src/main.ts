import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueAwesomePaginate from 'vue-awesome-paginate'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)

app.mount('#app')
