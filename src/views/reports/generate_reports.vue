<template>
    <div>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-btn small color="primary" @click="print()">PRINT</v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-card class="justify-center" max-width="800px" id="print-form">
        <result-header :data="header_data" />
        <v-card-text style="padding-top: 0;">
            <v-container>
                <v-row>
                    <v-col cols="12" class="px-1" style="padding-top: 0;">
                        <div v-for="(item,index) in results" :key="item.id" class="mb-2">
                            <table style="width:100%">
                                <thead>
                                    <tr>
                                        <th colspan="3">{{ item.title }}</th>
                                    </tr>
                                    <tr>
                                        <th>TEST</th>
                                        <th>RESULT</th>
                                        <th>REFERENCE VALUE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="v in subsubmodules(index)" :key="v.id">
                                        <td>{{ v.title }}</td>
                                        <td>{{ v.result }}</td>
                                        <td>{{ v.result_range }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
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
            results: []
        }
    },
    components: {
        ResultHeader,
        ResultFooter,
    },
    created(){
        // let mod = this.$route.params.mod
        // mod.forEach((el) => {
        //     if(el.result != 0){
        //         this.results[el.title] = el.result
        //     }
        // })
        let data = { 
            appointment_id: 1, 
            released: true, 
            user_id: this.$session.get('userid-session') 
        }
        this.$guest.post('/api/laboratory/loadLabmodule', this.$form_data.generate(data))
        .then(res => {
            this.results = res.data.modules
        })
        .catch(err => { console.log(err) })

    },
    computed: {
        header_data(){
            // let age = []
            // age.push(this.$route.params.active_item.age,this.$route.params.active_item.agetype)
            // return {
            //     fullname: this.$route.params.active_item.fullname,
            //     age: age,
            //     gender: this.$route.params.active_item.gender == "M" ? "MALE" : "FEMALE",
            //     physician: this.$route.params.active_item.physician,
            //     title: this.$route.params.active_item.title
            // }
            return{
                fullname: 'TEST', age: ['999','test'], gender: 'TEST',physician: 'TEST'
            }
        },
    },
    methods: {
        subsubmodules(index){
            let submod_id = ['1','2','14']
            return this.results[index]['subsubmodules'].filter(e => submod_id.includes(e.submod_id))
        },

        print(){
            this.print_form()
        }
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