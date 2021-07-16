<template>
<div class="ma-n3">
    <myHeader :title="'Timekeeping'" :subtitle="'Manage Employee Timekeeping'" />
    <v-container fluid>
  <v-card flat outlined>
    <v-flex md-12 class="ma-2">
      <Overlay :value="overlay.value" />

      <v-data-table :headers="table_headers" :items="table_items" :search="search" dense flat disable-sort :items-per-page="15">
        <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
            </v-toolbar>
        </template>

        <template v-slot:[`item.fullname`]="{ item }">
            <p class="text-uppercase ma-0">{{ item.fullname }}</p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn dense small @click="btn_view(item)" color="primary">VIEW</v-btn>
        </template>
      </v-data-table>
      
    </v-flex>
  </v-card>
  </v-container>
</div>
</template>

<script>
import myHeader from '../../components/myHeader.vue'
import Overlay from '../../components/Overlay.vue'
export default {
    name: 'Viewing',
    components: { myHeader,Overlay },
    data(){
        return{
            overlay: {
              value: false
            },
            dialog: false,
            search: '',
            table_headers:[
                { text: 'Employee #', value: 'id', align: 'center'},
                { text: 'Full Name', value: 'fullname' },
                { text: 'Position', value: 'position_desc', align: 'center', filterable: false },
                { text: 'Employee Status', value: 'employee_status_desc', align: 'center', filterable: false },
                { text: 'Actions', value: 'actions', align: 'center', filterable: false},
            ],
            table_items: [],

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
            this.overlay.value = true
            await this.$guest.get('/api/timekeeping/getEmployees')
            .then(res => {
                console.log(res.data)
                this.table_items = res.data.result
                
                this.$nextTick(() => {
                  this.overlay.value = false
                })
            })
            .catch(err => { console.log(err) })
        },
        btn_view(item){
            console.log(item)
            this.$router.push({ name: 'Timekeeping_form', query: { id: item.id }, params: { id: item.id } })
        }
    }
    
}
</script>

<style>

</style>