import Vue from 'vue';
import VueRouter from 'vue-router';
import Admin from './components/pages/Admin';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/',
            component: Admin,
            name: 'Admin'
        },
        {
            path: '/signin',
            component: Signin,
            name: 'Signin'
        },
        {
            path: '/signup',
            component: Signup,
            name: 'Signup'
        },
        {
            path: '/login',
            component: Login,
            name: 'Login'
        }
    ],
    mode: 'history'
});

export default router;