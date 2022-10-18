<template>
  <nav>
      <v-app-bar flat app dense>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title>
              <!-- <span>{{ $router.currentRoute.path.split('/')[1].charAt(0).toUpperCase() + $router.currentRoute.path.split('/')[1].slice(1) }}</span> -->
                <!-- <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs> -->
          </v-app-bar-title>
          <v-spacer></v-spacer>
            <v-menu right bottom transition="slide-y-transition" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on">
                        <v-icon left>mdi-account</v-icon>
                        <span>{{ "My Account (" + $session.get('userid-session') + ")" }}</span>
                        <v-icon right>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-card class="mx-auto" max-width="500">
                    <!-- <v-img class="white--text align-end" height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                        <v-card-title>Top 10 Australian beaches</v-card-title>
                    </v-img> -->
                    <v-card-title>
                        <!-- <v-list-item class="px-2">
                            <v-list-item-avatar>
                                <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-title>{{ $session.get('user-session') }}</v-list-item-title>
                        </v-list-item> -->
                       <span>{{ $session.get('user-session') }}</span> 
                    </v-card-title>
                    <v-card-subtitle>
                        <span>{{ $session.get('userposn-session') }}</span></v-card-subtitle>
                    <v-divider></v-divider>
                    <!-- <v-card-text> -->
                        <v-list nav dense>

                            <!-- <v-list-item link>
                                <v-list-item-title>CHANGE PASSWORD</v-list-item-title>
                                <v-list-item-icon right>
                                    <v-icon>mdi-lock-open-outline</v-icon>
                                </v-list-item-icon>
                            </v-list-item> -->

                            <v-dialog v-model="dialog" max-width="500" persistent>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item  v-bind="attrs" v-on="on" link>
                                        <v-list-item-title>CHANGE PASSWORD</v-list-item-title>
                                            <v-list-item-icon right>
                                                <v-icon>mdi-lock-open-outline</v-icon>
                                            </v-list-item-icon>
                                    </v-list-item>
                                </template>
                                <v-card>
                                    <v-card-title class="headline grey lighten-2">UPDATE PASSWORD</v-card-title>
                                    <v-card-text class="text-left text-h6 pa-5">
                                        <v-form ref="form">
                                            <v-text-field v-model="password" dense outlined label="New Password" required :rules="passwordRules" 
                                                @click:append="passwordShow = !passwordShow"
                                                :append-icon="passwordShow ? 'mdi-eye-off' : 'mdi-eye'" 
                                                :type="passwordShow ? 'text' : 'password'"></v-text-field>
                                            <v-text-field v-model="confirmpassword" dense outlined label="Confirm Password" required :rules="confirmpasswordRules" 
                                                @click:append="confirmpasswordShow = !confirmpasswordShow"
                                                :append-icon="confirmpasswordShow ? 'mdi-eye-off' : 'mdi-eye'" 
                                                :type="confirmpasswordShow ? 'text' : 'password'"></v-text-field>
                                        </v-form>
                                        <v-alert v-if="alert_status" dense outlined type="error">Password Mismatch!</v-alert>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" @click="btn_save()">SAVE</v-btn>
                                        <v-btn color="error" @click="btn_close()">CANCEL</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            
                            <v-divider></v-divider>
                            
                            <v-dialog max-width="500" persistent>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item  v-bind="attrs" v-on="on" link>
                                        <v-list-item-title>LOGOUT</v-list-item-title>
                                            <v-list-item-icon right>
                                                <v-icon>mdi-logout</v-icon>
                                            </v-list-item-icon>
                                    </v-list-item>
                                </template>

                                <template v-slot:default="dialog">
                                    <v-card>
                                    <v-card-title class="headline grey lighten-2">LOGOUT</v-card-title>
                                    <v-card-text class="text-left text-h6 pa-5">
                                        Are you sure you want to logout?
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" @click="logout()">Yes</v-btn>
                                        <v-btn color="error" @click="dialog.value = false">No</v-btn>
                                    </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </v-list>
                </v-card>
            </v-menu>
            
        </v-app-bar>


        <v-navigation-drawer v-model="drawer" app>
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img src="../assets/wjelogo.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-title>{{ navigationTitle }}</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item link to='/'>
                    <v-list-item-icon>
                        <v-icon>mdi-home-city-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ dashboard }}</v-list-item-title>
                </v-list-item>
                
                <template v-for="menu in menus">
                    <v-list-group v-if="menu.mod_lvl == 1" :key="menu.id" :prepend-icon="menu.mod_icon" no-action>
                        <template v-slot:activator>
                            <v-list-item-title v-text="menu.mod_title"></v-list-item-title>
                        </template>

                        <template v-for="submenu in menus">
                            <template v-if="submenu.mod_lvl == 2">
                                <v-list-item v-if="menu.id == submenu.mod_parent" :key="submenu.id" :to="submenu.mod_path">
                                    <v-list-item-title>{{submenu.mod_title}}</v-list-item-title>
                                    <v-list-item-icon><v-icon v-text="submenu.mod_icon"></v-icon></v-list-item-icon>
                                </v-list-item>
                            </template>

                            <template v-if="submenu.mod_lvl == 3">
                                <v-list-group v-if="menu.id == submenu.mod_parent" :key="submenu.id" no-action sub-group>
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <v-list-item-title>{{submenu.mod_title}}</v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                    
                                    <template v-for="subsubmenu in menus">
                                        <template v-if="submenu.id == subsubmenu.mod_parent">
                                            <v-list-item :key="subsubmenu.id" link :to="subsubmenu.mod_path">
                                                <v-list-item-title v-text="subsubmenu.mod_title"></v-list-item-title>
                                                <v-list-item-icon>
                                                    <v-icon v-text="subsubmenu.mod_icon"></v-icon>
                                                </v-list-item-icon>
                                            </v-list-item>
                                        </template>
                                    </template>

                                </v-list-group>
                            </template>
                        </template>
                    </v-list-group>
                </template>
            </v-list>
            <v-divider></v-divider>
                <v-list nav dense>
                    <v-dialog max-width="500" persistent>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item v-bind="attrs" v-on="on" link>
                                <v-list-item-icon>
                                    <v-icon>mdi-logout</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title >Logout</v-list-item-title>
                            </v-list-item>
                        </template>

                        <template v-slot:default="dialog">
                            <v-card>
                            <v-card-title class="headline grey lighten-2">LOGOUT</v-card-title>
                            <v-card-text class="text-left text-h6 pa-5">
                                Are you sure you want to logout?
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="logout()">Yes</v-btn>
                                <v-btn color="error" @click="dialog.value = false">No</v-btn>
                            </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-list>
            </v-navigation-drawer>

            <Snackbar :snackbar="snackbar" />
  </nav>
</template>

<script>
import Snackbar from '../components/Snackbar.vue'
export default {
    name: 'Navbar',
    components: { Snackbar },
    data(){
        return{
            // navigationTitle: process.env.VUE_APP_APPNAME,
            snackbar:{
                status: false,
                text: '',
                color: ''
            },
            drawer: true,
            dialog: false,
            alert_status: false,
            mod_menus: [],
            dashboard: "Dashboard",
            passwordShow: false,
            confirmpasswordShow: false,
            password: '',
            confirmpassword: '',
            passwordRules: [v => !!v || 'Password is Required!'],
            confirmpasswordRules: [v => !!v || 'Confirm Password is Required!'],
        }
    },

    created(){
        this.$guest.get('/api/menu/moduleMenu')
        .then(res => {
            this.mod_menus = res.data
        })
        .catch(err => { console.log(err) })
    },

    computed:{
        navigationTitle(){
            let title = this.$session.get('user-session')
            return typeof title.split(" ")[1] == 'undefined' ? "Hi " + title : "Hi " + title.split(" ")[1]
        },
        menus(){
            let user_access = this.$session.get('user-access')
            let usermod = []
            user_access.forEach(el => {
                usermod.push(el.mod_id)
            })
            return this.mod_menus.filter(e => usermod.includes(e.id))
        }
        
    },

    methods: {
      logout(){
        this.$session.destroy();
        this.$router.push({ path: '/login' });
      },
        async btn_save(){
            if(this.$refs.form.validate()){
                if(this.password == this.confirmpassword){
                    let data = {
                        newpassword: this.password,
                        user_id: this.$session.get('userid-session')
                    }
                    await this.$guest.post('/api/users/updatePassword', this.$form_data.generate(data))
                    .then(res => {
                        this.btn_close()
                        this.snackbar.status = true
                        if(res.data == true){
                            this.snackbar.text = 'Password updated successfully!'
                            this.snackbar.color = 'success'
                        }else{
                            this.snackbar.text = 'Error updating password...'
                            this.snackbar.color = 'error'
                        }
                    })
                    .catch(err => { console.log(err) } )
                }else{
                    this.alert_status = true
                    setTimeout(() =>{
                        this.alert_status = false
                        this.$refs.form.reset()
                    },2000)
                }
            }
      },
      btn_close(){
          this.dialog = false
          this.$refs.form.reset()
      }
    },
}
</script>

<style scoped>
</style>