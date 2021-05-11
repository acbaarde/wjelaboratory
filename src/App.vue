<template>

  <v-app>
    
  
      <!-- <app-nav v-if="$session.has('user-session')"></app-nav> -->
    
    <Navbar v-if="$session.has('user-session')"/>
    <v-main>
      
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import Nav from './components/layouts/Nav';
import Navbar from './components/layouts/Navbar';
export default {
  name: 'App',
  components: {
    // appNav: Nav,
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