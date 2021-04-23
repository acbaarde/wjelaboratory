<template>
    <v-container fluid>
        <v-card class="my-16 mx-auto" max-width="400" elevation="2">
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
</template>

<script>
export default {
    name: 'Login',
    beforeCreate: function(){
        if(this.$session.has('jwt')){
            this.$router.push('/');
        }
    }, 
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
                
                const context = {
                    self: this,
                    form_data: form_data
                }
                this.$store.dispatch('userLogin', context);                          

                // this.$guest.post('/login', form_data)
                // .then(res => {
                //     this.msg = res.data.message;
                //     if(res.data.status == true){
                //         this.type = 'success';
                //         // localStorage.setItem('token', res.data.access_token);
                //         this.$store.dispatch('user', res.data);
                //         console.log(res.data.access_token);
                //         this.$session.start();
                //         this.$session.set('jwt', res.data.access_token);
                //         this.$router.push('/');
                //     }else{
                //         this.type = 'error';
                //     }
                // })
                // .catch(err => {
                //     console.log(err);
                // })
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

<style>

</style>