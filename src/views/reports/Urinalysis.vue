<template>
  <v-card max-width="800px">
    <v-container fluid>
        <result-header />
        <v-divider></v-divider>
        <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-center">
                <h2>ROUTINE URINALYSIS</h2>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col class="px-6">
                <table style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="width: 30%;">COLOR</td>
                            <td style="width: 20%;">LIGTH YELLOW</td>
                            <td rowspan="2" style="width: 30%;">PREGNANCY TEST</td>
                            <td rowspan="2" style="width: 20%;"></td>
                        </tr>
                        <tr>
                            <td>TRANSPARENCY</td>
                            <td>HAZY</td>
                        </tr>
                        <tr>
                            <td>REACTION</td>
                            <td>6</td>
                            <td>CALCIUM OXALATE</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>SPECIFIC GRAVITY</td>
                            <td>1.010</td>
                            <td>URIC ACID</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>PROTEIN</td>
                            <td>NEGATIVE</td>
                            <td>AMMONIUM BIURATE</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>SUGAR</td>
                            <td>NEGATIVE</td>
                            <td>FINE GRANULAR CAST</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>RED BLOOD CELLS</td>
                            <td>0 - 2 / HPF</td>
                            <td>COARSE GRANULAR CAST</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>PUS CELLS</td>
                            <td>2 - 4 / HPF</td>
                            <td>HYALINE CAST</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>EPITHELIAL CELLS</td>
                            <td>RARE</td>
                            <td>PUS CAST</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>BACTERIA</td>
                            <td>RARE</td>
                            <td>TRIPLE PHOSPHATE</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>MUCUS THREADS</td>
                            <td>SOME</td>
                            <td>YEAST CELL</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>AMORPHOUS URATES</td>
                            <td></td>
                            <td>KETONES</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>AMORPHOUS PHOSPHATES</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
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
    name: 'Urinalysis',
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