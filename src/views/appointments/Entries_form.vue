<template>
<div class="ma-n3">
    <myHeader :title="'Patient Entries'" :subtitle="'Create Patient Appointment'" />
    <v-container fluid>
        <Overlay :value="overlay.value" />
  <v-card flat outlined>
    <v-flex md12 class="ma-2">
        <v-data-table dense flat disable-sort hide-default-footer
        :items-per-page="-1"
        :headers="table_header"
        :items="table_items">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-flex md1 class="mx-1">
                        <v-select v-model="rowFilter" @change="key_search()" :items="rowItems" item-text="text" item-value="value" hide-details dense outlined label="ROWS"></v-select>
                    </v-flex>
                    <v-text-field class="shrink" v-model="search" @keyup="key_search()" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                    <v-btn class="ml-2" color="primary" dark @click="btn_entry()">
                        CREATE REQUEST
                    </v-btn>
                </v-toolbar>
            </template>

            <!-- P == PENDING, D == DONE -->
            <template v-slot:[`item.status`]="{item}">
                <v-btn v-if="item.status == 'C'" small text color="error">CANCELLED</v-btn>
                <v-btn v-if="item.status == 'P'" small text color="warning">PENDING</v-btn>
                <v-btn v-if="item.status == 'D'" small text color="success">DONE</v-btn>
            </template>

            <template v-slot:[`item.created_at`]="{item}">
                {{ formatDateTime(item.created_at) }}
            </template>

            <template v-slot:[`item.approved`]="{item}">
                {{ item.approved=='Y'?'APPROVED': item.approved=='N'?'REJECTED': '' }}
            </template>
            
            <template v-slot:[`item.actions`]="{item}">
                <v-btn small color="info" @click="btn_view(item)">VIEW</v-btn>
                <template v-if="item.approved=='' && item.discount_id==3">
                    <v-btn v-if="$session.get('usertype-session') == 'ADMIN'" small class="ml-2" color="success" @click="btn_approvedReject(item,'approved')">APPROVED</v-btn>
                    <v-btn v-if="$session.get('usertype-session') == 'ADMIN'" small class="ml-2" color="error" @click="btn_approvedReject(item,'reject')">REJECT</v-btn>
                </template>
            </template>

            <template v-slot:footer>
              <v-divider></v-divider>
              <div class="pt-2">
                <v-pagination v-model="page" @input="currentPage" :length="pageLength" :total-visible="7"></v-pagination>
              </div>
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
  name: 'Entries_form',
  components: { myHeader,Overlay },
  data(){
        return{
            page: 1,
            pageLength: 1,
            rowFilter: '10',
            rowItems: [
              { text: '5', value: '5' },
              { text: '10', value: '10' },
              { text: '25', value: '25' },
              { text: 'All', value: 'all' },
            ],
            search: '',
            table_header: [
                { text: 'CONTROL #.', value: 'id', align: 'center' },
                { text: 'STATUS', value: 'status', align: 'center' },
                { text: 'PATIENT ID #.', value: 'patient_id', align: 'center' },
                { text: 'LASTNAME', value: 'lastname', align: 'left' },
                { text: 'FIRSTNAME', value: 'firstname', align: 'left' },
                { text: 'MIDDLENAME', value: 'middlename', align: 'left' },
                { text: 'DATE', value: 'created_at', align: 'center' },
                { text: 'APPROVAL DISCOUNT', value: 'approved', align: 'center' },
                { text: 'ACTIONS', value: 'actions', align: 'center' },
            ],
            table_items: [],
            overlay: {
                value: false
            },
        }
    },
  beforeCreate: function(){
      if(!this.$session.has('user-session')){
          this.$router.push({ path: '/login' });
      }
      let user_access = this.$session.get('user-access')
        let cpath = this.$route.path
        let modpath = []
        user_access.forEach(el => {
          modpath.push(el.mod_path)
        })
        if(modpath.indexOf(cpath) == -1){
          this.$router.push({ path: '/' })
        }
  },

  created(){
      this.initialize()
  },
  
  methods: {
        key_search(){
            this.page = 1
            this.initialize()
        },
        currentPage(){
            this.initialize()
        },
        async initialize(){
            this.overlay.value = true
            let limit = this.rowFilter == 'all' ? 100 : this.rowFilter
            let data = {
                search_value: this.search,
                offset: this.page == 1 ? 0 : (this.page-1) * limit,
                limit: limit
            }
            await this.$guest.post('/api/appointment/getEntries', this.$form_data.generate(data))
            .then(res => {
                this.overlay.value = false
                this.table_items = res.data.entries
                this.pageLength = this.paginationLength(res.data.total, limit)
            })
            .catch(err =>{ console.log(err) })
        },
        async btn_entry(){
            await this.$guest.get('/api/appointment/getCtrlNo')
            .then(res => {
                console.log(res.data)
                this.$router.push({ name: 'Entry_form', query: { ctrlno: btoa(res.data.control_no), stat: btoa(''), apprvd: btoa('') } })
            })
            .catch(err => { console.log(err) })
        },
        btn_view(item){
            this.$router.push({ name: 'Entry_form', query: { ctrlno: btoa(item.id), stat: btoa(item.status), apprvd: btoa(item.approved) } })
        },
        async btn_approvedReject(item,stat){
            let data = {
                user_id: this.$session.get('userid-session'),
                item_id: item.id,
                stat: stat
            }
            await this.$guest.post('/api/appointment/approvedRejectEntry', this.$form_data.generate(data))
            .then(() => {
                this.initialize()
            })
            .catch(err => { console.log(err) })
        },
  }
}
</script>

<style>

</style>