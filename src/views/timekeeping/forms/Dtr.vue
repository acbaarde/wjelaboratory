<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col>
                <v-btn small color="primary" class="mr-1" @click="btn_save()" >SAVE</v-btn>
                <v-btn small color="green" dark class="mr-1" >REFRESH</v-btn>
                <v-btn small color="error">DELETE</v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters class="mt-3">
            <v-col>
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th colspan="3"></th>
                                <th colspan="4" class="text-center">Original Schedule</th>
                                <th colspan="4" class="text-center">Actual Time</th>
                                <th colspan="4" class="text-center">Encoded Time</th>
                            </tr>
                            <tr>
                                <th class="text-center">Date</th>
                                <th class="text-center">Day</th>
                                <th class="text-center">Type</th>
                                <th class="text-center px-1">AM In</th>
                                <th class="text-center px-1">AM Out</th>
                                <th class="text-center px-1">PM In</th>
                                <th class="text-center px-1">PM Out</th>
                                <th class="text-center px-1">AM In</th>
                                <th class="text-center px-1">AM Out</th>
                                <th class="text-center px-1">PM In</th>
                                <th class="text-center px-1">PM Out</th>
                                <th class="text-center px-1">AM In</th>
                                <th class="text-center px-1">AM Out</th>
                                <th class="text-center px-1">PM In</th>
                                <th class="text-center px-1">PM Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in dtr_items" :key="index">
                                <td class="fields text-center">{{ item.date }}</td>
                                <td class="fields text-center">{{ item.day }}</td>
                                <td class="fields text-center">{{ item.type }}</td>
                                <td class="fields text-center px-1">{{ item.sched_amin.substr(0,5) }}</td>
                                <td class="fields text-center px-1">{{ item.sched_amout.substr(0,5) }}</td>
                                <td class="fields text-center px-1">{{ item.sched_pmin.substr(0,5) }}</td>
                                <td class="fields text-center px-1">{{ item.sched_pmout.substr(0,5) }}</td>
                                <td class="fields text-center px-1"></td>
                                <td class="fields text-center px-1"></td>
                                <td class="fields text-center px-1"></td>
                                <td class="fields text-center px-1"></td>
                                <td class="fields text-center px-1"><input v-model="item.encoded_amin" v-mask="timeMask" placeholder="HH:mm" type="text" class="form-control"></td>
                                <td class="fields text-center px-1"><input v-model="item.encoded_amout" v-mask="timeMask" placeholder="HH:mm" type="text" class="form-control"></td>
                                <td class="fields text-center px-1"><input v-model="item.encoded_pmin" v-mask="timeMask" placeholder="HH:mm" type="text" class="form-control"></td>
                                <td class="fields text-center px-1"><input v-model="item.encoded_pmout" v-mask="timeMask" placeholder="HH:mm" type="text" class="form-control"></td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            dtr_items: this.$route.params
        }
    },
    created(){
        this.initialize();
    },
    methods: {
        timeMask(value) {
            const hours = [ /[0-2]/, value.charAt(0) === '2' ? /[0-3]/ : /[0-9]/, ];
            const minutes = [/[0-5]/, /[0-9]/];
            return value.length > 2 ? [...hours, ':', ...minutes] : hours;
        },
        btn_save(){
            console.log(this.$route.params)
        },
        initialize(){
            console.log(this.dtr_items);
        }
    }
}
</script>

<style scoped>
th {
    background-color: rgb(217, 248, 192);
}
td {
    text-align: center;
}
.fields{
    font-size: 13px !important;
}
.form-control{
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    height: 25px;
    width: 65px;
    font-size: 13px;
    text-align: center;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}
</style>