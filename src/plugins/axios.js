import Vue from 'vue';
import Axios from 'axios';

const guest = Axios.create({
    baseURL: 'http://localhost:88/myapp_api/',
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        'X-API-KEY': 'init1234'
    },
    auth:{
        username: 'admin',
        password: '12345'
    }
});

Vue.prototype.$guest = guest;

export { guest };