<template>
    <div class="ma-n3">
        <!-- <v-card-title>
                <span>Employee Payslip</span>
        </v-card-title>
        <v-card-subtitle><span>Report Module Generation...</span></v-card-subtitle>
        <v-divider></v-divider> -->
        <myHeader :title="'Payslip Reports'" :subtitle="'Report Module Generation'" />
        <v-container fluid>
            <Overlay :value="overlay.value" />
            <v-row no-gutters class="d-flex justify-end align-center mb-4">
            <v-col>
                <v-btn small color="primary" @click="print()">PRINT</v-btn>
            </v-col>
            <v-spacer></v-spacer>
              <v-col cols="2" class="mr-2">
                    <v-select v-model="filters.year" :items="options.year" item-text="desc" item-value="id" @change="getPayperiod()" dense outlined hide-details></v-select>
                </v-col>
                <v-col cols="2">
                    <v-select v-model="filters.payperiod_id" :items="options.payperiod" item-text="pperiod" item-value="id" @change="getPayslip()" dense outlined hide-details></v-select>
                </v-col>
            </v-row>
            <v-alert v-if="alert_status == false" type="error" outlined text>
                No Records Found!!!
            </v-alert>
            <v-row no-gutters>
                <v-card class="justify-center" width="800px" flat outlined v-if="employees.length > 0">
                    <v-card-text style="line-height: 1rem;">
                        <v-container id="print-form">
                            <v-row>
                                <v-col cols="6" v-for="(item,i) in employees" :key="i">
                                    <ul class="ul">
                                        <li>
                                            <ul class="ul">
                                                <li class="li-center"><strong>{{ item.payperiod }}</strong></li>
                                            </ul>
                                            <ul class="ul">
                                                <li style="display: inline-block; width: 120px;">NAME:</li>
                                                <li style="display: inline-block; width: auto; text-align: center;"><strong>{{ item.firstname + " " + item.lastname }}</strong></li>
                                            </ul>
                                            <ul class="ul">
                                                <li style="display: inline-block; width: 120px;">POSITION:</li>
                                                <li style="display: inline-block;"><strong>{{ item.position }}</strong></li>
                                            </ul>
                                            <ul class="ul">
                                                <li style="display: inline-block; width: 120px;">SALARY:</li>
                                                <li style="display: inline-block;"><strong>{{ item.salary }}</strong></li>
                                            </ul>
                                            <ul class="ul">
                                                <li class="li-start" style="margin-top: 10px;">EARNINGS:</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="display: inline-block; width: 120px;">REG HRS:</li>
                                                <li style="display: inline-block; width: 100px; text-align: center;">{{ item.reg_hrs }}</li>
                                                <li style="display: inline-block; width: 92px; text-align: right;">{{ item.reg_hrs_pay }}</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="display: inline-block; width: 120px;">OT HRS:</li>
                                                <li style="display: inline-block; width: 100px; text-align: center;">{{ item.reg_ot }}</li>
                                                <li style="display: inline-block; width: 92px; text-align: right;">{{ item.reg_ot_pay }}</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="width: 190px;"><hr></li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="display: inline-block; width: 120px;">GROSS</li>
                                                <li style="display: inline-block; width: 192px; text-align: right;">{{ item.gross }}</li>
                                            </ul>
                                            <ul class="ul" style="margin-top: 10px;">
                                                <li class="li-start">DEDUCTIONS:</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;" v-for="(item_deduc,ii) in item.deductions" :key="ii">
                                                <li style="display: inline-block; width: 120px;">{{ item_deduc.description }}</li>
                                                <li style="display: inline-block; width: 192px; text-align: right;">{{ item_deduc.amount }}</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="width: 190px;"><hr></li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="display: inline-block; width: 120px;">TOTAL</li>
                                                <li style="display: inline-block; width: 192px; text-align: right;">{{ item.total_adjustments }}</li>
                                            </ul>
                                            <ul class="ul" style="margin-top: 10px;">
                                                <li style="display: inline-block; width: 120px;"><strong>NET PAY:</strong></li>
                                                <li style="display: inline-block; width: 208px; text-align: right;"><strong>{{ item.net }}</strong></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </v-col>
                                <!-- <v-divider vertical></v-divider>
                                <v-col cols="6">
                                    <ul class="ul">
                                        <li>
                                            <ul class="ul">
                                                <li class="li-center"><strong>JULY 16-31 2021</strong></li>
                                            </ul>
                                            <ul class="ul">
                                                <li style="display: inline-block; width: 120px;">NAME:</li>
                                                <li style="display: inline-block; width: auto; text-align: center;"><strong>JOANA PAULA BONIOL</strong></li>
                                            </ul>
                                            <ul class="ul">
                                                <li style="display: inline-block; width: 120px;">POSITION:</li>
                                                <li style="display: inline-block;"><strong>MED TECH</strong></li>
                                            </ul>
                                            <ul class="ul">
                                                <li style="display: inline-block; width: 120px;">SALARY:</li>
                                                <li style="display: inline-block;"><strong>500.00</strong></li>
                                            </ul>
                                            <ul class="ul">
                                                <li class="li-start" style="margin-top: 10px;">EARNINGS:</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="display: inline-block; width: 120px;">REG HRS:</li>
                                                <li style="display: inline-block; width: 100px; text-align: center;">96.00</li>
                                                <li style="display: inline-block; width: 92px; text-align: right;">6000.00</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="display: inline-block; width: 120px;">OT HRS:</li>
                                                <li style="display: inline-block; width: 100px; text-align: center;">16.00</li>
                                                <li style="display: inline-block; width: 92px; text-align: right;">0.00</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="width: 190px;"><hr></li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="display: inline-block; width: 120px;">GROSS</li>
                                                <li style="display: inline-block; width: 192px; text-align: right;">6000.00</li>
                                            </ul>
                                            <ul class="ul" style="margin-top: 10px;">
                                                <li class="li-start">DEDUCTIONS:</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;" v-for="(item,i) in deductions" :key="i">
                                                <li style="display: inline-block; width: 120px;">{{ item.text }}</li>
                                                <li style="display: inline-block; width: 192px; text-align: right;">{{ item.value }}</li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="width: 190px;"><hr></li>
                                            </ul>
                                            <ul class="ul" style="margin-left: 14px;">
                                                <li style="display: inline-block; width: 120px;">TOTAL</li>
                                                <li style="display: inline-block; width: 192px; text-align: right;">6000.00</li>
                                            </ul>
                                            <ul class="ul" style="margin-top: 10px;">
                                                <li style="display: inline-block; width: 120px;"><strong>NET PAY:</strong></li>
                                                <li style="display: inline-block; width: 208px; text-align: right;"><strong>6000.00</strong></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </v-col> -->
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
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
            employees: [],
            // reports:{
            //     employees: [],
            //     dtrinout: [],
            //     payperiod: []
            // },
            // deductions: [
            //     { text: 'PHILHEALTH', value: '112.50' },
            //     { text: 'PAGIBIG', value: '1000.00' },
            //     { text: 'SSS', value: '272.50' },
            // ]
        }
    },
    created(){
      this.initialize()
    },
    methods: {
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
            // this.overlay.value = true
            if(this.filters.year != null){
                let data = {
                    year: this.filters.year,
                    payperiod_id: this.filters.payperiod_id
                }
                this.$guest.post('/api/reports/getPayperiod', this.$form_data.generate(data))
                .then(res => {
                    // this.overlay.value = false
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
        getPayslip(){
            this.overlay.value = true
            this.$guest.post('/api/reports/Payslip', this.$form_data.generate(this.filters))
            .then(res => {
                this.overlay.value = false
                this.employees = Object.assign([], res.data.results)
                this.alert_status = res.data.status
            })
            .catch(err => { console.log(err) })
        },
        print(){
            // Get HTML to print from element
            const prtHtml = document.getElementById('print-form').innerHTML;

            // Get all stylesheets HTML
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="prefetch"], style')]) {
                stylesHtml += node.outerHTML;
            }
            // Open the print window
            const WinPrint = window.open();
            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);

            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
        }
    }
}
</script>

<style scoped>
span{
    color: rgb(25, 118, 210);
}
.ul{
    width: 100%;
    list-style: none;
    padding: 0%;
    /* inline-size: auto; */
}
li{
    color: black;
}
li{
    font-size: 11px;
}
.li-center{
    text-align: center;
    line-height: 1rem;
}

.li-start{
    text-align: start;
    width: 80px;
}
li, h2{
    font-family: "Roboto", sans-serif;
}
</style>