import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Appointments from './components/pages/Appointments.vue';
import Releasing_form from './components/pages/Appointments/Releasing_form.vue';
import Patient_form from './components/pages/Appointments/Patient_form';
import User_accounts from './components/pages/utilities/User_accounts';
import Data_maintenance from './components/pages/utilities/Data_maintenance';
import Hematology from './components/pages/Reports/Hematology';
import Fecalysis from './components/pages/Reports/Fecalysis';

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
            path: '/appointments/view',
            component: Appointments,
            name: 'Appointments'
        },
        {
            path: '/appointments/releasing',
            component: Releasing_form,
            name: 'Releasing_form'
        },
        {
            path: '/appointments/view/patient',
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
            name: 'Data_maintenance'
        },
        {
            path: '/hematology',
            component: Hematology,
            name: 'Hematology'
        },
        {
            path: '/fecalysis',
            component: Fecalysis,
            name: 'Fecalysis'
        },
    ],
    mode: 'history'
});

export default router;