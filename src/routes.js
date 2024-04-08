import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Categories from './components/Categories.vue'
import Management from './components/UserManagement.vue'
import Post from './components/Post.vue'
import MentorsDetail from './components/MentorsDetail.vue'
import ApprovedMentors from './components/ApprovedMentors.vue'
import DeclinedMentors from './components/DeclinedMentors.vue'
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
    },
    {
        name: 'CreatePost',
        component:Post,
        path:'/post',
    },
    {
        name: 'MentorsDetail',
        component:MentorsDetail,
        path:'/mentors-detail',
    },
    {
        name:'ApprovedMentors',
        component: ApprovedMentors,
        path:'/approved-mentors',
    },
    {
        name:'DeclinedMentors',
        component: DeclinedMentors,
        path:'/declined-mentors',
    },
]
const router=createRouter({
    history: createWebHistory(),
    routes
})

export default router