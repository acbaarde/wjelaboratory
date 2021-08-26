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
        <v-card-text style="padding-top: 0;">
            <v-container>
                <v-row>
                    <v-col cols="12" class="px-1" style="padding-top: 0;">
                        <!-- <div v-for="(i,v) in results" :key="v" class="mb-2"> -->
                            <table style="width:100%">
                                <thead>
                                    <tr>
                                        <th colspan="3">{{ results.title }}</th>
                                    </tr>
                                    <tr>
                                        <th>TEST</th>
                                        <th>RESULT</th>
                                        <th>REFERENCE VALUE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(i,v) in results.lab_results" :key="v">
                                        <td>{{ i.result_title }}</td>
                                        <td>{{ i.result_value }}</td>
                                        <td>{{ i.result_range }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>* Remarks: <span>{{ results.remarks }}</span></p>
                        <!-- </div> -->
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
            header_data: this.$route.params.info,
            results: Object.assign({}, this.$route.params.results),
            fullPath: this.$route.params.url
        }
    },
    components: {
        ResultHeader,
        ResultFooter,
    },
    methods: {
        async print(){
            let data = {
                item_id: this.header_data.item_id,
                user_id: this.$session.get('userid-session')
            }
            await this.$guest.post('/api/appointment/postPrintItem', this.$form_data.generate(data))
            .then(res => {
                if(res.data.status == true){
                    this.$router.push(this.fullPath)
                    this.print_form()
                }
            })
        },
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
        font-size: 11px;
        font-family: "Roboto", sans-serif; 
    }
    h2{
        text-align: center;
        font-family: "Roboto", sans-serif;
    }
</style>