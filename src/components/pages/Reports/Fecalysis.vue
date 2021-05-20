<template>
  <v-card max-width="800px">
    <v-container fluid>
        <result-header />
        <v-divider></v-divider>
        <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-center">
                <h2>RESULT</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="px-12">
                <table style="width:100%;">
                    <tbody>
                        <tr>
                            <td>Color</td>
                            <td>N/A</td>
                        </tr>
                    </tbody>
                </table>
            </v-col>
        </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ResultHeader from './resultHeader.vue'
export default {
    name: 'Fecalysis',
    components: { ResultHeader }
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
</style>