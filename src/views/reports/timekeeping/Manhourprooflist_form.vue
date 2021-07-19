<template>
    <div class="ma-n3">
        <myHeader :title="'Manhour Prooflist'" :subtitle="'Report Module Generation'" />
        <v-container fluid>
            <Overlay :value="overlay.value" />
            <v-row no-gutters class="d-flex justify-end align-end mb-4">
                <v-col v-if="reports.manhour.length > 0">
                    <v-btn small color="primary" @click="print()">PRINT</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" class="mr-2">
                    <v-select v-model="filters.year" :items="options.year" item-text="desc" item-value="id" @change="getPayperiod()" dense outlined hide-details></v-select>
                </v-col>
                <v-col cols="2">
                    <v-select v-model="filters.payperiod_id" :items="options.payperiod" item-text="pperiod" item-value="id" @change="getManhourprooflist()" dense outlined hide-details></v-select>
                </v-col>
            </v-row>
            <v-alert v-if="alert_status == false" type="error" outlined text>
                No Records Found!!!
            </v-alert>
            <v-row no-gutters>
                <v-col id="print-form">
                    <v-card v-for="(item,i) in reports.manhour" :key="i" outlined class="mb-2">
                        <v-card-subtitle class="mb-n4">
                            <ul style="list-style: none; padding: 0;">
                                <li>
                                    <ul>
                                        <li><strong>{{ item.employee_id + "-" }}</strong></li>
                                        <li><strong>&nbsp;&nbsp;{{ fullname(item) }}</strong></li>
                                    </ul>
                                    <ul>
                                        <li style="width: 80px;">Payperiod:</li>
                                        <li style="color: red;">{{ reports.payperiod['pperiod'] + " => " + reports.payperiod['cfrom'].substr(5,5) + " - " + reports.payperiod['cto'].substr(5,5) }}</li>
                                    </ul>
                                </li>
                            </ul>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-data-table :headers="table_headers" :items-per-page="-1" hide-default-header hide-default-footer dense>
                                <template v-slot:header>
                                    <tr>
                                        <th colspan="6">Regular working hours (Days:Hours:Mins)</th>
                                        <th colspan="6">Overtime Hours (Hours:Mins)</th>
                                        <th colspan="2">Absences</th>
                                    </tr>
                                    <tr>
                                        <th style="width: 50px;">Regular</th>
                                        <th style="width: 50px;">Restday</th>
                                        <th style="width: 50px;">Special Holiday</th>
                                        <th style="width: 50px;">Special Restday</th>
                                        <th style="width: 50px;">Legal Holiday</th>
                                        <th style="width: 50px;">Legal Restday</th>
                                        <th style="width: 50px;">Regular</th>
                                        <th style="width: 50px;">Restday</th>
                                        <th style="width: 50px;">Special Holiday</th>
                                        <th style="width: 50px;">Special Restday</th>
                                        <th style="width: 50px;">Legal Holiday</th>
                                        <th style="width: 50px;">Legal Restday</th>
                                        <th style="width: 50px;">Tardy</th>
                                        <th style="width: 50px;">Undertime</th>
                                    </tr>
                                </template>
                                <template v-slot:body>
                                    <tr>
                                        <td>{{ item.regular }}</td>
                                        <td>{{ item.restday }}</td>
                                        <td>00:00:00</td>
                                        <td>00:00:00</td>
                                        <td>00:00:00</td>
                                        <td>00:00:00</td>
                                        <td>{{ item.regular_ot }}</td>
                                        <td>{{ item.restday_ot }}</td>
                                        <td>00:00</td>
                                        <td>00:00</td>
                                        <td>00:00</td>
                                        <td>00:00</td>
                                        <td>{{ item.total_tardy }}</td>
                                        <td>00:00</td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import myHeader from '../../../components/myHeader.vue'
import Overlay from '../../../components/Overlay.vue'
export default {
    components: { myHeader,Overlay },
    data(){
        return{
            alert_status: true,
            overlay: {
                value: false
            },
            filters: {
                year: null,
                payperiod_id: null
            },
            options: {
                year: [],
                payperiod:[
                    { id: null, pperiod: 'Please Select Payperiod...'},
                ]
            },
            reports: {
                manhour: [],
                payperiod: []
            },
            table_headers:[
                { value: 'regular', align: 'center' },
                { value: 'restday', align: 'center' },
                { value: 'special_regular', align: 'center' },
                { value: 'special_restday', align: 'center' },
                { value: 'legal_regular', align: 'center' },
                { value: 'legal_restday', align: 'center' },
                { value: 'regular_ot', align: 'center' },
                { value: 'restday_ot', align: 'center' },
                { value: 'special_regular_ot', align: 'center' },
                { value: 'special_restday_ot', align: 'center' },
                { value: 'legal_regular_ot', align: 'center' },
                { value: 'legal_restday_ot', align: 'center' },
                { value: 'total_tardy', align: 'center' },
                { value: 'total_undertime', align: 'center' },
            ],
        }
    },
    created(){
        this.initialize()
    },
    methods: {
        async initialize(){
            this.overlay.value = true
            await this.$guest('/api/reports/getYear')
            .then(res => {
                this.overlay.value = false
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
                this.overlay.value = false
                this.filters.payperiod_id = null
                this.options.payperiod = [{ id: null, pperiod: 'Please Select Payperiod...'}]
                this.alert_status = true
            }
        },
        async getManhourprooflist(){
            this.overlay.value = true
            let data = {
                year: this.filters.year,
                payperiod_id: this.filters.payperiod_id
            }
            await this.$guest.post('/api/reports/getManhourprooflist', this.$form_data.generate(data))
            .then(res => {
                this.overlay.value = false
                this.alert_status = res.data.status
                if(res.data.status == true){
                    this.reports.manhour = res.data.manhour
                    this.reports.payperiod = res.data.payperiod
                }else{
                    this.reports.manhour = []
                    this.reports.payperiod = []
                }
            })  
            .catch(err => { console.log(err) })
        },
        fullname(item){
            let firstname = item.firstname.charAt(0).toUpperCase() + item.firstname.slice(1)
            let lastname = item.lastname.charAt(0).toUpperCase() + item.lastname.slice(1)
            let middlename = item.middlename.charAt(0).toUpperCase() + item.middlename.slice(1)
            return lastname + ", " + firstname + " " + middlename
        },
        print(){
            this.print_form()
        }
    }
}
</script>

<style scoped>
span{
    color: rgb(25, 118, 210);
}
.v-data-table{
    line-height: 1;
}
ul li{
    font-size: 13px;
    display: inline-block;
    list-style: none;
    line-height: 1rem;
}
tr td{
    text-align: center;
}
tr th{
    background-color: rgb(217, 248, 192);
}
</style>