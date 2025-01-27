<template>
    <div class="ma-n3">
        <myHeader :title="'Physician Rebates'" :subtitle="'Report Module Generation'" />
        <v-container fluid>
            <Overlay :value="overlay.value" />
            <v-form ref="form">
                <v-row no-gutters class="mb-4">
                    <v-spacer></v-spacer>
                    <v-text-field class="shrink mr-2" v-model="dateFrom" dense outlined type="date" label="Date From" required :rules="dateFromRules"></v-text-field>
                    <v-text-field class="shrink mr-2" v-model="dateTo" dense outlined type="date" label="Date To" required :rules="dateToRules"></v-text-field>
                    <v-btn color="primary" @click="btn_process()">Process</v-btn>
                </v-row>
            </v-form>
            <v-alert v-if="alert_status == false" type="error" outlined text dense>
                No Records Found!!!
            </v-alert>
            <v-row no-gutters>
                <v-col>
                    <v-data-table :headers="table_headers" :items="table_items" dense hide-default-footer :items-per-page="-1">
                        <template v-slot:[`item.fullname`]="{ item }">
                            {{ item.lastname + ", " + item.firstname + " " + item.middlename }}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn small color="primary" @click="btn_view(item)">VIEW</v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="dialog" persistent scrollable max-width="90%">
            <v-card>
                <v-card-title>Rebates Details</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-2">
                    <v-container fluid id="print-form">
                        <v-row class="mb-n6">
                            <v-col>
                                <h3>Physician: {{ this.active_item.lastname + ", " + this.active_item.firstname + " " + this.active_item.middlename }}</h3>
                                <h4>Date From: {{ formatDate(this.dateFrom) }}</h4>
                                <h4>Date To: {{ formatDate(this.dateTo) }}</h4>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8">
                                <table style="width:100%;">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Patient Name</th>
                                            <th>Age/Gender</th>
                                            <th>Lab test</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in active_item.breakdown" :key="item.id">
                                            <td>{{ formatDate(item.date) }}</td>
                                            <td style="text-align: center">{{ item.lastname + ", " + item.firstname + " " + item.middlename }}</td>
                                            <td style="text-align: center">{{ formatAge(item.age,item.agetype) + "/" + item.gender }}</td>
                                            <td style="text-align: center">{{ item.lab_test }}</td>
                                            <td style="text-align: center"><strong>{{ item.total_amount }}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </v-col>
                            <v-divider vertical inset></v-divider>
                            <v-col cols="4">
                                <table style="width:100%;">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in active_item.rebates" :key="item.id">
                                            <td >{{ formatDate(item.created_at) }}</td>
                                            <td style="text-align: center"><strong>{{ item.total_amount }}</strong></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td></td>
                                            <td style="text-align: center;">_______________</td>
                                        </tr>
                                        <tr>
                                            <td style="min-width: 80%; text-align: right;"><strong>TOTAL:</strong></td>
                                            <td colspan="2" style="color: red;"><strong>{{ active_item.total }}</strong></td>
                                        </tr>
                                        <tr>
                                            <td style="min-width: 80%; text-align: right;"><strong>REBATES:</strong></td>
                                            <td colspan="2" style="color: #1976d2;"><strong>{{ active_item.total + " * 0.10% = " +  active_item.total_rebates}}</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small outlined color="primary" @click="print()">PRINT</v-btn>
                    <v-btn small outlined color="error" @click="btn_close()">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import myHeader from '../../../components/myHeader.vue'
import Overlay from '../../../components/Overlay.vue'
export default {
    components: { myHeader,Overlay },
    data() {
        return {
            dateFromRules: [ v => !!v || 'Please Select Date...' ],
            dateToRules: [ v => !!v || 'Please Select Date...' ],
            alert_status: true,
            overlay: {
                value: false
            },
            dialog: false,
            dateFrom: '',
            dateTo: '',
            table_headers: [
                { text: 'Physician', value: 'fullname', align: 'left' },
                { text: 'Rebates', value: 'total_rebates', align: 'center' },
                { text: 'Total', value: 'total', align: 'center' },
                { text: 'Actions', value: 'actions', align: 'center' },
            ],
            table_items: [],
            active_item: {
                fullname: '', total: '', total_rebates: '', rebates: [], 
            },
            default_item: {
                fullname: '', total: '', total_rebates: '', rebates: []
            }
        }
    },
    methods: {
        async btn_process(){
            if(this.$refs.form.validate()){
                this.overlay.value = true
                let data = {
                    dateFrom: this.dateFrom,
                    dateTo: this.dateTo
                }
                await this.$guest.post('/api/reports/Rebates', this.$form_data.generate(data))
                .then(res => {
                    console.log(res.data)
                    this.overlay.value = false
                    this.table_items = res.data
                })
                .catch(err => { console.log(err) })
            }
        },
        btn_view(item){
            this.active_item = Object.assign({}, item)
            this.dialog = true
        },
        btn_close(){
            this.dialog = false
            this.active_item = Object.assign({}, this.default_item)
        },
        print(){
            this.print_form()
        }
    }
}
</script>

<style scoped>
tr th{
    background-color: rgb(217, 248, 192);
    text-align: center;
}
tr td{
    text-align: center;
}
</style>