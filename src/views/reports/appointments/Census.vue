<template>
    <div class="ma-n3">
        <myHeader :title="'Census'" :subtitle="'Report Module Generation'" />
        <v-container fluid>
            <Overlay :value="overlay.value" />
            <v-form ref="form">
                <v-row no-gutters class="mb-4">
                    <v-btn small color="primary" @click="print()">PRINT</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field class="shrink mr-2" v-model="dateFrom" dense outlined type="date" label="Date From" required :rules="dateFromRules"></v-text-field>
                    <v-text-field class="shrink mr-2" v-model="dateTo" dense outlined type="date" label="Date To" required :rules="dateToRules"></v-text-field>
                    <v-btn color="primary" @click="btn_process()">Process</v-btn>
                </v-row>
            </v-form>
            <v-alert v-if="alert_status == false" type="error" outlined text dense>
                No Records Found!!!
            </v-alert>
            <v-row no-gutters>
                <v-col>
                    <div style="overflow-x: auto;" id="print-form">
                        <table border="1">
                            <thead>
                                <tr>
                                    <th style="width: 100px;"></th>
                                    <th :style="'width:'+ header.submodules.length * 40 +'px; background-color: '+ header.color" :colspan="header.submodules.length" v-for="header in table_headers" :key="header.id" :id="'th_' + header.id">
                                        {{ header.title }}
                                    </th>
                                </tr>
                                <tr>
                                    <th style="width: 100px;">DATE</th>
                                    <th :style="'width:40px !important; background-color: '+ submod.color" v-for="(submod,i) in submodules()" :key="i">
                                        {{ submod.abbr }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,i) in table_items" :key="i">
                                    <td>{{ item.date }}</td>
                                    <td v-for="(value,index) in item.results" :key="index">
                                        {{ value > 0 ? value : '' }}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td><strong>TOTAL:</strong></td>
                                    <td v-for="(value,index) in table_footer" :key="index">
                                        <strong>{{ value > 0 ? value : '' }}</strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </v-col>
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
            dateFromRules: [ v => !!v || 'Please Select Date...' ],
            dateToRules: [ v => !!v || 'Please Select Date...' ],
            alert_status: true,
            overlay: {
                value: false
            },
            dateFrom: '',
            dateTo: '',
            table_headers: [
                { submodules : [] }
            ],
            table_items: [],
            table_footer: []
        }
    },
    created(){
        this.$guest.post('/api/laboratory/loadLabmodule')
        .then(res => {
            this.table_headers = res.data.modules
            let colors = ['#FDE9D9','#C5D9F1','#E6B8B7','#C4D79B','#B1A0C7','#92CDDC','#92D050','#C4BD97','#FFC000','#D8E4BC']
            colors.forEach((e,i) => {
                this.table_headers[i]['color'] = e
                this.table_headers[i]['submodules'].forEach((el,ii) => {
                    this.table_headers[i]['submodules'][ii]['color'] = e
                })
            })
        })
        .catch(err => { console.log(err) })
    },
    methods:{
        async btn_process(){
            
            this.table_footer = []
            if(this.$refs.form.validate()){
                this.overlay.value = true
                let data = {
                    dateFrom: this.dateFrom,
                    dateTo: this.dateTo
                }
                await this.$guest.post('/api/reports/Census', this.$form_data.generate(data))
                .then(res => {
                    this.table_items = res.data
                    this.overlay.value = false
                    let len = res.data[0].results.length
                    let total = []
                    for(let i = 0; i < len; i++){
                        this.table_footer.push(0)
                        total.push(0)
                    }
                    total.forEach((e,i) => {
                        this.table_items.forEach(el => {
                            if(el.results[i] > 0){
                                this.table_footer[i] += el.results[i];
                            }
                        })
                    })
                })
                .catch(err => { console.log(err) })
            }
        },
        submodules(){
            let submod = []
            this.table_headers.forEach(e => {
                e.submodules.forEach(el => {
                    submod.push({
                        abbr: el.abbr,
                        color: el.color
                    })       
                })
            })
            return submod
        },
        print(){
            this.print_form()
        }
    }
}
</script>

<style scoped>
table {
    table-layout:fixed;
    width: 100%;
}
table, tr, td {
    border: 1 solid;
    border-collapse: collapse;
    text-align: center;
    font-size: small;
}
tr th{
    text-align: center;
    font-size: small;
}
th{
    padding-right: 2px;
}
tfoot tr{
    background: rgba(165, 158, 158, 0.432);
}
</style>