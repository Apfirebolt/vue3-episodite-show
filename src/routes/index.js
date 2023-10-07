import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ShowDetail from '../views/ShowDetail.vue'
import PiniaExample from '../views/PiniaExample.vue'
import NotFound from '../views/NotFound.vue'
import ComposableExample from '../views/Composable.vue'

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
        path: '/example',
        name: 'PiniaExample',
        component: PiniaExample,
    },
    {
        path: '/composable',
        name: 'ComposableExample',
        component: ComposableExample,
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
