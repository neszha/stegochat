import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: async () => await import('../views/HomeView.vue')
        },
        {
            path: '/join',
            name: 'join',
            component: async () => await import('../views/JoinView.vue')
        },
        {
            path: '/create',
            name: 'create',
            component: async () => await import('../views/CreateView.vue')
        },
        {
            path: '/chat',
            name: 'chat',
            component: async () => await import('../views/ChatView.vue')
        }
    ]
})

export default router
