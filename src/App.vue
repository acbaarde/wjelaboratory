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

};
</script>
