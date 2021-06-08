<template>
  <v-card>
    <v-flex md-12 class="ma-2">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="70"></v-progress-circular>
      </v-overlay>

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
</template>

<script>
export default {
    name: 'Viewing',
    data(){
        return{
            overlay: false,
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
    },
    created(){
        this.initialize()
    },
    methods: {
        async initialize(){
            await this.$guest.get('/api/timekeeping/getEmployees')
            .then(res => {
                console.log(res.data)
                this.table_items = res.data.result
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