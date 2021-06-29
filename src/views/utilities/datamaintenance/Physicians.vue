<template>
<div class="ma-n3">
    <myHeader :title="'Data Maintenance'" :subtitle="'Manage Physician Info'" />
    <v-container fluid>
  <v-card flat outlined>
    <v-flex md-12 class="ma-2">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="70"></v-progress-circular>
      </v-overlay>

      <v-data-table :headers="table_headers" :items="table_items" :search="search" dense flat disable-sort :items-per-page="-1">
        <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
              <v-btn class="ml-2" color="primary" @click="dialog = !dialog" dark>Add Physicians</v-btn>
            </v-toolbar>
        </template>

        <!-- <template v-slot:[`item.firstname`]="{ item }">
            <p class="text-uppercase ma-0">{{ item.firstname }}</p>
        </template>
        <template v-slot:[`item.lastname`]="{ item }">
            <p class="text-uppercase ma-0">{{ item.lastname }}</p>
        </template>
        <template v-slot:[`item.middlename`]="{ item }">
            <p class="text-uppercase ma-0">{{ item.middlename }}</p>
        </template> -->
        <template v-slot:[`item.gender`]="{ item }">
          {{ gender.filter(e => e.id == item.gender)[0]['desc'] }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn dense x-small @click="btn_update(item)" color="primary">UPDATE</v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" persistent max-width="600px">        
        <v-card>
            <v-card-title>{{ formTitle }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-2">
                <v-form ref="form">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="active_item.firstname" dense outlined label="First Name"></v-text-field>
                                <v-text-field v-model="active_item.middlename" dense outlined label="Middle Name"></v-text-field>
                                <v-text-field v-model="active_item.lastname" dense outlined label="Last Name"></v-text-field>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col cols="6">
                                <v-select v-model="active_item.gender" :items="gender" item-text="desc" item-value="id" dense outlined label="Gender"></v-select>
                                <v-text-field v-model="active_item.contact" v-mask="'####-###-####'" dense outlined label="Contact #"></v-text-field>
                                <v-text-field v-model="active_item.address" dense outlined label="Address"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small outlined color="primary" @click="btn_save()">Save</v-btn>
                <v-btn small outlined color="error" @click="btn_cancel()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>

    </v-flex>
  </v-card>
  </v-container>
  </div>
</template>

<script>
import myHeader from '../../../components/myHeader.vue'
export default {
    name: 'Physicians',
    components: { myHeader },
    data(){
      return{
        overlay: false,
        dialog: false,
        search: '',
        table_headers:[
          { text: 'Last Name', value: 'lastname' },
          { text: 'First Name', value: 'firstname' },
          { text: 'Middle Name', value: 'middlename' },
          { text: 'Gender', value: 'gender', align: 'center', filterable: false },
          { text: 'Contact #', value: 'contact', align: 'center', filterable: false },
          { text: 'Address', value: 'address', align: 'center', filterable: false },
          { text: 'Actions', value: 'actions', align: 'center', filterable: false },
        ],
        table_items: [],
        itemIndex: -1,
        gender: [],
        active_item: {
            id: '',
            firstname: '',
            middlename: '',
            lastname: '',
            gender: '',
            contact: '',
            address: ''
        },
        default_item: {
            id: '',
            firstname: '',
            middlename: '',
            lastname: '',
            gender: '',
            contact: '',
            address: ''
        }
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
    created(){
        this.overlay = true
        this.initialize()
    },
    computed:{
      formTitle(){
        return this.itemIndex === -1 ? 'New Physician' : 'Update Physician'
      }
    },
    methods: {
        async initialize(){
            await this.$guest.get('/api/data_maintenance/getGender')
            .then(res => {
                console.log(res)
                this.gender = res.data
                this.getPhysicians()
            })
            .catch(err => { console.log(err) })
        },
        async getPhysicians(){
            await this.$guest.get('/api/data_maintenance/getPhysicians')
            .then(res => {
                console.log(res)
                this.table_items = res.data
                this.overlay = false
            })
            .catch(err => { console.log(err) })
        },
        async btn_save(){
            let data = {
                id: this.active_item.id,
                firstname: this.active_item.firstname,
                middlename: this.active_item.middlename,
                lastname: this.active_item.lastname,
                gender: this.active_item.gender,
                contact: this.active_item.contact,
                address: this.active_item.address,
                user_id: this.$session.get('userid-session')
            }
            let url = this.itemIndex == -1 ? 'insertPhysician' : 'updatePhysician'
            await this.$guest.post('/api/data_maintenance/' + url, this.$form_data.generate(data))
            .then(res => {
                console.log(res)
                this.close()
                this.getPhysicians()
            })
            .catch(err => { console.log(err) })
        },
        btn_cancel(){
            this.close()
        },
        close(){
            this.dialog = !this.dialog
            this.itemIndex = -1
            this.active_item = Object.assign({}, this.default_item)
        },
        btn_update(item){
            this.dialog = true
            this.itemIndex = this.table_items.indexOf(item)
            this.active_item = Object.assign({}, item)
        }
    }
}
</script>

<style>

</style>