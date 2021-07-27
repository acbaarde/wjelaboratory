<template>
<div class="ma-n3">
    <myHeader :title="'Patient Entries'" :subtitle="'Create Patient Appointment'" />
    <v-container fluid>
  <v-card flat outlined>
    <v-flex md12 class="ma-2">
        <!-- <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="70"></v-progress-circular>
        </v-overlay> -->
        <v-data-table dense flat disable-sort 
        :items-per-page="15"
        :headers="table_header"
        :items="table_items"
        :search="search">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-text-field class="shrink" v-model="search" clearable append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                    <v-btn class="ml-2" color="primary" dark @click="btn_entry()">
                        New Entry
                    </v-btn>
                </v-toolbar>
            </template>
            
            <!-- <template v-slot:[`item.fullname`]="{item}">
                {{item.lastname+", "+item.firstname+" "+item.middlename}}
            </template> -->

            <!-- P == PENDING, D == DONE -->
            <template v-slot:[`item.status`]="{item}">
                <v-btn v-if="item.status == 'P'" small text color="warning">PENDING</v-btn>
                <v-btn v-if="item.status == 'D'" small text color="success">PENDING</v-btn>
            </template>

            <template v-slot:[`item.created_at`]="{item}">
                {{ formatDateTime(item.created_at) }}
            </template>
            
            <template v-slot:[`item.actions`]="{item}">
                <v-btn small color="info" @click="btn_view(item)">VIEW</v-btn>
            </template>
        </v-data-table>
      
    </v-flex>
  </v-card>
  </v-container>
</div>
</template>

<script>
import myHeader from '../../components/myHeader.vue'
export default {
  name: 'Entries_form',
  components: { myHeader },
  data(){
        return{
            search: '',
            table_header: [
                { text: 'Control #.', value: 'id', align: 'center', sortable: false },
                { text: 'Status', value: 'status', align: 'center', sortable: false },
                { text: 'Patient ID #.', value: 'patient_id', align: 'center', sortable: false },
                { text: 'LASTNAME', value: 'lastname', align: 'left', sortable: false },
                { text: 'FIRSTNAME', value: 'firstname', align: 'left', sortable: false },
                { text: 'MIDDLENAME', value: 'middlename', align: 'left', sortable: false },
                { text: 'DATE', value: 'created_at', align: 'center', sortable: false },
                { text: 'Actions', value: 'actions', align: 'center', sortable: false },
            ],
            table_items: []
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
      this.initialize()
  },
  
  methods: {
        async initialize(){
            await this.$guest.get('/api/appointment/getEntries')
            .then(res => {
                this.table_items = res.data
            })
            .catch(err =>{ console.log(err) })
        },
        async btn_entry(){
            await this.$guest.get('/api/appointment/getCtrlNo')
            .then(res => {
                this.$router.push({ name: 'Entry_form', query: { ctrlno: res.data.control_no, stat: '' } })
            })
            .catch(err => { console.log(err) })
        },
        btn_view(item){
            this.$router.push({ name: 'Entry_form', query: { ctrlno: item.id, stat: item.status } })
        }
  }
}
</script>

<style>

</style>