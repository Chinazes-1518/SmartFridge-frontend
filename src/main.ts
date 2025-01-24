import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'
import {genQR} from "@/utils/qr";

import App from './App.vue'
import router from './router'

const app = createApp(App)

const store = createStore({
    state() {
        return {
            showPopup: String,
            currentProduct: Number,
            qrData: String,
            qrGenerated: Boolean
        }
    },
    mutations: {
        async showPopup(state, value) {
            state.showPopup = value['value'];
            if (value['value'] == 'qr_show') {
                state.qrGenerated = false;
                state.qrData = await genQR(state.currentProduct)
                state.qrGenerated = true;
            }
        },
        setCurProd(state, value) {
            state.currentProduct = value['value'];
        },
        setQrGen(state, value) {
            state.qrGenerated = value['value'];
        }
    }
})

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
