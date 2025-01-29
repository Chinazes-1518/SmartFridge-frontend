// @ts-nocheck

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Index.vue'),
        },
        {
            path: '/products',
            name: 'Products',
            component: () => import('@/views/Products.vue'),
        },
        {
            path: '/buy',
            name: 'BuyList',
            component: () => import('@/views/BuyList.vue'),
        },
        {
            path: '/charts',
            name: 'Charts',
            component: () => import('@/views/Charts.vue'),
        },
    ]
})

export default router
