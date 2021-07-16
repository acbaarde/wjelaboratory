<template>
    <div class="ma-n3">
        <myHeader :title="'Sales'" :subtitle="'Report Module Generation'" />
        <v-container fluid>
            <Overlay :value="overlay.value" />
            <v-form ref="form">
                <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-text-field class="shrink mr-2" v-model="date" dense outlined type="date" label="Date" required :rules="dateRules"></v-text-field>
                    <v-btn color="primary" @click="btn_process()">Process</v-btn>
                </v-row>
            </v-form>
            <v-alert v-if="alert_status == false" type="error" outlined text>
                No Records Found!!!
            </v-alert>
            <v-row no-gutters>
                <v-col class="px-4 mb-2">
                    <tr>
                        <td style="width: 100px;">Date:</td>
                        <td><strong>{{ DateNow() }}</strong></td>
                    </tr>
                    <tr>
                        <td style="width: 100px;">Total Sales:</td>
                        <td><strong>{{ total_amount }}</strong></td>
                    </tr>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <v-data-table :headers="table_headers" :items="table_items" dense :items-per-page="-1" hide-default-footer>
                        <template v-slot:[`item.fullname`]="{ item }">
                            {{ item.fullname }}
                        </template>
                        <template v-slot:[`item.age`]="{ item }">
                            {{ formatAge(item.age,item.agetype) }}
                        </template>
                        <template v-slot:[`item.gender`]="{ item }">
                            {{ item.gender == 'F' ? 'FEMALE' : 'MALE' }}
                        </template>
                        <template v-slot:[`item.physician`]="{ item }">
                            {{ item.physician }}
                        </template>
                    </v-data-table>
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
            alert_status: true,
            overlay: {
                value: false
            },
            date: '',
            total_amount: 0,
            dateRules: [ v => !!v || 'Please Select Date...' ],
            table_headers: [
                { text: 'Full Name', value: 'fullname', align: 'left' },
                { text: 'Age', value: 'age', align: 'center' },
                { text: 'Gender', value: 'gender', align: 'center' },
                { text: 'Physician', value: 'physician', align: 'center' },
                { text: 'Discount Type', value: 'discount_type', align: 'center' },
                { text: 'Discount %', value: 'discount', align: 'center' },
                { text: 'Cash', value: 'payment', align: 'center' },
                { text: 'Total', value: 'totalamount', align: 'center' },
            ],
            table_items: []
        }
    },
    created(){
        let dateNow =  new Date()
        let mm = dateNow.getMonth() + 1
        mm = mm < 10 ? '0' + mm : mm
        let dd = dateNow.getDate() < 10 ? '0' + dateNow.getDate() : dateNow.getDate()
        let yyyy = dateNow.getFullYear()
        this.date = yyyy+"-"+mm+"-"+dd
    },
    methods: {
        async btn_process(){
            if(this.$refs.form.validate()){
                this.overlay.value = true
                let data = {
                    date: this.date
                }
                await this.$guest.post('/api/reports/Sales', this.$form_data.generate(data))
                .then(res => {
                    this.alert_status = res.data.status
                    if(res.data.status){
                        this.table_items = res.data.results
                        this.total_amount = res.data.total_amount
                    }
                    this.overlay.value = false
                })
                .catch(err => { console.log(err) })
            }
        }
    }
}
</script>

<style scoped>

</style>