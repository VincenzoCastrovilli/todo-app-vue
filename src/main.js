import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
})

createApp(App).use(store).use(router).mount('#app')
