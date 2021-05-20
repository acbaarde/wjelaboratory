<template>

  <v-app>
    <Navbar v-if="$session.has('user-session')" />
    <v-main>
      
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/layouts/Navbar';
export default {
  name: 'App',
  components: {
    Navbar
  },
  beforeCreate: function(){
    if(!this.$session.exists()){
        this.$router.push('/login');
    }
  },
}
</script>

<style>

</style>