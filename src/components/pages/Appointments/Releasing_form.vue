<template>
    <v-card>
        <v-flex md12 class="ma-2">
            <v-data-table :headers="table_headers" :items="table_items" :search="search" dense flat disable-sort :items-per-page="15">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-spacer></v-spacer>
                        <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn class="mr-2" small @click="btn_print(item)" color="primary">PRINT</v-btn>
                    <!-- <v-btn x-small @click="btn_delete(item)" color="error">REJECT</v-btn> -->
                </template>
                <template v-slot:[`item.approved`] = "{ item }">
                    <v-chip v-if="item.approved == 'Y'" color="green" small dark>
                        APPROVED
                    </v-chip>
                    <v-chip v-else color="error" small dark>
                        REJECTED
                    </v-chip>
                </template>
                <template v-slot:[`item.fullname`]="{ item }">
                <p class="text-uppercase ma-0">{{ item.fullname }}</p>
            </template>
            </v-data-table>
        </v-flex>
    </v-card>
</template>

<script>
export default {
    name: 'Releasing_form',
    data(){
        return{
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
                { text: 'Released date', align: 'center', value: 'released_at', filterable: false  },
                { text: 'Actions', align: 'center', value: 'actions', filterable: false  },
            ],
            table_items:[
                // { fullname: 'Baarde, Aries C', age: '28', gender: 'Male', physician: '', discount_type:'Senior', discount_percent: '20', created_at: '0000-00-00 00:00:00', released_at: '0000-00-00 00:00:00', approved: 'Y' }
            ]
        }
    },
    created(){
        this.initialize()
    },
    methods:{
        async initialize(){
            await this.$guest.get('/api/appointment/getAppointment_forreleased')
            .then(res => {
                console.log(res.data.result)
                this.table_items = Object.assign([], res.data.result)
            }).catch(err => { console.log(err) })
        },

        btn_print(item){
            console.log(item)
        }
    }
}
</script>

<style>

</style>