<template>
    <v-card v-if="alert_status == false">
        <v-alert type="error">
            No Payroll Period Established!
        </v-alert>
    </v-card>
    <v-card v-else>
        <v-flex md-12 class="ma-2">
            <v-container fluid>
                <v-row no-gutters>
                    <v-col>
                        <h2 style="color: #1976d2;">{{ fullname }}</h2>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="6">
                        <ul style="list-style: none; padding: 0;">
                            <li>
                                <ul>
                                    <li style="width: 120px;">Employee id:</li>
                                    <li>{{ employee.id }}</li>
                                </ul>
                                <ul>
                                    <li style="width: 120px;">Employee Status:</li>
                                    <li>{{ employee.employment_status_desc }}</li>
                                </ul>
                                <ul>
                                    <li style="width: 120px;">Position:</li>
                                    <li>{{ employee.position_desc }}</li>
                                </ul>
                            </li>
                        </ul>

                    </v-col>
                    <v-col cols="6">
                        <ul style="list-style: none; padding: 0;">
                            <li>
                                <ul>
                                    <li style="width: 100px;">Pay Period:</li>
                                    <li>{{ payperiod.pperiod }}</li>
                                </ul>
                                <ul>
                                    <li style="width: 100px;">Cutoff:</li>
                                    <li style="color: red;">{{ payperiod.cfrom + " - " +  payperiod.cto}}</li>
                                </ul>
                            </li>
                        </ul>
                
                    </v-col>
                </v-row>
            </v-container>

            <v-card-text>
                <v-divider></v-divider>
                    <v-tabs v-model="tab" show-arrows>
                        <v-tab key="DTR">
                            DTR
                        </v-tab>
                        <v-tab key="Overtime">
                            Overtime
                        </v-tab>
                        <v-tab key="Undertime">
                            Undertime
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-container fluid>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-btn small color="primary" class="mr-1" @click="savedtr()">SAVE</v-btn>
                                        <v-btn small color="green" dark class="mr-1" @click="initialize()">REFRESH</v-btn>
                                        <v-btn small color="error">DELETE</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="mt-3">
                                    <v-col>
                                        <v-data-table :headers="dtr_headers" :items="dtr_items" :items-per-page="-1" dense flat disable-sort hide-default-header hide-default-footer>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th colspan="3"></th>
                                                    <th colspan="4">Original Schedule</th>
                                                    <th colspan="4">Encoded Time</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 100px;">Date</th>
                                                    <th style="width: 40px;">Day</th>
                                                    <th style="width: 30px;">Type</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.sched_amin`]="props">
                                                {{ props.item.sched_amin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_amout`]="props">
                                                {{ props.item.sched_amout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmin`]="props">
                                                {{ props.item.sched_pmin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmout`]="props">
                                                {{ props.item.sched_pmout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.encoded_amin`]="props">
                                                <v-text-field v-model="props.item.encoded_amin" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_amout`]="props">
                                                <v-text-field v-model="props.item.encoded_amout" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_pmin`]="props">
                                                <v-text-field v-model="props.item.encoded_pmin" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_pmout`]="props">
                                                <v-text-field v-model="props.item.encoded_pmout" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                        
                                        </v-data-table>
                                    
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item>
                            <v-container fluid>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-btn small color="primary" class="mr-1" @click="savedtr()">SAVE</v-btn>
                                        <v-btn small color="green" dark class="mr-1" @click="initialize()">REFRESH</v-btn>
                                        <v-btn small color="error">DELETE</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="mt-3">
                                    <v-col>
                                        <v-data-table :headers="overtime_headers" :items="overtime_items" :items-per-page="-1" dense flat disable-sort hide-default-header hide-default-footer>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th colspan="3"></th>
                                                    <th colspan="4">Encoded Time</th>
                                                    <th colspan="4">Overtime</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 100px;">Date</th>
                                                    <th style="width: 40px;">Day</th>
                                                    <th style="width: 30px;">Type</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">Start</th>
                                                    <th style="width: 70px;">End</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.ot_start`]="props">
                                                <v-text-field @blur="validateot(props.item)" v-model="props.item.ot_start" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.ot_end`]="props">
                                                <v-text-field v-model="props.item.ot_end" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item>
                            <v-container fluid>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-btn small color="primary" class="mr-1" @click="savedtr()">SAVE</v-btn>
                                        <v-btn small color="green" dark class="mr-1" @click="initialize()">REFRESH</v-btn>
                                        <v-btn small color="error" @click="deletedtr()">DELETE</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="mt-3">
                                    <v-col>
                                        <v-data-table :headers="undertime_headers" :items="undertime_items" :items-per-page="-1" dense flat disable-sort hide-default-header hide-default-footer>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th colspan="3"></th>
                                                    <th colspan="4">Encoded Time</th>
                                                    <th colspan="4">Undertime</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 100px;">Date</th>
                                                    <th style="width: 40px;">Day</th>
                                                    <th style="width: 30px;">Type</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">Start</th>
                                                    <th style="width: 70px;">End</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.ut_start`]="props">
                                                <v-text-field v-model="props.item.ut_start" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.ut_end`]="props">
                                                <v-text-field v-model="props.item.ut_end" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card-text>

                <v-snackbar v-model="snackbar.status" :timeout="snackbar.timeout" :color="snackbar.color">
                    {{ snackbar.text }}
                    <template v-slot:action="{ attrs }">
                        <v-btn text v-bind="attrs" @click="snackbar.status = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
        </v-flex>
    </v-card>
</template>

<script>
export default {
    name: 'Timekeeping_form',
    data(){
        return{
            tab: 0,
            snackbar:{
                status: false,
                text: '',
                color: '',
                timeout: 2000
            },
            alert_status: true,
            dtr_headers:[
                { value: 'date', align: 'center' },
                { value: 'day', align: 'center' },
                { value: 'type', align: 'center' },
                { value: 'sched_amin', align: 'center' },
                { value: 'sched_amout', align: 'center' },
                { value: 'sched_pmin', align: 'center' },
                { value: 'sched_pmout', align: 'center' },
                { value: 'encoded_amin', align: 'center' },
                { value: 'encoded_amout', align: 'center' },
                { value: 'encoded_pmin', align: 'center' },
                { value: 'encoded_pmout', align: 'center' },
            ],
            dtr_items:[],
            overtime_headers:[
                { value: 'date', align: 'center' },
                { value: 'day', align: 'center' },
                { value: 'type', align: 'center' },
                { value: 'encoded_amin', align: 'center' },
                { value: 'encoded_amout', align: 'center' },
                { value: 'encoded_pmin', align: 'center' },
                { value: 'encoded_pmout', align: 'center' },
                { value: 'ot_start', align: 'center' },
                { value: 'ot_end', align: 'center' },
            ],
            overtime_items:[],
            undertime_headers:[
                { value: 'date', align: 'center' },
                { value: 'day', align: 'center' },
                { value: 'type', align: 'center' },
                { value: 'encoded_amin', align: 'center' },
                { value: 'encoded_amout', align: 'center' },
                { value: 'encoded_pmin', align: 'center' },
                { value: 'encoded_pmout', align: 'center' },
                { value: 'ut_start', align: 'center' },
                { value: 'ut_end', align: 'center' },
            ],
            undertime_items:[],
            employee:{
                firstname: '',
                lastname: '',
                middlename: ''
            },
            payperiod:[]
        }
    },
    beforeCreate: function(){
      if(!this.$session.has('user-session')){
          this.$router.push('/login');
      }
    },

    created(){
        this.initialize()
    },

    computed: {
        id(){
            return this.$route.query.id
        },
        fullname(){
            let firstname = this.employee.firstname.charAt(0).toUpperCase() + this.employee.firstname.slice(1)
            let lastname = this.employee.lastname.charAt(0).toUpperCase() + this.employee.lastname.slice(1)
            let middlename = this.employee.middlename.charAt(0).toUpperCase() + this.employee.middlename.slice(1)
            return lastname + ", " + firstname + " " + middlename
        },
        time_mask(){
            return this.dtr_items.e
        }
    },

    methods: {
        async initialize(){
            let data = {
                id: this.$route.query.id
            }
            await this.$guest.post('/api/timekeeping/getEmployee', this.$form_data.generate(data))
            .then(res => {
                console.log(res.data)
                this.alert_status = res.data.status
                if(res.data.status == true){
                    this.employee = res.data.result.employee
                    this.payperiod = res.data.result.payperiod
                    this.dtr_items = res.data.result.dtr
                    this.overtime_items = res.data.result.dtr
                    this.undertime_items = res.data.result.dtr
                    this.snackbar.status = true
                    this.snackbar.text = 'Page Refreshed!'
                    this.snackbar.color = 'success'
                    this.snackbar.timeout = 2000
                }
            })
            .catch(err => { console.log(err) })
        },
        async savedtr(){
            let data = {
                dtr: JSON.stringify(this.dtr_items)
            }
            await this.$guest.post('/api/timekeeping/savedtr', this.$form_data.generate(data))
            .then(res => {
                console.log(res.data)
                if(res.data.status == true){
                    this.snackbar.status = true
                    this.snackbar.text = 'Records Saved!'
                    this.snackbar.color = 'success'
                    this.snackbar.timeout = 2000
                }else{
                    this.snackbar.status = true
                    this.snackbar.text = 'Error Saving Records!'
                    this.snackbar.color = 'error'
                    this.snackbar.timeout = 2000
                }
            })
            .catch(err => { console.log(err) })
        },
        deletedtr(){
            console.log(this.tab)
        },
        // refreshdtr(){
            // let tab = this.tab
            // window.location.reload()
            // this.initialize()
            // this.$nextTick(() =>{
            //     this.tab = tab
            // })
        // }

        validateot(item){
            console.log(item);
        }
        
    }
}
</script>

<style scoped>
.v-text-field{
    font-weight: bold;
}
th{
    background-color: rgb(217, 248, 192);
}
ul{
    padding: 0;
}
ul li{
    font-size: 13px;
    display: inline-block;
    list-style: none;
}
</style>