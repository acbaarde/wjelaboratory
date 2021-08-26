<template>
  <v-container fluid>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="70"></v-progress-circular>
    </v-overlay>
    <v-row dense no-gutters class="d-flex justify-space-between align-center mb-2">
      <div>
        <v-btn class="mr-2" color="green" @click="refresh()" dark><v-icon left>mdi-refresh</v-icon><span>REFRESH</span></v-btn>
        <v-btn color="info" dark @click="census_dialog=true"><v-icon left>mdi-chart-bar-stacked</v-icon><span>CENSUS</span></v-btn>
      </div>
      
      <v-btn text><v-icon left>mdi-calendar-today</v-icon><h4>{{ DateNow() }}</h4></v-btn>
    </v-row>
    <v-row dense class="mb-2">
      <v-col v-for="(item, i) in items" :key="i" cols="3">
        <v-card :color="item.color" dark>
              <v-container fluid class="pa-0 mb-10">
                <v-row dense>
                  <v-col cols="8">
                    <v-card-title class="mb-2">
                      <span><h1>{{ item.count }}</h1></span>
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
                <v-btn dark text @click="btn_view(item.id)">VIEW</v-btn>
                <v-spacer></v-spacer>
                <v-icon class="mr-2">mdi-arrow-right-bold</v-icon>
              </v-card-actions>
        </v-card>
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

    <v-dialog v-model="dialog" max-width="80%" scrollable persistent>
      <v-card v-if="card_id == 1">
        <v-card-title>
          <span>PENDING</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="table_headers" :items="pending_items()" dense>
            <template v-slot:[`item.fullname`]="{item}">
              {{ item.lastname + ', ' + item.firstname + ' ' + item.middlename }}
            </template>
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at).substring(14,22) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 2">
        <v-card-title>
          <span>FOR RELEASED</span>
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
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 3">
        <v-card-title>
          <span>REQUEST APPROVAL</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="table_headers" :items="request_approval_items()" dense>
            <template v-slot:[`item.fullname`]="{item}">
              {{ item.lastname + ', ' + item.firstname + ' ' + item.middlename }}
            </template>
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at).substring(14,22) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 4">
        <v-card-title>
          <span>TOTAL ENTRIES</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="table_headers" :items="total_patient_items" dense>
            <template v-slot:[`item.fullname`]="{item}">
              {{ item.lastname + ', ' + item.firstname + ' ' + item.middlename }}
            </template>
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at).substring(14,22) }}
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
          { text: 'CONTROL No.', value: 'id', align: 'center', sortable: false },
          { text: 'PATIENT ID', value: 'patient_id', align: 'center', sortable: false },
          { text: 'FULLNAME', value: 'fullname', align: 'left', sortable: false },
          { text: 'AGE', value: 'age', align: 'center', sortable: false },
          { text: 'GENDER', value: 'gender_desc', align: 'center', sortable: false },
          { text: 'PHYSICIAN', value: 'physician', align: 'left', sortable: false },
          { text: 'DISCOUNT TYPE', value: 'discount', align: 'center', sortable: false },
          { text: 'DISCOUNT %', value: 'discount_percent', align: 'center', sortable: false },
          { text: 'TIME', value: 'created_at', align: 'center', sortable: false },
        ],
        released_table_headers: [
          { text: 'CONTROL No.', value: 'control_id', align: 'center', sortable: false },
          { text: 'PATIENT ID', value: 'patient_id', align: 'center', sortable: false },
          { text: 'FULLNAME', value: 'fullname', align: 'left', sortable: false },
          { text: 'LAB TEST', value: 'title', align: 'center', sortable: false },
          { text: 'ABBR', value: 'abbr', align: 'center', sortable: false },
          { text: 'STATUS', value: 'status', align: 'center', sortable: false }
        ],
        forrealeased_items: [],
        total_patient_items: [],
        items: [
          { id: '1', title: 'PENDING', color: 'primary',icon: 'mdi-rotate-left', count: 0 },
          { id: '2', title: 'FOR RELEASED', color: 'info',icon: 'mdi-account-multiple-check', count: 0 },
          { id: '3', title: 'REQUEST APPROVAL', color: '#21638e',icon: 'mdi-account-alert', count: 0 },
          { id: '4', title: 'TOTAL ENTRIES', color: '#952175',icon: 'mdi-account-details', count: 0 },
        ]
      }
    },
    beforeCreate: function(){
        if(!this.$session.has('user-session')){
            this.$router.push('/login');
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
      }
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
          this.items[0].count = res.data.pending
          this.items[1].count = res.data.released
          this.items[2].count = res.data.for_approval
          this.items[3].count = res.data.all
          res.data.submod.forEach(el => {
            this.chart_data.labels.push(el.abbr)
            this.chart_data.datasets[0]['data'].push(el.value)
          })
          setTimeout(() => {
            this.overlay = false
          }, 500);
        })
        .catch(err => { console.log(err) })

        await this.$guest.get('/api/data_maintenance/getAppointments')
        .then(res => {
          this.total_patient_items = res.data.all
          this.forrealeased_items = res.data.for_released
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

      btn_view(id){
        this.initialize()
        this.card_id = id
        this.dialog = !this.dialog
      },
      btn_close(){
        this.card_id = 0
        this.dialog = !this.dialog
      },
    }
}
</script>

<style scoped>

</style>