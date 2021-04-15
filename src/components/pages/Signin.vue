<template>
    <h1 v-if="user">SIGNIN FORM</h1>
    <h1 v-else>NOT LOGGED IN!</h1>   
</template>

<script>
import { mapGetters } from 'vuex'
export default {
     name: 'Signin',
     computed:{
         ...mapGetters(['user'])
     }
}
</script>

<style scoped>

</style>