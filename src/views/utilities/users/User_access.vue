<template>
<div class="ma-n3">
    <myHeader :title="'Users'" :subtitle="'Manage User Access'" />
    <v-container fluid>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="70"></v-progress-circular>
      </v-overlay>
    <v-card flat outlined>
        <v-container fluid>
            <v-row no-gutters class="d-flex align-center">
              <v-col cols="3" class="mr-2">
                <v-select class="shrink" v-model="id" @change="getUseraccess()" :items="users" item-text="desc" item-value="user_id" dense outlined hide-details></v-select>
              </v-col>
              <v-col cols="auto" class="mr-2">
                <v-btn color="primary" @click="btn_save()">Save</v-btn>
              </v-col>
            </v-row>
            <v-alert v-if="alert_status == false" type="error" outlined text>
                No Records Found!!!
            </v-alert>
            <v-row no-gutters v-if="id != ''">
                <!-- <v-col cols="4" v-for="(mitem, i) in menus" :key="i"> -->
                    <v-card class="ma-2" flat outlined>
                      <v-treeview
                        v-model="selected"
                        dense
                        :items="menus"
                        selection-type="independent"
                        selectable
                        open-all
                      ></v-treeview>
                    </v-card>
                <!-- </v-col> -->
            </v-row>
        </v-container>
    </v-card>
    </v-container>
</div>
</template>

<script>
import myHeader from '../../../components/myHeader.vue'
export default {
    data(){
        return{
            overlay: false,
            alert_status: true,
            users: [],
            menus: [],
            id: '',
            selected: []
        }
    },
    components: { myHeader },
    created(){
      this.getUsers()
    },
    methods: {
      async getUsers(){
        await this.$guest.get('/api/users/getAllUser')
        .then(res => {
          this.users = res.data
          this.users.splice(0,0, { user_id: '', desc: 'Please Select User...' })
          this.loadMenu()
        })
        .catch(err => { console.log(err) })
      },
      async loadMenu(){
        await this.$guest.get('/api/menu/Menu')
        .then(res => {
          this.menus = res.data
        })
        .catch(err => { console.log(err) })
      },
      async getUseraccess(){
        let data = {
          id: this.id,
        }
        await this.$guest.post('/api/menu/getUseraccess', this.$form_data.generate(data))
        .then(res => {
          console.log(res)
          this.selected = res.data
        })
        .catch(err => { console.log(err) })
      },

      // menu(id){
      //   return this.menus.filter(e => e.id == id)
      // },
      async btn_save(){
        this.overlay = true
        let data = {
          id: this.id,
          mod_id: this.selected,
          user_id: this.$session.get('userid-session')
        }
        await this.$guest.post('/api/menu/saveUseraccess', this.$form_data.generate(data))
        .then(res => {
          console.log(res)
          this.getUseraccess()
          this.overlay = false
        })
        .catch(err => { console.log(err) })
      },
    }
}
</script>

<style scoped>
span{
    color: rgb(25, 118, 210);
}
</style>