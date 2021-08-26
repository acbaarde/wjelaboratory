<template>
  <v-card max-width="800px">
    <v-container fluid>
        <result-header />
        <v-divider></v-divider>
        <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-center">
                <h2>THYROID FUNCTION RESULT</h2>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col class="px-6">
                <table style="width:100%;">
                    <thead>
                        <tr>
                            <th style="width:30%;">TEST</th>
                            <th style="width:40%;">RESULT</th>
                            <th style="width:30%;">REFERENCE VALUE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FT3</td>
                            <td>N/A</td>
                            <td>1.4 - 4.2 pg/mL</td>
                        </tr>
                        <tr>
                            <td>FT4</td>
                            <td>N/A</td>
                            <td>0.8 - 2.0 ng/dL</td>
                        </tr>
                        <tr>
                            <td>TSH</td>
                            <td>N/A</td>
                            <td>0.4 - 6.0uIU/mL</td>
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
    name: 'Thyroid',
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