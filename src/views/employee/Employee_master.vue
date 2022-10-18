<template>
  <div class="ma-n3">
    <myHeader :title="'Employee Master'" :subtitle="'Manage Employee Master'" />
    <v-container fluid>
    <v-card flat outlined>
      <v-flex md-12 class="ma-2">
        <Overlay :value="overlay.value" />

        <v-data-table :headers="table_headers" :items="table_items" :search="search" dense flat disable-sort :items-per-page="15">
          <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                <v-btn class="ml-2" color="primary" @click="dialog = !dialog" dark>Add Employee</v-btn>
              </v-toolbar>
          </template>

          <template v-slot:[`item.firstname`]="{ item }">
              <p class="text-uppercase ma-0">{{ item.firstname }}</p>
          </template>
          <template v-slot:[`item.lastname`]="{ item }">
              <p class="text-uppercase ma-0">{{ item.lastname }}</p>
          </template>
          <template v-slot:[`item.middlename`]="{ item }">
              <p class="text-uppercase ma-0">{{ item.middlename }}</p>
          </template>
          <template v-slot:[`item.employee_status_id`]="{ item }">
            {{ employee_status.filter(e => e.id == item.employee_status_id)[0]['desc'] }}
          </template>
          <template v-slot:[`item.employment_status_id`]="{ item }">
            {{ employment_status.filter(e => e.id == item.employment_status_id)[0]['desc'] }}
          </template>
          <template v-slot:[`item.position_id`]="{ item }">
            {{ position.filter(e => e.id == item.position_id)[0]['desc'] }}
          </template>
          <template v-slot:[`item.hired_date`]="{ item }">
            {{ formatDate(item.hired_date) }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn dense x-small @click="btn_update(item)" color="primary">UPDATE</v-btn>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" persistent scrollable max-width="90%">        
          <v-card>
            <v-card-title>{{ formTitle }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-2">
                <v-form ref="form">
                    <v-container fluid>
                      <v-stepper vertical width="auto">
                        <v-stepper-step editable step="1">
                          Personal Info
                        </v-stepper-step>
                        <v-stepper-content step="1">
                          <v-container class="pa-0 py-2">
                            <v-row no-gutters>
                              <v-col cols="6" class="pr-2">
                                <v-text-field v-if="itemIndex >= 0" v-model="active_item.id" readonly dense outlined type="text" label="Employee #."></v-text-field>
                                <v-text-field v-model="active_item.firstname" dense outlined type="text" label="First Name" required :rules="firstnameRules"></v-text-field>
                                <v-text-field v-model="active_item.middlename" dense outlined type="text" label="Middle Name" required :rules="middlenameRules"></v-text-field>
                                <v-text-field v-model="active_item.lastname" dense outlined type="text" label="Last Name" required :rules="lastnameRules"></v-text-field>
                                <v-select v-model="active_item.gender" outlined dense :items="gender" item-text="desc" item-value="id" label="Gender" required :rules="genderRules"></v-select>
                                <v-text-field v-model="active_item.birthdate" dense outlined type="date" label="Birth Date" required :rules="birthdateRules"></v-text-field>
                                <v-text-field v-model="active_item.birthplace" dense outlined type="text" label="Birth Place" required :rules="birthplaceRules"></v-text-field>
                                <v-select v-model="active_item.citizenship_id" outlined dense :items="citizenship" item-text="desc" item-value="id" label="Citizenship" required :rules="citizenship_idRules"></v-select>
                                <v-select v-model="active_item.religion_id" outlined dense :items="religion" item-text="desc" item-value="id" label="Religion" required :rules="religion_idRules"></v-select>
                              </v-col>
                              <v-divider vertical></v-divider>
                              <v-col cols="6" class="pl-2">
                                <v-select v-model="active_item.civil_status_id" outlined dense :items="civil_status" item-text="desc" item-value="id" label="Civil Status" required :rules="civil_status_idRules"></v-select>
                                <v-text-field v-model="active_item.contact" v-mask="'####-###-####'" dense outlined type="text" label="Contact #." required :rules="contactRules"></v-text-field>
                                <v-textarea v-model="active_item.permanent_address" outlined dense clearable auto-grow rows="4" row-height="25" label="Permanent Address" required :rules="permanent_addressRules"></v-textarea>
                                <v-textarea v-model="active_item.present_address" outlined dense clearable auto-grow rows="4" row-height="25" label="Present Address" required :rules="present_addressRules"></v-textarea>
                                <v-select v-model="active_item.region_id" outlined dense :items="region" item-text="desc" item-value="id" label="Region" required :rules="region_idRules"></v-select>
                                <v-select v-model="active_item.province_city_id" outlined dense :items="province_city_filtered" item-text="desc" item-value="id" label="Province / City" required :rules="province_city_idRules"></v-select>
                                <v-select v-model="active_item.barangay_town_id" outlined dense :items="barangay_town_filtered" item-text="desc" item-value="id" label="Brgy / Town" required :rules="barangay_town_idRules"></v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-stepper-content>

                        <v-stepper-step editable step="2">
                          Employment Info
                        </v-stepper-step>
                        <v-stepper-content step="2">
                          <v-container class="pa-0 py-2">
                            <v-row no-gutters>
                              <v-col cols="6" class="pr-2">
                                <v-select v-model="active_item.employment_status_id" outlined dense :items="employment_status" item-text="desc" item-value="id" label="Employment Status" required :rules="employment_status_idRules"></v-select>
                                <v-select v-model="active_item.employee_status_id" outlined dense :items="employee_status" item-text="desc" item-value="id" label="Employee Status" required :rules="employee_status_idRules"></v-select>
                                <v-select v-model="active_item.position_id" outlined dense :items="position" item-text="desc" item-value="id" label="Position" required :rules="position_idRules"></v-select>
                                <v-select v-model="active_item.ordinary_restday" outlined dense :items="days" item-text="desc" item-value="id" label="Ordinary Restday" required :rules="ordinary_restday_idRules"></v-select>
                                <v-select v-model="active_item.original_restday" outlined dense :items="days" item-text="desc" item-value="id" label="Original Restday" required :rules="original_restday_idRules"></v-select>
                                <v-text-field v-model="active_item.hired_date" dense outlined type="date" label="Hired Date" required :rules="hired_dateRules"></v-text-field>
                                <v-select v-model="active_item.ws_code" outlined dense :items="work_shift" item-text="desc" item-value="ws_code" label="Work Schedule" required :rules="work_shift_idRules"></v-select>
                              </v-col>
                              <v-divider vertical></v-divider>
                              <v-col cols="6" class="pl-2">
                                <v-text-field v-model="active_item.salary" dense outlined type="number" label="Daily Pay" required :rules="salaryRules"></v-text-field>
                                <v-text-field v-model="active_item.allowance" dense outlined type="number" label="Allowance"></v-text-field>
                                <!-- <v-select v-model="active_item.employment_type_id" outlined dense :items="employment_type" item-text="desc" item-value="id" label="Employment Type" required :rules="employment_type_idRules"></v-select> -->
                                <v-text-field v-model="active_item.sss_no" v-mask="'##-#######-#'" :disabled="field_disabled" dense outlined type="text" label="SSS #."></v-text-field>
                                <v-text-field v-model="active_item.tin_no" v-mask="'###-###-###-###'" :disabled="field_disabled" dense outlined type="text" label="TIN #."></v-text-field>
                                <v-text-field v-model="active_item.hdmf_no" v-mask="'####-####-####'" :disabled="field_disabled" dense outlined type="text" label="HDMF #."></v-text-field>
                                <v-text-field v-model="active_item.philhealth_no" v-mask="'##-#########-#'" :disabled="field_disabled" dense outlined type="text" label="Philhealth #."></v-text-field>
                                <v-text-field v-model="active_item.hold_date" dense outlined type="date" label="Hold Date"></v-text-field>
                                <v-text-field v-model="active_item.separation_date" dense outlined type="date" label="Separation Date"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-stepper-content>
                      </v-stepper>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined color="primary" @click="btn_save">Save</v-btn>
                <v-btn outlined color="error" @click="btn_cancel">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-flex>
      <Snackbar :snackbar="snackbar" />
    </v-card>
    </v-container>
  </div>
</template>

<script>
import myHeader from '../../components/myHeader.vue'
import Overlay from '../../components/Overlay.vue'
import Snackbar from '../../components/Snackbar.vue'
export default {
    name: 'Employee_master',
    components: { myHeader,Overlay,Snackbar },
    data(){
      return{
        overlay: {
          value: false
        },
        snackbar: {
          status: false,
          text: '',
          color: '',
        },
        firstnameRules: [ v => !!v || 'First Name is required' ],
        lastnameRules: [ v => !!v || 'Last Name is required' ],
        middlenameRules: [ v => !!v || 'Middle Name is required' ],
        genderRules: [ v => !!v || 'Please select Gender...' ],
        addressRules: [ v => !!v || 'Address is required' ],
        contactRules: [ v => !!v || 'Contact is required' ],
        employee_status_idRules: [ v => !!v || 'Please select Employee Status...' ],
        employment_status_idRules: [ v => !!v || 'Please select Employment Status...' ],
        position_idRules: [ v => !!v || 'Please select Position...' ],
        salaryRules: [ v => !!v || 'Daily Pay is required' ],
        birthdateRules: [ v => !!v || 'Birth Date is required' ],
        birthplaceRules: [ v => !!v || 'Birth Place is required' ],
        hired_dateRules: [ v => !!v || 'Hired Date is required' ],
        citizenship_idRules: [ v => !!v || 'Please select Citizenship...' ],
        religion_idRules: [ v => !!v || 'Please select Religion...' ],
        permanent_addressRules: [ v => !!v || 'Permanent Address is required' ],
        present_addressRules: [ v => !!v || 'Present Address is required' ],
        region_idRules: [ v => !!v || 'Please select Region...' ],
        province_city_idRules: [ v => !!v || 'Please select Province / City...' ],
        barangay_town_idRules: [ v => !!v || 'Please select Barangay / Town...' ],
        civil_status_idRules: [ v => !!v || 'Please select Civil Status...' ],
        // employment_type_idRules: [ v => !!v || 'Please select Employment Type...' ],
        ordinary_restday_idRules: [ v => !!v || 'Please select Ordinary Restday...' ],
        original_restday_idRules: [ v => !!v || 'Please select Original Restday...' ],
        work_shift_idRules: [ v => !!v || 'Please select Work Schedule...' ],
        dialog: false,
        search: '',
        table_headers:[
          { text: 'Employee #', value: 'id', align: 'center'},
          { text: 'Last Name', value: 'lastname' },
          { text: 'First Name', value: 'firstname' },
          { text: 'Middle Name', value: 'middlename' },
          { text: 'Employee Status', value: 'employee_status_id', align: 'center', filterable: false },
          { text: 'Employment Status', value: 'employment_status_id', align: 'center', filterable: false },
          { text: 'Position', value: 'position_id', align: 'center', filterable: false },
          { text: 'Actions', value: 'actions', align: 'center', filterable: false},
        ],
        gender: [],
        citizenship:[],
        religion:[],
        region:[],
        province_city:[],
        barangay_town:[],
        civil_status:[],
        employment_status: [],
        employee_status: [],
        // employment_type: [],
        position: [],
        table_items: [],
        work_shift: [],
        days:[
          { id: 'Mon', desc: 'Monday' },
          { id: 'Tue', desc: 'Tuesday' },
          { id: 'Wed', desc: 'Wednesday' },
          { id: 'Thu', desc: 'Thursday' },
          { id: 'Fri', desc: 'Friday' },
          { id: 'Sat', desc: 'Saturday' },
          { id: 'Sun', desc: 'Sunday' }
        ],
        itemIndex: -1,
        active_item: {
          id: 0, 
          firstname: '', 
          lastname: '', 
          middlename: '', 
          gender: '', 
          address: '', 
          contact: '', 
          employee_status_id: '', 
          employment_status_id: '', 
          position_id: '', 
          salary: 0, 
          allowance: 0,
          birthdate: '',
          birthplace: '',
          hired_date: '', 
          hold_date: '', 
          separation_date: '',
          citizenship_id: '',
          religion_id: '',
          permanent_address: '',
          present_address: '',
          region_id: '',
          province_city_id: '',
          barangay_town_id: '',
          civil_status_id: '',
          // employment_type_id: '',
          sss_no: '',
          tin_no: '',
          hdmf_no: '',
          philhealth_no: '',
          ordinary_restday: '',
          original_restday: '',
          ws_code: '',
        },
        employee_details: {
          id: 0, 
          firstname: '', 
          lastname: '', 
          middlename: '', 
          gender: '', 
          address: '', 
          contact: '', 
          employee_status_id: '', 
          employment_status_id: '', 
          position_id: '', 
          salary: 0, 
          allowance: 0,
          birthdate: '',
          birthplace: '', 
          hired_date: '', 
          hold_date: '', 
          separation_date: '',
          citizenship_id: '',
          religion_id: '',
          permanent_address: '',
          present_address: '',
          region_id: '',
          province_city_id: '',
          barangay_town_id: '',
          civil_status_id: '',
          // employment_type_id: '',
          sss_no: '',
          tin_no: '',
          hdmf_no: '',
          philhealth_no: '',
          ordinary_restday: '',
          original_restday: '',
          ws_code: '',
        }
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
      this.overlay.value = true
      this.loadDataMaintenance()
    },
    computed:{
      formTitle(){
        return this.itemIndex === -1 ? 'New Employee' : 'Update Employee'
      },
      field_disabled(){
        return this.active_item.employment_status_id == 'R' ? false : true
      },
      province_city_filtered(){
        return this.province_city.filter(e => e.region_id == this.active_item.region_id).sort((a,b) => a.desc - b.desc)
          .sort((a,b) => {
              if(a.desc < b.desc)
                return -1;
              if(a.desc > b.desc)
                return 1;
              return 0;
            }
          )
      },
      barangay_town_filtered(){
        return this.barangay_town.filter(e => e.province_city_id == this.active_item.province_city_id)
          .sort((a,b) => {
              if(a.desc < b.desc)
                return -1;
              if(a.desc > b.desc)
                return 1;
              return 0;
            }
          )
      }
    },
    methods: {
      async loadDataMaintenance(){
        await this.$guest.get('/api/data_maintenance/loadDatamaintenance')
        .then(res => {
          this.gender = res.data.gender
          this.position = res.data.position
          this.employee_status = res.data.employee_status
          this.employment_status = res.data.employment_status
          // this.employment_type = res.data.employment_type
          this.citizenship = res.data.citizenship
          this.religion = res.data.religion
          this.region = res.data.region
          this.province_city = res.data.province_city
          this.barangay_town = res.data.barangay_town
          this.civil_status = res.data.civil_status
          this.work_shift = res.data.work_shift
          this.initialize()
        })
        .catch(err => { console.log(err) })
      },

      async initialize(){
        await this.$guest.get('/api/employee/getEmployees')
        .then(res => {
          this.table_items = res.data
          this.overlay.value = false
        })
        .catch(err => { console.log(err) })
      },

      btn_update(item){
        this.itemIndex = this.table_items.indexOf(item)
        this.active_item = Object.assign({}, item)
        this.dialog = true
      },
      async btn_save(){
        if(this.$refs.form.validate()){
          this.dialog = false
          this.overlay.value = true
          this.active_item['user_id'] = this.$session.get('userid-session') 
          let url = this.itemIndex == -1 ? '/api/employee/insertEmployee' : '/api/employee/updateEmployee'
          await this.$guest.post(url, this.$form_data.generate(this.active_item))
          .then(() => {
            this.snackbar.status = true
            this.snackbar.color = "success"
            this.snackbar.text = this.itemIndex == -1 ? 'Record(s) saved successfully!' : 'Record(s) updated successfully!'
            setTimeout(() => {
              this.refreshPage()
            },1500)
          })
          .catch(err => { console.log(err) })
        }
      },
      btn_cancel(){
        this.dialog = !this.dialog
        this.$refs.form.reset()
        this.itemIndex = -1
        this.active_item = Object.assign({}, this.employee_details)
      },
      refreshPage(){
        window.location.reload()
      },
    }
}
</script>

<style scoped>

</style>