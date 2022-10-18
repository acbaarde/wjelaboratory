<template>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ $session.get('user-session') }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link to='/'>
          <v-list-item-icon>
            <v-icon>mdi-home-city-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ dashboard }}</v-list-item-title>
        </v-list-item>

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
</template>
<script>
export default {
    name: 'Nav',
    data(){
        return{
            drawer: false,
            mod_menus: [],
            dashboard: "Dashboard"
        }
    },
    computed: {
      // fullname() {
      //   return this.$store.getters.user.firstname + ' ' + this.$store.getters.user.lastname
      // }
    },
    created(){
      // const context = {self: this,jwt_token: this.$session.get('jwt')}
      // this.$store.dispatch('storeUser', context);

      this.$guest.get('/api/menu/modMenu')
        .then(res => {
            this.mod_menus = res.data.menu;
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
      logout(){
        this.$session.destroy();
        this.$router.push({ path: '/login' });
      }
    }
}
</script>

<style>

</style>