<template>
  <v-container fluid>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="70"></v-progress-circular>
    </v-overlay>
    <v-row dense no-gutters class="d-flex justify-space-between align-center mb-2">
      <div>
        <v-btn class="mr-2" text color="primary" @click="btn_entry()" v-if="$session.get('user-access').filter(e=> e.mod_id == 34).length"><v-icon left>mdi-plus</v-icon><span>CREATE REQUEST</span></v-btn>
        <v-btn class="mr-2" text color="warning" @click="census_dialog=true"><v-icon left>mdi-chart-bar-stacked</v-icon><span>CENSUS</span></v-btn>
        <v-btn class="mr-2" text color="success" @click="refresh()"><v-icon left>mdi-refresh</v-icon><span>REFRESH</span></v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn text><v-icon left>mdi-calendar-today</v-icon><h4>{{ DateNow() }}</h4></v-btn>
    </v-row>
    <v-row dense class="mb-2">
      <v-col v-for="(item, i) in items" :key="i" :cols="(12/item.length)">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-card :color="item.color" v-bind="attrs" v-on="on" dark height="100%" rounded="xl" class="flexcard">
              <v-container fluid class="pa-0 mb-10">
                <v-row dense>
                  <v-col cols="8">
                    <v-card-title class="mb-2">
                      <span><h1>{{ formatAmount(item.count) }}</h1></span>
                    </v-card-title>
                    <v-card-subtitle><span>{{ item.title }}</span></v-card-subtitle>
                  </v-col>
                  <v-col class="d-flex justify-center align-center">
                    <v-icon x-large>{{ item.icon }}</v-icon>
                  </v-col>
                </v-row>
              </v-container>
              <v-spacer></v-spacer>
              <v-card-actions color="success" style="background: #98989863;">
                <v-btn block small text @click="btn_view(item.id)">MORE INFO<v-icon right>mdi-arrow-right-drop-circle-outline</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </template>
          <span>{{ item.tooltip }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row dense class="mb-2">
      <v-col v-for="(item, i) in row_item_2" :key="i" :cols="(12/item.length)">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-card :color="item.color" v-bind="attrs" v-on="on" dark height="100%" rounded="lg" class="flexcard">
              <v-container fluid class="pa-0">
                <v-row dense>
                  <v-col cols="8">
                    <v-card-title class="mb-2">
                      <span><h2>{{ formatAmountWDec(item.count) }}</h2></span>
                    </v-card-title>
                    <v-card-subtitle><span>{{ item.title }}</span></v-card-subtitle>
                  </v-col>
                  <v-col class="d-flex justify-center align-center">
                    <v-icon x-large>{{ item.icon }}</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </template>
          <span>{{ item.tooltip }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row dense class="mb-2">
      <v-col v-for="(item, i) in row_item_3" :key="i" cols="3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-card :color="item.color" v-bind="attrs" v-on="on" dark height="100%" rounded="lg" class="flexcard">
              <v-container fluid class="pa-0">
                <v-row dense>
                  <v-col cols="8">
                    <v-card-title class="mb-2">
                      <span><h3>{{ formatAmount(item.count) }}</h3></span>
                    </v-card-title>
                    <v-card-subtitle><span>{{ item.title }}</span></v-card-subtitle>
                  </v-col>
                  <v-col class="d-flex justify-center align-center">
                    <v-icon x-large>{{ item.icon }}</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </template>
          <span>{{ item.tooltip }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-dialog v-model="census_dialog" width="100%" persistent scrollable>
      <v-card>
        <v-card-title>
          <span>{{ datetext.toUpperCase() }} CENSUS</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="census_dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <CustomChart :chart-data="chartData" :styles="chartStyles" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="100%" scrollable persistent>
      <v-card v-if="card_id == 1">
        <v-card-title>
          <span>{{ items.filter(e=>e.id==card_id)[0].title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="request_table_headers" :items="pending_items()" dense>
            <template v-slot:[`item.fullname`]="{item}">
              {{ item.lastname + ', ' + item.firstname + ' ' + item.middlename }}
            </template>
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at).substring(13,22) }}
            </template>
            <template v-slot:[`item.actions`] = "{ item }">
              <v-btn x-small color="primary" @click="btn_open(item)">VIEW</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 2">
        <v-card-title>
          <span>{{ items.filter(e=>e.id==card_id)[0].title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="released_table_headers" :items="forrealeased_items" dense>
            <template v-slot:[`item.fullname`]="{item}">
              {{ item.lastname + ', ' + item.firstname + ' ' + item.middlename }}
            </template>
            <template v-slot:[`item.status`] = "{ item }">
              <div><span :style="item.status=='DONE'? 'color:#4caf50' : 'color:#fb8c00'">{{ item.status }}</span></div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 3">
        <v-card-title>
          <span>{{ items.filter(e=>e.id==card_id)[0].title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="approval_table_headers" :items="request_approval_items()" dense>
            <template v-slot:[`item.fullname`]="{item}">
              {{ item.lastname + ', ' + item.firstname + ' ' + item.middlename }}
            </template>
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at).substring(13,22) }}
            </template>
            <template v-slot:[`item.approved`] = "{ item }">
              <div v-if="item.approved=='Y'"><span style="color:#4caf50">APPROVED</span></div>
              <div v-if="item.approved=='N'"><span style="color:#ff5252">REJECTED</span></div>
              <div v-if="item.approved==''"><span>PENDING</span></div>
            </template>
            <template v-slot:[`item.actions`] = "{ item }">
              <div v-if="item.approved==''">
                <v-btn x-small class="mr-1" color="info" @click="btn_open(item)">VIEW</v-btn>
                <v-btn x-small class="mr-1" color="success" @click="btn_approvedReject(item,'approved')">APPROVED</v-btn>
                <v-btn x-small color="error" @click="btn_approvedReject(item,'reject')">REJECT</v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 4">
        <v-card-title>
          <span>{{ items.filter(e=>e.id==card_id)[0].title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="all_table_headers" :items="total_patient_items" dense>
            <template v-slot:[`item.fullname`]="{item}">
              {{ item.lastname + ', ' + item.firstname + ' ' + item.middlename }}
            </template>
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at).substring(13,22) }}
            </template>
            <template v-slot:[`item.actions`] = "{ item }">
              <v-btn x-small color="primary" @click="btn_open(item)">VIEW</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 5">
        <v-card-title>
          <span>{{ items.filter(e=>e.id==card_id)[0].title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="sendout_table_headers" :items="forsendout_items" dense>
            <template v-slot:[`item.status_text`] = "{ item }">
              <div><span :style="item.status_text=='PENDING'? 'color:#fb8c00' : 'color:#4caf50'">{{ item.status_text }}</span></div>
            </template>
            <template v-slot:[`item.actions`] = "{ item }">
              <v-btn x-small color="primary" @click="btn_open(item)">VIEW</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CustomChart from '../components/Custom_chart.vue'
export default {
    name: 'Dashboard',
    components: { CustomChart },
    data(){
      return{
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 7),
        menu: false,
        dialog: false,
        census_dialog: false,
        overlay: false,
        card_id: 0,
        chartStyles:{
          height: '500px',
          position: 'relative',
        },
        chartData: null,
        chart_data: { 
          labels: [],
          datasets: [
            {
              label: 'Laboratory Census',
              backgroundColor: '#f87979',
              data: []
            }
          ],
        },
        default_chart_data: { 
          labels: [],
          datasets: [
            {
              label: 'Laboratory Census',
              backgroundColor: '#f87979',
              data: []
            }
          ],
        },
        table_headers: [
          { text: 'CONTROL NO.', value: 'id', align: 'center', sortable: false },
          { text: 'PATIENT ID', value: 'patient_id', align: 'center', sortable: false },
          { text: 'FULLNAME', value: 'fullname', align: 'left', sortable: false },
          { text: 'AGE', value: 'age', align: 'center', sortable: false },
          { text: 'GENDER', value: 'gender_desc', align: 'center', sortable: false },
          { text: 'PHYSICIAN', value: 'physician', align: 'left', sortable: false },
          { text: 'DISCOUNT TYPE', value: 'discount', align: 'center', sortable: false },
          { text: 'DISCOUNT %', value: 'discount_percent', align: 'center', sortable: false },
          { text: 'CASH', value: 'cash', align: 'center', sortable: false },
          { text: 'CHANGE', value: 'balance', align: 'center', sortable: false },
          { text: 'ENCODED TIME', value: 'created_at', align: 'center', sortable: false },
          { text: 'STATUS', value: 'approved', align: 'center', sortable: false },
          { text: 'ACTIONS', value: 'actions', align: 'center', sortable: false },
        ],
        released_table_headers: [
          { text: 'CONTROL No.', value: 'control_id', align: 'center', sortable: false },
          { text: 'PATIENT ID', value: 'patient_id', align: 'center', sortable: false },
          { text: 'FULLNAME', value: 'fullname', align: 'left', sortable: false },
          { text: 'LAB TEST', value: 'title', align: 'center', sortable: false },
          { text: 'ABBR', value: 'abbr', align: 'center', sortable: false },
          { text: 'STATUS', value: 'status', align: 'center', sortable: false }
        ],
        sendout_table_headers: [
          { text: 'CONTROL No.', value: 'control_id', align: 'center', sortable: false },
          { text: 'PATIENT ID', value: 'patient_id', align: 'center', sortable: false },
          { text: 'FULLNAME', value: 'fullname', align: 'left', sortable: false },
          { text: 'LAB TEST', value: 'title', align: 'center', sortable: false },
          { text: 'AMOUNT', value: 'amount', align: 'center', sortable: false },
          { text: 'TO CLINIC', value: 'so_clinic', align: 'center', sortable: false },
          { text: 'CREATED DATE', value: 'created_at', align: 'center', sortable: false },
          { text: 'STATUS', value: 'status_text', align: 'center', sortable: false },
          { text: 'ACTIONS', value: 'actions', align: 'center', sortable: false }
        ],
        forrealeased_items: [],
        total_patient_items: [],
        forsendout_items: [],
        items: [
          { id: '1', title: 'PENDING APPOINTMENTS',tooltip: 'DAILY PENDING APPOINTMENTS', color: '#00a6a7',icon: 'mdi-calendar-alert', count: 0 },
          { id: '2', title: 'TEST RESULTS',tooltip: 'DAILY TEST RESULTS', color: '#00a6a7',icon: 'mdi-flask', count: 0 },
          { id: '3', title: 'APPOINTMENT FOR APPROVAL',tooltip: 'DAILY APPOINTMENT FOR APPROVAL', color: '#00a6a7',icon: 'mdi-calendar-question', count: 0 },
          { id: '4', title: 'ALL APPOINTMENTS',tooltip: 'DAILY TOTAL APPOINTMENTS', color: '#00a6a7',icon: 'mdi-calendar-check', count: 0 },
          { id: '5', title: 'SEND OUT',tooltip: 'SEND OUT REPORTS', color: '#00a6a7',icon: 'mdi-bike-fast', count: 0 },
        ],
        row_item_2: [
          { id: '1', title: 'CASH',tooltip: 'CASH DAILY', color: '#3CB371',icon: 'mdi-currency-php', count: 0 },
          { id: '2', title: 'CHANGE',tooltip: 'CHANGE DAILY', color: '#3CB371',icon: 'mdi-currency-php', count: 0 },
          { id: '4', title: 'BALANCE',tooltip: 'TOTAL BALANCE', color: '#3CB371',icon: 'mdi-currency-php', count: 0 },
          { id: '3', title: 'SEND OUT',tooltip: 'TOTAL SEND OUT', color: '#3CB371',icon: 'mdi-currency-php', count: 0 },
        ],
        row_item_3: [
          { id: '1', title: 'PATIENT(s)', tooltip: 'TOTAL PATIENT COUNT', color: 'info',icon: 'mdi-account-group', count: 0 },
          { id: '2', title: 'PENDING(s)', tooltip: 'ALL PENDING APPOINTMENT MONTHLY', color: 'info',icon: 'mdi-calendar-multiple', count: 0 },
          { id: '3', title: 'CANCELLED', tooltip: 'ALL CANCELLED APPOINTMENT MONTHLY', color: 'info',icon: 'mdi-calendar-remove', count: 0 },
          { id: '4', title: 'COMPLETED', tooltip: 'ALL COMPLETED APPOINTMENT MONTHLY', color: 'info',icon: 'mdi-calendar-multiple-check', count: 0 },
        ]
      }
    },
    beforeCreate: function(){
        if(!this.$session.has('user-session')){
            this.$router.push({ path: '/login'});
        }
    },
    created(){
      this.overlay = true
      this.initialize()
    },
    mounted(){
      this.generatechartData()
    },
    computed:{
      datetext(){
        let date = this.date.split("-")
        let mm = date[1] - 1
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        return month[mm]
      },
      approval_table_headers(){
        return this.$session.get('usertype-session') == 'ADMIN' ? this.table_headers.filter(e=> !['cash','balance'].includes(e.value)) : this.table_headers.filter(e=> !['actions','physician','cash','balance'].includes(e.value) );
      },
      request_table_headers(){
        return this.table_headers.filter(e=> !['approved','physician','discount','discount_percent'].includes(e.value) )
      },
      all_table_headers(){
        return this.table_headers.filter(e=> e.value != 'approved')
      },
    },
    methods:{
      generatechartData(){
        this.chartData = this.chart_data  
      },
      async initialize(){
        let date = this.date.split("-")
        let data = {
          year: date[0],
          month: date[1]
        }
        await this.$guest.post('/api/data_maintenance/dashboardData', this.$form_data.generate(data))
        .then(res => {
          // this.items[0].count = res.data.pending
          // this.items[1].count = res.data.released
          // this.items[2].count = res.data.for_approval
          // this.items[3].count = res.data.all
          this.row_item_2[0].count = res.data.cash
          this.row_item_2[1].count = res.data.change
          this.row_item_2[2].count = res.data.total_balc
          this.row_item_2[3].count = res.data.total_sendout

          this.row_item_3[0].count = res.data.all_patient
          this.row_item_3[1].count = res.data.all_pending
          this.row_item_3[2].count = res.data.all_cancelled
          this.row_item_3[3].count = res.data.completed
          res.data.submod.forEach(el => {
            this.chart_data.labels.push(el.abbr)
            this.chart_data.datasets[0]['data'].push(el.value)
          })
        })
        .catch(err => { console.log(err) })

        await this.$guest.get('/api/data_maintenance/getAppointments')
        .then(res => {
          this.total_patient_items = res.data.all
          this.forrealeased_items = res.data.for_released
          this.forsendout_items = res.data.for_sendout

          this.items[0].count = res.data.all.filter(e => e.status == 'P').length
          this.items[1].count = res.data.for_released.length
          this.items[2].count = res.data.all.filter(e => e.status == 'P' && e.discount_id == 3).length
          this.items[3].count = res.data.all.length
          this.items[4].count = res.data.for_sendout.length
          setTimeout(() => {
            this.overlay = false
          }, 1000);
        })
        .catch(err => { console.log(err) })
      },
      pending_items(){
        return this.total_patient_items.filter(e => e.status == 'P')
      },
      request_approval_items(){
        return this.total_patient_items.filter(e => e.status == 'P' && e.discount_id == '3')
      },

      refresh(){
        window.location.reload()
      },
      btn_open(item){
        let id = typeof item.id == 'undefined' ? item.control_id : item.id;
        this.$router.push({ name: 'Entry_form', query: { ctrlno: btoa(id), stat: btoa(item.status), apprvd: btoa(item.approved) } })
      },
      btn_view(id){
        this.overlay = true
        this.initialize()
        this.card_id = id
        setTimeout(() => {
          this.dialog = !this.dialog
        }, 1000);
      },
      btn_close(){
        this.card_id = 0
        this.dialog = !this.dialog
      },
      async btn_entry(){
          await this.$guest.get('/api/appointment/getCtrlNo')
          .then(res => {
              this.$router.push({ name: 'Entry_form', query: { ctrlno: btoa(res.data.control_no), stat: btoa(''), apprvd: btoa('') } })
          })
          .catch(err => { console.log(err) })
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

      formatAmount(value){
        var valueString = value;
        var amount = parseFloat(valueString);
        var formatAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        return formatAmount;
      },
      formatAmountWDec(value){
        var valueString = value;
        var amount = parseFloat(valueString).toFixed(2);
        var formatAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        return formatAmount;
      }
    }
}
</script>

<style scoped>
.flexcard{
  display: flex;
  flex-direction: column;
}
</style>