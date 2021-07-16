<template>
<div class="ma-n3">
    <myHeader :title="'Appointments'" :subtitle="'Manage Appointment Releasing'" />
    <v-container fluid>
    <v-card flat outlined>
        <v-flex md12 class="ma-2">
            <Overlay :value="overlay.value" />
            <v-data-table :headers="table_headers" :items="table_items" :search="search" dense flat disable-sort :items-per-page="15">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-spacer></v-spacer>
                        <v-text-field class="shrink" v-model="search" clearable append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn class="mr-2" small @click="btn_view(item)" color="primary">VIEW</v-btn>
                    <!-- <v-btn x-small @click="btn_delete(item)" color="error">REJECT</v-btn> -->
                </template>
                
                <template v-slot:[`item.approved`] = "{ item }">
                    <v-chip v-if="item.approved == 'Y'" color="green" small dark outlined>
                        DONE
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
                <template v-slot:[`item.age`]="{ item }">
                    {{ formatAge(item.age, item.agetype) }}
                </template>
                <template v-slot:[`item.gender`]="{ item }">
                    {{ gender.filter(e => e.id == item.gender)[0]['desc'] }}
                </template>
                <template v-slot:[`item.discount_type`]="{ item }">
                    {{ item.discount_type.toUpperCase() }}
                </template>
                <template v-slot:[`item.created_at`]="{ item }">
                    {{ formatDateTime(item.created_at) }}
                </template>
                <template v-slot:[`item.posted_date`]="{ item }">
                    {{ formatDateTime(item.posted_date) }}
                </template>
            </v-data-table>

            <v-dialog v-model="dialog" width="900" persistent scrollable>
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
                                        <td><strong>{{ active_item.fullname }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Gender:</td>
                                        <td>{{ active_item.gender == 'M' ? 'MALE' : 'FEMALE' }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Age:</td>
                                        <td>{{ formatAge(active_item.age, active_item.agetype) }}</td>
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
                                        <td style="width: 120px;">Remarks:</td>
                                        <td>{{ active_item.discount_rmks }}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Total Fee:</td>
                                        <td><strong>{{ active_item.totalamount }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;">Amount:</td>
                                        <td><strong>{{ active_item.balance }}</strong></td>
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
                                            
                                            <v-data-iterator :items="tab_submodules()" hide-default-footer>
                                                <template v-slot:default="props">
                                                    <v-row no-gutters>
                                                        <v-col v-for="submod in props.items" :key="submod.value" cols="6" class="px-1 mt-2">
                                                            <v-card flat outlined >
                                                                <v-card-title class="pa-0 pl-2">
                                                                    <h6>{{ submod.text }}</h6>
                                                                </v-card-title>
                                                                <v-divider></v-divider>
    
                                                                <v-card-text class="pa-0 px-2">
                                                                    <table style="width:100%;">
                                                                        <thead>
                                                                            <tr>
                                                                                <th style="text-align: left">LAB TEST</th>
                                                                                <th>RESULT</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr v-for="subsubmod in tab_subsubmodules(submod.value)" :key="subsubmod.id">
                                                                                <td style="min-width: 80%;">{{subsubmod.title}}</td>
                                                                                <td style="text-align: center">{{subsubmod.result}}</td>
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
                            <template v-if="clnclmcrscpy()">
                                <template>
                                    <v-btn v-if="btn_ua" outlined color="primary" @click="btn_print('ua')" class="mr-2">PRINT URINALYSIS</v-btn>
                                </template>
                                <template>
                                    <v-btn v-if="btn_fa" outlined color="primary" @click="btn_print('fa')" class="mr-2">PRINT FECALYSIS</v-btn>
                                </template>
                            </template>
                            <template v-else>
                                <v-btn outlined color="primary" @click="btn_print()" class="mr-2">PRINT</v-btn>
                            </template>
                        </div>
                        <div v-else-if="active_item.approved == '' && $session.get('usertype-session') == 'ADMIN'">
                            <v-btn outlined color="primary" @click="btn_actions('approved')" class="mr-2">APPROVED</v-btn>
                            <v-btn outlined color="warning" @click="btn_actions('reject')" class="mr-2">REJECT</v-btn>
                        </div>                        
                        <v-btn outlined color="error" @click="btn_close()">CLOSE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-card>
    </v-container>
</div>
</template>

<script>
import myHeader from '../../components/myHeader.vue'
import Overlay from '../../components/Overlay.vue'
export default {
    name: 'Releasing_form',
    components: { myHeader,Overlay },
    data(){
        return{
            tab: 0,
            overlay: {
                value: false
            },
            dialog: false,
            search: '',
            table_headers:[
                { text: 'Status', align: 'center', value: 'approved', filterable: false  },
                { text: 'Full Name', value: 'fullname' },
                { text: 'Age', align: 'center', value: 'age', filterable: false  },
                { text: 'Gender', align: 'center', value: 'gender', filterable: false  },
                { text: 'Discount Type', align: 'center', value: 'discount_type', filterable: false  },
                { text: 'Created date', align: 'center', value: 'created_at', filterable: false  },
                { text: 'Posted date', align: 'center', value: 'posted_date', filterable: false  },
                { text: 'Actions', align: 'center', value: 'actions', filterable: false  },
            ],
            gender: [],
            discount: [{
                text: ''
            }],
            table_items:[],
            active_item: [],
            tab_headers: [],
        }
    },
    beforeCreate: function(){
        if(!this.$session.has('user-session')){
            this.$router.push('/login');
        }
        let user_access = this.$session.get('user-access')
        let cpath = this.$route.path
        let modpath = []
        user_access.forEach(el => {
          modpath.push(el.mod_path)
        })
        if(modpath.indexOf(cpath) == -1){
          this.$router.push('/')
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
        // discount_type(){
        //     console.log(this.discount.filter(e => this.active_item.discount_type == e.value))
        //     return this.discount.filter(e => this.active_item.discount_type == e.value)[]
        // },

        btn_ua(){
            return this.active_item.submod_id.split(",").includes("13") ? true : false
        },
        btn_fa(){
            return this.active_item.submod_id.split(",").includes("14") ? true : false
        }
    },

    methods:{
        tab_submodules(){
            return this.tab_headers[this.tab]['submodules'].filter(e => this.active_item.submod_id.split(",").includes(e.value))
        },  
        tab_subsubmodules(submod_id){
            return this.tab_headers[this.tab]['subsubmodules'].filter(e => submod_id == e.submod_id)
        },
        clnclmcrscpy(){
            let id = this.tab_headers == '' ? 0 : this.tab_headers[this.tab]['id']
            return id == "2" ? true : false
        },
        async initialize(){
            this.overlay.value = true
            await this.$guest.get('/api/data_maintenance/getGender')
            .then(res => {
                this.gender = res.data
            })
            .catch(err => { console.log(err) })
            await this.$guest.get('/api/data_maintenance/getDiscount')
            .then(res => {
                this.discount = res.data
            })
            .catch(err => { console.log(err) })

            await this.$guest.get('/api/appointment/getAppointment_forreleased')
            .then(res => {
                this.table_items = Object.assign([], res.data.result)
                this.overlay.value = false
            }).catch(err => { console.log(err) })
        },

        async btn_view(item){
            this.tab = 0
            this.active_item = item
            this.dialog = true
            let data = { appointment_id: item.id, released: true }
            await this.$guest.post('/api/laboratory/loadLabmodule', this.$form_data.generate(data))
            .then(res => {
                this.tab_headers = res.data.modules
            })
            .catch(err => { console.log(err) })
            
        },
        btn_print(rmk){
            this.overlay.value = true
            // console.log(rmk)
            // console.log(this.active_item.submod_id)
            let mod_id = this.tab_headers[this.tab]['id']
            let mod = this.tab_headers[this.tab]['subsubmodules'].filter(e => this.active_item.submod_id.split(",").includes(e.submod_id))
            // console.log(mod)
            let route = ''
            switch(mod_id){
                case "1":
                    route = 'hematology'
                    this.active_item['title'] = 'HEMATOLOGY RESULT'
                    break
                case "2":
                    route = rmk == 'ua' ? 'urinalysis' : 'fecalysis' 
                    this.active_item['title'] = rmk == 'ua' ? 'ROUTINE URINALYSIS' : 'ROUTINE FECALYSIS'
                    break
                default:
                    route = 'Dashboard'
            }
            this.$router.push({ name: route, params: { active_item: this.active_item, mod: mod } })
        },
        btn_actions(val){
            let data = {
                status: val,
                appointment_id: this.active_item.id,
                user_id: this.$session.get('userid-session')
            }
            this.$guest.post('/api/appointment/approved_reject', this.$form_data.generate(data))
            .then(res => {
                console.log(res.data)
                this.initialize()
                this.btn_close()
            })
            .catch(err => { console.log(err) })
        },
        btn_close(){
            this.dialog = false
            this.tab = 0
            this.tab_headers = []
            
        },

    }
}
</script>

<style scoped>

</style>