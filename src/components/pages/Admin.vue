<template>
<v-container>
    <h1>ADMIN</h1>
    <v-btn block @click="logout()">
    LOGOUT
  </v-btn>
  </v-container>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
    name: 'Admin',
    beforeCreate: function(){
        if(!this.$session.exists()){
            this.$router.push('/login');
        }
    },
    methods:{
        logout(){
            this.$session.destroy();
            console.log(this.$session.destroy());
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>

</style>