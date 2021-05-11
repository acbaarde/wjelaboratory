import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Appointments from './components/pages/Appointments.vue';
import Patient_form from './components/pages/Appointments/Patient_form';
import User_accounts from './components/pages/utilities/User_accounts';
import Data_maintenance from './components/pages/utilities/Data_maintenance';

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
        },
        {
            path: '/appointments',
            component: Appointments,
            name: 'Appointments'
        },
        {
            path: '/appointments/patient',
            component: Patient_form,
            name: 'Patient_form'
        },
        {
            path: '/utilities/useraccounts',
            component: User_accounts,
            name: 'User_Accounts'
        },
        {
            path: '/utilities/datamaintenance',
            component: Data_maintenance,
            name: 'Data Maintenance'
        },
    ],
    mode: 'history'
});

export default router;