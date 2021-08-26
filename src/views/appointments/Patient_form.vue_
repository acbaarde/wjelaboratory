<template>
<div class="ma-n3">
    <!-- <myHeader :title="'Appointments'" :subtitle="'Manage Patient Appointment'" /> -->
    <v-container fluid>
  <v-card flat outlined>
      <Overlay :value="overlay.value" />
    <v-card-title>
      <v-row>
        <v-col cols="7">
          <v-row no-gutters>
            <v-col cols="7" class="pr-2 pa-0">
              <v-text-field readonly hide-details :label="'ID#. ' + patient_info.id" v-model="fullname" prefix="Name:"></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-2 pa-0">
              <!-- <v-select readonly v-model="gender_selected.value" :items="gender" hide-details item-text="text" item-value="value" label="Gender"></v-select> -->
              <v-text-field readonly hide-details label="Gender" v-model="gender"></v-text-field>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-text-field readonly hide-details label="Age" :value="formatAge(patient_info.age,patient_info.agetype)"></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col :cols="cols" class="pa-0 pr-2">
              <v-select v-model="physician_selected.value" @change="physician_changed()" :items="physicians" hide-details item-text="text" item-value="value" label="Physician" :prefix="physicianprefix"></v-select>
            </v-col>
            <v-col cols="3" class="pa-0 pr-2">
              <v-select v-model="discount_selected.value" @change="discount_changed()" :items="discount" hide-details item-text="text" item-value="value" label="Discount type"></v-select>
            </v-col>
            <v-col v-if="cols == 4" cols="3" class="pa-0 pr-2">
              <v-text-field hide-details label="Remarks" v-model="discount_rmks"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field :readonly="readonly" hide-details label="Percentage" v-model="discount_selected.percent" suffix="%"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical inset></v-divider>
        <v-col cols="5">
          <v-row no-gutters>
            <!-- <v-col cols="3" class="pr-2"> -->
              <!-- <v-btn color="green" dark class="mr-2" @click="btnpost()" :disabled="btndisabled">POST</v-btn> -->
              <!-- <v-btn color="green" class="mr-2" @click="btnpost()" disabled>POST</v-btn> -->
            <!-- </v-col> -->
            <v-col cols="3" class="pr-2">
              <v-text-field dense outlined hide-details filled label="Cash" type="number" v-model="patient_info.totalcash" placeholder="0.00"></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-2">
              <v-text-field dense outlined readonly hide-details filled label="Balance" v-model="totalbalance" placeholder="0.00"></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-2">
              <v-text-field dense outlined readonly hide-details filled label="Total" v-model="totalamount" placeholder="0.00"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field dense outlined readonly hide-details filled label="Total Fee" v-model="totalfee" placeholder="0.00"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="pt-4">
            <v-spacer></v-spacer>
            <v-col cols="12" class="text-right">
              <v-btn color="primary" class="mr-2" @click="btnsave()">SAVE</v-btn>
              <v-btn color="error"  class="mr-2" @click="btncancel()">CANCEL</v-btn>
              <v-btn color="green" @click="btnpost()" :disabled="btndisabled">POST</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
    </v-card-title>
    
    <v-card-text>
      <v-divider></v-divider>
      <v-tabs v-model="tab" show-arrows>
          <v-tab v-for="item in tab_headers" :key="item.id">
            {{ item.title }}
          </v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in tab_headers" :key="item.id">
              <v-card-text>
                <v-row no-gutters dense>
                  <v-col>
                    <v-combobox v-model="chips_selected" :items="item.submodules" item-text="text" item-value="value" chips clearable dense label="Select Laboratory Test"
                      multiple prepend-icon="mdi-filter-variant" solo>
                      <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip color="primary" outlined dark v-bind="attrs" :input-value="selected" close @click="select" @click:close="removechips(item)">
                          <strong>{{ item.text }}</strong>
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                </v-row>  
                <v-row no-gutters dense>
                  <v-col>
                    <v-card>
                      <v-card-title class="justify-center" >
                          <h4>{{ item.title }} RESULT</h4>
                      </v-card-title>
                      <v-card-text>
                        <v-data-table dense flat disable-sort item-key="id" :items-per-page="-1" :headers="table_headers" :items="table_items" :loading="loading"  loading-text="Loading... Please wait">
                          
                          <!-- <template v-slot:[`item.result`]="props">
                            <v-chip color="primary" dark outlined label>
    
                              <v-edit-dialog :return-value.sync="props.item.result" @save="save(props.item)" @cancel="cancel" @open="open" @close="close">
                              {{ props.item.result }}
                                <template v-slot:input>
                                  <v-text-field v-model="props.item.result" label="Edit" single-line dense hide-details></v-text-field>
                                </template>
                              </v-edit-dialog>

                            </v-chip>
                          </template> -->

                          <template v-slot:[`item.result`]="props">
                            <v-text-field v-model="props.item.result" :disabled="$session.get('userposnid-session') == '1' ? false : true" single-line dense hide-details outlined></v-text-field>
                          </template>

                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  
                </v-row>
                
              </v-card-text>
          </v-tab-item>
      </v-tabs-items>
    </v-card-text>

    <!-- <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="70"></v-progress-circular> -->
      <!-- <strong>Please wait...</strong>  -->
      <!-- <v-card>
        <v-card-text>
        <v-container>
          <v-row>
              <v-col cols="3" class="d-flex justify-center">
                <v-progress-circular indeterminate size="40"></v-progress-circular>
              </v-col>
              <v-col cols="9" class="d-flex justify-center"><h2>Please wait...</h2></v-col>
          </v-row>
        </v-container>
        </v-card-text>
      </v-card> -->
    <!-- </v-overlay> -->
  </v-card>
  </v-container>
  </div>
</template>

<script>
// import myHeader from '../../components/myHeader.vue'
import Overlay from '../../components/Overlay.vue'
export default {
    name: 'Patient_form',
    components: { Overlay },
    data(){
      return{
        overlay: {
          value: false
        },
        chips_selected: [],
        comboboxvalue: [],
        tab: 0,
        loading: false,
        cols: 7,
        readonly: true,
        tab_headers: [],
        default_tab_headers: [],
        discount: [],
        discount_selected:[],
        discount_rmks: '',
        physicians: [],
        physician_selected: [],
        table_headers:[
          { text: 'Category', value: 'submod_title', align: 'left' },
          { text: 'Description', value: 'title', align: 'left' },
          { text: 'Range', value: 'result_range', align: 'center' },
          { text: 'Result', value: 'result', align: 'center' },
        ],
        patient_info: {
          id: '', appointment_id: 0, firstname: '',lastname: '',middlename: '', age: '',agetype: '', gender: '', 
          status: '', contact: '', address: '', totalcash: 0, totalfee: 0, totalbalance: 0, totalamount: 0, physician_id: 0
        },
      }
    },
    beforeCreate: function(){
        if(!this.$session.has('user-session')){
            this.$router.push('/login');
        }
    },

    created() {
      if(this.$route.query.stat == 'C'){
        this.loadPatient()
        // this.loadLabModule()
      }else{
        this.loadAppointment()
        // this.loadLabModule()
      }
    },

    computed: {
      fullname(){
        var fullname = this.patient_info.lastname + ', ' + this.patient_info.firstname + ' ' + this.patient_info.middlename
        return fullname.toUpperCase()
      },
      gender(){
        return this.patient_info.gender == 'M' ? 'Male' : 'Female'
      },
      table_items(){
        return this.tab_headers[this.tab]["subsubmodules"].filter(e => this.comboboxvalue.includes(e.submod_id))
      },
      patient_status(){
        return this.patient_info.status == 'P' ? 'Pending' : 'For Released'
      },
      physicianprefix(){
        return this.physician_selected.gender == 'F' ? 'Dra.' : 'Dr.'
      },

      totalbalance(){
        if(parseInt(this.patient_info.totalcash) > parseInt(this.totalamount)){
          return (this.patient_info.totalcash - this.totalamount) > 0 ? (this.patient_info.totalcash - this.totalamount).toFixed(2) : ""
        }else{
          return ''
        }
      },

      totalamount(){
        // let totalsum = []
        // if(this.chips_selected.length > 0){
        //   this.chips_selected.forEach(e => {
        //     totalsum.push(parseInt(e.amount))
        //   })
        // }
        // let total =  totalsum.length ? totalsum.reduce((total, value) => total + value) : '0.00'
        // return total > 0 ? (total - ((this.discount_selected.percent/100) * total)).toFixed(2) : '0.00'
        let total = Object.values(this.chips_selected).reduce((total, { amount }) => total + parseFloat(amount), 0).toFixed(2)
        let percent = typeof this.discount_selected.percent == 'undefined' ? 0 : this.discount_selected.percent
        return total > 0 ? (total - ((percent/100) * total)).toFixed(2) : '0.00'
      },

      totalfee(){
        // let totalsum = []
        // if(this.chips_selected.length > 0){
        //   this.chips_selected.forEach(e => {
        //     totalsum.push(parseInt(e.amount))
        //   })
        // }
        // return totalsum.length ? totalsum.reduce((total, value) => total + value).toFixed(2) : '0.00'
        return Object.values(this.chips_selected).reduce((total, { amount }) => total + parseFloat(amount), 0).toFixed(2)
      },

      btndisabled(){
        return this.$route.query.stat == 'F' ? false : true
      }
    },

    watch: {
      discount_selected(){
        if(this.discount_selected.value == 'others'){
          this.cols = 4
          this.readonly = false
        }else{
          this.cols = 7
          this.readonly = true
          this.discount_rmks =''
        }
      },
      chips_selected(){
        this.comboboxvalue = []
        this.chips_selected.forEach(e => {
          this.comboboxvalue.push(e.value)
        })
      },
    },

    methods:{
      async loadPatient(){
        this.overlay.value = true
        let data = {
          id: this.$route.query.id
        }
        await this.$guest.post('/api/patient/getPatient', this.$form_data.generate(data))
        .then(res => {
          this.patient_info = Object.assign({}, res.data.patient)
          this.discount = Object.assign([], res.data.discount)
          this.discount.push({ value: '', text: 'No Discount', percent: 0 })
          this.physicians = Object.assign([], res.data.physicians)
          this.loadLabModule()
        })
        .catch(err => { console.log(err) })
      },

      async loadAppointment(){
        this.overlay.value = true
        let data = {
          patient_id: this.$route.query.id,
          status: this.$route.query.stat,
          cdate: this.$route.query.cdate
        }
        
        await this.$guest.post('/api/appointment/getAppointment', this.$form_data.generate(data))
        .then(res => {
          const patientinfo = {
            'id': res.data.patient.id,
            'appointment_id': res.data.patient.appointment_id,
            'firstname': res.data.patient.firstname,
            'lastname': res.data.patient.lastname,
            'middlename': res.data.patient.middlename,
            'age': res.data.patient.age,
            'agetype': res.data.patient.agetype,
            'gender': res.data.patient.gender,
            'status': res.data.patient.status,
            'contact': res.data.patient.contact,
            'address': res.data.patient.address,
            'totalcash': res.data.patient.cash,
            'totalbalance': res.data.patient.balance,
            'totalfee': res.data.patient.totalfee,
            'totalamount': res.data.patient.totalamount,
            'physician_id': res.data.patient.physician_id,
          }
          this.patient_info = Object.assign({}, patientinfo)
          this.discount = Object.assign([], res.data.discount)
          const disc_sel = {
              'value': res.data.patient.discount_type,
              'percent': res.data.patient.discount
            }
          this.discount_selected = Object.assign({}, disc_sel)
          this.discount.push({ value: '', text: 'No Discount', percent: 0 })
          this.discount_rmks = res.data.patient.discount_rmks

          this.physicians = Object.assign([], res.data.physicians)
          const phy_sel = {
            'value': res.data.patient.physician_id,
            'gender': res.data.patient.physician_gender,
          }
          this.physician_selected = Object.assign({}, phy_sel)
          this.comboboxvalue = res.data.patient.submod_id.split(",")
          this.chips_selected = res.data.chips_selected
          
          this.loadLabModule()
        })
        .catch(err => { console.log(err) })
      },

      async loadLabModule(){
        let data = {
          appointment_id: this.patient_info.appointment_id
        }
        await this.$guest.post('/api/laboratory/loadLabmodule', this.$form_data.generate(data))
        .then(res => {
          this.overlay.value = false
          if(res.data.status){
            this.default_tab_headers = res.data.modules
            this.tab_headers = Object.assign({}, this.default_tab_headers)
          }
        })
        .catch(err => { console.log(err) })
      },

      save(){
        console.log("save")
      },
      cancel(){
        console.log("cancel")
      },
      open(){
        console.log("open")
      },
      close(){
        console.log("close")
      },

      refreshPage(){
        window.location.reload()
      },

      discount_changed(){
        this.cols = this.discount_selected.value == 'others' ? 5 : 8
        this.discount.forEach(e => {
          if(e.value == this.discount_selected.value){
            const disc_sel = {
              'value': e.value,
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

      btncancel(){
        this.$router.push('/appointments/view')
      },
      btnpost(){
        let data = {
          appointment_id: this.patient_info.appointment_id,
          user_id: this.$session.get('userid-session')
        }
        this.$guest.post('/api/appointment/postAppointment', this.$form_data.generate(data))
        .then(res => {
          if(res.data.status == true){
            this.$router.push({ name: 'Appointments' })
          }
        })
        .catch(err => { console.log(err) })

      },
      async btnsave(){
        this.overlay.value = true
        const modresult = []
        const mods = Object.assign([], this.tab_headers)
        mods.forEach(el => {
          const subsubmodules = el.subsubmodules.filter(e => this.comboboxvalue.includes(e.submod_id))
          if(subsubmodules.length > 0){
            subsubmodules.forEach(sub_el => {
              modresult.push(sub_el)
            })
          }
        })

        let data = {
          appointment_id: this.patient_info.appointment_id,
          patient_id: this.$route.query.id,
          physician_id: this.physician_selected.value,
          discount_type: typeof this.discount_selected.value !== 'undefined' ? this.discount_selected.value : '',
          discount_rmks: this.discount_rmks,
          discount_percent: this.discount_selected.percent,
          submod_id: this.comboboxvalue,
          total_cash: this.patient_info.totalcash,
          total_balance: this.totalbalance,
          total_amount: this.totalamount,
          total_fee: this.totalfee,
          lab_test: JSON.stringify(modresult),
          cdate: this.$route.query.cdate,
          user_id: this.$session.get('userid-session')
        }
        if(this.$route.query.stat == 'C'){
          await this.$guest.post('/api/appointment/insertAppointment', this.$form_data.generate(data))
          .then(res => {
            this.$router.push({ name: 'Patient_form', query: { id: this.$route.query.id, stat: res.data.stat, cdate: res.data.cdate } })
            this.refreshPage()
          })
          .catch(err => { console.log(err)} )
        }else{
          await this.$guest.post('/api/appointment/updateAppointment', this.$form_data.generate(data))
          .then(res => {
            this.$router.push({ name: 'Patient_form', query: { id: this.$route.query.id, stat: res.data.stat, cdate: res.data.cdate } })
            this.refreshPage()
         })
          .catch(err => { console.log(err)} )
        }
      },

      removechips(item){
        this.chips_selected.splice(this.chips_selected.indexOf(item), 1)
      }
    }
}
</script>

<style>

</style>