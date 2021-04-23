<template>
  <v-app>
    <app-nav v-if="$session.has('jwt')"></app-nav>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Nav from './components/layouts/Nav';

export default {
  name: 'App',
  components: {
    appNav: Nav
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