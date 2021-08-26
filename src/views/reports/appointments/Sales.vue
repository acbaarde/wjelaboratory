<template>
    <div class="ma-n3">
        <myHeader :title="'Sales'" :subtitle="'Report Module Generation'" />
        <v-container fluid>
            <Overlay :value="overlay.value" />
            <v-form ref="form">
                <v-row no-gutters>
                    <v-col>
                        <v-btn small color="primary" @click="print()">PRINT</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-text-field class="shrink mr-2" v-model="date" dense outlined type="date" label="Date" required :rules="dateRules"></v-text-field>
                    <v-btn color="primary" @click="btn_process()">Process</v-btn>
                </v-row>
            </v-form>
            <v-alert v-if="alert_status == false" type="error" outlined text dense>
                No Records Found!!!
            </v-alert>
            <div id="print-form">
                <v-row no-gutters>
                    <v-col>
                        <table width="100%">
                            <thead>
                                <tr>
                                    <th>CONTROL #.</th>
                                    <th style="text-align: left;">FULLNAME</th>
                                    <th>AGE</th>
                                    <th>GENDER</th>
                                    <th>PHYSICIAN</th>
                                    <th>DISCOUNT TYPE</th>
                                    <th>DISCOUNT %</th>
                                    <th>CASH</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in table_items" :key="index">
                                    <td>{{ item.control_no }}</td>
                                    <td style="text-align: left;">{{ item.fullname }}</td>
                                    <td>{{ item.age }}</td>
                                    <td>{{ item.gender }}</td>
                                    <td>{{ item.physician }}</td>
                                    <td>{{ item.discount }}</td>
                                    <td>{{ item.discount_percent }}</td>
                                    <td>{{ item.cash }}</td>
                                    <td>{{ item.total_amount }}</td>
                                </tr>
                            </tbody>
                            
                            <tfoot>
                                <tr>
                                    <td colspan="6"></td>
                                    <td>TOTAL</td>
                                    <td>{{ total_cash }}</td>
                                    <td>{{ total_amount }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </v-col>
                </v-row>
            </div>
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
            date: '',
            total_amount: 0,
            total_cash: 0,
            dateRules: [ v => !!v || 'Please Select Date...' ],
            table_items: []
        }
    },
    created(){
        let dateNow =  new Date()
        let mm = dateNow.getMonth() + 1
        mm = mm < 10 ? '0' + mm : mm
        let dd = dateNow.getDate() < 10 ? '0' + dateNow.getDate() : dateNow.getDate()
        let yyyy = dateNow.getFullYear()
        this.date = yyyy+"-"+mm+"-"+dd
    },
    methods: {
        async btn_process(){
            if(this.$refs.form.validate()){
                this.overlay.value = true
                let data = {
                    date: this.date
                }
                await this.$guest.post('/api/reports/Sales', this.$form_data.generate(data))
                .then(res => {
                    console.log(res.data)
                    this.alert_status = res.data.status
                    if(res.data.status){
                        this.table_items = res.data.results
                        this.total_amount = res.data.total_amount
                        this.total_cash = res.data.total_cash
                    }
                    this.overlay.value = false
                })
                .catch(err => { console.log(err) })
            }
        },
        print(){
            this.print_form()
        }
    }
}
</script>

<style scoped>
tr td{
    text-align: center;
}
table{
    font-size: 12px;
    border-collapse: collapse;
}
tfoot{
    font-weight: bold;
    background: #eeeeee;
}
</style>