<template>
    <v-card>
        <v-flex md12 class="ma-2">
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="70"></v-progress-circular>
            </v-overlay>
            <v-data-table :headers="table_headers" :items="table_items" :search="search" dense flat disable-sort :items-per-page="15">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-spacer></v-spacer>
                        <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn class="mr-2" small @click="btn_view(item)" color="primary">VIEW</v-btn>
                    <!-- <v-btn x-small @click="btn_delete(item)" color="error">REJECT</v-btn> -->
                </template>
                
                <template v-slot:[`item.approved`] = "{ item }">
                    <v-chip v-if="item.approved == 'Y'" color="green" small dark outlined>
                        APPROVED
                    </v-chip>
                    <v-chip v-else-if="item.approved == 'N'" color="error" small dark outlined>
                        REJECTED
                    </v-chip>
                    <v-chip v-else color="warning" small dark outlined>
                        FOR APPROVAL
                    </v-chip>
                </template>

                <template v-slot:[`item.fullname`]="{ item }">
                    <p class="text-uppercase ma-0">{{ item.fullname }}</p>
                </template>

            </v-data-table>

            <v-dialog v-model="dialog" width="900" persistent>
                <!-- <template v-slot:activator="{on ,attrs}">
                    <v-btn class="mr-2" small v-bind="attrs" v-on="on"  @click="btn_view(item)" color="primary">VIEW</v-btn>
                </template> -->
                <v-card>
                    <v-card-title>Patient Info</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="6" class="pr-2">
                                    <tr>
                                        <td style="width: 120px;">Full Name:</td>
                                        <td>{{ active_item.fullname }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Gender:</td>
                                        <td>{{ active_item.gender }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Age:</td>
                                        <td>{{ active_item.age }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Address:</td>
                                        <td>{{ active_item.address }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Contact #:</td>
                                        <td>{{ active_item.contact }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Status:</td>
                                        <td>{{ approved_status }}</td>
                                    </tr>
                                </v-col>
                                <v-divider vertical></v-divider>
                                <v-col cols="6" class="pl-2">
                                    <tr>
                                        <td style="width: 120px;">Physician:</td>
                                        <td>{{ active_item.physician }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Discount Type:</td>
                                        <td>{{ active_item.discount_type }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Discount %:</td>
                                        <td>{{ active_item.discount }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Discount Remarks:</td>
                                        <td>{{ active_item.discount_rmks }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Total Fee:</td>
                                        <td>{{ active_item.totalamount }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Amount:</td>
                                        <td>{{ active_item.balance }}</td>
                                    </tr>
                                </v-col>
                            </v-row>
                            
                            <v-row>
                                <v-col>
                                    <v-tabs v-model="tab" background-color="#cccccc">
                                        <v-tab v-for="item in tab_headers" :key="item.id">
                                            {{ item.title }}
                                        </v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="tab">
                                        <v-tab-item v-for="item in tab_headers" :key="item.id">

                                            <v-data-iterator :items="tab_submodules" hide-default-footer>
                                                <template v-slot:default="props">
                                                    <v-row no-gutters>
                                                        <v-col v-for="submod in props.items" :key="submod.id" cols="6" class="px-1 mt-2">
                                                            <v-card flat outlined >
                                                                <v-card-title class="pa-0 pl-2">
                                                                    <h6>{{ submod.text }}</h6>
                                                                </v-card-title>
                                                                <v-divider></v-divider>
    
                                                                <v-card-text class="pa-0 px-2">
                                                                    <table style="width:100%;">
                                                                        <tbody>
                                                                            <tr v-for="subsubmod in tab_subsubmodules" :key="subsubmod.id">
                                                                                <td style="min-width: 80%;">{{subsubmod.title}}</td>
                                                                                <td>{{subsubmod.result}}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    
                                                                </v-card-text>
                                                            </v-card>
                                                        </v-col>
                                                    </v-row>
                                                </template>
                                            </v-data-iterator>
                                        </v-tab-item>
                                    </v-tabs-items>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <div v-if="active_item.approved == 'Y'">
                            <v-btn text color="primary" @click="btn_print()">PRINT</v-btn>
                        </div>
                        <div v-else-if="active_item.approved == '' && $session.has('userid-session') == 1">
                            <v-btn text color="primary" @click="btn_approved()">APPROVED</v-btn>
                            <v-btn text color="warning" @click="btn_reject()">REJECT</v-btn>
                        </div>                        
                        <v-btn text color="error" @click="btn_close()">CLOSE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-card>
</template>

<script>
export default {
    name: 'Releasing_form',
    data(){
        return{
            tab: 0,
            overlay: false,
            dialog: false,
            search: '',
            table_headers:[
                { text: 'Status', align: 'center', value: 'approved', filterable: false  },
                { text: 'Full Name', value: 'fullname' },
                { text: 'Age', align: 'center', value: 'age', filterable: false  },
                { text: 'Gender', align: 'center', value: 'gender', filterable: false  },
                { text: 'Physician', align: 'center', value: 'physician', filterable: false  },
                { text: 'Discount Type', align: 'center', value: 'discount_type', filterable: false  },
                { text: 'Discount %', align: 'center', value: 'discount', filterable: false  },
                { text: 'Created date', align: 'center', value: 'created_at', filterable: false  },
                { text: 'Posted date', align: 'center', value: 'posted_date', filterable: false  },
                { text: 'Actions', align: 'center', value: 'actions', filterable: false  },
            ],
            table_items:[],
            // tabitems: [],
            active_item: [],
            tab_headers: [],

        }
    },
    created(){
        this.initialize()
    },

    computed: {
        approved_status(){
            let text = ''
            switch(this.active_item.approved){
                case 'Y': text = 'APPROVED'; break;
                case 'N': text = 'REJECTED'; break;
                case '':  text = 'FOR APPROVAL';  break;
                default:  text = 'Undefined Value Assigned';
            }
            return text
        },

        tab_submodules(){
            return this.tab_headers[this.tab]['submodules'].filter(e => this.active_item.submod_id.split(",").includes(e.value))
        },
        tab_subsubmodules(){
            return this.tab_headers[this.tab]['subsubmodules'].filter(e => this.active_item.submod_id.split(",").includes(e.submod_id))
        }
    },

    methods:{
        async initialize(){
            this.overlay = true
            await this.$guest.get('/api/appointment/getAppointment_forreleased')
            .then(res => {
                this.table_items = Object.assign([], res.data.result)
                this.overlay = false
            }).catch(err => { console.log(err) })
        },

        async btn_view(item){

            console.log(item)
            this.active_item = item
            this.dialog = !this.dialog

            let data = { appointment_id: item.id, released: true }

            await this.$guest.post('/api/laboratory/loadLabmodule', this.$form_data.generate(data))
            .then(res => {
                // console.log(res.data.modules)
                this.tab_headers = Object.assign({}, res.data.modules)

                // item.submod_id.split(",").forEach(el => {
                //     this.tabitems.push(el)
                // });
            })
            .catch(err => { console.log(err) })
        },

        btn_print(){
            console.log(this.tab_headers[this.tab]['title'])
            this.$router.push({ name: this.tab_headers[this.tab]['title'] })
        },
        btn_approved(){
            this.active_item.approved = 'Y'
        },
        btn_reject(){
            this.active_item.approved = 'N'
        },
        btn_close(){
            this.dialog = !this.dialog
            this.tab = 0
        }
    }
}
</script>

<style scoped>

</style>