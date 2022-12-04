<template>
<div class="ma-n3">
    <v-container fluid>
    <v-alert v-if="alert_status == false" type="error" outlined text>
        No Payroll Period Established!
    </v-alert>
    <v-card v-else flat outlined>
        <Overlay :value="overlay.value" />
        <v-flex md-12 class="ma-2">
            <v-container fluid>
                <v-row no-gutters>
                    <v-col>
                        <h2 style="color: #1976d2;">{{ fullname }}</h2>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="6">
                        <ul style="list-style: none; padding: 0;">
                            <li>
                                <ul>
                                    <li style="width: 120px;">Employee id:</li>
                                    <li><strong>{{ employee.id }}</strong></li>
                                </ul>
                                <ul>
                                    <li style="width: 120px;">Employee Status:</li>
                                    <li><strong>{{ employee.employment_status_desc }}</strong></li>
                                </ul>
                                <ul>
                                    <li style="width: 120px;">Position:</li>
                                    <li><strong>{{ employee.position_desc }}</strong></li>
                                </ul>
                            </li>
                        </ul>

                    </v-col>
                    <v-col cols="6">
                        <ul style="list-style: none; padding: 0;">
                            <li>
                                <ul>
                                    <li style="width: 100px;">Pay Period:</li>
                                    <li><strong>{{ payperiod.pperiod }}</strong></li>
                                </ul>
                                <ul>
                                    <li style="width: 100px;">Cutoff:</li>
                                    <li style="color: red;"><strong>{{ payperiod.cfrom + " - " +  payperiod.cto}}</strong></li>
                                </ul>
                            </li>
                        </ul>
                
                    </v-col>
                </v-row>
            </v-container>

            <v-card-text>
                <v-divider></v-divider>
                    <v-tabs v-model="tab" show-arrows fixed-tabs>
                        <v-tab key="DTR">
                            DTR
                        </v-tab>
                        <v-tab key="Overtime">
                            Overtime
                        </v-tab>
                        <v-tab key="Undertime">
                            Undertime
                        </v-tab>
                        <v-tab key="CWS">
                            CWS
                        </v-tab>
                        <v-tab key="item1">
                            Adjustments
                        </v-tab>
                        <!-- <v-tab @click="goto(0)" key="TEST">
                            DTR
                        </v-tab> -->
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item> <!-- DTR -->
                            <v-container fluid>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-btn small color="primary" class="mr-1" @click="savedtr()">SAVE</v-btn>
                                        <v-btn small color="green" dark class="mr-1" @click="initialize()">REFRESH</v-btn>
                                        <v-btn small color="error">DELETE</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="mt-3">
                                    <v-col>
                                        <!-- <v-data-table :headers="dtr_headers" :items="dtr_items" :items-per-page="-1" dense flat disable-sort hide-default-header hide-default-footer>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th colspan="3"></th>
                                                    <th colspan="4">Original Schedule</th>
                                                    <th colspan="4">Encoded Time</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 80px;">Date</th>
                                                    <th style="width: 20px;">Day</th>
                                                    <th style="width: 30px;">Type</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.sched_amin`]="props">
                                                {{ props.item.cws_amin != '' ? props.item.cws_amin : props.item.sched_amin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_amout`]="props">
                                                {{ props.item.cws_amout != '' ? props.item.cws_amout : props.item.sched_amout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmin`]="props">
                                                {{ props.item.cws_pmin != '' ? props.item.cws_pmin : props.item.sched_pmin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmout`]="props">
                                                {{ props.item.cws_pmout != '' ? props.item.cws_pmout : props.item.sched_pmout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.encoded_amin`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.encoded_amin" v-mask="'##:##'" @input="handleInput(props.item,'amin')" single-line dense outlined hide-details></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_amout`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.encoded_amout" v-mask="'##:##'" @input="handleInput(props.item,'amout')" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_pmin`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.encoded_pmin" v-mask="'##:##'" @input="handleInput(props.item,'pmin')" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.encoded_pmout`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.encoded_pmout" v-mask="'##:##'" @input="handleInput(props.item,'pmout')" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                        
                                        </v-data-table> -->

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
                                                        <td class="fields text-center px-1">{{ item.cws_amin != '' ? item.cws_amin.substr(0,5) : item.sched_amin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_amout != '' ? item.cws_amout.substr(0,5) : item.sched_amout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_pmin != '' ? item.cws_pmin.substr(0,5) : item.sched_pmin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_pmout != '' ? item.cws_pmout.substr(0,5) : item.sched_pmout.substr(0,5) }}</td>
                                                        <td :class="['fields text-center px-1', (item.encoded_amin != '' ? 'success--text' : '')]">{{ item.encoded_amin != '' ? item.encoded_amin : item.actual_amin.substr(0,5) }}</td>
                                                        <td :class="['fields text-center px-1', (item.encoded_amout != '' ? 'success--text' : '')]">{{ item.encoded_amout != '' ? item.encoded_amout : item.actual_amout.substr(0,5) }}</td>
                                                        <td :class="['fields text-center px-1', (item.encoded_pmin != '' ? 'success--text' : '')]">{{ item.encoded_pmin != '' ? item.encoded_pmin : item.actual_pmin.substr(0,5) }}</td>
                                                        <td :class="['fields text-center px-1', (item.encoded_pmout != '' ? 'success--text' : '')]">{{ item.encoded_pmout != '' ? item.encoded_pmout : item.actual_pmout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1"><input v-model="item.encoded_amin" class="form-control" v-mask="timeMask" type="text" @blur="onblur(item, 'encoded_amin')" placeholder="HH:mm" :style="item.actual_amin == '' ? 'background-color: ' : 'background-color: #d9f8c080'"></td>
                                                        <td class="fields text-center px-1"><input v-model="item.encoded_amout" class="form-control" v-mask="timeMask" type="text" @blur="onblur(item, 'encoded_amout')" placeholder="HH:mm" :style="item.actual_amout == '' ? 'background-color: ' : 'background-color: #d9f8c080'"></td>
                                                        <td class="fields text-center px-1"><input v-model="item.encoded_pmin" class="form-control" v-mask="timeMask" type="text" @blur="onblur(item, 'encoded_pmin')" placeholder="HH:mm" :style="item.actual_pmin == '' ? 'background-color: ' : 'background-color: #d9f8c080'"></td>
                                                        <td class="fields text-center px-1"><input v-model="item.encoded_pmout" class="form-control" v-mask="timeMask" type="text" @blur="onblur(item, 'encoded_pmout')" placeholder="HH:mm" :style="item.actual_pmout == '' ? 'background-color: ' : 'background-color: #d9f8c080'"></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item><!-- OVERTIME -->
                            <v-container fluid>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-btn small color="primary" class="mr-1" @click="savedtr()">SAVE</v-btn>
                                        <v-btn small color="green" dark class="mr-1" @click="initialize()">REFRESH</v-btn>
                                        <v-btn small color="error">DELETE</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="mt-3">
                                    <v-col>
                                        <!-- <v-data-table :headers="overtime_headers" :items="overtime_items" :items-per-page="-1" dense flat disable-sort hide-default-header hide-default-footer>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th colspan="3"></th>
                                                    <th colspan="4">Original Schedule</th>
                                                    <th colspan="4">Encoded Time</th>
                                                    <th colspan="2">Overtime</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 80px;">Date</th>
                                                    <th style="width: 20px;">Day</th>
                                                    <th style="width: 30px;">Type</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">Start</th>
                                                    <th style="width: 70px;">End</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.sched_amin`]="props">
                                                {{ props.item.cws_amin != '' ? props.item.cws_amin : props.item.sched_amin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_amout`]="props">
                                                {{ props.item.cws_amout != '' ? props.item.cws_amout : props.item.sched_amout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmin`]="props">
                                                {{ props.item.cws_pmin != '' ? props.item.cws_pmin : props.item.sched_pmin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmout`]="props">
                                                {{ props.item.cws_pmout != '' ? props.item.cws_pmout : props.item.sched_pmout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.ot_start`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.ot_start" v-mask="'##:##'" @blur="handleInput_ot(props.item,'ot_start')" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.ot_end`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.ot_end" v-mask="'##:##'" @blur="handleInput_ot(props.item,'ot_end')" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            
                                        </v-data-table> -->

                                        <v-simple-table dense>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th colspan="3"></th>
                                                        <th colspan="4" class="text-center">Original Schedule</th>
                                                        <th colspan="4" class="text-center">Actual Time</th>
                                                        <th colspan="4" class="text-center">Overtime</th>
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
                                                        <th class="text-center px-1">Start</th>
                                                        <th class="text-center px-1">End</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in dtr_items" :key="index">
                                                        <td class="fields text-center">{{ item.date }}</td>
                                                        <td class="fields text-center">{{ item.day }}</td>
                                                        <td class="fields text-center">{{ item.type }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_amin != '' ? item.cws_amin.substr(0,5) : item.sched_amin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_amout != '' ? item.cws_amout.substr(0,5) : item.sched_amout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_pmin != '' ? item.cws_pmin.substr(0,5) : item.sched_pmin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_pmout != '' ? item.cws_pmout.substr(0,5) : item.sched_pmout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.encoded_amin != '' ? item.encoded_amin : item.actual_amin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.encoded_amout != '' ? item.encoded_amout : item.actual_amout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.encoded_pmin != '' ? item.encoded_pmin : item.actual_pmin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.encoded_pmout != '' ? item.encoded_pmout : item.actual_pmout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1"><input v-model="item.ot_start" class="form-control" v-mask="timeMask" @blur="handleInput_ot(item,'ot_start')" type="text" placeholder="HH:mm" :disabled="disabledField(item)" :style="item.ot_start == '' ? 'background-color: ' : 'background-color: #d9f8c080'"></td>
                                                        <td class="fields text-center px-1"><input v-model="item.ot_end" class="form-control" v-mask="timeMask" @blur="handleInput_ot(item,'ot_end')" type="text" placeholder="HH:mm" :disabled="disabledField(item)" :style="item.ot_end == '' ? 'background-color: ' : 'background-color: #d9f8c080'"></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item><!-- UNDERTIME -->
                            <v-container fluid>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-btn small color="primary" class="mr-1" @click="savedtr()">SAVE</v-btn>
                                        <v-btn small color="green" dark class="mr-1" @click="initialize()">REFRESH</v-btn>
                                        <v-btn small color="error" @click="deletedtr()">DELETE</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="mt-3">
                                    <v-col>
                                        <!-- <v-data-table :headers="undertime_headers" :items="undertime_items" :items-per-page="-1" dense flat disable-sort hide-default-header hide-default-footer>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th colspan="3"></th>
                                                    <th colspan="4">Original Schedule</th>
                                                    <th colspan="4">Encoded Time</th>
                                                    <th colspan="2">Undertime</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 80px;">Date</th>
                                                    <th style="width: 20px;">Day</th>
                                                    <th style="width: 30px;">Type</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">Start</th>
                                                    <th style="width: 70px;">End</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.ut_start`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.ut_start" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.ut_end`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.ut_end" v-mask="'##:##'" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.sched_amin`]="props">
                                                {{ props.item.cws_amin != '' ? props.item.cws_amin : props.item.sched_amin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_amout`]="props">
                                                {{ props.item.cws_amout != '' ? props.item.cws_amout : props.item.sched_amout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmin`]="props">
                                                {{ props.item.cws_pmin != '' ? props.item.cws_pmin : props.item.sched_pmin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmout`]="props">
                                                {{ props.item.cws_pmout != '' ? props.item.cws_pmout : props.item.sched_pmout.substr(0,5) }}
                                            </template>
                                        </v-data-table> -->

                                        <v-simple-table dense>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th colspan="3"></th>
                                                        <th colspan="4" class="text-center">Original Schedule</th>
                                                        <th colspan="4" class="text-center">Actual Time</th>
                                                        <th colspan="4" class="text-center">Undertime</th>
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
                                                        <th class="text-center px-1">Start</th>
                                                        <th class="text-center px-1">End</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in dtr_items" :key="index">
                                                        <td class="fields text-center">{{ item.date }}</td>
                                                        <td class="fields text-center">{{ item.day }}</td>
                                                        <td class="fields text-center">{{ item.type }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_amin != '' ? item.cws_amin.substr(0,5) : item.sched_amin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_amout != '' ? item.cws_amout.substr(0,5) : item.sched_amout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_pmin != '' ? item.cws_pmin.substr(0,5) : item.sched_pmin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.cws_pmout != '' ? item.cws_pmout.substr(0,5) : item.sched_pmout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.encoded_amin != '' ? item.encoded_amin : item.actual_amin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.encoded_amout != '' ? item.encoded_amout : item.actual_amout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.encoded_pmin != '' ? item.encoded_pmin : item.actual_pmin.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1">{{ item.encoded_pmout != '' ? item.encoded_pmout : item.actual_pmout.substr(0,5) }}</td>
                                                        <td class="fields text-center px-1"><input v-model="item.ut_start" class="form-control" :style="item.ut_start == '' ? 'background-color: ' : 'background-color: #d9f8c080'" v-mask="timeMask" @blur="handleInput_ut(item, 'ut_start')" type="text" placeholder="HH:mm" :disabled="disabledField(item)" ></td>
                                                        <td class="fields text-center px-1"><input v-model="item.ut_end" class="form-control" :style="item.ut_end == '' ? 'background-color: ' : 'background-color: #d9f8c080'" v-mask="timeMask" @blur="handleInput_ut(item, 'ut_end')" type="text" placeholder="HH:mm" :disabled="disabledField(item)"></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item><!-- CWS -->
                            <v-container fluid>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-btn small color="primary" class="mr-1" @click="savedtr()">SAVE</v-btn>
                                        <v-btn small color="green" dark class="mr-1" @click="initialize()">REFRESH</v-btn>
                                        <v-btn small color="error" @click="deletedtr()">DELETE</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="mt-3">
                                    <v-col>
                                        <!-- <v-data-table :headers="cws_headers" :items="cws_items" :items-per-page="-1" dense flat disable-sort hide-default-header hide-default-footer>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th colspan="3"></th>
                                                    <th colspan="4">Original Schedule</th>
                                                    <th colspan="4">Encoded CWS</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 80px;">Date</th>
                                                    <th style="width: 20px;">Day</th>
                                                    <th style="width: 30px;">Type</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                    <th style="width: 70px;">AM In</th>
                                                    <th style="width: 70px;">AM Out</th>
                                                    <th style="width: 70px;">PM In</th>
                                                    <th style="width: 70px;">PM Out</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.sched_amin`]="props">
                                                {{ props.item.sched_amin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_amout`]="props">
                                                {{ props.item.sched_amout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmin`]="props">
                                                {{ props.item.sched_pmin.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.sched_pmout`]="props">
                                                {{ props.item.sched_pmout.substr(0,5) }}
                                            </template>
                                            <template v-slot:[`item.cws_amin`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.cws_amin" v-mask="'##:##'" @input="handleInput_cws(props.item,'amin')" single-line dense outlined hide-details></v-text-field>
                                            </template>
                                            <template v-slot:[`item.cws_amout`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.cws_amout" v-mask="'##:##'" @input="handleInput_cws(props.item,'amout')" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.cws_pmin`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.cws_pmin" v-mask="'##:##'" @input="handleInput_cws(props.item,'pmin')" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.cws_pmout`]="props">
                                                <v-text-field class="font-weight" v-model="props.item.cws_pmout" v-mask="'##:##'" @input="handleInput_cws(props.item,'pmout')" single-line dense hide-details outlined></v-text-field>
                                            </template>
                                        </v-data-table> -->
                                        <v-simple-table dense>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th colspan="3"></th>
                                                        <th colspan="4" class="text-center">Original Schedule</th>
                                                        <th colspan="4" class="text-center">Encoded CWS</th>
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
                                                        <td class="fields text-center px-1"><input v-model="item.cws_amin" class="form-control" v-mask="timeMask" @blur="onblur(item, 'cws_amin')" type="text" placeholder="HH:mm"></td>
                                                        <td class="fields text-center px-1"><input v-model="item.cws_amout" class="form-control" v-mask="timeMask" @blur="onblur(item, 'cws_amout')" type="text" placeholder="HH:mm"></td>
                                                        <td class="fields text-center px-1"><input v-model="item.cws_pmin" class="form-control" v-mask="timeMask" @blur="onblur(item, 'cws_pmin')" type="text" placeholder="HH:mm"></td>
                                                        <td class="fields text-center px-1"><input v-model="item.cws_pmout" class="form-control" v-mask="timeMask" @blur="onblur(item, 'cws_pmout')" type="text" placeholder="HH:mm"></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item><!-- ADJUSTMENTS -->
                            <v-container fluid>
                                <v-row>
                                    <v-col>
                                        <ul style="list-style: none; padding: 0;">
                                            <li>
                                                <ul>
                                                    <li style="width: 200px;"><h3>Total Worked Hours:</h3></li>
                                                    <li><h3>{{ adjustment.regular }}</h3></li>
                                                </ul>
                                                <ul>
                                                    <li style="width: 200px;"><h3>Gross Pay:</h3></li>
                                                    <li style="color: red;"><h3>{{ adjustment.gross }}</h3></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-data-table :headers="adjustment_headers" :items="adjustment_items" dense :items-per-page="-1" hide-default-footer hide-default-header disable-sort>
                                            <template v-slot:header={}>
                                                <tr>
                                                    <th style="width: 80px;" @click="btn_adjustment()"><v-icon>mdi-plus-box</v-icon></th>
                                                    <th style="text-align: center;">Type</th>
                                                    <th style="text-align: center;">Description</th>
                                                    <th style="text-align: center;">Amount</th>
                                                    <th style="text-align: center;">Remarks</th>
                                                </tr>
                                            </template>
                                            <template v-slot:[`item.actions`]="{ item }">
                                                <v-btn icon x-small @click="btn_edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                                                <v-btn icon color="red" x-small @click="btn_delete(item)"><v-icon>mdi-trash-can</v-icon></v-btn> 
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <ul style="list-style: none; padding: 0;">
                                            <li>
                                                <ul>
                                                    <li style="width: 200px;"><h3>Earnings:</h3></li>
                                                    <li><h3>{{ adjustment.earnings }}</h3></li>
                                                </ul>
                                                <ul>
                                                    <li style="width: 200px;"><h3>Deductions:</h3></li>
                                                    <li><h3>{{ adjustment.deductions }}</h3></li>
                                                </ul>
                                                <!-- <ul>
                                                    <li style="width: 200px;"><h3>Total Adjustment(s):</h3></li>
                                                    <li><h3>{{ adjustment.adjustments }}</h3></li>
                                                </ul> -->
                                                <ul>
                                                    <li style="width: 200px;"><h3>Net Pay:</h3></li>
                                                    <li style="color: red;"><h3>{{ adjustment.net }}</h3></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <!-- <v-tab-item>TEST -->
                            <!-- <router-view></router-view>
                        </v-tab-item> -->
                    </v-tabs-items>
                </v-card-text>

                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>{{ adjustment_title }}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="mt-4">
                            <v-form ref="form">
                                <v-container>
                                    <v-row dense>
                                        <v-col>
                                            <v-select v-model="active_item.adjustment_code" outlined required dense :items="adjustmentOptions" item-text="text" item-value="value" label="Type"></v-select>
                                            <v-text-field v-model="active_item.description" outlined dense required label="Description" type="text" :rules="descriptionRules"></v-text-field>
                                            <v-text-field v-model="active_item.amount" outlined dense required label="Amount" type="number" :rules="amountRules"></v-text-field>
                                            <v-text-field v-model="active_item.remarks" outlined dense label="Remarks" type="text"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small outlined color="primary" @click="btn_save()">Save</v-btn>
                            <v-btn small outlined color="error" @click="btn_cancel()">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-snackbar v-model="snackbar.status" :timeout="snackbar.timeout" :color="snackbar.color">
                    {{ snackbar.text }}
                    <template v-slot:action="{ attrs }">
                        <v-btn text v-bind="attrs" @click="snackbar.status = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
        </v-flex>
    </v-card>
</v-container>
</div>
</template>

<script>
// import myHeader from '../../components/myHeader.vue'
import Overlay from '../../components/Overlay.vue'
export default {
    name: 'Timekeeping_form',
    components: { Overlay },
    data(){
        return{
            tab: 0,
            show_placeholder: 'HH:mm',
            overlay: {
                value: false
            },
            dialog: false,
            snackbar:{
                status: false,
                text: '',
                color: '',
                timeout: 2000
            },
            alert_status: true,
            dtr_headers:[
                { value: 'date', align: 'center' },
                { value: 'day', align: 'center' },
                { value: 'type', align: 'center' },
                { value: 'sched_amin', align: 'center' },
                { value: 'sched_amout', align: 'center' },
                { value: 'sched_pmin', align: 'center' },
                { value: 'sched_pmout', align: 'center' },
                { value: 'encoded_amin', align: 'center' },
                { value: 'encoded_amout', align: 'center' },
                { value: 'encoded_pmin', align: 'center' },
                { value: 'encoded_pmout', align: 'center' },
            ],
            dtr_items:[],
            overtime_headers:[
                { value: 'date', align: 'center' },
                { value: 'day', align: 'center' },
                { value: 'type', align: 'center' },
                { value: 'sched_amin', align: 'center' },
                { value: 'sched_amout', align: 'center' },
                { value: 'sched_pmin', align: 'center' },
                { value: 'sched_pmout', align: 'center' },
                { value: 'encoded_amin', align: 'center' },
                { value: 'encoded_amout', align: 'center' },
                { value: 'encoded_pmin', align: 'center' },
                { value: 'encoded_pmout', align: 'center' },
                { value: 'ot_start', align: 'center' },
                { value: 'ot_end', align: 'center' },
            ],
            overtime_items:[],
            undertime_headers:[
                { value: 'date', align: 'center' },
                { value: 'day', align: 'center' },
                { value: 'type', align: 'center' },
                { value: 'sched_amin', align: 'center' },
                { value: 'sched_amout', align: 'center' },
                { value: 'sched_pmin', align: 'center' },
                { value: 'sched_pmout', align: 'center' },
                { value: 'encoded_amin', align: 'center' },
                { value: 'encoded_amout', align: 'center' },
                { value: 'encoded_pmin', align: 'center' },
                { value: 'encoded_pmout', align: 'center' },
                { value: 'ut_start', align: 'center' },
                { value: 'ut_end', align: 'center' },
            ],
            undertime_items:[],
            cws_headers:[
                { value: 'date', align: 'center' },
                { value: 'day', align: 'center' },
                { value: 'type', align: 'center' },
                { value: 'sched_amin', align: 'center' },
                { value: 'sched_amout', align: 'center' },
                { value: 'sched_pmin', align: 'center' },
                { value: 'sched_pmout', align: 'center' },
                { value: 'cws_amin', align: 'center' },
                { value: 'cws_amout', align: 'center' },
                { value: 'cws_pmin', align: 'center' },
                { value: 'cws_pmout', align: 'center' },
            ],
            cws_items: [],
            adjustment_headers:[
                { value: 'actions', align: 'center' },
                { value: 'adjustment_desc', align: 'center' },
                { value: 'description', align: 'center' },
                { value: 'amount', align: 'center' },
                { value: 'remarks', align: 'center' },
            ],
            adjustment_items:[],
            adjustment_title: '',
            adjustment: {
                regular: '0.00',
                gross: '0.00',
                // adjustments: '',
                net: '0.00',
                earnings: '0.00',
                deductions: '0.00',
            },
            descriptionRules: [v => !!v || "Description is required!"],
            amountRules: [v => !!v || "Amount is required!"],
            itemIndex: -1,
            active_item: {
                description: '',
                amount: '',
                adjustment_code: 'A',
                remarks: '',
            },
            employee:{
                firstname: '',
                lastname: '',
                middlename: ''
            },
            payperiod:[],
            // tabr: [0]
            adjustmentOptions: [
                { value: 'A', text: 'Adjustment'  },
                { value: 'D', text: 'Deduction'  }
            ]
        }
    },
    beforeCreate: function(){
        if(!this.$session.has('user-session')){
            this.$router.push({ path: '/login' });
        }
    },

    created(){
        this.initialize()
    },

    computed: {
        id(){
            return this.$route.query.id
        },
        fullname(){
            let firstname = this.employee.firstname.charAt(0).toUpperCase() + this.employee.firstname.slice(1)
            let lastname = this.employee.lastname.charAt(0).toUpperCase() + this.employee.lastname.slice(1)
            let middlename = this.employee.middlename.charAt(0).toUpperCase() + this.employee.middlename.slice(1)
            return lastname + ", " + firstname + " " + middlename
        },
    },

    methods: {
        // goto(tabr){
        //     console.log(tabr)
        //     this.$router.push({ name: 'dtr', query: { id: this.$route.query.id }, params: this.dtr_items })
        // },
        onblur(item, key){
            let itemIndex = this.dtr_items.indexOf(item)
            let time = '00:00'
            if(this.dtr_items[itemIndex][key].length > 0 && this.dtr_items[itemIndex][key].length < 5){
                this.dtr_items[itemIndex][key] = this.dtr_items[itemIndex][key].concat(time.slice(this.dtr_items[itemIndex][key].length, 5))
            }
        },
        timeMask(value) {
            const hours = [ /[0-2]/, value.charAt(0) === '2' ? /[0-3]/ : /[0-9]/, ];
            const minutes = [/[0-5]/, /[0-9]/];
            return value.length > 2 ? [...hours, ':', ...minutes] : hours;
        },
        initialize(){
            this.overlay.value = true
            this.getEmployeeDtr();
            this.$nextTick(() => {
                this.overlay.value = false
                this.snackbar.status = true
                this.snackbar.text = 'Page Refreshed!'
                this.snackbar.color = 'success'
                this.snackbar.timeout = 2000
            })
            
        },
        async getEmployeeDtr(){
            let data = {
                id: this.$route.query.id
            }
            await this.$guest.post('/api/timekeeping/getEmployee', this.$form_data.generate(data))
            .then(res => {
                this.alert_status = res.data.status
                if(res.data.status == true){
                    this.employee = res.data.result.employee
                    this.payperiod = res.data.result.payperiod
                    this.dtr_items = res.data.result.dtr
                    this.overtime_items = res.data.result.dtr
                    this.undertime_items = res.data.result.dtr
                    this.cws_items = res.data.result.dtr
                    this.adjustment = res.data.result.salary_adjustments
                    this.adjustment_items = res.data.result.salary_adjustments_breakdown
                }
            })
            .catch(err => { console.log(err) })
        },
        savedtr(){
            this.overlay.value = true;
            setTimeout(() => {
                let data = {
                    dtr: JSON.stringify(this.dtr_items)
                }
                this.$guest.post('/api/timekeeping/savedtr', this.$form_data.generate(data))
                .then(res => {
                    if(res.data.status == true){
                        this.snackbar.status = true
                        this.snackbar.text = 'Records Saved!'
                        this.snackbar.color = 'info'
                        this.snackbar.timeout = 2000
                    }else{
                        this.snackbar.status = true
                        this.snackbar.text = 'Error Saving Records!'
                        this.snackbar.color = 'error'
                        this.snackbar.timeout = 2000
                    }
                    this.overlay.value = false;
                    this.getEmployeeDtr();
                })
                .catch(err => { console.log(err) })
            }, 1500)
        },
        deletedtr(){
            console.log(this.tab)
        },

        handleInput(item,input){
            let itemIndex = this.dtr_items.indexOf(item)
            let encoded = "encoded_"+input
            let time = this.dtr_items[itemIndex][encoded].split(":")
            let hrs = parseInt(time[0])
            let min = parseInt(time[1])
            if(hrs >= 24 || min >= 60){
                this.dtr_items[itemIndex][encoded] = ''
            }
            
        },
        handleInput_cws(item,input){
            let itemIndex = this.dtr_items.indexOf(item)
            let encoded = "cws_"+input
            let time = this.dtr_items[itemIndex][encoded].split(":")
            let hrs = parseInt(time[0])
            let min = parseInt(time[1])
            if(hrs >= 24 || min >= 60){
                this.dtr_items[itemIndex][encoded] = ''
            }
        },

        handleInput_ot(item,input){
            let itemIndex = this.dtr_items.indexOf(item)
            let s_pmout = this.dtr_items[itemIndex]['sched_pmout'].split(":")
            let s_hrs = s_pmout[0]
            let s_min = s_pmout[1]
            let s_mins = (s_hrs * 60) + parseInt(s_min)

            let e_pmout = this.dtr_items[itemIndex]['encoded_pmout'].split(":")
            let e_hrs = e_pmout[0]
            let e_min = e_pmout[1]
            let e_mins = (e_hrs * 60) + parseInt(e_min)

            let ot = this.dtr_items[itemIndex][input].split(":")
            let ot_hrs = parseInt(ot[0])
            let ot_min = parseInt(ot[1])
            let ot_mins = (ot_hrs * 60) + parseInt(ot_min)

            if(ot_hrs >= 24 || ot_min >= 60){
                this.dtr_items[itemIndex][input] = ''
            }

            if(ot_mins < s_mins){
                this.dtr_items[itemIndex][input] = ''
            }

            if(input == 'ot_end'){
                if(ot_mins > e_mins){
                    this.dtr_items[itemIndex][input] = ''
                }
            }
        },
        handleInput_ut(item, input){
            console.log(item)
            console.log(input)

            
        },
        disabledField(item){
            if(item.actual_amin!='' && item.actual_amout!='' && item.actual_pmin!='' && item.actual_pmout!=''){
                return false;
            }else if(item.actual_pmin!='' && item.actual_pmout!=''){
                return false;
            }else{
                return true;
            }
        },
        btn_cancel(){
            this.close()
        },
        close(){
            this.dialog = !this.dialog
            this.$refs.form.reset()
            this.itemIndex = -1
            this.active_item = {}
            this.$nextTick(() => {
                this.active_item.adjustment_code = 'A'
            })
        },
        btn_adjustment(){
            this.adjustment_title = 'Add Adjustment'
            this.dialog = !this.dialog
            this.itemIndex = -1
        },
        async btn_delete(item){
            this.overlay.value = true
            await this.$guest.post('/api/timekeeping/deleteSalaryAdjustment', this.$form_data.generate(item))
            .then(() => {
                this.initialize()
            })
            .catch(err => { console.log(err) })
        },
        btn_edit(item){
            this.adjustment_title = 'Update Adjustment'
            this.dialog = true
            this.itemIndex = this.adjustment_items.indexOf(item)
            this.active_item = Object.assign({}, item)
        },
        async btn_save(){
            if(this.$refs.form.validate()){
                if(typeof this.adjustment.id != 'undefined'){
                    this.overlay.value = true
                    this.active_item['adjustment_id'] = this.adjustment.id
                    this.active_item['user_id'] = this.$session.get('userid-session')
                    this.active_item['employee_id'] = this.$route.query.id
                    let url = this.itemIndex == -1 ? 'insertSalaryAdjustment' : 'updateSalaryAdjustment'
                    await this.$guest.post('/api/timekeeping/'+ url, this.$form_data.generate(this.active_item))
                    .then(() => {
                        this.close()
                        this.initialize()
                    })
                    .catch(err => { console.log(err) })
                }else{
                    this.close()
                    this.snackbar.status = true
                    this.snackbar.text = 'Please process manhour before adding adjustments...'
                    this.snackbar.color = 'error'
                    this.snackbar.timeout = 3000
                }
            }
            
        }
    }
}
</script>

<style scoped>
.font-weight {
    font-weight: bold;
}
th{
    background-color: rgb(217, 248, 192);
}
ul{
    padding: 0;
}
ul li{
    font-size: 13px;
    display: inline-block;
    list-style: none;
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