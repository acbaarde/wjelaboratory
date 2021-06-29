<template>
    <v-card flat outlined>
        <v-card-title>
                <span>Employee Payslip</span>
        </v-card-title>
        <v-card-subtitle><span>Report Module Generation...</span></v-card-subtitle>
        <v-divider></v-divider>
        <v-container fluid>
            <v-row no-gutters class="d-flex justify-end align-center mb-4">
              <v-col cols="2" class="mr-2">
                    <v-select v-model="filters.year" :items="options.year" item-text="desc" item-value="id" @change="getPayperiod()" dense outlined hide-details></v-select>
                </v-col>
                <v-col cols="2">
                    <v-select v-model="filters.payperiod_id" :items="options.payperiod" item-text="pperiod" item-value="id" dense outlined hide-details></v-select>
                </v-col>
            </v-row>
            <v-alert v-if="alert_status == false" type="error" outlined text>
                No Records Found!!!
            </v-alert>
            <v-row>
                <v-col>
                  
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data(){
        return{
            alert_status: true,
            filters:{   
                year: null,
                payperiod_id: null
            },
            options:{
                year:[],
                payperiod:[
                    { id: null, pperiod: 'Please Select Payperiod...'},
                ]
            },
            reports:{
                employees: [],
                dtrinout: [],
                payperiod: []
            },
        }
    },
    created(){
      this.initialize()
    },
    methods: {
      initialize(){
            this.$guest('/api/reports/getYear')
            .then(res => {
                this.options.year = res.data
                this.options.year.splice(0,0, Object.assign({}, { id: null, desc: 'Please Select Year...'}))
            })
            .catch(err => { console.log(err) })
        },
        getPayperiod(){
            if(this.filters.year != null){
                let data = {
                    year: this.filters.year,
                    payperiod_id: this.filters.payperiod_id
                }
                this.$guest.post('/api/reports/getPayperiod', this.$form_data.generate(data))
                .then(res => {
                    this.options.payperiod = res.data
                    this.options.payperiod.splice(0,0, Object.assign({}, { id: null, pperiod: 'Please Select Payperiod...'}))
                })
                .catch(err => { console.log(err) })
            }else{
                this.filters.payperiod_id = null
                this.options.payperiod = [{ id: null, pperiod: 'Please Select Payperiod...'}]
                this.alert_status = true
            }
        },
    //   async getUsers(){
    //     await this.$guest.get('/api/users/getAllUser')
    //     .then(res => {
    //       this.users = res.data
    //       this.users.splice(0,0, { id: '', username: 'Please Select User...' })
    //       this.loadMenu()
    //     })
    //     .catch(err => { console.log(err) })
    //   },
    //   async loadMenu(){
    //     await this.$guest.get('/api/menu/Menu')
    //     .then(res => {
    //       this.menus = res.data
    //     })
    //     .catch(err => { console.log(err) })
    //   },
    //   async getUseraccess(){
    //     let data = {
    //       id: this.id,
    //     }
    //     await this.$guest.post('/api/menu/getUseraccess', this.$form_data.generate(data))
    //     .then(res => {
    //       console.log(res)
    //       this.selected = res.data
    //     })
    //     .catch(err => { console.log(err) })
    //   },

    //   // menu(id){
    //   //   return this.menus.filter(e => e.id == id)
    //   // },
    //   async btn_save(){
    //     let data = {
    //       id: this.id,
    //       mod_id: this.selected,
    //       user_id: this.$session.get('userid-session')
    //     }
    //     await this.$guest.post('/api/menu/saveUseraccess', this.$form_data.generate(data))
    //     .then(res => {
    //       console.log(res)
    //       this.getUseraccess()
    //     })
    //     .catch(err => { console.log(err) })
    //   },
    }
}
</script>

<style scoped>
span{
    color: rgb(25, 118, 210);
}
</style>