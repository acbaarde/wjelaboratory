<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="6">
          <v-row no-gutters>
            <v-col cols="7" class="pr-2 pa-0">
              <v-text-field readonly hide-details label="Patient" v-model="fullname"></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-2 pa-0">
              <!-- <v-select readonly v-model="gender_selected.value" :items="gender" hide-details item-text="text" item-value="value" label="Gender"></v-select> -->
              <v-text-field readonly hide-details label="Gender" v-model="gender"></v-text-field>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-text-field readonly hide-details label="Age" v-model="patient_info.age" :suffix="patient_info.age >= 1 ? 'yrs.' : 'mos'"></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters class="pt-3">
            <v-col cols="9" class="pa-0 mt-2 pr-2">
              <v-text-field dense readonly hide-details label="Address" v-model="patient_info.address"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="pa-0">
              <v-text-field dense outlined readonly hide-details label="Status" color="orange" v-model="patient_status"></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-divider vertical inset></v-divider>

        <v-col cols="6">
          <v-row no-gutters>
            <v-col :cols="cols" class="pa-0 pr-2">
              <!-- <v-text-field readonly hide-details label="Physician" v-model="patient_info.physician_name" :prefix="physicianprefix"></v-text-field> -->
              <v-select v-model="physician_selected.value" @change="physician_changed()" :items="physicians" hide-details item-text="text" item-value="value" label="Physician" :prefix="physicianprefix"></v-select>
            </v-col>
            
            <v-col cols="2" class="pa-0 pr-2">
              <v-select v-model="discount_selected.value" @change="discount_changed()" :items="discount" hide-details item-text="text" item-value="value" label="Discount type"></v-select>
            </v-col>
            <v-col v-if="cols == 5" cols="3" class="pa-0 pr-2">
              <v-text-field hide-details label="Remarks" v-model="discount_rmks"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field :readonly="readonly" hide-details label="Percentage" v-model="discount_selected.percent" suffix="%"></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters class="pt-3">
            <v-col cols="6">
              <v-btn color="primary" class="mr-2" @click="btnsave()">SAVE</v-btn>
              <v-btn color="error" @click="btncancel()">CANCEL</v-btn>
            </v-col>

            <v-col cols="3" class="pr-2">
              <v-text-field dense outlined hide-details filled @keypress="cash_keypress()" label="Cash" type="number" v-model="patient_info.totalcash" placeholder="0.00"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field dense outlined readonly hide-details filled label="Total Fee" v-model="totalfee" placeholder="0.00"></v-text-field>
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
                <v-row>
                  <v-col cols="6">
                    <v-combobox v-model="chips_selected" :items="item.submodules" item-text="text" item-value="value" chips clearable label="Select Laboratory Test"
                      multiple prepend-icon="mdi-filter-variant" solo>
                      <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip color="primary" outlined dark v-bind="attrs" :input-value="selected" close @click="select" @click:close="removechips(item)">
                          <strong>{{ item.text }}</strong>
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                  
                  <v-col cols="6">
                    <v-card>
                      <v-card-title class="justify-center" >
                          <h4>{{ item.title }} Result</h4>
                      </v-card-title>
                      <v-card-text>
                        <v-data-table dense flat disable-sort item-key="id" :items-per-page="-1" :headers="table_headers" :items="table_items" :loading="loading"  loading-text="Loading... Please wait">
                          
                          <template v-slot:[`item.result`]="props">
                            <v-chip color="primary" dark outlined label>
    
                              <v-edit-dialog :return-value.sync="props.item.result" @save="save(props.item)" @cancel="cancel" @open="open" @close="close">
                              {{ props.item.result }}
                                <template v-slot:input>
                                  <v-text-field v-model="props.item.result" label="Edit" single-line dense hide-details></v-text-field>
                                </template>
                              </v-edit-dialog>

                            </v-chip>
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

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="70"></v-progress-circular>
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
    </v-overlay>
  </v-card>
</template>

<script>
export default {
    name: 'Patient_form',
    data(){
      return{
        overlay: false,
        chips_selected: [],
        comboboxvalue: [],
        tab: 0,
        loading: false,
        cols: 8,
        readonly: true,
        tab_headers: [],
        default_tab_headers: [],
        discount: [],
        discount_selected:[],
        discount_rmks: '',
        physicians: [],
        physician_selected: [],
        table_headers:[
          { text: 'Title', value: 'title', align: 'left'},
          { text: 'Result', value: 'result', align: 'center'},
        ],
        patient_info: {
          id: '', appointment_id: 0, firstname: '',lastname: '',middlename: '', age: '', gender: '', 
          status: '', contact: '', address: '', totalcash: 0, totalfee: 0, physician_id: 0
        },
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
        return this.patient_info.gender == 'm' ? 'Male' : 'Female'
      },
      table_items(){
        return this.tab_headers[this.tab]["subsubmodules"].filter(e => this.comboboxvalue.includes(e.submod_id))
      },
      patient_status(){
        return this.patient_info.status == 'P' ? 'Pending' : 'For Released'
      },
      physicianprefix(){
        return this.physician_selected.gender == 'f' ? 'Dra.' : 'Dr.'
      },

      totalfee(){
        const totalsum = []
        if(this.chips_selected.length > 0){
          this.chips_selected.forEach(e => {
            totalsum.push(parseInt(e.amount))
          })
        }
        let total =  totalsum.length ? totalsum.reduce((total, value) => total + value) : '0.00'
        return (total - ((this.discount_selected.percent/100) * total)).toFixed(2) 
      },
    },

    watch: {
      discount_selected(){
        if(this.discount_selected.value == 'others'){
          this.cols = 5
          this.readonly = false
        }else{
          this.cols = 8
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

      // overlay(val){
      //   val && setTimeout(() => {
      //     this.overlay = false
      //   }, 5000)
      // }

    },

    methods:{

      click(){
        console.log(this.chips_selected)
      },
      cash_keypress(){
        console.log(this.cash);
      },

      async loadPatient(){
        const form_data = new FormData()
        form_data.append('id', this.$route.query.id)

        await this.$guest.post('/api/patient/getPatient', form_data)
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
        const form_data = new FormData()
        form_data.append('patient_id', this.$route.query.id)
        form_data.append('status', this.$route.query.stat)
        form_data.append('cdate', this.$route.query.cdate)
        
        await this.$guest.post('/api/appointment/getAppointment', form_data)
        .then(res => {
          const patientinfo = {
            'id': res.data.patient.id,
            'appointment_id': res.data.patient.appointment_id,
            'firstname': res.data.patient.firstname,
            'lastname': res.data.patient.lastname,
            'middlename': res.data.patient.middlename,
            'age': res.data.patient.age,
            'gender': res.data.patient.gender,
            'status': res.data.patient.status,
            'contact': res.data.patient.contact,
            'address': res.data.patient.address,
            'totalcash': res.data.patient.payment,
            'totalfee': res.data.patient.totalamount,
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
        const form_data = new FormData()
        form_data.append('appointment_id', this.patient_info.appointment_id)
        await this.$guest.post('/api/laboratory/loadLabmodule', form_data)
        .then(res => {
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
        // this.$router.push('/appointments')
        this.overlay = true
      },
      async btnsave(){
        this.overlay = true
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
        const form_data = new FormData()
        form_data.append('appointment_id', this.patient_info.appointment_id)
        form_data.append('patient_id', this.$route.query.id)
        form_data.append('physician_id', this.physician_selected.value)
        form_data.append('discount_type', this.discount_selected.value)
        form_data.append('discount_rmks', this.discount_rmks)
        form_data.append('discount_percent', this.discount_selected.percent)
        form_data.append('submod_id', this.comboboxvalue)
        form_data.append('total_fee', this.totalfee)
        form_data.append('total_cash', this.patient_info.totalcash)
        form_data.append('lab_test', JSON.stringify(modresult))

        if(this.$route.query.stat == 'C'){
          await this.$guest.post('/api/appointment/insertAppointment', form_data)
          .then(res => {
            console.log(res.data)
            this.$router.push({ name: 'Patient_form', query: { id: this.$route.query.id, stat: res.data.stat, cdate: res.data.cdate } })
            
            this.refreshPage()
          })
          .catch(err => { console.log(err)} )
        }else{
          form_data.append('cdate', this.$route.query.cdate)
          await this.$guest.post('/api/appointment/updateAppointment', form_data)
          .then(res => {
            console.log(res.data)
            this.$router.push({ name: 'Patient_form', query: { id: this.$route.query.id, stat: res.data.stat, cdate: res.data.cdate } })
            
            this.refreshPage()
         })
          .catch(err => { console.log(err)} )
        }

        // const form_data = new FormData()
        // form_data.append('lab_test', JSON.stringify(modresult))
        // this.$guest.post('/api/appointment/insertmod', form_data)
        //   .then(res => {
        //     console.log(res.data)
        //     // this.$router.push('/appointments')
        //   })
        //   .catch(err => { console.log(err)} )
      },

      removechips(item){
        // console.log(item)
        this.chips_selected.splice(this.chips_selected.indexOf(item), 1)
        // this.chips = [...this.chips]
      }
    }
}
</script>

<style>

</style>