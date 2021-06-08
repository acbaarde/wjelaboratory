<template>
    <v-container fluid>
        <v-card class="my-16 mx-auto" max-width="400" elevation="2">
            <v-card-title class="justify-center"><h5>Login Form</h5></v-card-title>
            <v-card-text class="justify-center">
                <v-container>
                    <v-form @submit.prevent="handleSubmit()" v-model="is_valid">
                        <v-text-field label="Username" v-model="username" :rules="usernameRules" outlined dense required></v-text-field>
                        <v-text-field label="Password" v-model="password" outlined dense required
                            @click:append="passwordShow = !passwordShow"
                            :rules="passwordRules" 
                            :append-icon="passwordShow ? 'mdi-eye-off' : 'mdi-eye'" 
                            :type="passwordShow ? 'text' : 'password'"></v-text-field>

                        <v-alert v-if="msg" dense outlined :type="type">{{ msg }}</v-alert>
                        <v-btn color="primary" block type="submit" class="mt-5">Log In</v-btn>
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
        if(this.$session.has('user-session')){
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
                // const form_data = new FormData();
                // form_data.append('username', this.username);
                // form_data.append('password', this.password);
                let data = {
                    username: this.username,
                    password: this.password
                }

                this.$guest.post('/login', this.$form_data.generate(data))
                .then(res => {
                    this.msg = res.data.message;
                    if(res.data.status == true){
                        this.type = 'success';
                        this.$session.start();
                        this.$session.set('user-session', res.data.username);
                        this.$session.set('userid-session', res.data.id);
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
                this.msg = "Fill Required fields!";
                this.type = 'error';
                return false;
            }
        }
    }
}
</script>

<style>

</style>