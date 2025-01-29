import { createStore } from 'vuex'
import { genQR } from "@/utils/qr";

export const store = createStore({
    state() {
        return {
            showPopup: '',
            currentProduct: -1,
            qrData: '',
            qrGenerated: false
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