<template>
    <v-app-bar app color="dark" dark height="40">
      <div class="d-flex align-center">
        <router-link :to="(loggedIn ? '/' : '/signin')">{{ brand }}</router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/signin" v-if="!loggedIn" text small>
        <span>Sign In</span>
      </v-btn>
      <v-btn to="/signup" v-if="!loggedIn" text small>
        <span>Sign Up</span>
      </v-btn>
      <v-btn to="/" v-else>
        <span>Admin</span>
      </v-btn>
    </v-app-bar>
</template>
<script>
export default {
    name: "Appbar",
    props: ['loggedIn'],
    data() {
      return{
        brand: process.env.VUE_APP_APPNAME,
      }
    },
    components:{
    }
}
</script>

<style scoped>

</style>