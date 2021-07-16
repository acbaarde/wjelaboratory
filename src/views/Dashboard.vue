<template>
  <v-container fluid>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="70"></v-progress-circular>
    </v-overlay>
    <v-row dense no-gutters class="d-flex justify-space-between align-center mb-2">
      <v-btn color="green" @click="refresh()" dark><v-icon left>mdi-refresh</v-icon><span>REFRESH</span></v-btn>
      <v-btn text><v-icon left>mdi-calendar-today</v-icon><h4>{{ DateNow() }}</h4></v-btn>
    </v-row>
    <v-row dense class="mb-2">
      <v-col v-for="(item, i) in items" :key="i" cols="3">
        <v-card :color="item.color" dark>
              <v-card-title class="text-h5 mb-16" v-text="item.title"></v-card-title>
              
              <v-card-actions>
                <v-btn dark text @click="btn_view(item.id)">VIEW</v-btn>
                <v-spacer></v-spacer>
                <span><h2>{{ item.count }}</h2></span>
              </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row dense no-gutters>
      <v-col>
        <v-card>
          <CustomChart :data="chart_data"/>
        </v-card>
      </v-col>
    </v-row> -->
    <v-dialog v-model="dialog" :max-width="card_id == 3 ? '100%' : '80%'" scrollable>
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
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at) }}
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
          <v-data-table :headers="table_headers" :items="released_items()" dense>
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 3">
        <v-card-title>
          <span>{{ datetext.toUpperCase() }} CENSUS</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <!-- <v-row dense no-gutters>
            <v-col cols="2" class="mt-2">
              <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="datetext"
                    label="Choose Month"
                    prepend-icon="mdi-calendar"
                    readonly
                    hide-details
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menu = false" type="month" @change="btn_datepicker()"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row> -->
          <CustomChart :chart-data="chartData"/>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 4">
        <v-card-title>
          <span>TOTAL PATIENTS</span>
          <v-spacer></v-spacer>
          <v-btn icon text @click="btn_close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="table_headers" :items="total_patient_items" dense>
            <template v-slot:[`item.created_at`] = "{ item }">
              {{ formatDateTime(item.created_at) }}
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
        // datetext: '',
        menu: false,
        dialog: false,
        overlay: false,
        card_id: 0,
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
          { text: 'LASTNAME', value: 'lastname', align: 'left', sortable: false },
          { text: 'FIRSTNAME', value: 'firstname', align: 'left', sortable: false },
          { text: 'MIDDLENAME', value: 'middlename', align: 'left', sortable: false },
          { text: 'AGE', value: 'age', align: 'center', sortable: false },
          { text: 'GENDER', value: 'gender_desc', align: 'center', sortable: false },
          { text: 'PHYSICIAN', value: 'physician', align: 'left', sortable: false },
          { text: 'DISCOUNT TYPE', value: 'discount_type', align: 'center', sortable: false },
          { text: 'DISCOUNT %', value: 'discount', align: 'center', sortable: false },
          { text: 'DATE', value: 'created_at', align: 'center', sortable: false },
        ],
        total_patient_items: [],
        items: [
          { id: '1', title: 'PENDING', color: 'primary', count: 0 },
          { id: '2', title: 'FOR RELEASED', color: 'info', count: 0 },
          { id: '3', title: 'CENSUS', color: '#1F7087', count: '' },
          { id: '4', title: 'TOTAL PATIENTS', color: '#952175', count: 0 },
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
          console.log(res.data)
          this.total_patient_items = res.data
        })
        .catch(err => { console.log(err) })
      },

      released_items(){
        return this.total_patient_items.filter(e => e.approved == 'Y')
      },
      pending_items(){
        return this.total_patient_items.filter(e => e.approved == '')
      },

      refresh(){
        window.location.reload()
      },

      btn_view(id){
        console.log(id)
        this.card_id = id
        this.dialog = !this.dialog
      },
      btn_close(){
        this.card_id = 0
        this.dialog = !this.dialog
      },
      // btn_datepicker(){
      //   let date = this.date.split("-")
      //   let mm = date[1] - 1
      //   const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      //   this.datetext = month[mm]

      //   let data = {
      //     year: date[0],
      //     month: date[1]
      //   }
      //   this.$guest.post('/api/data_maintenance/dashboardData', this.$form_data.generate(data))
      //   .then(res => {
      //     res.data.submod.forEach(el => {
      //       this.chart_data.labels.push(el.abbr)
      //       this.chart_data.datasets[0]['data'].push(el.value)
      //     })
      //     setTimeout(() => {
      //       this.overlay = false
      //     }, 500);
      //   })
      //   .catch(err => { console.log(err) })
      // }
    }
}
</script>

<style scoped>

</style>