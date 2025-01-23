import { ref } from 'vue';
import {defineStore} from "pinia";


import { APIRequest } from "@/utils/http";
import router from "@/router";
import VueCookie from "vue-cookies";

export const authStore = defineStore("auth", () => {
    const isAuth = ref( false )

    const user = ref({
        id: 0,
        name: '',
        login: ''
    })

    const prepareStore = async () => {
        if (VueCookie.get('authToken')) {
            const data = await APIRequest("/auth/verify", "GET", {
                token: VueCookie.get('authToken')
            })

            if (data.status === 200) {
                user.value = {
                    id: data.json.id,
                    name: data.json.name,
                    login: data.json.login
                }
                isAuth.value = true
            } else {
                console.log(data.json.detail.error)
            }
        }
    }

    const logout = () => {
        VueCookie.remove('authToken');
        isAuth.value = false
        user.value = {
            id: 0,
            name: '',
            login: ''
        }
        router.push("/")
    }

    prepareStore()
    return { isAuth, user, logout, prepareStore }
})

