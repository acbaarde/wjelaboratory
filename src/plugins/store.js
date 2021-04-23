import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {
            firstname: null,
            lastname: null
        }
    },
    mutations: {
        userLogin(state, context){
            state.user = context
        },

        storeUser(state, context){
            state.user = context
        }


        // user(state, user){
        //     state.user = user;
        // }
    },
    actions: {
        userLogin(state, context){
            context.self.$guest.post('/login', context.form_data)
            .then(res => {
                state.commit('userLogin', res.data);
                context.self.$session.start();
                context.self.$session.set('jwt', res.data.access_token);
                context.self.$router.push('/');
            })
            .catch(err => {
                console.log(err);
            });
        },

        storeUser(state, context){
            const form_data = new FormData();
            form_data.append('access_token', context.jwt_token);

            context.self.$guest.post('/user/getUser', form_data)
            .then(res => {
                state.commit('storeUser', res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }

        // user(context, user){
        //     context.commit('user', user);
        // }
    },
    getters: {
        user(state){
            return state.user != null ? state.user : 'NO USER FOUND!';
        }
        // user: (state) => {
        //     return state.user;
        // }
    },
});


export default store;