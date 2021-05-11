import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './routes';
import { guest } from './plugins/axios';
// import store from './plugins/store';
import VueSession from 'vue-session';

Vue.config.productionTip = false;

Vue.use(VueSession);

new Vue({
    vuetify,
    router,
    guest,
    // store,
    render: h => h(App)
}).$mount('#app');