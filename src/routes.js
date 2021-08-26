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
            path: '/appointments/patientlists',
            name: 'Patient_lists_form',
            component: () => 
                import ("@/views/appointments/Patient_lists_form.vue")
        },
        {
            path: '/appointments/entries',
            name: 'Entries_form',
            component: () => 
                import ("@/views/appointments/Entries_form.vue"),
        },
        {
            path: '/appointments/entry',
            name: 'Entry_form',
            component: () => 
                import ("@/views/appointments/Entry_form.vue"),
        },
        {
            path: '/employee/employeemaster',
            name: 'Employee_master',
            component: () => 
                import ("@/views/employee/Employee_master.vue"),
        },
        {
            path: '/payroll/computepayroll',
            name: 'Compute_payroll',
            component: () => 
                import ("@/views/payroll/Compute_payroll.vue"),
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
            path: '/generatereports',
            name: 'Generate_reports',
            component: () => 
                import ("@/views/reports/generate_reports.vue"),
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
            path: '/reports/appointments/census',
            name: 'CENSUS',
            component: () => 
                import ("@/views/reports/appointments/Census.vue"),
        },
        {
            path: '/reports/appointments/rebates',
            name: 'Rebates',
            component: () => 
                import ("@/views/reports/appointments/Rebates.vue"),
        },
        {
            path: '/reports/appointments/sales',
            name: 'Sales',
            component: () => 
                import ("@/views/reports/appointments/Sales.vue"),
        },
        {
            path: '/reports/employees/payslip',
            name: 'Employee_payslip',
            component: () => 
                import ("@/views/reports/employees/Employee_payslip.vue"),
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
            path: '/utilities/dm/companyinfo',
            name: 'Company_info',
            component: () => 
                import ("@/views/utilities/datamaintenance/Company_info.vue"),
        },
    ],
    mode: 'history'
});

export default router;