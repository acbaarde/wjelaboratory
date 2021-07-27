<template>
    <div>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-btn small color="primary" @click="print()">PRINT</v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-card class="justify-center" max-width="800px" id="print-form">
        <result-header :data="header_data" />
        <!-- <v-divider></v-divider> -->
        <v-card-text style="padding-top: 0;">
            <v-container fluid>
                <!-- <v-row no-gutters>
                    <v-col cols="12" class="d-flex justify-center">
                        <h2>HEMATOLOGY RESULT</h2>
                    </v-col>
                </v-row> -->
                <v-row>
                    <v-col cols="12" class="px-1" style="padding-top: 0;">
                        <table style="width:100%">
                            <tbody>
                                <tr>
                                    <td colspan="3">PLATELET COUNT</td>
                                    <td colspan="1" style="min-width: 20px;"><strong>{{ results['PLATELET COUNT'] }}</strong></td>
                                    <td colspan="2">150 - 400 mm³</td>
                                    <td colspan="2">BLD TYPE</td>
                                    <td colspan="1" style="min-width: 20px;"><strong></strong></td>
                                    <td colspan="2">Rh</td>
                                    <td colspan="1"><strong></strong></td>
                                </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">HEMOGLOBIN</td>
                                    <td rowspan="2" colspan="1"><strong>{{ results['HEMOGLOBIN'] }}</strong></td>
                                    <td colspan="2">F 120 - 150 g/L</td>
                                    <td rowspan="2" colspan="6">DIFFERENTIAL COUNT</td>
                                </tr>
                                    <tr>
                                        <td colspan="2">M 140 -170g/L</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">HEMATOCRIT</td>
                                    <td rowspan="2" colspan="1"><strong>{{ results['HEMATOCRIT'] }}</strong></td>
                                    <td colspan="2">F 0.37 - 0.47</td>
                                    <td colspan="3">SEGMENTERS</td>
                                    <td colspan="1" style="min-width: 20px;"><strong>{{ results['SEGMENTERS'] }}</strong></td>
                                    <td colspan="2">0.50 - 0.60</td>
                                </tr>
                                    <tr>
                                        <td colspan="2">M 0.40 - 0.50</td>
                                        <td colspan="3">LYMPHOCYTES</td>
                                        <td colspan="1"><strong>{{ results['LYMPHOCYTES'] }}</strong></td>
                                        <td colspan="2">0.30 - 0.40</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">WBC COUNT</td>
                                    <td rowspan="2" colspan="1"><strong>{{ results['WBC COUNT'] }}</strong></td>
                                    <td rowspan="2" colspan="2">5 - 10 X 10⁹</td>
                                    <td colspan="3">EOSINOPHILS</td>
                                    <td colspan="1"><strong>{{ results['EOSINOPHILS'] }}</strong></td>
                                    <td colspan="2">0.00 - 0.05</td>
                                </tr>
                                    <tr>
                                        <td colspan="3">BASOPHILS</td>
                                        <td colspan="1"><strong>{{ results['BASOPHILS'] }}</strong></td>
                                        <td colspan="2">0.00 - 0.01</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">RBC COUNT</td>
                                    <td rowspan="2" colspan="1"><strong>{{ results['RBC COUNT'] }}</strong></td>
                                    <td colspan="2">F 4.2 - 5.4</td>
                                    <td colspan="3">STABS:</td>
                                    <td colspan="1"><strong>{{ results['STABS'] }}</strong></td>
                                    <td colspan="2">0.00 - 0.05</td>
                                </tr>
                                    <tr>
                                        <td colspan="2">M 4.7 - 6.1</td>
                                        <td colspan="3">MONOCYTES</td>
                                        <td colspan="1"><strong>{{ results['MONOCYTES'] }}</strong></td>
                                        <td colspan="2">0.00 - 0.06</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">RETICULOCYTE</td>
                                    <td rowspan="2" colspan="1"><strong>{{ results['RETICULOCYTE'] }}</strong></td>
                                    <td rowspan="2" colspan="2">5 -15 X 10³</td>
                                    <td colspan="3">BLEEDING TIME</td>
                                    <td colspan="1"><strong>{{ results['BLEEDING TIME'] }}</strong></td>
                                    <td colspan="2">1 - 5 MINS</td>
                                </tr>
                                    <tr>
                                        <td colspan="3">CLOTTING TIME</td>
                                        <td colspan="1"><strong>{{ results['CLOTTING TIME'] }}</strong></td>
                                        <td colspan="2">1 - 5 MINS</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">ESR:</td>
                                    <td rowspan="2" colspan="1"><strong>{{ results['ESR'] }}</strong></td>
                                    <td colspan="2">F 3 - 11 mm/hr</td>
                                    <td rowspan="2" colspan="3">MALARIAL SMEAR</td>
                                    <td rowspan="2" colspan="3"><strong>{{ results['MALARIAL SMEAR'] }}</strong></td>
                                </tr>
                                    <tr>
                                        <td colspan="2">M 1 -10 mm/hr</td>
                                    </tr>
                            </tbody>
                        </table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-row>
            <result-footer />
        </v-row>
    </v-card>

    </div>
</template>

<script>
import ResultFooter from './resultFooter.vue'
import ResultHeader from './resultHeader.vue'
export default {
    name: 'Hematology',
    data(){
        return{
            // fields: ['firstname','lastname','age'],
            // tab: 0,
            // tab_headers: [{ id: '1', title: 'item 1' },{ id: '2', title: 'item 2' },{ id: '3', title: 'item 3' },]
            results: []
        }
    },
    components: {
        ResultHeader,
        ResultFooter,
    },
    created(){
        let mod = this.$route.params.mod
        mod.forEach((el) => {
            if(el.result != 0){
                this.results[el.title] = el.result
            }
        })
        console.log(this.results)
    },
    computed:{
        header_data(){
            let age = []
            age.push(this.$route.params.active_item.age,this.$route.params.active_item.agetype)
            return {
                fullname: this.$route.params.active_item.fullname,
                age: age,
                gender: this.$route.params.active_item.gender == "M" ? "MALE" : "FEMALE",
                physician: this.$route.params.active_item.physician,
                title: this.$route.params.active_item.title
            }
        }
    },
    methods:{
        print(){
            // WinPrint.print();
            // var printContents = document.getElementById('print-form').innerHTML;
            // var originalContents = document.body.innerHTML;
            // document.body.innerHTML = printContents;
            // window.print();
            // document.body.innerHTML = originalContents;


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
    table, th,td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        text-align: center;
        color: black;  
        font-size: 12px;
        font-family: "Roboto", sans-serif; 
    }
    h2{
        text-align: center;
        font-family: "Roboto", sans-serif;
    }
</style>