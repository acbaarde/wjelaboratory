<template>
    <v-app-bar app color="dark" dark height="40">
      <div class="d-flex align-center">
        <router-link :to="(user ? '/' : '/login')">{{ brand }}</router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn to='/home' v-if="user">
        <span>HOME</span>
      </v-btn>
      <div v-else>
        <v-btn to="/signin" text small>
          <span>Sign In</span>
        </v-btn>
        <v-btn to="/signup" text small>
          <span>Sign Up</span>
        </v-btn>
      </div>
      
      
    </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: "Appbar",
    computed:{
      ...mapGetters(['user'])
    },
    data() {
      return{
        brand: process.env.VUE_APP_APPNAME,
      }
    }
}
</script>

<style scoped>

</style>