<template>
  <div class="ma-n3">
    <v-container fluid>
      <Overlay :value="overlay.value" />
      <v-card flat outlined>
        <v-card-text>
          <v-row no-gutters class="mb-2">
            <v-col cols="2" class="mr-2">
              <v-text-field v-model="active_item.patient_id" readonly dense outlined hide-details label="Patient ID No."></v-text-field>
            </v-col>
            <v-dialog v-model="dialog" persistent width="80%">
              <template v-slot:activator="{on, attrs}">
                <v-btn v-if="$route.query.stat==''" fab small elevation="1" dark class="mr-2" color="info" v-bind="attrs" v-on="on" @click="btn_search_patient()">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Search Patient</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-data-table :headers="patient_table_headers" :items="patient_table_items" :search="search" dense>
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-spacer></v-spacer>
                        <v-text-field class="shrink" v-model="search" clearable append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                      </v-toolbar>
                    </template>
                    <template v-slot:[`item.id`]="{ item }">
                      <v-btn text small color="success" @click="btn_patient(item)">{{ item.id }}</v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn small color="error" outlined @click="dialog=false">CLOSE</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-spacer></v-spacer>
            <v-text-field class="shrink" v-model="$route.query.ctrlno" label="Control #." dense outlined hide-details readonly></v-text-field>
          </v-row>
          <v-row no-gutters class="mb-2">
            <v-col cols="4" class="mr-2">
              <v-text-field v-model="fullname" readonly dense outlined hide-details label="Patient Name"></v-text-field>
            </v-col>
            <v-col cols="2" class="mr-2">
              <v-text-field v-model="gender" readonly dense outlined hide-details label="Gender"></v-text-field>
            </v-col>
            <v-col cols="1" class="mr-2">
              <v-text-field v-model="age" readonly dense outlined hide-details label="Age"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="active_item.address" readonly dense outlined hide-details label="Address"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-2">
            <v-col cols="4" class="mr-2">
              <v-select v-model="physician_selected.value" @change="physician_changed()" label="Physician" :prefix="physicianprefix" :items="physicians" item-text="text" item-value="value" dense outlined hide-details></v-select>
            </v-col>
            <v-col cols="2" class="mr-2">
              <v-select v-model="discount_selected.id" @change="discount_changed()" label="Discount Type" :items="discount" item-text="text" item-value="id" dense outlined hide-details></v-select>
            </v-col>
            <v-col cols="1" class="mr-2">
              <v-text-field v-model="discount_selected.percent" :readonly="discount_selected.id == 3 ? false : true" dense outlined hide-details label="Disc. %"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="discount_rmks" clearable dense outlined hide-details label=" Discount Remarks"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-2">
            <v-spacer></v-spacer>
            <v-dialog v-model="lab_dialog" persistent scrollable width="70%">
              <template v-slot:activator="on,attrs">
                <v-btn color="green" dark v-bind="attrs" v-on="on" @click="btn_add_lab_test()"><v-icon left>mdi-plus</v-icon>ADD LAB TEST</v-btn>
              </template>
              <v-card>
                <v-card-title>Add Laboratory Test</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-tabs v-model="tab" show-arrows>
                      <v-tab v-for="item in tab_headers" :key="item.id">
                        {{ item.title }}
                      </v-tab>
                  </v-tabs>
                  <v-divider></v-divider>
                  <v-card class="ma-4" flat outlined>
                    <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in tab_headers" :key="item.id">
                      <v-data-table :headers="lab_table_headers" :items="lab_table_items(item.id)" dense>
                        <template v-slot:[`item.actions`]="{item}">
                          <v-btn small dark color="success" @click="btn_save_lab_test(item)">ADD</v-btn>
                        </template>
                      </v-data-table>
                    </v-tab-item>
                  </v-tabs-items>
                  </v-card>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn small color="error" @click="lab_dialog=false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        <!-- </v-card-text> -->
        <v-divider></v-divider>
        <!-- <v-row>
          <v-col>
            <div style="overflow-y:auto;"> -->
              <!-- <v-card-text> -->
                <v-data-table :headers="table_headers" :items="table_items" dense hide-default-footer>
                  <template v-slot:[`item.status`]="{ item }">
                    <v-btn v-if="item.status=='P'" text small color="info" @click="btn_print(item)">PRINT</v-btn>
                    <v-btn v-if="item.status=='D'" text small color="success">DONE</v-btn>
                    <v-btn v-if="item.status==''" text small color="warning">PENDING</v-btn>
                    <v-btn v-if="item.status=='C'" text small color="error">CANCELLED</v-btn>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn v-if="item.send_out==1 && ($session.get('userposn-session')==1 || $session.get('userposn-session')=='admin')" text small color="success" @click="btn_sendout(item)">SEND OUT</v-btn>
                    <v-btn v-if="(item.status=='' || item.status=='P') && item.send_out==0 && ($session.get('userposn-session')==1 || $session.get('userposn-session')=='admin')" text small color="info"  @click="btn_results(item)">RESULTS</v-btn>
                    
                    
                    <v-btn v-if="item.status=='' || typeof item.status == 'undefined'" text small color="error" @click="btn_remove_item(item)">REMOVE</v-btn>
                    <v-btn v-if="item.status=='P' && ($session.get('userposn-session')==1 || $session.get('userposn-session')=='admin')" text small color="error" @click="btn_cancel_item(item)">CANCEL</v-btn>
                  </template>
                </v-data-table>
            <!-- </div>
          </v-col>
        </v-row> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-text-field v-model="total_cash" placeholder="0.00" color="success" outlined label="CASH" class="shrink mr-2" hide-details></v-text-field>
          <v-text-field v-model="total_change" placeholder="0.00" color="error" outlined label="CHANGE" class="shrink mr-2" readonly hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field v-model="total_fee" color="info" outlined label="LAB FEE(s)" class="shrink mr-2" readonly hide-details></v-text-field>
          <v-text-field v-model="total_amount" success color="info" outlined label="TOTAL AMOUNT" class="shrink mr-2" readonly hide-details></v-text-field>
          <v-btn :disabled="active_item.patient_id == '' ? true:false" color="primary" @click="btn_save()">SAVE</v-btn>
          <v-btn color="error" @click="btn_cancel()">CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-dialog v-model="result_dialog" persistent scrollable width="60%">
      <v-card>
        <v-card-title>RESULT ENTRY</v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-data-table :headers="result_table_headers" :items="result_table_items" dense :items-per-page="-1" hide-default-footer> 
            <template v-slot:[`item.result_value`]="{item}">
              <v-text-field v-model="item.result_value" dense hide-details outlined class="shrink"></v-text-field>
            </template>
          </v-data-table>
        </v-card-text>
        
        <v-divider></v-divider>
        <v-card-actions>
          <v-text-field v-model="result_remarks" dense hide-details outlined label="Remarks"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn small outlined color="primary" @click="btn_result_save()">SAVE</v-btn>
          <v-btn small outlined color="error" @click="result_dialog=false">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="cancel_dialog" persistent scrollable width="30%">
      <v-card>
        <v-card-title class="headline grey lighten-2">Cancel</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left text-h6 pa-5">
          <span>This can't be undone, Proceed anyway?</span>
          <v-form ref="form">
            <v-text-field v-model="cancel_reason" outlined dense label="Cancellation Reason" class="mt-4" required :rules="cancel_reasonRules"></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small outlined color="primary" @click="btn_confirm()">Yes</v-btn>
          <v-btn small outlined color="error" @click="cancel_dialog=false, $refs.form.reset(), cancel_reason=''">NO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="sendout_dialog" persistent scrollable width="30%">
      <v-card>
        <v-card-title class="headline grey lighten-2">Send Out</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left text-h6 pa-5">
          Proceed?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small outlined color="primary">YES</v-btn>
          <v-btn small outlined color="error" @click="sendout_dialog=false">NO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Overlay from '../../components/Overlay.vue'
export default {
  components: { Overlay },
  data(){
    return{
      cancel_reasonRules: [v => !!v || 'Reason is required!!!'],
      overlay: {
          value: false
        },
      dialog: false,
      lab_dialog: false,
      result_dialog: false,
      cancel_dialog: false,
      sendout_dialog: false,
      tab: 0,
      search: '',
      active_item: {
        id: '',
        patient_id: '',
        gender: '',
        age: '',
        agetype: '',
        address: '',
      },
      table_headers: [
        { text: 'STATUS', value: 'status', align: 'center', sortable: false },
        { text: 'TITLE', value: 'title', align: 'left', sortable: false },
        { text: 'ABBR', value: 'abbr', align: 'center', sortable: false },
        { text: 'LAB FEE', value: 'amount', align: 'center', sortable: false },
        { text: 'ACTIONS', value: 'actions', align: 'center', sortable: false },
      ],
      table_items: [],
      lab_table_headers: [
        { text: 'ABBR', value: 'abbr', align: 'center', sortable:false },
        { text: 'TITLE', value: 'title', align: 'left', sortable:false },
        { text: 'LAB FEE', value: 'amount', align: 'left', sortable:false },
        { text: 'ACTIONS', value: 'actions', align: 'center', sortable:false },
      ],
      patient_table_headers: [
        { text: 'ID No.', value: 'id', align: 'center', sortable: false },
        { text: 'Last Name', value: 'lastname', align: 'left', sortable: false },
        { text: 'First Name', value: 'firstname', align: 'left', sortable: false },
        { text: 'Middle Name', value: 'middlename', align: 'left', sortable: false },
        { text: 'Gender', value: 'gender', align: 'center', sortable: false, filterable: false },
        { text: 'Age', value: 'age', align: 'center', sortable: false, filterable: false },
        { text: 'Contact #.', value: 'contact', align: 'center', sortable: false, filterable: false },
        { text: 'Address', value: 'address', align: 'center', sortable: false, filterable: false },
      ],
      patient_table_items: [],
      result_table_headers: [
        { text: 'TITLE', value: 'result_title', align: 'left', sortable: false },
        { text: 'RESULT RANGE', value: 'result_range', align: 'left', sortable: false },
        { text: 'VALUE', value: 'result_value', align: 'center', sortable: false },
      ],
      result_table_items: [],
      physicians: [],
      physician_selected: {},
      discount: [],
      discount_selected: {},
      discount_rmks: '',
      tab_headers: [],
      tab_items: [],
      total_cash: '',
      result_remarks: '',
      cancel_reason: '',
      item_id: '',
    }
  },

  computed:{
    fullname(){
        var fullname = this.active_item.lastname + ', ' + this.active_item.firstname + ' ' + this.active_item.middlename
        return typeof this.active_item.lastname == 'undefined' ? '' : fullname.toUpperCase()
      },
    age(){
      var age = ''
      if(this.active_item.age != ''){
        age = this.formatAge(this.active_item.age,this.active_item.agetype)
      }
      return age
    },
    gender(){
      var gnder = ''
      if(this.active_item.gender != ''){
        gnder = this.active_item.gender == 'M' ? 'MALE' : 'FEMALE'
      }
      return gnder
    },
    physicianprefix(){
      return this.physician_selected.gender == 'F' ? 'Dra.' : 'Dr.'
    },

    total_amount(){
      let total = Object.values(this.table_items).reduce((total, { amount }) => total + parseFloat(amount), 0).toFixed(2)
      let percent = typeof this.discount_selected.percent == 'undefined' ? 0 : this.discount_selected.percent
      return total > 0 ? (total - ((percent/100) * total)).toFixed(2) : '0.00'
    },

    total_fee(){
      return Object.values(this.table_items).reduce((total, { amount }) => total + parseFloat(amount), 0).toFixed(2)
    },

    total_change(){
      if(parseInt(this.total_cash) > parseInt(this.total_amount)){
        return (this.total_cash - this.total_amount) > 0 ? (this.total_cash - this.total_amount).toFixed(2) : ""
      }else{
        return ''
      }
    }
  },

  created(){
    this.initialize()
  },

  methods: {
    async initialize(){
      if(this.$route.query.stat != ''){
        let data = {
          id: this.$route.query.ctrlno
        }
        await this.$guest.post('/api/appointment/getEntry', this.$form_data.generate(data))
        .then(res => {
          this.active_item = res.data.patient
          this.table_items = res.data.submodule
          this.physician_selected.value = res.data.patient.physician_id
          this.discount_selected = {
            id: res.data.patient.discount_id,
            percent: res.data.patient.discount_percent
          }
          this.discount_rmks = res.data.patient.discount_rmks
          this.total_cash = res.data.patient.cash > 0 ? res.data.patient.cash : ''
        })
        .catch(err => { console.log(err) })
      }

      await this.$guest.get('/api/data_maintenance/getPhysicians')
      .then(res => {
        this.physicians = res.data
      })
      .catch(err => {console.log(err)})
      await this.$guest.get('/api/data_maintenance/getDiscount')
      .then(res => {
        this.discount = res.data
        this.discount.push({ id: '', text: 'No Discount', percent: 0 })
      })
      .catch(err => {console.log(err)})
    },
    async btn_search_patient(){
      await this.$guest.get('/api/patient/getPatients')
      .then(res => {
        this.patient_table_items = res.data
      })
      .catch(err =>{ console.log(err) })
    },
    btn_patient(item){
      this.dialog = false
      this.active_item = Object.assign({}, item)
      this.active_item['patient_id'] = item.id
    },
    async btn_save(){
        this.overlay.value = true
        let sel_tbl_itms = []
        this.table_items.forEach(el => {
          if(typeof el.lab_id == 'undefined'){
            sel_tbl_itms.push(el.id)
          }else{
            sel_tbl_itms.push(el.lab_id)
          }
        })
        let data = {
          user_id: this.$session.get('userid-session'),
          id: this.$route.query.ctrlno,
          patient_id: this.active_item.patient_id,
          physician_id: typeof this.physician_selected.value !== 'undefined' ? this.physician_selected.value : '',
          discount_id: typeof this.discount_selected.id !== 'undefined' ? this.discount_selected.id : '',
          discount_rmks: this.discount_rmks == null ? '' : this.discount_rmks,
          discount_percent: typeof this.discount_selected.percent !== 'undefined' ? this.discount_selected.percent : '',
          submod_id: sel_tbl_itms,
          total_cash: this.total_cash,
          total_change: this.total_change,
          total_amount: this.total_amount,
          total_fee: this.total_fee,
        }
        let url = this.$route.query.stat == '' ? '/api/appointment/insertEntry' : '/api/appointment/updateEntry'
        await this.$guest.post(url, this.$form_data.generate(data))
        .then(res => {
          if(res.data.status == true){
            this.$router.push({ name: 'Entry_form', query: { ctrlno: res.data.control_id, stat: res.data.appointment_status } })
            window.location.reload()
          }
        })
        .catch(err => {console.log(err)})
    },

    async btn_add_lab_test(){
      this.lab_dialog = true
      this.tab = 0
      await this.$guest.get('/api/laboratory/getLabModule')
      .then(res => {
        this.tab_headers = res.data.module
        this.tab_items = res.data.submodule
      })
      .catch(err => {console.log(err)})
    },

    async btn_save_lab_test(item){
      this.table_items.push(item)
    },

    btn_remove_item(item){
      this.table_items.splice(this.table_items.indexOf(item),1)
    },
    btn_print(item){
      if(this.$session.get('userposn-session')==1||this.$session.get('userposn-session')=='admin'){
        console.log(item)
      }
    },
    async btn_results(item){
      this.result_dialog = true
      this.item_id = item.item_id
      let data = {
        lab_id: item.id,
        control_id: this.$route.query.ctrlno,
        item_id: this.item_id
      }
      await this.$guest.post('/api/appointment/getLabResults', this.$form_data.generate(data))
      .then(res => {
        this.result_remarks = res.data.result_remarks
        this.result_table_items = res.data.lab_results
      })
      .catch(err => { console.log(err) })
    },

    async btn_result_save(){
      let data = {
        lab_results: JSON.stringify(this.result_table_items),
        result_remarks: this.result_remarks,
        lab_test_id: this.item_id
      }
      await this.$guest.post('/api/appointment/saveResultEntry', this.$form_data.generate(data))
      .then(() => {
        this.result_dialog = false
        this.initialize()
      })
      .catch(err => { console.log(err) })
    },

    btn_sendout(item){
      console.log(item)
      this.sendout_dialog = true
    },

    btn_cancel(){
      console.log(this.table_items)
    },
    btn_cancel_item(item){
      this.item_id = item.item_id
      this.cancel_dialog = true
    },
    async btn_confirm(){
      if(this.$refs.form.validate()){
        let data = {
          item_id: this.item_id,
          cancel_reason: this.cancel_reason
        }
        await this.$guest.post('/api/appointment/cancelLabTest', this.$form_data.generate(data))
        .then(res => {
          if(res.data.status == true){
            this.cancel_dialog = false
            this.initialize()
          }
        })
        .catch(err => { console.log(err) })
      }
      this.cancel_reason = ''
      this.$refs.form.reset()
    },

    discount_changed(){
      this.discount.forEach(e => {
        if(e.id == this.discount_selected.id){
          const disc_sel = {
            'id': e.id,
            'percent': e.percent
          }
          this.discount_selected = Object.assign({}, disc_sel)
        }
      })
    },
    physician_changed(){
      this.physicians.forEach(e => {
        if(e.value == this.physician_selected.value){
          const phy_sel = {
            'value': e.value,
            'gender': e.gender
          }
          this.physician_selected = Object.assign({}, phy_sel)
        }
      })
    },

    lab_table_items(id){
      let tbl_items = []
      this.table_items.forEach(el => {
        tbl_items.push(el.id)
      })
      return this.tab_items.filter(e => e.mod_id == id && !tbl_items.includes(e.id))
    }
  }
}
</script>

<style scoped>
</style>