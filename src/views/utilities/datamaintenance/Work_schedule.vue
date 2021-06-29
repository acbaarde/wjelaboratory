<template>
<div class="ma-n3">
    <myHeader :title="'Data Maintenance'" :subtitle="'Manage Work Schedule'" />
    <v-container fluid>
  <v-card flat outlined>
    <v-flex md-12 class="ma-2">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="70"></v-progress-circular>
      </v-overlay>

      <v-data-table :headers="table_headers" :items="table_items" :search="search" dense flat disable-sort :items-per-page="15">
        <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
              <v-btn class="ml-2" color="primary" @click="dialog = !dialog" dark>Add Work Schedule</v-btn>
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn dense x-small @click="btn_update(item)" color="primary">UPDATE</v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" persistent max-width="60%">        
        <v-card>
            <v-card-title>{{ formTitle }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-2">
                <v-form ref="form">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="2">
                              <v-text-field :disabled="itemIndex == -1 ? false : true" v-model="active_item.ws_code" dense outlined label="Shift Code" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                              <v-text-field v-model="active_item.desc" v-mask="'##:##-##:##-##:##-##:##'" hint="Format ex. 08:00-11:00-12:00-17:00" dense outlined label="Description" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                              <v-text-field v-model="active_item.grace_period" v-mask="'###'" dense outlined label="Grace Period" type="number"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                              <v-btn block color="green" dark @click="btn_spread()">Spread</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-data-table :headers="sched_headers" :items="scheditems" dense flat disable-sort hide-default-footer>

                            </v-data-table>
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
          { text: 'Shift Code', value: 'ws_code', align: 'center' },
          { text: 'Description', value: 'desc', align: 'center' },
          { text: 'Grace Period', value: 'grace_period', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', filterable: false },
        ],
        table_items: [],
        sched_headers: [
          { text: 'Day', value: 'ws_day', align: 'center' },
          { text: 'AM IN', value: 'ws_amin', align: 'center' },
          { text: 'AM OUT', value: 'ws_amout', align: 'center' },
          { text: 'PM IN', value: 'ws_pmin', align: 'center' },
          { text: 'PM OUT', value: 'ws_pmout', align: 'center' },
        ],
        sched_items:[],
        itemIndex: -1,
        status: [
          { id: "", desc: 'OPEN' },
          { id: 'P', desc: 'POSTED' },
        ],
        active_item: {
            id: '',
            ws_code: '',
            desc: '',
        },
        default_item: {
            id: '',
            ws_code: '',
            desc: '',
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
    created(){
        this.overlay = true
        this.getWorksched()
    },
    computed:{
      formTitle(){
        return this.itemIndex === -1 ? 'New Payperiod' : 'Update Payperiod'
      },
      scheditems(){
        return this.sched_items.filter(e => this.active_item.ws_code == e.ws_code)
      }
    },
    methods: {
        async getWorksched(){
            await this.$guest.get('/api/data_maintenance/getWorksched')
            .then(res => {
                console.log(res)
                this.table_items = res.data.work_shift
                this.sched_items = res.data.work_sched
                this.overlay = false
            })
            .catch(err => { console.log(err) })
        },
        async btn_save(){
            this.active_item['user_id'] = this.$session.get('userid-session')
            let url = this.itemIndex == -1 ? 'insertWorksched' : 'updateWorksched'
            await this.$guest.post('/api/data_maintenance/' + url, this.$form_data.generate(this.active_item))
            .then(res => {
                console.log(res)
                this.close()
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
            this.getWorksched()
        },
        btn_update(item){
            this.dialog = true
            this.itemIndex = this.table_items.indexOf(item)
            this.active_item = Object.assign({}, item)
        },
        btn_spread(){
          let ws_code = this.active_item.ws_code
          let time = this.active_item.desc.split("-")
          let amin = time[0]
          let amout = time[1]
          let pmin = time[2]
          let pmout = time[3]
          this.sched_items = [
            { ws_code: ws_code, ws_day: 'Mon', ws_amin: amin, ws_amout: amout, ws_pmin: pmin, ws_pmout: pmout },
            { ws_code: ws_code, ws_day: 'Tue', ws_amin: amin, ws_amout: amout, ws_pmin: pmin, ws_pmout: pmout },
            { ws_code: ws_code, ws_day: 'Wed', ws_amin: amin, ws_amout: amout, ws_pmin: pmin, ws_pmout: pmout },
            { ws_code: ws_code, ws_day: 'Thu', ws_amin: amin, ws_amout: amout, ws_pmin: pmin, ws_pmout: pmout },
            { ws_code: ws_code, ws_day: 'Fri', ws_amin: amin, ws_amout: amout, ws_pmin: pmin, ws_pmout: pmout },
            { ws_code: ws_code, ws_day: 'Sat', ws_amin: amin, ws_amout: amout, ws_pmin: pmin, ws_pmout: pmout },
            { ws_code: ws_code, ws_day: 'Sun', ws_amin: amin, ws_amout: amout, ws_pmin: pmin, ws_pmout: pmout },
          ]
        }
    }
}
</script>

<style>

</style>