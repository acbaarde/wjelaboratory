<template>
    <h1>ADMIN</h1>    
</template>

<script>
export default {
    name: 'Admin',
    async created(){
        const res = await this.$guest.get('api/users');
        console.log(res);
    }
}
</script>

<style scoped>

</style>