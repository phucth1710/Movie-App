import { createRouter, createWebHistory } from 'vue-router'
import AllMovieView from '../views/AllMovieView.vue'
import LoginView from '../views/LoginView.vue'
import AddMovieView from '../views/AddMovieView.vue'
import AboutView from '../views/AboutView.vue'
import MyRatedMovies from '../views/MyRatedMovies.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AllMovieView,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/add-movie',
            name: 'add-movie',
            component: AddMovieView,
        },
        {
            path: '/my-movies',
            name: 'my-movies',
            component: MyRatedMovies,
        },
    ],
})

export default router
