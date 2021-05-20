<template>
    <!-- <v-card>
        <v-card-title>
            <v-tabs v-model="tab" show-arrows>
                <v-tab v-for="item in tab_headers" :key="item.id">
                    {{ item.title }}
                </v-tab>
            </v-tabs>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in tab_headers" :key="item.id">
                    {{ item.id }}
                </v-tab-item>
            </v-tabs-items>
        </v-card-text>
    </v-card> -->

    <v-card class="justify-center" max-width="800px">
        <result-header />
        <v-divider></v-divider>
        <v-card-text>
            <v-container>
                <v-row no-gutters>
                    <v-col cols="12" class="d-flex justify-center">
                        <h2>HEMATOLOGY RESULT</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="px-1">
                        <table style="width:100%">
                            <tbody>
                                <tr>
                                    <td colspan="3">PLATELET COUNT</td>
                                    <td colspan="1">284</td>
                                    <td colspan="2">150 - 400 mm³</td>
                                    <td colspan="2">BLD TYPE</td>
                                    <td colspan="1">0.00</td>
                                    <td colspan="2">Rh</td>
                                    <td colspan="1">0.00</td>
                                </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">HEMOGLOBIN</td>
                                    <td rowspan="2" colspan="1">127</td>
                                    <td colspan="2">F 120 - 150 g/L</td>
                                    <td rowspan="2" colspan="6">DIFFERENTIAL COUNT</td>
                                </tr>
                                    <tr>
                                        <td colspan="2">M 140 -170g/L</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">HEMATOCRIT</td>
                                    <td rowspan="2" colspan="1">0.38</td>
                                    <td colspan="2">F 0.37 - 0.47</td>
                                    <td colspan="3">SEGMENTERS</td>
                                    <td colspan="1">0.87</td>
                                    <td colspan="2">0.50 - 0.60</td>
                                </tr>
                                    <tr>
                                        <td colspan="2">M 0.40 - 0.50</td>
                                        <td colspan="3">LYMPHOCYTES</td>
                                        <td colspan="1">0.13</td>
                                        <td colspan="2">0.30 - 0.40</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">WBC COUNT</td>
                                    <td rowspan="2" colspan="1">9.4</td>
                                    <td rowspan="2" colspan="2">5 - 10 X 10⁹</td>
                                    <td colspan="3">EOSINOPHILS</td>
                                    <td colspan="1"></td>
                                    <td colspan="2">0.00 - 0.05</td>
                                </tr>
                                    <tr>
                                        <td colspan="3">BASOPHILS</td>
                                        <td colspan="1"></td>
                                        <td colspan="2">0.00 - 0.01</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">RBC COUNT</td>
                                    <td rowspan="2" colspan="1">4.7</td>
                                    <td colspan="2">F 4.2 - 5.4</td>
                                    <td colspan="3">STABS:</td>
                                    <td colspan="1"></td>
                                    <td colspan="2">0.00 - 0.05</td>
                                </tr>
                                    <tr>
                                        <td colspan="2">M 4.7 - 6.1</td>
                                        <td colspan="3">MONOCYTES</td>
                                        <td colspan="1"></td>
                                        <td colspan="2">0.00 - 0.06</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">RETICULOCYTE</td>
                                    <td rowspan="2" colspan="1"></td>
                                    <td rowspan="2" colspan="2">5 -15 X 10³</td>
                                    <td colspan="3">BLEEDING TIME</td>
                                    <td colspan="1"></td>
                                    <td colspan="2">1 - 5 MINS</td>
                                </tr>
                                    <tr>
                                        <td colspan="3">CLOTTING TIME</td>
                                        <td colspan="1"></td>
                                        <td colspan="2">1 - 5 MINS</td>
                                    </tr>
                                <tr>
                                    <td rowspan="2" colspan="3">ESR:</td>
                                    <td rowspan="2" colspan="1"></td>
                                    <td colspan="2">F 3 - 11 mm/hr</td>
                                    <td rowspan="2" colspan="3">MALARIAL SMEAR</td>
                                    <td rowspan="2" colspan="3"></td>
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
    </v-card>
</template>

<script>
import ResultHeader from './resultHeader.vue'
export default {
    name: 'Hematology',
    data(){
        return{
            fields: ['firstname','lastname','age'],
            tab: 0,
            tab_headers: [{ id: '1', title: 'item 1' },{ id: '2', title: 'item 2' },{ id: '3', title: 'item 3' },]
        }
    },
    components: {
        ResultHeader
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
    }
    /* .ul{
        list-style: none;
        padding: 0%;
        inline-size: auto;
    }
    li, h2{
        color: black;
    }
    .li{
        text-align: center;
        font-size: 12px;
        line-height: 1rem;
    }
    .li-start{
        text-align: start;
        font-size: 15px;
        width: 80px;
    } */
</style>