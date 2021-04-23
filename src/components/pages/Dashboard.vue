<template>
  <h1>DASHBOARD</h1>
</template>

<script>
export default {
    name: 'Dashboard',

    beforeCreate: function(){
        if(!this.$session.has('jwt')){
            this.$router.push('/login');
        }
    },
    created(){
    const context = {
        self: this,
        jwt_token: this.$session.get('jwt') 
    }
    this.$store.dispatch('storeUser', context);
  }
}
</script>

<style scoped>

</style>