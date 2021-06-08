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

new Vue({
    vuetify,
    router,
    guest,
    // store,
    render: h => h(App)
}).$mount('#app');