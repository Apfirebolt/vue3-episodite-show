import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Episodes from '../views/Episodes.vue'
import EpisodeDetails from '../views/EpisodeDetail.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/episodes',
        name: 'Episodes',
        component: Episodes
    },
    {
        path: '/episodes/:id',
        name: 'EpisodeDetails',
        component: EpisodeDetails,
        props: true
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
