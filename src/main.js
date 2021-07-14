import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './routes';
import { guest } from './plugins/axios';
// import store from './plugins/store';
import VueSession from 'vue-session';
// import Print from 'vue-print-nb';
import VueMask from 'v-mask';



// import { BootstrapVue } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

import MyFormData from "./scipts/formdata";

// Vue.use(Print);



Vue.config.productionTip = false;

// Vue.use(BootstrapVue);

Vue.use(VueSession, { persist: true });
Vue.use(MyFormData)
Vue.use(VueMask)

Vue.mixin({
    methods: {
        DateNow(){
          const ddte = new Date()
          const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
          const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
          return day[ddte.getDay()] + ", " + month[ddte.getMonth()] + " " + ddte.getDate() + ", " + ddte.getFullYear()
        },
        formatDate(date){
            if(date == '0000-00-00 00:00:00') return ''
            const d = new Date(date)
            const options = {
              month: "short", day: "numeric", year: "numeric"
            }
            return d.toLocaleDateString("en-us", options)
          },
          formatDateTime(date){
            if(date == '0000-00-00 00:00:00') return ''
            const d = new Date(date)
            const options = {
              month: "short", day: "numeric", year: "numeric",hour: "2-digit", minute: "2-digit"
            }
            return d.toLocaleDateString("en-us", options)
          },
          formatDateYYYYmmdd(){
            let dateNow =  new Date()
            let mm = dateNow.getMonth() < 10 ? '0' + dateNow.getMonth() : dateNow.getMonth()
            let dd = dateNow.getDay() < 10 ? '0' + dateNow.getDay() : dateNow.getDay()
            let yyyy = dateNow.getFullYear()
            return yyyy+"-"+mm+"-"+dd
          },
          formatAge(age,agetype){
            let formatage = ''
            if(age == 1 && agetype == 'mos'){
              formatage = age + " " + 'mo'
            }else if (age == 1 && agetype == 'yrs'){
              formatage = age + " " + 'yr'
            }else{
              formatage = age + " " + agetype
            }
            return formatage
          },
    }
})


new Vue({
    vuetify,
    router,
    guest,
    // store,
    render: h => h(App)
}).$mount('#app');