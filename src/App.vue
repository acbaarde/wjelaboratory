<template>
  <v-app>
    <app-nav></app-nav>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/layouts/Appbar.vue';

export default {
  name: 'App',
  components: {
    appNav: AppBar
  },
  beforeCreate: function(){
    if(!this.$session.exists()){
            this.$router.push('/login');
        }
  },
  created(){
        // const form_data = new FormData();
        // form_data.append('access_token', localStorage.getItem('token'));

        // this.$guest.post('/api/users/getUser', form_data)
        // .then(res => {
        //     // console.log(res.data);
        //     this.$store.dispatch('user', res.data);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

        this.$guest.get('/conn')
        .then(res => {
          console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

};
</script>

<style>

</style>