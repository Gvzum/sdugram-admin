import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Categories from './components/Categories.vue'
import Management from './components/UserManagement.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes =[
    {
        name: 'Home',
        component:Home,
        path:'/home',
        meta: {
            requiresAuth: true,
          },
    },
    {
        name: 'LoginForm',
        component:Login,
        path:'/',

    },
    {
        name: 'CategoriesPage',
        component:Categories,
        path:'/categories',

    },
    {
        name: 'UserManagement',
        component:Management,
        path:'/management',

    }
]
const router=createRouter({
    history: createWebHistory(),
    routes
})

export default router