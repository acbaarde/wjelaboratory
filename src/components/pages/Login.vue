<template>
    <v-card class="mx-auto" max-width="400" elevation="2">
        <v-card-title class="justify-center"><h3>LOGIN FORM</h3></v-card-title>
        <v-card-text class="justify-center">
            <v-container>
                <v-form @submit.prevent="handleSubmit" v-model="is_valid">
                    <v-text-field label="Username" v-model="username" :rules="usernameRules" outlined dense required></v-text-field>
                    <v-text-field label="Password" v-model="password" outlined dense required
                        @click:append="passwordShow = !passwordShow"
                        :rules="passwordRules" 
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" 
                        :type="passwordShow ? 'text' : 'password'"></v-text-field>
                    <v-btn color="primary" block type="submit" class="mt-5">LOGIN</v-btn>
                </v-form>
            </v-container>
        </v-card-text>
    </v-card>
    
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            is_valid: false,
            username: '',
            usernameRules:[ (v) => !!v || 'Username is required' ],
            password: '',
            passwordRules:[ (v) => !!v || 'Username is required' ],
            passwordShow: false
        }
    },
    methods:{
        async handleSubmit(){
            // const res = this.$guest.post('api/users', {
            //     'username': this.username,
            //     'password': this.password
            // });
            // console.log(res.data);
            // localStorage.setItem('token', res.data.my_key);
            const form_data = new FormData();
            form_data.append('username', this.username);
            form_data.append('password', this.password);

            await this.$guest.post('api/users', form_data)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.my_key);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

</style>