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
              <v-select v-model="gender_selected.value" :items="gender" hide-details item-text="text" item-value="value" label="Gender"></v-select>
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
              <v-text-field dense outlined readonly hide-details label="Status" color="orange" value="Pending"></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-divider vertical inset></v-divider>

        <v-col cols="6">
          <v-row no-gutters>
            <v-col :cols="cols" class="pa-0 pr-2">
              <v-text-field readonly hide-details label="Physician"></v-text-field>
            </v-col>
            
            <v-col cols="2" class="pa-0 pr-2">
              <v-select v-model="discount_selected.value" @change="discount_changed()" :items="discount" hide-details item-text="text" item-value="value" label="Discount type"></v-select>
            </v-col>
            <v-col v-if="cols == 5" cols="3" class="pa-0 pr-2">
              <v-text-field hide-details label="Remarks"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field :readonly="readonly" hide-details label="Percentage" v-model="patient_info.discount_percent" suffix="%"></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters class="pt-3">
            <v-col cols="6">
              <v-btn color="primary" class="mr-2" @click="btnsave()">SAVE</v-btn>
              <v-btn color="error">CANCEL</v-btn>
            </v-col>

            <v-col cols="3" class="pr-2">
              <v-text-field dense outlined hide-details filled @keypress="cash_keypress()" label="Cash" v-model="patient_info.totalcash" placeholder="0.00"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field dense outlined readonly hide-details filled label="Total Fee" v-model="patient_info.totalfee"></v-text-field>
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
                  <v-col cols="4">
                    <v-combobox v-model="chips_selected" :items="item.submodules" chips clearable label="Select Laboratory Test"
                      multiple prepend-icon="mdi-filter-variant" solo>
                      <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip color="primary" outlined dark v-bind="attrs" :input-value="selected" close @click="select" @click:close="removechips(item)">
                          <strong>{{ item.text }}</strong>
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                  
                  <v-col cols="8">
                    <v-card>
                      <v-card-title class="justify-center" >
                          <h4>{{ item.title }} Result</h4>
                      </v-card-title>
                      <v-card-text>
                        <v-data-table dense flat disable-sort v-model="table_selected" :search="chips_selected" item-key="id" :headers="table_headers" :items="item.subsubmodules" :loading="loading"  loading-text="Loading... Please wait">
                          
                        
                        
                          <template v-slot:[`item.result`]="props">
                            <v-chip color="primary" dark outlined label>
    
                              <v-edit-dialog :return-value.sync="props.item.result" @save="save" @cancel="cancel" @open="open" @close="close">
                              {{ props.item.result }}
                                <template v-slot:input>
                                  <v-text-field v-model="props.item.result" label="Edit" single-line dense hide-details></v-text-field>
                                </template>
                              </v-edit-dialog>

                            </v-chip>
                          </template>

                          

                          <!-- 
                          <template v-slot:[`item.sub_result`]="props">
                            <v-chip color="primary" dark outlined label>
                              
                              <v-edit-dialog :return-value.sync="props.item.sub_result" @save="save" @cancel="cancel" @open="open" @close="close">
                              {{ props.item.sub_result }}
                                <template v-slot:input>
                                  <v-text-field :disabled="props.item.sub_test > 0 ? false : true" v-model="props.item.sub_result" label="Edit" single-line dense hide-details></v-text-field>
                                </template>
                              </v-edit-dialog>

                            </v-chip>
                          </template> -->
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  
                </v-row>
                
              </v-card-text>
          </v-tab-item>
      </v-tabs-items>

      
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: 'Patient_form',
    data(){
      return{
        table_selected: '',
        chips_selected: [],
        chip_items: [
          {text: 'item 1', value: 'item1', amount: '10'},
          {text: 'item 2', value: 'item2', amount: '20'},
          {text: 'item 3', value: 'item3', amount: '30'},
        ],
        tab: null,
        loading: false,
        cols: 8,
        readonly: true,
        table_items: [],
        tab_headers: [],
        default_tab_headers: [],
        discount: [
          { text: 'Senior', value: 'senior'},
          { text: 'PWD', value: 'pwd'},
          { text: 'Others', value: 'others'}
        ],
        gender: [
          { text: 'Male', value: 'm' },
          { text: 'Female', value: 'f' }
        ],
        table_headers:[
          { text: 'ID', value: 'submod_id', align: 'center'},
          { text: 'status', value: 'status', align: 'center', filterable: false},
          { text: 'Title', value: 'title', align: 'left', filterable: false},
          { text: 'Result', value: 'result', align: 'center', filterable: false},
          { text: 'Actions', value: 'actions', align: 'center', filterable: false},
        ],
        patient_info: {
          id: '', firstname: '',lastname: '',middlename: '', age: '', gender: '', 
          status: '', contact: '', address: '', discount_percent: '', totalcash: 0, totalfee: 0
        },

        list: []
      }
    },

    created() {
      if(this.$route.query.stat == 'C'){
        this.loadPatient()
        this.loadLabModule()
      }else{
        this.loadAppointment()
        this.loadLabModule()
      }
    },

    computed: {
      fullname(){
        var fullname = this.patient_info.lastname + ', ' + this.patient_info.firstname + ' ' + this.patient_info.middlename
        return fullname.toUpperCase()
      },
      discount_selected(){
        return { value: this.patient_info.discount_type }
      },
      gender_selected(){
        return { value: this.patient_info.gender }
      },


    },

    watch: {
      discount_selected(){
        this.cols = this.discount_selected.value == 'others' ? 5 : 8
      },

      // chips_selected(){
      //   this.chips_selected.forEach(element => {
      //     console
      //   })
      // },

    },

    methods:{
      cash_keypress(){
        console.log(this.cash);
      },

      loadPatient(){
        const form_data = new FormData()
        form_data.append('id', this.$route.query.id)

        this.$guest.post('/api/patient/getPatient', form_data)
        .then(res => {
          this.patient_info = Object.assign({}, res.data)
        })
        .catch(err => { console.log(err) })
      },

      loadAppointment(){
        const form_data = new FormData()
        form_data.append('patient_id', this.$route.query.id)
        form_data.append('status', this.$route.query.stat)
        form_data.append('cdate', this.$route.query.cdate)
        
        this.$guest.post('/api/appointment/getAppointment', form_data)
        .then(res => {
          const patientinfo = {
            'firstname': res.data.result.firstname,
            'lastname': res.data.result.lastname,
            'middlename': res.data.result.middlename,
            'age': res.data.result.age,
            'gender': res.data.result.gender,
            'status': res.data.resultstatus,
            'contact': res.data.result.contact,
            'address': res.data.result.address,
            'discount_percent': res.data.result.discount,
            'discount_type': res.data.result.discount_type,
            'totalcash': res.data.result.payment,
            'totalfee': res.data.result.totalamount
          }
          this.patient_info = Object.assign({}, patientinfo)
        })
        .catch(err => { console.log(err) })
      },

      loadLabModule(){
        this.$guest.get('/api/laboratory/loadLabmodule')
        .then(res => {
          if(res.data.status){
            console.log(res.data.modules)
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

      discount_changed(){
        console.log(this.discount_selected.value)
        this.cols = this.discount_selected.value == 'others' ? 5 : 8
      },
      btntest(item){
        console.log(item)
        console.log(this.chips_selected)
      },
      btnsave(){
        // const form_data = new FormData()
        // form_data.append('patient_id', this.$route.query.id)
        // form_data.append('discount_type', this.discount_selected.value)
        // form_data.append('discount_percent', this.discount_percent)
        // form_data.append('total_fee', this.totalfee)
        // form_data.append('total_cash', this.totalcash)

        this.table_selected.forEach(element => {
          if(element.submod_id == 1){
            console.log(this.table_selected)
          }
        })

        // this.$guest.post('/api/appointment/insertAppointment', form_data)
        // .then(res => {
        //   console.log(res.data)
        // })
        // .catch(err => { console.log(err)} )


        //get module
        // this.default_tab_headers.forEach(obj => {
        //   if(obj.submodules.length){
        //     obj.submodules.forEach(submod => {
        //       if(submod.sub_test > 0){
        //         console.log(submod)
        //       }
        //     })
        //   }
        // });
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