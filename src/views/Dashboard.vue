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
    <v-dialog v-model="dialog" :max-width="card_id == 3 ? '100%' : '60%'">
      <v-card v-if="card_id == 1">
        <v-card-title>PENDING APPOINTMENTS</v-card-title>
        <v-divider></v-divider>
      </v-card>
      <v-card v-if="card_id == 2">
        <v-card-title>FOR RELEASED</v-card-title>
        <v-divider></v-divider>

      </v-card>
      <v-card v-if="card_id == 3">
        <v-card-title>CENSUS</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <CustomChart :data="chart_data"/>
        </v-card-text>
      </v-card>
      <v-card v-if="card_id == 4">
        <v-card-title>TOTAL PATIENTS</v-card-title>
        <v-divider></v-divider>
        
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
        dialog: false,
        overlay: false,
        card_id: 0,
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
    methods:{
      async initialize(){
        console.log(this.chart_data)
        await this.$guest.get('/api/data_maintenance/dashboardData')
        .then(res => {
          console.log(res.data)
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
      },
      refresh(){
        window.location.reload()
      },

      btn_view(id){
        console.log(id)
        this.card_id = id
        this.dialog = !this.dialog
      }
      // myStyle(){
      //   return {
      //     height: '300px', 
      //     position: 'relative'
      //   }
      // }
    }
}
</script>

<style scoped>

</style>