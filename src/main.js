import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './routes';
import { guest } from './plugins/axios';
import VueSession from 'vue-session';
import VueMask from 'v-mask';
import MyFormData from "./scipts/formdata";
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;
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

          print_form(){
            // Get HTML to print from element
            const prtHtml = document.getElementById('print-form').innerHTML;

            // Get all stylesheets HTML
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="prefetch"], style')]) {
                stylesHtml += node.outerHTML;
            }
            // Open the print window
            const WinPrint = window.open();
            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);

            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
          }
    }
})


new Vue({
    vuetify,
    router,
    guest,
    icons: {
      iconfont: 'mdi'
    },
    // store,
    render: h => h(App)
}).$mount('#app');