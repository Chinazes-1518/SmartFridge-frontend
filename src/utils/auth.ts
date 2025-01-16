// import { ref } from 'vue';
// import { APIRequest } from "@/utils/http";
//
// export function auth() {
//     const isAuth = ref( false )
//
//     const userData = ref({
//         id: 0,
//         username: ''
//     })
//
//     const  resData = APIRequest("/user/login", "POST")
//     userData.value = {
//         id: resData.json.id,
//         username: resData.json.username
//     }
// }