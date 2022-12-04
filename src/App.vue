<template>

  <v-app>
    <Navbar v-if="$session.has('user-session')" :key="$route.fullPath"/>
    <v-main>
      
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar
  },
  beforeCreate: function(){
    if(!this.$session.exists()){
        this.$router.push({ path: '/login' });
    }
  },
}
</script>

<style>

</style>