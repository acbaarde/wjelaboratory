import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new VueRouter({
    routes: [{
            path: '/',
            component: Dashboard,
            name: 'Dashboard'
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