<template>
    <v-container v-if="user">
        <h1>HOME {{user.username}}</h1>
    </v-container>
    <v-container v-else>
        <h1>HOME PLEASE LOGIN</h1>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Home',
    computed: {
        ...mapGetters(['user'])
        // this.user = this.$store.getters.user
    }
    
}
</script>

<style scoped>

</style>