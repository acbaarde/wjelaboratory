<template>
    <div>
    <v-container fluid>
        <v-row>
            <v-col>
                <!-- <v-btn small color="primary" @click="print()">PRINT</v-btn> -->
                <v-btn small color="primary" @click="printLabTest()">PRINT LABORATORY TEST</v-btn>
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
        async printLabTest(){
            let data = {
                item_id: this.header_data.item_id,
                patient_info: JSON.stringify(this.header_data),
                results: JSON.stringify(this.results),
                user: JSON.stringify({ id: this.$session.get('userid-session'), name: this.$session.get('user-session')})
            }
            await this.$guest.post('/api/appointment/printLabTest', this.$form_data.generate(data))
            .then(res => {
                if(res.status == 200){
                    const winPrint = window.open(res.data, '', '');
                    winPrint.focus();
                    winPrint.print();
                    winPrint.addEventListener('afterprint', () => {
                        winPrint.close();
                    });
                    setTimeout(() => {
                        this.$router.push(this.fullPath)
                    }, 1000);
                }
            })
        },
        async print(){
            let data = {
                item_id: this.header_data.item_id,
                user_id: this.$session.get('userid-session')
            }
            await this.$guest.post('/api/appointment/postPrintItem', this.$form_data.generate(data))
            .then(res => {
                if(res.data.status == true){
                    this.$router.push(this.fullPath)
                    // this.print_form()
                        // Get HTML to print from element
                        const prtHtml = document.getElementById('print-form').innerHTML;

                        // Get all stylesheets HTML
                        let stylesHtml = '';
                        for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                            stylesHtml += node.outerHTML;
                        }
                        // Open the print window
                        const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
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
                        // WinPrint.close();
                        WinPrint.addEventListener('afterprint', () => {
                            WinPrint.close();
                        });
                        WinPrint.onafterprint( () => {
                            WinPrint.close();
                        });
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