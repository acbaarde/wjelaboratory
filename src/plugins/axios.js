import Vue from 'vue';
import Axios from 'axios';

var apilink = process.env.NODE_ENV === 'production' ? 'http://' + location.hostname + ':' + location.port + '/myapp_api' : process.env.VUE_APP_APILINK;
console.log(apilink)
const guest = Axios.create({
    baseURL: apilink,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    },
    auth: {
        username: process.env.VUE_APP_API_USERNAME,
        password: process.env.VUE_APP_API_PASSWORD
    }
});

Vue.prototype.$guest = guest;

export { guest };