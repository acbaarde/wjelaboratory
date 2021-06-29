<template>
<div class="ma-n3">
    <myHeader :title="'Timekeeping'" :subtitle="'Manage Employee Timekeeping'" />
    <v-container fluid>
    <v-alert v-if="alert_status == false" type="error" outlined text>
        No Payroll Period Established!
    </v-alert>
    <v-card v-else flat outlined>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="70"></v-progress-circular>
        </v-overlay>
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
                        <v-tab key="item1">
                            Adjustments
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
                                                <v-text-field class="font-weight" v-model="props.item.encoded_amin" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_amout`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.encoded_amout" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_pmin`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.encoded_pmin" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_pmout`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.encoded_pmout" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
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
                                                <v-text-field class="font-weight" @blur="validateot(props.item)" v-model="props.item.ot_start" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.ot_end`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.ot_end" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
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
                                                <v-text-field class="font-weight" v-model="props.item.ut_start" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.ut_end`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.ut_end" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item>
                            <v-container fluid>
                                <v-row>
                                    <v-col>
                                        <ul style="list-style: none; padding: 0;">
                                            <li>
                                                <ul>
                                                    <li style="width: 200px;"><h3>Total Worked Hours:</h3></li>
                                                    <li><h3>{{ adjustment.regular }}</h3></li>
                                                </ul>
                                                <ul>
                                                    <li style="width: 200px;"><h3>Gross Pay:</h3></li>
                                                    <li style="color: red;"><h3>{{ adjustment.gross }}</h3></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-data-table :headers="adjustment_headers" :items="adjustment_items" dense :items-per-page="-1" hide-default-footer hide-default-header disable-sort>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th style="width: 80px;" @click="dialog = !dialog"><v-icon>mdi-plus-box</v-icon></th>
                                                    <th style="text-align: left;">Description</th>
                                                    <th style="text-align: right;">Amount</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.actions`]="{ item }">
                                                <v-btn icon x-small @click="btn_edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                                                <v-btn icon color="red" x-small @click="btn_delete(item)"><v-icon>mdi-trash-can</v-icon></v-btn> 
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <ul style="list-style: none; padding: 0;">
                                            <li>
                                                <ul>
                                                    <li style="width: 200px;"><h3>Total Adjustment(s):</h3></li>
                                                    <li><h3>{{ adjustment.adjustments }}</h3></li>
                                                </ul>
                                                <ul>
                                                    <li style="width: 200px;"><h3>Net Pay:</h3></li>
                                                    <li style="color: red;"><h3>{{ adjustment.net }}</h3></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card-text>

                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>Add Adjustment</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="mt-4">
                            <v-form>
                                <v-container>
                                    <v-row dense>
                                        <v-col>
                                            <v-text-field v-model="active_item.description" outlined dense required label="Description" type="text"></v-text-field>
                                            <v-text-field v-model="active_item.amount" outlined dense required label="Amount" type="number"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small outlined color="primary" @click="btn_save()">Save</v-btn>
                            <v-btn small outlined color="error" @click="btn_cancel()">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

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
</v-container>
</div>
</template>

<script>
import myHeader from '../../components/myHeader.vue'
export default {
    name: 'Timekeeping_form',
    components: { myHeader },
    data(){
        return{
            tab: 3,
            overlay: false,
            dialog: false,
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
            adjustment_headers:[
                { value: 'actions', align: 'center' },
                { value: 'description', align: 'left' },
                { value: 'amount', align: 'right' },
            ],
            adjustment_items:[
                // { description: 'SSS', amount: '500' },
                // { description: 'HDMF', amount: '100' },
                // { description: 'Philhealt', amount: '1500' },
            ],
            adjustment: {
                regular: '',
                gross: '',
                adjustments: '',
                net: ''
            },
            itemIndex: -1,
            active_item: {
                description: '',
                amount: ''
            },
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
        // time_mask(){
        //     return this.dtr_items.e
        // }
    },

    methods: {
        async initialize(){
            this.overlay = true
            let data = {
                id: this.$route.query.id
            }
            await this.$guest.post('/api/timekeeping/getEmployee', this.$form_data.generate(data))
            .then(res => {
                this.alert_status = res.data.status
                if(res.data.status == true){
                    this.employee = res.data.result.employee
                    this.payperiod = res.data.result.payperiod
                    this.dtr_items = res.data.result.dtr
                    this.overtime_items = res.data.result.dtr
                    this.undertime_items = res.data.result.dtr
                    this.adjustment = res.data.result.salary_adjustments
                    this.adjustment_items = res.data.result.salary_adjustments_breakdown
                    this.$nextTick(() => {
                        this.overlay = false
                        this.snackbar.status = true
                        this.snackbar.text = 'Page Refreshed!'
                        this.snackbar.color = 'success'
                        this.snackbar.timeout = 2000
                    })
                }
                console.log(res.data)
            })
            .catch(err => { console.log(err) })
        },
        async savedtr(){
            let data = {
                dtr: JSON.stringify(this.dtr_items)
            }
            await this.$guest.post('/api/timekeeping/savedtr', this.$form_data.generate(data))
            .then(res => {
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
 
        validateot(item){
            console.log(item);
        },
        add_adjustment(){
            console.log("ADD")
        },
        btn_cancel(){
            this.close()
        },
        close(){
            this.dialog = !this.dialog
            this.itemIndex = -1
            this.active_item = {}
        },
        async btn_delete(item){
            this.overlay = true
            await this.$guest.post('/api/timekeeping/deleteSalaryAdjustment', this.$form_data.generate(item))
            .then(() => {
                this.initialize()
            })
            .catch(err => { console.log(err) })
        },
        btn_edit(item){
            this.dialog = true
            this.itemIndex = this.adjustment_items.indexOf(item)
            this.active_item = Object.assign({}, item)
        },
        async btn_save(){
            this.overlay = true
            this.active_item['adjustment_id'] = this.adjustment.id
            this.active_item['user_id'] = this.$session.get('userid-session')
            this.active_item['employee_id'] = this.$route.query.id
            let url = this.itemIndex == -1 ? 'insertSalaryAdjustment' : 'updateSalaryAdjustment'
            await this.$guest.post('/api/timekeeping/'+ url, this.$form_data.generate(this.active_item))
            .then(() => {
                this.close()
                this.initialize()
            })
            .catch(err => { console.log(err) })
        }
    }
}
</script>

<style scoped>
.font-weight {
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