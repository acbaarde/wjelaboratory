<template>
  <v-card max-width="800px">
    <v-container fluid>
        <result-header :data="header_data" />
        <!-- <v-divider></v-divider> -->
        <!-- <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-center">
                <h2>FECALYSIS RESULT</h2>
            </v-col>
        </v-row> -->
        <v-row no-gutters>
            <v-col class="px-6">
                <table style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="width: 40%">COLOR</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td style="width: 40%">CONSISTENCY</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td style="width: 40%">BACTERIA</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td style="width: 40%">RBC</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td style="width: 40%">PUS CELL</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td style="width: 40%">FAT GLOBULES</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="width: 40%">OVA PARASITES</td>
                            <td>N/A</td>
                        </tr>
                            <tr>
                                <td>N/A</td>
                            </tr>
                        <tr>
                            <td style="width: 40%">YEAST CELL</td>
                            <td>N/A</td>
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
    name: 'Fecalysis',
    components: { ResultHeader, ResultFooter },
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
}
</style>