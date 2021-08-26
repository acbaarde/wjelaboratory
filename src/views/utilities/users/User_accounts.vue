<template>
<div class="ma-n3">
    <myHeader :title="'Users'" :subtitle="'Manage User Accounts'" />
    <v-container fluid>
<v-card flat outlined>
    <v-flex md12 class="ma-2">
      <Overlay :value="overlay.value" />
      <v-data-table disable-sort :headers="table_headers" :items="table_items" :items-per-page="15" :search="search" outlined dense flat max-width="300px" :loading="loading" loading-text ="Loading... Please wait">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
            <v-btn class="ml-2" color="primary" dark @click="dialog = !dialog">Add User</v-btn>
          </v-toolbar>
        </template>

        <template v-slot:[`item.active`]={item}>
          {{ item.active == 'Y' ? 'ACTIVE' : 'INACTIVE' }}
        </template>
        <template v-slot:[`item.created_at`]={item}>
          {{ formatDateTime(item.created_at) }}
        </template>
        <template v-slot:[`item.last_login`]={item}>
          {{ formatDateTime(item.last_login) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn dense x-small @click="btn_update(item)" color="primary">UPDATE</v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-4">
            <v-form ref="form">
              <v-container>
                <v-row dense>
                  <v-col>
                    <!-- <v-select :disabled="disabled" v-model="active_item.user_id" :items="options" item-text="desc" item-value="id" outlined dense label="Select User..."></v-select> -->
                    <v-text-field :disabled="disabled" v-model="active_item.user_id" outlined dense required label="Username" type="username" :rules="user_idRules"></v-text-field>
                    <v-text-field v-model="active_item.fullname" outlined dense required label="Fullname" type="fullname" :rules="fullnameRules"></v-text-field>
                    <v-row dense no-gutters>
                      <v-col cols="6" class="pr-2">
                        <v-text-field v-model="active_item.password" clearable outlined dense required label="Password" type="password" :rules="passwordRules"></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="active_item.confirmpassword" clearable outlined dense required label="Confirm Password" type="password" :rules="confirmpasswordRules"></v-text-field>
                      </v-col>
                    </v-row>
                    
                    <v-row dense no-gutters>
                      <v-col cols="6" class="pr-2">
                        <v-select v-model="active_item.user_type" :items="options_type" item-text="desc" item-value="id" outlined dense label="Type" :rules="user_typeRules"></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-select v-model="active_item.active" :items="options_status" item-text="desc" item-value="id" outlined dense label="Status" :rules="activeRules"></v-select>
                      </v-col>
                    </v-row>

                  </v-col>
                </v-row>
                <v-alert v-if="msg" dense outlined :type="type">{{ msg }}</v-alert>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" @click="btn_save()">Save</v-btn>
            <v-btn outlined color="error" @click="btn_cancel()">Cancel</v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog>
    </v-flex>
    
  <!-- </v-row> -->
  </v-card>

  <Snackbar :snackbar="snackbar" />
  </v-container>
  </div>
</template>

<script>
import myHeader from '../../../components/myHeader.vue'
import Overlay from '../../../components/Overlay.vue'
import Snackbar from '../../../components/Snackbar.vue'
export default {
    name: 'User_accounts',
    components: { myHeader,Overlay,Snackbar },
    data(){
      return{
        search: '',
        dialog: false,
        overlay: {
          value: false
        },
        snackbar: {
          status: false,
          text: '',
          color: ''
        },
        disabled: false,
        loading: true,
        type: '',
        msg: '',
        user_idRules: [ v => !!v || 'Username is required' ],
        fullnameRules: [ v => !!v || 'Fullname is required' ],
        activeRules: [ v => !!v || 'Status is required' ],
        user_typeRules: [ v => !!v || 'User Type is required' ],
        passwordRules: [ v => !!v || 'Password is required' ],
        confirmpasswordRules: [ v => !!v || 'Confirm password is required' ],

        table_headers: [
          { text: 'Username', align: 'center', value: 'user_id' },
          { text: 'Fullname', align: 'center', value: 'fullname' },
          { text: 'Status', align: 'center', value: 'active' },
          { text: 'Type', align: 'center', value: 'user_type' },
          { text: 'Last login', align: 'center', value: 'last_login' },
          { text: 'Created at', align: 'center', value: 'created_at' },
          { text: 'Actions', align: 'center', value: 'actions' },
        ],
        table_items: [],
        options: [],
        options_type: [
          { id: 'ADMIN', desc: 'ADMIN' },
          { id: 'USERS', desc: 'USERS' }
        ],
        options_status: [
          { id: 'Y', desc: 'ACTIVE' },
          { id: 'N', desc: 'INACTIVE' }
        ],
        itemIndex: -1,
        active_item: {
          user_id: '', 
          password: '', 
          confirmpassword: '',
          user_type: 'USERS', 
          fullname: '',
          active: 'Y'
        },
        default_active_item: {
          user_id: '', 
          password: '', 
          confirmpassword: '', 
          user_type: 'USERS',
          fullname: '',
          active: 'Y'
        },
      }
    },

    beforeCreate: function(){
        if(!this.$session.has('user-session')){
            this.$router.push('/login');
        }
        let user_access = this.$session.get('user-access')
        let cpath = this.$route.path
        let modpath = []
        user_access.forEach(el => {
          modpath.push(el.mod_path)
        })
        if(modpath.indexOf(cpath) == -1){
          this.$router.push('/')
        }
    },
    computed:{
      formTitle(){
        return this.itemIndex === -1 ? 'New User' : 'Update User'
      },
    },
    created(){
      this.loadItems();
    },
    methods: {
      loadItems() {
        this.overlay.value = true
        this.$guest.get('/api/users/getAllUser')
        .then(res => {
          this.overlay.value = false
          this.loading = false
          this.table_items = res.data
        })
        .catch(err => { console.log(err) })
      },
      btn_save(){
        if(this.$refs.form.validate()){
          if(this.active_item.password == this.active_item.confirmpassword){
            this.overlay.value = true
            let data = {
              user_id: this.active_item.user_id,
              fullname: this.active_item.fullname,
              status: this.active_item.active,
              password: this.active_item.password,
              user_type: this.active_item.user_type,
            }
            let url = this.itemIndex == -1 ? 'registerUser' : 'updateUser'
            this.$guest.post('/api/users/'+ url, this.$form_data.generate(data))
            .then(res => {
              this.overlay.value = false
              if(res.data.status == true){
                this.snackbar.status = true
                this.snackbar.text = this.itemIndex == -1 ? 'Record(s) saved successfully!' : 'Record(s) updated successfully!'
                this.snackbar.color = 'success'
                this.loadItems()
                this.btn_cancel()
              }else{
                this.msg = res.data.message
                this.type = 'error'
              }
            })
            .catch(err => { console.log(err) })
          }else{
            this.msg = "Password Mismatch!"
            this.type = 'error'
          }
        }
      },
      btn_cancel(){
        this.msg = ''
        this.type = ''
        this.dialog = false
        this.disabled = false
        this.itemIndex = -1
        this.active_item = Object.assign({}, this.default_active_item)
        this.$refs.form.reset()
      },
      btn_update(item){
        this.dialog = true
        this.disabled = true
        this.itemIndex = this.table_items.indexOf(item)
        this.active_item = Object.assign({}, item)
        this.active_item.confirmpassword = item.password
      },
    }
}
</script>

<style scoped>

</style>