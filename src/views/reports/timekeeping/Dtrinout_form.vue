<template>
    <div class="ma-n3">
        <myHeader :title="'DTR In/Out'" :subtitle="'Report Module Generation'" />
        <v-container fluid>
            <Overlay :value="overlay.value" />
            <v-row no-gutters class="d-flex justify-end align-end mb-4">
                <v-col v-if="reports.employees.length > 0">
                    <v-btn small color="primary" @click="print()">PRINT</v-btn>
                </v-col>
                <v-col cols="2" class="mr-2">
                    <v-select v-model="filters.year" :items="options.year" item-text="desc" item-value="id" @change="getPayperiod()" dense outlined hide-details></v-select>
                </v-col>
                <v-col cols="2">
                    <v-select v-model="filters.payperiod_id" :items="options.payperiod" item-text="pperiod" item-value="id" @change="getDtrinout()" dense outlined hide-details></v-select>
                </v-col>
            </v-row>
            <v-alert v-if="alert_status == false" type="error" outlined text>
                No Records Found!!!
            </v-alert>
            <v-row no-gutters>
                <v-col>
                    <v-card v-for="(item,i) in reports.employees" :key="i" outlined class="mb-2">
                        <v-card-subtitle class="mb-n4">
                            <ul style="list-style: none; padding: 0;">
                                <li>
                                    <ul>
                                        <li style="width: 100px;">Full Name:</li>
                                        <li><strong>{{ fullname(item) }}</strong></li>
                                    </ul>
                                    <ul>
                                        <li style="width: 100px;">Position:</li>
                                        <li>{{ item.position_desc }}</li>
                                    </ul>
                                    <ul>
                                        <li style="width: 100px;">Payperiod:</li>
                                        <li style="color: red;">{{ reports.payperiod['pperiod'] + " => " + reports.payperiod['cfrom'].substr(5,5) + " - " + reports.payperiod['cto'].substr(5,5) }}</li>
                                    </ul>
                                </li>
                            </ul>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-data-table :headers="table_headers" :items="table_items(item.id)" :items-per-page="-1" hide-default-header hide-default-footer dense>
                                <template v-slot:header="{}">
                                    <tr>
                                        <th colspan="3"></th>
                                        <th colspan="4">Original Schedule</th>
                                        <th colspan="4">Encoded Time</th>
                                        <th colspan="2">Over Time</th>
                                        <th colspan="2">Under Time</th>
                                    </tr>
                                    <tr>
                                        <th style="width: 110px;">Date</th>
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
                                        <th style="width: 70px;">Start</th>
                                        <th style="width: 70px;">End</th>
                                        <th style="width: 70px;">Start</th>
                                        <th style="width: 70px;">End</th>
                                    </tr>
                                </template>
                                <template v-slot:body={}>
                                    <tr v-for="td in table_items(item.id)" :key="td.id">
                                        <td>{{ td.date }}</td>
                                        <td>{{ td.day }}</td>
                                        <td>{{ td.type }}</td>
                                        <td>{{ td.sched_amin.substr(11,5) == '00:00' ? '' : td.sched_amin.substr(11,5) }}</td>
                                        <td>{{ td.sched_amout.substr(11,5) == '00:00' ? '' : td.sched_amout.substr(11,5) }}</td>
                                        <td>{{ td.sched_pmin.substr(11,5) == '00:00' ? '' : td.sched_pmin.substr(11,5) }}</td>
                                        <td>{{ td.sched_pmout.substr(11,5) == '00:00' ? '' : td.sched_pmout.substr(11,5) }}</td>
                                        <td>{{ td.encoded_amin == '0000-00-00 00:00:00' ? '' : td.encoded_amin.substr(11,5) }}</td>
                                        <td>{{ td.encoded_amout == '0000-00-00 00:00:00' ? '' : td.encoded_amout.substr(11,5) }}</td>
                                        <td>{{ td.encoded_pmin == '0000-00-00 00:00:00' ? '' : td.encoded_pmin.substr(11,5) }}</td>
                                        <td>{{ td.encoded_pmout == '0000-00-00 00:00:00' ? '' : td.encoded_pmout.substr(11,5) }}</td>
                                        <td>{{ td.ot_start == '0000-00-00 00:00:00' ? '' : td.ot_start.substr(11,5) }}</td>
                                        <td>{{ td.ot_end == '0000-00-00 00:00:00' ? '' : td.ot_end.substr(11,5) }}</td>
                                        <td>{{ td.ut_start == '0000-00-00 00:00:00' ? '' : td.ut_start.substr(11,5) }}</td>
                                        <td>{{ td.ut_end == '0000-00-00 00:00:00' ? '' : td.ut_end.substr(11,5) }}</td>
                                    </tr>
                                </template>
                                <!-- <template v-slot:[`item.sched_amin`]="props">
                                    {{ props.item.sched_amin == '0000-00-00 00:00:00' ? '' : props.item.sched_amin.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.sched_amout`]="props">
                                    {{ props.item.sched_amout == '0000-00-00 00:00:00' ? '' : props.item.sched_amout.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.sched_pmin`]="props">
                                    {{ props.item.sched_pmin == '0000-00-00 00:00:00' ? '' : props.item.sched_pmin.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.sched_pmout`]="props">
                                    {{ props.item.sched_pmout == '0000-00-00 00:00:00' ? '' : props.item.sched_pmout.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.encoded_amin`]="props">
                                    {{ props.item.encoded_amin == '0000-00-00 00:00:00' ? '' : props.item.encoded_amin.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.encoded_amout`]="props">
                                    {{ props.item.encoded_amout == '0000-00-00 00:00:00' ? '' : props.item.encoded_amout.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.encoded_pmin`]="props">
                                    {{ props.item.encoded_pmin == '0000-00-00 00:00:00' ? '' : props.item.encoded_pmin.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.encoded_pmout`]="props">
                                    {{ props.item.encoded_pmout == '0000-00-00 00:00:00' ? '' : props.item.encoded_pmout.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.ot_start`]="props">
                                    {{ props.item.ot_start == '0000-00-00 00:00:00' ? '' : props.item.ot_start.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.ot_end`]="props">
                                    {{ props.item.ot_end == '0000-00-00 00:00:00' ? '' : props.item.ot_end.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.ut_start`]="props">
                                    {{ props.item.ut_start == '0000-00-00 00:00:00' ? '' : props.item.ut_start.substr(11,5) }}
                                </template>
                                <template v-slot:[`item.ut_end`]="props">
                                    {{ props.item.ut_end == '0000-00-00 00:00:00' ? '' : props.item.ut_end.substr(11,5) }}
                                </template> -->
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
    components: { myHeader, Overlay },
    data(){
        return{
            alert_status: true,
            overlay: {
                value: false
            },
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
            table_headers:[
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
                { value: 'ot_start', align: 'center' },
                { value: 'ot_end', align: 'center' },
                { value: 'ut_start', align: 'center' },
                { value: 'ut_end', align: 'center' },
            ],
        }
    },
    created(){
        this.initialize()
    },
    methods:{
        initialize(){
            this.overlay.value = true
            this.$guest('/api/reports/getYear')
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
                this.filters.payperiod_id = null
                this.options.payperiod = [{ id: null, pperiod: 'Please Select Payperiod...'}]
                this.alert_status = true
            }
        },

        async getDtrinout(){
            this.overlay.value = true
            let data = {
                year: this.filters.year,
                payperiod_id: this.filters.payperiod_id
            }
            await this.$guest.post('/api/reports/getDtrinout', this.$form_data.generate(data))
            .then(res => {
                this.overlay.value = false
                this.alert_status = res.data.status
                if(res.data.status == true){
                    this.reports.employees = res.data.employees
                    this.reports.payperiod = res.data.payperiod
                    this.reports.dtrinout = res.data.dtrinout
                }else{
                    this.reports.employees = []
                    this.reports.payperiod = []
                    this.reports.dtrinout = []
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
        table_items(item){
            return this.reports.dtrinout.filter(e => e.employee_id == item)
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