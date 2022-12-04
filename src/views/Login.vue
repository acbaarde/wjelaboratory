<template>
    <v-container fluid>
        <v-card class="my-16 mx-auto" max-width="400" elevation="5">
            <v-card-title class="justify-center">
                <div class="text-center mt-2">
                    <v-img src="../assets/wjelogo.png"></v-img>
                    <!-- <h1>WELCOME</h1>
                    <div class="img-src mt-6">
                        <img src="@/assets/ProfileIconFilled.png" />
                    </div> -->
                </div>
            </v-card-title>
            <v-card-text class="text-center">
                <v-container>
                    <v-form @submit.prevent="handleSubmit()" v-model="is_valid">
                        <v-text-field label="Username" v-model="username" :rules="usernameRules" outlined dense required
                        placeholder="Type your username"
                        ></v-text-field>
                        <v-text-field label="Password" v-model="password" outlined dense required
                            placeholder="Type your password"
                            @click:append="passwordShow = !passwordShow"
                            :rules="passwordRules" 
                            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" 
                            :type="passwordShow ? 'text' : 'password'"></v-text-field>

                        <v-alert v-if="msg" dense outlined :type="type">{{ msg }}</v-alert>
                        <v-btn color="primary" block type="submit" class="mt-5">LOG-IN</v-btn>
                    </v-form>
                </v-container>
                <p>Forgot password? Click <strong><u>here!</u></strong></p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'Login',
    beforeCreate: function(){
        if(this.$session.has('user-session')){
            this.$router.push({ path: '/' });
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
                let data = {
                    username: this.username,
                    password: this.password
                }
                this.$guest.post('/login', this.$form_data.generate(data))
                .then(res => {
                    this.msg = res.data.message
                    if(res.data.status == true){
                        let posn = res.data.user_id == 'admin' ? 'admin' : res.data.user_posn
                        let posnid = res.data.user_id == 'admin' ? 'admin' : res.data.user_posn_id
                        this.type = 'success'
                        this.$session.start()
                        this.$session.set('user-session', res.data.fullname)
                        this.$session.set('userid-session', res.data.user_id)
                        this.$session.set('user-access', res.data.user_access)
                        this.$session.set('usertype-session', res.data.user_type)
                        this.$session.set('userposn-session', posn)
                        this.$session.set('userposnid-session', posnid)
                        this.$router.push({ path: '/' })
                    }else{
                        this.type = 'error'
                        setTimeout(() => {
                            this.msg = ''
                            this.password = ''
                        }, 1000)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },

        formValidate(){
            if(this.username && this.password){
                return true
            }else{
                this.msg = "Fill Required fields!"
                this.type = 'error'
                return false
            }
        }
    }
}
</script>

<style scoped>
</style>