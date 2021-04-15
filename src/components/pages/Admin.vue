<template>
    <v-container>
        <h1 v-if="user">Hi {{user.username}}</h1>
        <h1 v-else>Please login!</h1>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Admin',
    computed: {
        ...mapGetters(['user'])
    }
    
}
</script>

<style scoped>

</style>