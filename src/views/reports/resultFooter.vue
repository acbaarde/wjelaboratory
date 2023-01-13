<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <ul style="margin-top: 16px;">
          <li>{{ rmt_name }}</li>
          <li>_____________________________</li>
          <li>MEDICAL TECHNOLOGIST</li>
          <li>Lic. No. {{ rmt_licno }}</li>
        </ul>
      </v-col>
      <v-col cols="6">
        <ul>
          <li>{{ pathologist.name }}</li>
          <li>_____________________________</li>
          <li>PATHOLOGIST</li>
          <li>Lic. No. {{ pathologist.lic_no }}</li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'resultFooter',
    props: ['data'],
    data(){
      return{
        pathologist:{
          name: '',
          lic_no: ''
        },
        rmt_name: '',
        rmt_licno: ''
      }
    },
    created(){
        this.initialize()
    },
    methods: {
        async initialize(){
            await this.$guest.get('/api/data_maintenance/getCompanyInfo')
            .then(res => {
              this.pathologist.name = res.data.pathologist_name
              this.pathologist.lic_no = res.data.pathologist_lic_no
            })
            .catch(err => {console.log(err)})

            await this.$guest.get('/api/employee/getEmployees')
            .then(res => {
              let rmt = res.data.filter(e => e.id == this.$session.get('userid-session'));
              this.rmt_licno = rmt[0].license_no
              this.rmt_name = rmt.length > 0 ? rmt[0].firstname + ' ' + rmt[0].middlename.charAt(0).toUpperCase() + ' ' + rmt[0].lastname : this.$session.get('user-session')
            })
            .catch(err => {console.log(err)})
        }
    }
}
</script>

<style scoped>
ul{
  list-style: none;
}
li{
  font-size: 11px;
  text-align: center;
  line-height: 1rem;
  color: black;
  font-family: "Roboto", sans-serif;
}
</style>