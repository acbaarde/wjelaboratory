<template>
  <nav>
      <v-app-bar flat app dense>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title>
              <!-- <span>{{ navbartitle }}</span> -->
                <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>

          </v-app-bar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn text>
              <v-icon left>mdi-account</v-icon>
              <span>{{ $session.get('user-session') }}</span>
              <v-icon right>mdi-dots-vertical</v-icon>
          </v-btn> -->

            <v-menu right bottom transition="slide-y-transition" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on">
                        <v-icon left>mdi-account</v-icon>
                        <span>{{ $session.get('user-session') }}</span>
                        <v-icon right>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-card class="mx-auto" max-width="500">
                    <!-- <v-img class="white--text align-end" height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                        <v-card-title>Top 10 Australian beaches</v-card-title>
                    </v-img> -->
                    <v-card-title>
                        <v-list-item class="px-2">
                            <v-list-item-avatar>
                                <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-title>{{ $session.get('user-session') }}</v-list-item-title>
                        </v-list-item>
                    </v-card-title>
                    <v-divider></v-divider>
                    <!-- <v-card-text> -->
                        <v-list nav dense>
                            <v-list-item link>
                                <v-list-item-title>UPDATE PROFILE</v-list-item-title>
                                <v-list-item-icon right>
                                    <v-icon>mdi-account-details-outline</v-icon>
                                </v-list-item-icon>
                            </v-list-item>

                            <v-list-item link>
                                <v-list-item-title>CHANGE PASSWORD</v-list-item-title>
                                <v-list-item-icon right>
                                    <v-icon>mdi-lock-open-outline</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            
                            <v-divider></v-divider>
                            
                            <v-list-item link>
                                <v-dialog max-width="500" persistent>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-list-item-title v-bind="attrs" v-on="on">LOGOUT</v-list-item-title>
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
                                <v-list-item-icon right>
                                    <v-icon>mdi-logout</v-icon>
                                </v-list-item-icon>
                            </v-list-item>

                        </v-list>
                    <!-- </v-card-text> -->

                    <!-- <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="orange" text rounded outlined>
                            <span>Logout</span>
                            <v-icon>mdi-logout</v-icon>
                        </v-btn>
                    </v-card-actions> -->
                </v-card>
            </v-menu>
            
        </v-app-bar>


        <v-navigation-drawer v-model="drawer" permanent app>
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <!-- <v-img src="../../assets/wjelogo.png"></v-img> -->
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

                <!-- <v-list-item link to='/appointments'>
                    <v-list-item-icon>
                        <v-icon>mdi-point-of-sale</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ appointments }}</v-list-item-title>
                </v-list-item> -->

                <v-list-group v-for="(menu,index) in mod_menus" :key="index" :value="false" :prepend-icon="menu.menu_icon" no-action>
                    
                    <template v-slot:activator>
                        <v-list-item-title v-text="menu.menu_title"></v-list-item-title>
                    </template>

                    <v-list-item v-for="(sub_menu,i) in menu.sub_menus" :key="i" router :to="sub_menu.menu_path" link>
                        <v-list-item-title>{{sub_menu.menu_title}}</v-list-item-title>
                        <v-list-item-icon><v-icon v-text="sub_menu.menu_icon"></v-icon></v-list-item-icon>
                    </v-list-item>

                </v-list-group>
            </v-list>

            <v-divider></v-divider>

                <v-list nav dense>
                
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-dialog max-width="500" persistent>
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item-title v-bind="attrs" v-on="on">Logout</v-list-item-title>
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
                    </v-list-item>

                </v-list>
            </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return{
            navigationTitle: process.env.VUE_APP_APPNAME,
            drawer: false,
            mod_menus: [],
            dashboard: "Dashboard",
            // appointments: "Appointments"
        }
    },

    created(){
      this.$guest.get('/api/menu/modMenu')
        .then(res => {
            this.mod_menus = res.data.menu;
            // console.log(this.mod_menus)
        })
        .catch((err) => {
            console.log(err);
        });
    },

    computed:{
        items(){
            const routeItems = []
            const routeArray = this.$route.path.split('/')
            routeArray.forEach(element => {
                if(element != ''){
                    routeItems.push({ text: element[0].toUpperCase() + element.substring(1) })
                }
            })
            return routeItems.length > 0 ? routeItems : [{ text: 'Dashboard' }]
        }  
    },

    methods: {
      logout(){
        this.$session.destroy();
        this.$router.push('/login');
      }
    },
}
</script>

<style>

</style>