<template>
    <v-container fluid v-if="!user">
        <v-card class="mx-auto" max-width="400" elevation="2">
            <v-card-title class="justify-center"><h3>LOGIN FORM</h3></v-card-title>
            <v-card-text class="justify-center">
                <v-container>
                    <v-form @submit.prevent="handleSubmit()" v-model="is_valid">
                        <v-text-field label="Username" v-model="username" :rules="usernameRules" outlined dense required></v-text-field>
                        <v-text-field label="Password" v-model="password" outlined dense required
                            @click:append="passwordShow = !passwordShow"
                            :rules="passwordRules" 
                            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" 
                            :type="passwordShow ? 'text' : 'password'"></v-text-field>

                        <v-alert v-if="msg" dense outlined :type="type">{{ msg }}</v-alert>
                        <v-btn color="primary" block type="submit" class="mt-5">LOGIN</v-btn>
                    </v-form>

                    
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
    <h1 v-else>LOGIN</h1>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Login',
    computed: {
        ...mapGetters(['user'])
    },
    // created(){
        
    //     if(this.user != ''){
    //         this.$router.push('/');
    //     }
    // },
    data(){
        return {
            is_valid: false,
            username: '',
            usernameRules:[ (v) => !!v || 'Username is required' ],
            password: '',
            passwordRules:[ (v) => !!v || 'Password is required' ],
            passwordShow: false,
            msg: null
        }
    },
    methods:{
        handleSubmit(){
            if(this.formValidate()){
                const form_data = new FormData();
                form_data.append('username', this.username);
                form_data.append('password', this.password);

                this.$guest.post('/login', form_data)
                .then(res => {
                    console.log(res.data);
                    this.msg = res.data.message;
                    if(res.data.status == true){
                        this.type = 'success';
                        localStorage.setItem('token', res.data.access_token);
                        this.$store.dispatch('user', res.data);
                        this.$router.push('/');
                    }else{
                        this.type = 'error';
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },

        formValidate(){
            if(this.username && this.password){
                return true;
            }else{
                this.msg = "Invalid username/password";
                this.type = 'error';
                return false;
            }
        }
    }
}
</script>

<style scoped>

</style>