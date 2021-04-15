import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './routes';
import { guest } from './plugins/axios';
import store from './plugins/vuex';

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    guest,
    store,
    render: h => h(App)
}).$mount('#app');