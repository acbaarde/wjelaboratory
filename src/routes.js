import Vue from 'vue';
import VueRouter from 'vue-router';

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
            path: '/timekeeping/posting',
            name: 'Posting_form',
            component: () => 
                import ("@/views/timekeeping/Posting_form.vue"),
        },
        {
            path: '/reports/timekeeping/dtrinout',
            name: 'Dtrinout_form',
            component: () => 
                import ("@/views/reports/timekeeping/Dtrinout_form.vue"),
        },
        {
            path: '/reports/timekeeping/manhourprooflist',
            name: 'Manhourprooflist_form',
            component: () => 
                import ("@/views/reports/timekeeping/Manhourprooflist_form.vue"),
        },
        {
            path: '/reports/census',
            name: 'CENSUS',
            component: () => 
                import ("@/views/reports/Census.vue"),
        },
        {
            path: '/reports/rebates',
            name: 'Rebates',
            component: () => 
                import ("@/views/reports/Rebates.vue"),
        },
        {
            path: '/reports/payslip/employeepayslip',
            name: 'Employee_payslip',
            component: () => 
                import ("@/views/reports/payslip/Employee_payslip.vue"),
        },
        {
            path: '/utilities/users/useraccounts',
            name: 'User_accounts',
            component: () => 
                import ("@/views/utilities/users/User_accounts.vue"),
        },
        {
            path: '/utilities/users/useraccess',
            name: 'User_access',
            component: () => 
                import ("@/views/utilities/users/User_access.vue"),
        },
        {
            path: '/utilities/dm/payperiod',
            name: 'Payperiod',
            component: () => 
                import ("@/views/utilities/datamaintenance/Payperiod.vue"),
        },
        {
            path: '/utilities/dm/worksched',
            name: 'Work_schedule',
            component: () => 
                import ("@/views/utilities/datamaintenance/Work_schedule.vue"),
        },
        {
            path: '/utilities/dm/laboratory',
            name: 'Laboratory',
            component: () => 
                import ("@/views/utilities/datamaintenance/Laboratory.vue"),
        },
        {
            path: '/utilities/dm/physicians',
            name: 'Physicians',
            component: () => 
                import ("@/views/utilities/datamaintenance/Physicians.vue"),
        },
        {
            path: '/hematology',
            name: 'hematology',
            component: () => 
                import ("@/views/reports/Hematology.vue"),
        },
        {
            path: '/fecalysis',
            name: 'fecalysis',
            component: () => 
                import ("@/views/reports/Fecalysis.vue"),
        },
        {
            path: '/urinalysis',
            name: 'urinalysis',
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
            name: 'THYROID',
            component: () => 
                import ("@/views/reports/Thyroid.vue"),
        },
        {
            path: '/bloodchem',
            name: 'BLOOD_CHEMISTRY',
            component: () => 
                import ("@/views/reports/Blood_chemistry.vue"),
        },
    ],
    mode: 'history'
});

export default router;