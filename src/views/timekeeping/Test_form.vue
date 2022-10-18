<template>
    <v-container>
        <v-row>
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
                            <tr v-for="(item, index) in items" :key="index">
                                <td class="text-center">{{ item.date }}</td>
                                <td class="text-center">{{ item.day }}</td>
                                <td class="text-center">{{ item.type }}</td>
                                <td class="text-center px-1">{{ item.samin }}</td>
                                <td class="text-center px-1">{{ item.samout }}</td>
                                <td class="text-center px-1">{{ item.spmin }}</td>
                                <td class="text-center px-1">{{ item.spmout }}</td>
                                <td class="text-center px-1">{{ item.aamin }}</td>
                                <td class="text-center px-1">{{ item.aamout }}</td>
                                <td class="text-center px-1">{{ item.apmin }}</td>
                                <td class="text-center px-1">{{ item.apmout }}</td>
                                <td class="text-center px-1"><input v-model="item.eamin" v-mask="timeMask" placeholder="HH:mm" type="text" class="form-control"></td>
                                <td class="text-center px-1"><input v-model="item.eamout" v-mask="timeMask" placeholder="HH:mm" type="text" class="form-control"></td>
                                <td class="text-center px-1"><input v-model="item.epmin" v-mask="timeMask" placeholder="HH:mm" type="text" class="form-control"></td>
                                <td class="text-center px-1"><input v-model="item.epmout" v-mask="timeMask" placeholder="HH:mm" type="text" class="form-control"></td>
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
            items: [
                { 
                    date: '2022-01-01',
                    day: 'MON',
                    type: 'R',
                    samin: '08:00',
                    samout: '12:00',
                    spmin: '13:00',
                    spmout: '17:00', 
                    eamin: '',
                    eamout: '',
                    epmin: '', 
                    epmout: '' ,
                    aamin: '',
                    aamout: '',
                    apmin: '', 
                    apmout: '' 
                    },
            ]
        }
    },
    methods: {
        timeMask(value) {
            const hours = [ /[0-2]/, value.charAt(0) === '2' ? /[0-3]/ : /[0-9]/, ];
            const minutes = [/[0-5]/, /[0-9]/];
            return value.length > 2 ? [...hours, ':', ...minutes] : hours;
        },
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