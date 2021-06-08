<template>
    <v-app-bar app dark color="blue"  height="40">
      <v-toolbar-title>MYAPP</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn text small rounded><span>SALES</span></v-btn>
      <v-btn text small rounded><span>PAYROLL</span></v-btn>
      <v-btn text small rounded><span>REPORTS</span></v-btn>
      <v-btn text small rounded><span>UTILITIES</span></v-btn> -->

      <!-- <v-btn v-for="(title, index) in mod_menus" :key="index" text small> -->
        <!-- <span>{{title.menu_title}}</span> -->
      <!-- </v-btn> -->
      <appbar-menu :menu_title='"TEST"' :sub_menus=test />

      <div v-for="(menu, index) in mod_menus" :key="index">
        <appbar-menu :menu_title=menu.menu_title :sub_menus=menu.sub_menu />
      </div>

      <!-- <appbar-menu :btntitle='"REPORTS"' :items=reports /> -->
      
    </v-app-bar>
</template>
<script>
import AppbarMenu from './AppbarMenu';
export default {
    name: "Appbar",
    components:{
      AppbarMenu
    },
    // beforeCreate: function(){
    //   if(!this.$session.exists()){
    //         this.$router.push('/login');
    //     }
    // },
    data() {
      return{
        brand: process.env.VUE_APP_APPNAME,
        test: [
                { menu_title: 'test' },
            ],
        // reports: [
        //   { title: 'Bacteriology', },
        //   { title: 'Hematology', }
        // ],
        mod_menus: []
      }
    },
    created(){
        this.$guest.get('/api/menu/modMenu')
        .then(res => {
            console.log(res.data.menu);
            this.mod_menus = res.data.menu;
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
</script>

<style scoped>

</style>