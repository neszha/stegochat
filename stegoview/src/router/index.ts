import { createRouter, createWebHistory } from 'vue-router'
import { haveGuestSession, onlyGuestSession } from '@/middlewares/auth.middleware'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            beforeEnter: onlyGuestSession,
            component: async () => await import('../views/HomeView.vue')
        },
        {
            path: '/join',
            name: 'join',
            beforeEnter: onlyGuestSession,
            component: async () => await import('../views/JoinView.vue')
        },
        {
            path: '/create',
            name: 'create',
            beforeEnter: onlyGuestSession,
            component: async () => await import('../views/CreateView.vue')
        },
        {
            path: '/chat',
            name: 'chat',
            beforeEnter: haveGuestSession,
            component: async () => await import('../views/ChatView.vue')
        }
    ]
})

export default router
