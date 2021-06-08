<template>
<v-card>
  <!-- <v-row> -->
    
<!-- 
    <v-flex md12 class="ma-2">
      <h3>USER MAINTENANCE</h3>
    </v-flex>
    <v-divider></v-divider> -->
    <v-flex md12 class="ma-2">
      <v-data-table
        disable-sort
        :headers="headers"
        :items="users"
        :items-per-page="10"
        :search="search"
        outlined
        dense
        flat
        max-width="300px"
        :loading="loading"
        loading-text ="Loading... Please wait">

        <!-- <template v-slot:[`header.username`]="{ header }">
          {{ header.text.toUpperCase() }}
        </template> -->
        

        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <!-- SEARCH -->
            <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
            <!-- END SEARCH -->

            <!-- ADD USER -->
            <v-dialog v-model="dialog" max-width="600">
              <template v-slot:activator="{on ,attrs}">
                <v-btn class="ml-2" color="primary" v-bind="attrs" v-on="on" dark>
                  Add User
                </v-btn>
              </template>

              <v-card>
                <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-4">
                  <v-form>
                    <v-container>
                      <v-row dense>
                        <v-col cols="4">
                          <v-text-field outlined dense required label="Username" v-model="editedUser.username" :disabled="disabled"></v-text-field>
                          <v-text-field outlined dense required label="First name" v-model="editedUser.firstname"></v-text-field>
              
                        </v-col>
                        <v-col cols="4">
                          <v-text-field outlined dense required label="Password" v-model="editedUser.password" type="password"></v-text-field>
                          <v-text-field outlined dense required label="Last name" v-model="editedUser.lastname"></v-text-field>
                         
                        </v-col>
                        <v-col cols="4">
                          <v-text-field outlined dense required label="Confirm Password" v-model="editedUser.confirmpassword" type="password"></v-text-field>
                          <v-select v-model="editedUser.user_type" outlined dense :items="options" item-text="text" item-value="value" label="Select User Type"></v-select>
                        </v-col>
                      </v-row>
                      <v-alert v-if="msg" dense outlined :type="type">{{ msg }}</v-alert>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="close">Cancel</v-btn>
                  <v-btn color="primary" @click="saveUser">Save</v-btn>
                </v-card-actions>
              </v-card>
              
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="400px">
              <v-card>
                <v-card-title class="headline">Confirm delete</v-card-title>
                <v-card-text>Are you sure you want to delete this item?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">CANCEL</v-btn>
                    <v-btn color="blue darken-1" text @click="confirmDelete">OK</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- END ADD USER -->
            
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="confirmDeleteItem(item)">mdi-delete</v-icon>
        </template>

      </v-data-table>
    </v-flex>
    
  <!-- </v-row> -->
  </v-card>
</template>

<script>

export default {
    name: 'User_accounts',
    data(){
      return{
        search: '',
        dialog: false,
        dialogDelete: false,
        disabled: false,
        loading: true,
        type: null,
        msg: null,
        headers: [
          { text: 'Actions', value: 'actions' },
          {
            text: 'Username',
            // align: 'center',
            value: 'username',
          },
          { text: 'First name', value: 'firstname' },
          { text: 'Last name', value: 'lastname' },
          { text: 'User type', value: 'user_type' },
          { text: 'Last login', value: 'last_login' },
          { text: 'Created at', value: 'created_at' },
        ],
        theaders: [{'username': 'test'},'firstname','lastname','user type','last login','created at','actions'],
        users: [],
        editedIndex: -1,
        editedUser: {
          username: null, password: null, confirmpassword: null, firstname: null, lastname: null, user_type: null
        },
        defaultUser: {
          username: null, password: null, confirmpassword: null, firstname: null, lastname: null, user_type: null
        },
        // firstnameRules:[ (v) => !!v || 'First name is required' ],
        // lastnameRules:[ (v) => !!v || 'Last name is required' ],
        // usernameRules:[ (v) => !!v || 'Username is required' ],
        // passwordRules:[ (v) => !!v || 'Password is required' ],
        passwordShow: false,
        // confirmpasswordRules:[ (v) => !!v || 'Confirm Password is required' ],
        confirmpasswordShow: false,
        options: [
          { text: 'Admin', value: 'admin'},
          { text: 'User', value: 'user'}
        ]
      }
    },

    watch: {
      dialog(val){
        val || this.close()
      },
      dialogDelete(val){
        val || this.closeDelete()
      },
    },

    computed:{
      formTitle(){
        return this.editedIndex === -1 ? 'New User' : 'Update User'
      },
    },

    created(){
      this.loadItems();
    },

    methods: {
      loadItems() {
        this.$guest.get('/api/users/getAllUser')
        .then(res => {
          this.loading = false
          this.users = res.data
        })
        .catch(err =>{
          console.log(err)
        })
      },

      editItem(item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedUser = Object.assign({}, item)
        this.dialog = true
        this.disabled = true
        console.log(item)
      },

      saveUser(){
          // const form_data = new FormData()
          // form_data.append('id', this.editedUser.id)
          // form_data.append('username', this.editedUser.username)
          // form_data.append('password', this.editedUser.password)
          // form_data.append('firstname', this.editedUser.firstname)
          // form_data.append('lastname', this.editedUser.lastname)
          // form_data.append('user_type', this.editedUser.user_type)

          let data = {
            id: this.editedUser.id,
            username: this.editedUser.username,
            password: this.editedUser.password,
            firstname: this.editedUser.firstname,
            lastname: this.editedUser.lastname,
            user_type: this.editedUser.user_type
          }

        if(this.editedIndex > -1){
          //UPDATE USER
          this.$guest.post('/updateUser', this.$form_data.generate(data))
          .then(() => {
            this.loadItems()
            this.close()
          })
          .catch(err => {
            console.log(err.data);
          })
        }else{
          //REGISTER USER
          this.$guest.post('/registerUser', this.$form_data.generate(data))
          .then(res => {
            this.msg = res.data.message
            if(res.data.status == true){
              this.loadItems()
              this.close()
            }else{
              this.type = 'error'
            }
          })
          .catch(err => {
            console.log(err.data);
          })
        }
      },

      close(){
        this.dialog = false
        this.$nextTick(() => {
          this.editedUser = Object.assign({}, this.defaultUser)
          this.editedIndex = -1
          this.msg = null
          this.disabled = false
        })
      },

      closeDelete(){
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedUser = Object.assign({}, this.defaultUser)
          this.editedIndex = -1
          this.msg = null
        })
      },
      
      confirmDelete(){
        const form_data = new FormData()
        form_data.append('id',this.editedUser.id)

        this.$guest.post('/deleteUser', form_data)
        .then(() => {
          this.loadItems()
          this.closeDelete()
        })
        .catch(err => {
          console.log(err)
        })
      },

      confirmDeleteItem(item){
        this.editedIndex = this.users.indexOf(item)
        this.editedUser = Object.assign({}, item)
        this.dialogDelete = true
      },
    }
}
</script>

<style scoped>

</style>