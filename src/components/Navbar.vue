<template>
  <nav>
      <v-app-bar flat app dense>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title>
              <!-- <span>WJE Diagnostic Laboratory</span> -->
                <!-- <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs> -->
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


                            <!-- <v-list-group v-if="menu.id == submenu.mod_parent && submenu.mod_lvl == 3" :key="submenu.id" no-action sub-group>
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>{{submenu.mod_title}}</v-list-item-title>
                                    </v-list-item-content>
                                </template>

                                <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
                                    <v-list-item-title v-text="title"></v-list-item-title>
                                    <v-list-item-icon>
                                        <v-icon v-text="icon"></v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list-group> -->

                        </template>
                    </v-list-group>
                </template>
                

                <!-- <v-list-group v-for="(menu,index) in mod_menus" :key="index" :value="false" :prepend-icon="menu.menu_icon" no-action>
                    <template v-slot:activator>
                        <v-list-item-title v-text="menu.menu_title"></v-list-item-title>
                    </template>

                    <template v-if="menu.menu_code == '0003' ? false : true">
                        <v-list-item v-for="(sub_menu,i) in menu.sub_menus" :key="i" router :to="sub_menu.menu_path">
                            <v-list-item-title>{{sub_menu.menu_title}}</v-list-item-title>
                            <v-list-item-icon><v-icon v-text="sub_menu.menu_icon"></v-icon></v-list-item-icon>
                        </v-list-item>
                    </template>
                    
                    <template v-else>
                        <v-list-group v-for="(sub_menu,i) in menu.sub_menus" :key="i" :value="true" no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>{{sub_menu.menu_title}}</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
                                <v-list-item-title v-text="title"></v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon v-text="icon"></v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list-group>
                    </template>
                
                </v-list-group> -->

                <!-- <v-list-group :value="true" prepend-icon="mdi-account-circle">
                    <template v-slot:activator>
                        <v-list-item-title>Users</v-list-item-title>
                    </template>

                    <v-list-group :value="true" no-action sub-group>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Admin</v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
                            <v-list-item-title v-text="title"></v-list-item-title>
                            <v-list-item-icon>
                                <v-icon v-text="icon"></v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>

                    <v-list-group no-action sub-group>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Actions</v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
                            <v-list-item-title v-text="title"></v-list-item-title>

                            <v-list-item-icon>
                                <v-icon v-text="icon"></v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>

                </v-list-group> -->

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
            admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],

            // navigationTitle: process.env.VUE_APP_APPNAME,
            drawer: true,
            mod_menus: [],
            // menus: [],
            dashboard: "Dashboard",
            // appointments: "Appointments"
        }
    },

    created(){
    //   this.$guest.get('/api/menu/modMenu')
    //     .then(res => {
    //         this.mod_menus = res.data.menu;
    //         console.log(this.mod_menus)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

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
        // items(){
        //     const routeItems = []
        //     const routeArray = this.$route.path.split('/')
        //     routeArray.forEach(element => {
        //         if(element != ''){
        //             routeItems.push({ text: element[0].toUpperCase() + element.substring(1) })
        //         }
        //     })
        //     return routeItems.length > 0 ? routeItems : [{ text: 'Dashboard' }]
        // },
        
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
        this.$router.push('/login');
      }
    },
}
</script>

<style scoped>
/* span{
    color: #212121;
    font-weight: bold;
    font-family: Cambria;
} */
</style>