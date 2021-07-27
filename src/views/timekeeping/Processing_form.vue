<template>
<div class="ma-n3">
    <myHeader :title="'Timekeeping'" :subtitle="'Manhour Processing'" />
    <v-container fluid>
    <v-card flat outlined>
        <Overlay :value="overlay.value" />
        <v-flex md-12 class="ma-2">
            <v-container fluid>
                <v-row no-gutters>
                    <v-alert v-if="alert.status" text :type="alert.type" width="600px">
                        {{ alert.text }}
                    </v-alert>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="mb-2">
                            <ul style="list-style: none; padding: 0;">
                                <li>
                                    <ul>
                                        <li style="width: 120px;">PAYPERIOD:</li>
                                        <li style="color: red;">{{ pperiod }}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <v-btn color="primary" @click="processmanhour()">Process Manhour</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-flex>
    </v-card>
</v-container>
</div>
</template>

<script>
import myHeader from '../../components/myHeader.vue'
import Overlay from '../../components/Overlay.vue'
export default {
    name: 'Processing_form',
    components: { myHeader,Overlay },
    data(){
        return{
            overlay: {
                value: false
            },
            alert:{
                status: false,
                text: '',
                type: ''
            },
            pperiod: '',
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
    methods: {
        async initialize(){
            this.overlay.value = true
            await this.$guest.get('/api/timekeeping/activePayperiod')
            .then(res => {
                this.pperiod = res.data.pperiod
                this.overlay.value = false
                this.alert.text = res.data.message
                if(res.data.status == false){
                    this.alert.status = 'true'
                    this.alert.type = 'error'
                    this.disabled = true
                }
            })
            .catch(err => { console.log(err) })
        },
        async processmanhour(){
            this.overlay.value = true
            await this.$guest.post('/api/timekeeping/processmanhour')
            .then(res => {
                this.overlay.value = false
                if(res.data.status == true){
                    this.alert.status = 'true'
                    this.alert.text = res.data.message
                    this.alert.type = 'success'
                }else{
                    this.alert.status = 'true'
                    this.alert.text = res.data.message
                    this.alert.type = 'error'
                }
            })
            .catch(err => { console.log(err) })
        }
    }
}
</script>

<style scoped>
ul{
    padding-left: 2px;
}
ul li{
    font-weight: bold;
    font-size: 16px;
    display: inline-block;
    list-style: none;
}
</style>