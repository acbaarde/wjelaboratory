<template>
  <v-card max-width="800px">
    <v-container fluid>
        <result-header />
        <v-divider></v-divider>
        <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-center">
                <h2>BLOOD CHEMISTRY RESULT</h2>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="6">
                <v-col class="pa-2">
                    <table style="width:100%;">
                        <tbody>
                            <tr>
                                <td colspan="3">BLOOD SUGAR</td>
                            </tr>
                            <tr>
                                <td>FBS</td>
                                <td>145.0</td>
                                <td>70 - 105 mg/dL</td>
                            </tr>
                            <tr>
                                <td>RBS</td>
                                <td>0.00</td>
                                <td>70 - 130 mg/dL</td>
                            </tr>
                            <tr>
                                <td>HbA1c</td>
                                <td>0.00</td>
                                <td>6.6 - 8.6 %</td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
                <v-col class="pa-2">
                    <table style="width:100%;">
                        <tbody>
                            <tr>
                                <td colspan="3">LIPID PROFILE</td>
                            </tr>
                            <tr>
                                <td>TOTAL CHOLESTEROL</td>
                                <td>0.00</td>
                                <td>200 mg/dL</td>
                            </tr>
                            <tr>
                                <td>TRIGLYCERIDES</td>
                                <td>0.00</td>
                                <td>36 - 165 mg/dL</td>
                            </tr>
                            <tr>
                                <td>HDL</td>
                                <td>0.00</td>
                                <td>33 - 75 mg/dL</td>
                            </tr>
                            <tr>
                                <td>LDL</td>
                                <td>0.00</td>
                                <td>50 - 160 mg/dL</td>
                            </tr>
                            <tr>
                                <td>VLDL</td>
                                <td>0.00</td>
                                <td>5 - 40 mg/dL</td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
            </v-col>

            <v-col cols="6">
                <v-col class="pa-2">
                    <table style="width:100%;">
                        <tbody>
                            <tr>
                                <td colspan="3">ELECTROLYTE</td>
                            </tr>
                            <tr>
                                <td>SODIUM</td>
                                <td>0.00</td>
                                <td>135 - 155 mEq/L</td>
                            </tr>
                            <tr>
                                <td>POTASSIUM</td>
                                <td>0.00</td>
                                <td>3.4 - 5.3 mEq/L</td>
                            </tr>
                            <tr>
                                <td>CALCIUM</td>
                                <td>0.00</td>
                                <td>8.5 - 10.5 mg/dL</td>
                            </tr>
                            <tr>
                                <td>CHLORIDE</td>
                                <td>0.00</td>
                                <td>98 - 106 mEq/L</td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
                <v-col class="pa-2">
                    <table style="width:100%;">
                        <tbody>
                            <tr>
                                <td colspan="3">LIVER FUNCTION TEST</td>
                            </tr>
                            <tr>
                                <td>SGOT</td>
                                <td>145.0</td>
                                <td>10 - 40 IU/L</td>
                            </tr>
                            <tr>
                                <td>SGPT</td>
                                <td>0.00</td>
                                <td>5 - 35 IU/L</td>
                            </tr>
                            <tr>
                                <td>ALKALINE PHOSPHATASE</td>
                                <td>0.00</td>
                                <td>25 - 90 IU/L</td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
                <v-col class="pa-2">
                    <table style="width:100%;">
                        <tbody>
                            <tr>
                                <td colspan="3">KIDNEY FUNCTION TEST</td>
                            </tr>
                            <tr>
                                <td rowspan="2">CREATININE</td>
                                <td rowspan="2">145.0</td>
                                <td>Male 0.9 - 1.5 mg/dL</td>
                            </tr>
                                <tr>
                                    <td>Female 0.7 - 1.37 mg/dL</td>
                                </tr>
                            <tr>
                                <td>BLOOD UREA NITROGEN</td>
                                <td>0.00</td>
                                <td>7 - 23 mg/dL</td>
                            </tr>
                            <tr>
                                <td>BLOOD URIC ACID</td>
                                <td>0.00</td>
                                <td>1.5 - 7.0 mg/dL</td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
            </v-col>
        </v-row>
        <v-row>
            <result-footer />
        </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ResultHeader from './resultHeader.vue'
import ResultFooter from './resultFooter.vue'
export default {
    name: 'Blood_chemistry',
    components: { ResultHeader, ResultFooter }
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
}
</style>