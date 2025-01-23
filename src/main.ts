import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const store = createStore({
    state() {
        return {
            showQRPopup: false
        }
    },
    mutations: {
        doShowQRPopup(state, value) {
            state.showQRPopup = value['value'];
        }
    }
})

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
