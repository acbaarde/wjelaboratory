<template>
  <div class="ma-n3">
    <myHeader :title="'Send OUT'" :subtitle="'Report Module Generation'" />
    <v-container fluid>
        <Overlay :value="overlay.value" />
        <v-form ref="form">
            <v-row no-gutters>
                <v-col>
                    <v-btn small color="primary" @click="print()">PRINT</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-text-field class="shrink mr-2" v-model="date" dense outlined type="date" label="Date" required :rules="dateRules"></v-text-field>
                <v-btn color="primary" @click="btn_process()">Process</v-btn>
            </v-row>
        </v-form>
        <v-alert v-if="alert_status == false" type="error" outlined text dense>
            No Records Found!!!
        </v-alert>
        <div id="print-form">
            <v-row no-gutters>
                <v-col>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>CONTROL #.</th>
                                <th>PATIENT ID</th>
                                <th style="text-align: left;">FULLNAME</th>
                                <th>AGE</th>
                                <th>GENDER</th>
                                <th>LAB TEST</th>
                                <th>LAB TEST FEE</th>
                                <th>TO CLINIC</th>
                                <th>REMARKS</th>
                                <th>STATUS</th>
                                <th>DATE RECEIVED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in table_items" :key="index">
                                <td>{{ item.control_id }}</td>
                                <td>{{ item.patient_id }}</td>
                                <td style="text-align: left;">{{ item.fullname }}</td>
                                <td>{{ item.age }}</td>
                                <td>{{ item.gender }}</td>
                                <td>{{ item.title }}</td>
                                <td>{{ item.amount }}</td>
                                <td>{{ item.so_clinic }}</td>
                                <td>{{ item.so_remarks }}</td>
                                <td>{{ item.status }}</td>
                                <td>{{ item.so_received_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
            </v-row>
        </div>
    </v-container>
</div>
</template>

<script>
import myHeader from '../../../components/myHeader.vue'
import Overlay from '../../../components/Overlay.vue'
export default {
    components: { myHeader, Overlay },
    data(){
        return{
            alert_status: true,
            overlay: {
                value: false
            },
            dateRules: [ v => !!v || 'Please Select Date...' ],
            date: this.formatDateYYYYmmdd(),
            table_items: []
        }
    },
    methods: {
        async btn_process(){
            if(this.$refs.form.validate()){
                this.overlay.value = true
                let data = {
                    date: this.date
                }
                await this.$guest.post('/api/reports/Sendout', this.$form_data.generate(data))
                .then(res => {
                    this.alert_status = res.data.status
                    if(res.data.status){
                        this.table_items = res.data.results
                    }
                    this.overlay.value = false
                })
                .catch(err => { console.log(err) })
            }
        },
        print(){
            this.print_form()
        }
    }
}
</script>

<style scoped>
tr td{
    text-align: center;
}
table{
    font-size: 12px;
    border-collapse: collapse;
}
tfoot{
    font-weight: bold;
    background: #eeeeee;
}
</style>