<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <ul style="margin-top: 16px;">
          <li>_____________________________</li>
          <li>MEDICAL TECHNOLOGIST</li>
          <!-- <li>Lic. No. 69669</li> -->
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
        }
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