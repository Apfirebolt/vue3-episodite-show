import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ShowDetail from '../views/ShowDetail.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/shows/:id',
        name: 'ShowDetail',
        component: ShowDetail,
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
