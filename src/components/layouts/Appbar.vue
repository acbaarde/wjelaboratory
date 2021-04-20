<template>
    <v-app-bar app dark color="blue"  height="40">
      <v-toolbar-title>MYAPP</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn text small rounded><span>SALES</span></v-btn>
      <v-btn text small rounded><span>PAYROLL</span></v-btn>
      <v-btn text small rounded><span>REPORTS</span></v-btn>
      <v-btn text small rounded><span>UTILITIES</span></v-btn> -->

      <v-btn v-for="(title, index) in mod_titles" :key="index" text small rounded>
        <span>{{title.mod_name1}}</span>
      </v-btn>

      <appbar-menu :btntitle='"REPORTS"' :items=reports />
      <appbar-menu :btntitle='"UTILITIES"' :items=utilities />
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
        utilities: [
                { title: 'User Account' },
            ],
        reports: [
          { title: 'Bacteriology', },
          { title: 'Hematology', }
        ],
        mod_titles: []
      }
    },
    created(){
        this.$guest.get('/api/menu/getAllModule')
        .then(res => {
            console.log(res.data);
            this.mod_titles = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
</script>

<style scoped>

</style>