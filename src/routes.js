import Vue from 'vue';
import VueRouter from 'vue-router';
// import Login from './components/pages/Login';
// import Dashboard from './components/pages/Dashboard';
// import Appointments from './components/pages/Appointments.vue';
// import Releasing_form from './components/pages/Appointments/Releasing_form.vue';
// import Patient_form from './components/pages/Appointments/Patient_form';
// import User_accounts from './components/pages/utilities/User_accounts';
// import Data_maintenance from './components/pages/utilities/Data_maintenance';
// import Hematology from './components/pages/Reports/Hematology';
// import Fecalysis from './components/pages/Reports/Fecalysis';
// import Urinalysis from './components/pages/Reports/Urinalysis';
// import KOH from './components/pages/Reports/KOH';
// import HGSAG from './components/pages/Reports/HGSAG';
// import RBS from './components/pages/Reports/RBS';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'Dashboard',
            component: () =>
                import ("@/views/Dashboard.vue"),
        },
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ("@/views/Login.vue"),
        },
        {
            path: '/appointments/view',
            name: 'Appointments',
            component: () => 
                import ("@/views/Appointments.vue")
        },
        {
            path: '/appointments/releasing',
            name: 'Releasing_form',
            component: () => 
                import ("@/views/appointments/Releasing_form.vue"),
        },
        {
            path: '/appointments/view/patient',
            name: 'Patient_form',
            component: () => 
                import ("@/views/appointments/Patient_form.vue"),
        },
        {
            path: '/employee/employeemaster',
            name: 'Employee_master',
            component: () => 
                import ("@/views/employee/Employee_master.vue"),
        },
        {
            path: '/timekeeping/view',
            name: 'Viewing',
            component: () => 
                import ("@/views/timekeeping/Viewing.vue"),
        },
        {
            path: '/timekeeping/view/employee',
            name: 'Timekeeping_form',
            component: () => 
                import ("@/views/timekeeping/Timekeeping_form.vue"),
        },
        {
            path: '/timekeeping/processing',
            name: 'Processing_form',
            component: () => 
                import ("@/views/timekeeping/Processing_form.vue"),
        },
        {
            path: '/utilities/useraccounts',
            name: 'User_Accounts',
            component: () => 
                import ("@/views/utilities/User_accounts.vue"),
        },
        {
            path: '/utilities/datamaintenance',
            name: 'Data_maintenance',
            component: () => 
                import ("@/views/utilities/Data_maintenance.vue"),
        },
        {
            path: '/hematology',
            name: 'Hematology',
            component: () => 
                import ("@/views/reports/Hematology.vue"),
        },
        {
            path: '/fecalysis',
            name: 'Fecalysis',
            component: () => 
                import ("@/views/reports/Fecalysis.vue"),
        },
        {
            path: '/urinalysis',
            name: 'Urinalysis',
            component: () => 
                import ("@/views/reports/Urinalysis.vue"),
        },
        {
            path: '/koh',
            name: 'KOH',
            component: () => 
                import ("@/views/reports/KOH.vue"),
        },
        {
            path: '/hgsag',
            name: 'HGSAG',
            component: () => 
                import ("@/views/reports/HGSAG.vue"),
        },
        {
            path: '/rbs',
            name: 'RBS',
            component: () => 
                import ("@/views/reports/RBS.vue"),
        },
        {
            path: '/thyroid',
            name: 'Thyroid',
            component: () => 
                import ("@/views/reports/Thyroid.vue"),
        },
        {
            path: '/bloodchem',
            name: 'Blood_chemistry',
            component: () => 
                import ("@/views/reports/Blood_chemistry.vue"),
        },
    ],
    mode: 'history'
});

export default router;