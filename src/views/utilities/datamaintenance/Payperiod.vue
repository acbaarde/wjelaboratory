<template>
<div class="ma-n3">
    <myHeader :title="'Data Maintenance'" :subtitle="'Manage Payroll Period'" />
    <v-container fluid>
  <v-card flat outlined>
    <v-flex md-12 class="ma-2">
      
      <Overlay :value="overlay.value" />
      <v-data-table :headers="table_headers" :items="table_items" :search="search" dense flat disable-sort :items-per-page="15">
        <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
              <v-btn class="ml-2" color="primary" @click="dialog = !dialog" dark>Add Payperiod</v-btn>
            </v-toolbar>
        </template>
        <template v-slot:[`item.ppost`]="{ item }">
          <div :style="stat_style(item.ppost)">
            {{ item.ppost == 'P' ? 'POSTED' : 'OPEN' }}
          </div>
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
                                <v-text-field v-model="active_item.pperiod" dense outlined label="Period" type="date"></v-text-field>
                                <v-select v-model="active_item.ppost" :items="status" item-text="desc" item-value="id" dense outlined label="Status"></v-select>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col cols="6">
                                <v-text-field v-model="active_item.cfrom" dense outlined label="From" type="date"></v-text-field>
                                <v-text-field v-model="active_item.cto" dense outlined label="To" type="date"></v-text-field>
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
import Overlay from '../../../components/Overlay.vue'
export default {
    name: 'Physicians',
    components: { myHeader,Overlay },
    data(){
      return{
        overlay: {
          value: false
        },
        dialog: false,
        search: '',
        table_headers:[
          { text: 'Period', value: 'pperiod', align: 'center' },
          { text: 'Date From', value: 'cfrom', align: 'center' },
          { text: 'Date To', value: 'cto', align: 'center' },
          { text: 'Status', value: 'ppost', align: 'center', filterable: false },
          { text: 'Actions', value: 'actions', align: 'center', filterable: false },
        ],
        table_items: [],
        itemIndex: -1,
        status: [
          { id: "", desc: 'OPEN' },
          { id: 'P', desc: 'POSTED' },
        ],
        active_item: {
            id: '',
            pperiod: '',
            ppost: '',
            cfrom: '',
            cto: ''
        },
        default_item: {
            id: '',
            pperiod: '',
            ppost: '',
            cfrom: '',
            cto: ''
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
        this.overlay.value = true
        this.getPayperiod()
    },
    computed:{
      formTitle(){
        return this.itemIndex === -1 ? 'New Payperiod' : 'Update Payperiod'
      },
    },
    methods: {
        async getPayperiod(){
            await this.$guest.get('/api/data_maintenance/getPayperiod')
            .then(res => {
                this.table_items = res.data
                this.overlay.value = false
            })
            .catch(err => { console.log(err) })
        },
        async btn_save(){
            let data = {
                id: this.active_item.id,
                pperiod: this.active_item.pperiod,
                ppost: this.active_item.ppost,
                cfrom: this.active_item.cfrom,
                cto: this.active_item.cto,
                user_id: this.$session.get('userid-session')
            }
            let url = this.itemIndex == -1 ? 'insertPayperiod' : 'updatePayperiod'
            await this.$guest.post('/api/data_maintenance/' + url, this.$form_data.generate(data))
            .then(() => {
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
            this.getPayperiod()
        },
        btn_update(item){
            this.dialog = true
            this.itemIndex = this.table_items.indexOf(item)
            this.active_item = Object.assign({}, item)
        },
        stat_style(value){
          let clor = value == 'P' ? 'red' : 'green'
          let styl = "color: " + clor
          return styl
        }
    }
}
</script>

<style>

</style>