<template>
<div class="ma-n3">
    <myHeader :title="'Users'" :subtitle="'Manage User Access'" />
    <v-container fluid>
      <Overlay :value="overlay.value" />
    <v-card flat outlined>
        <v-container fluid>
            <v-row no-gutters class="d-flex align-center">
              <v-col cols="3" class="mr-2">
                <v-select class="shrink" v-model="id" @change="getUseraccess()" :items="users" item-text="desc" item-value="user_id" dense outlined hide-details></v-select>
              </v-col>
              <v-col cols="auto" class="mr-2">
                <v-btn :disabled="id == ''" color="primary" @click="btn_save()">Save</v-btn>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-alert v-if="alert.status" :type="alert.type" outlined text>
                    {{ alert.text }}
                </v-alert>
              </v-col>
            </v-row>
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
import Overlay from '../../../components/Overlay.vue'
export default {
    data(){
        return{
            overlay: {
              value: false
            },
            alert: {
              status: false,
              type: '',
              text: ''
            },
            users: [],
            menus: [],
            id: '',
            selected: []
        }
    },
    components: { myHeader,Overlay },
    created(){
      this.getUsers()
    },
    methods: {
      async getUsers(){
        this.overlay.value = true
        await this.$guest.get('/api/users/getAllUser')
        .then(res => {
          this.overlay.value = false
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
          this.selected = res.data
        })
        .catch(err => { console.log(err) })
      },

      // menu(id){
      //   return this.menus.filter(e => e.id == id)
      // },
      async btn_save(){
        this.overlay.value = true
        let data = {
          id: this.id,
          mod_id: this.selected,
          user_id: this.$session.get('userid-session')
        }
        await this.$guest.post('/api/menu/saveUseraccess', this.$form_data.generate(data))
        .then(res => {
          if(res.data){
            this.alert.status = true
            this.alert.type = 'success'
            this.alert.text = "Update records successful!"
          }
          this.getUseraccess()
          this.overlay.value = false

          setTimeout(() => {
            this.alert.status = false
          }, 3000)
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