import Vue from 'vue';
import Axios from 'axios';

const guest = Axios.create({
    baseURL: 'http://localhost/myapp_api/',
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    },
    auth: {
        username: 'admin',
        password: '12345'
    }
});

Vue.prototype.$guest = guest;

export { guest };