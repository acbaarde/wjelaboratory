<template>
<div class="ma-n3">
    <myHeader :title="'Payroll'" :subtitle="'Process Payroll Computation'" />
    <v-container fluid>
  <v-card flat outlined>
        <Overlay :value="overlay.value" />
        <v-flex md-12 class="ma-2">
            <v-container fluid>
                <v-row no-gutters class="mt-2">
                    <v-alert outlined type="info" max-width="600px">
                        <div><strong>Important Reminders,</strong></div>
                        <div>
                            Payroll Computation processing is done only once. All adjustments after the successfull process will be done on the next payroll period.Please check the payperiod carefully!!!
                        </div>
                    </v-alert>
                </v-row>
                <v-row no-gutters class="mt-4">
                    <v-alert v-if="alert.status" text :type="alert.type">
                        {{ alert.text }}
                    </v-alert>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="mb-4">
                            <ul style="list-style: none; padding: 0;">
                                <li>
                                    <ul>
                                        <li style="width: 120px;">PAYPERIOD:</li>
                                        <li style="color: red;">{{ pperiod }}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <v-btn color="primary" @click="processpayroll()" :disabled="disabled">PROCESS PAYROLL</v-btn>
                    </v-col>
                </v-row>

                <Dialog :dialog="dialog_data" @emit="dialogEvent" />

            </v-container>
        </v-flex>
  </v-card>
</v-container>
</div>
</template>

<script>
import myHeader from '../../components/myHeader.vue'
import Dialog from '../../components/Dialog.vue'
import Overlay from '../../components/Overlay.vue'
export default {
    components: { myHeader, Dialog, Overlay },
    data(){
        return {
            overlay: {
                value: false
            },
            disabled: false,
            alert:{
                status: false,
                text: '',
                type: ''
            },
            pperiod: '',
            dialog_data:{
                text: 'This process is done only once. Proceed Anyway?',
                status: false
            }
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
        processpayroll(){
            this.dialog_data.status = true
        },
        async dialogEvent(value){
            this.dialog_data.status = false
            if(value == true){
                this.overlay.value = true
                let data = {
                    user_id: this.$session.get('userid-session')
                }
                await this.$guest.post('/api/payroll/processPayroll', this.$form_data.generate(data))
                .then(res => {
                    this.overlay.value = false
                    this.alert.text = res.data.message
                    this.alert.status = 'true'
                    this.alert.type = res.data.status == true ? 'success' : 'error'
                    this.disabled = res.data.status == true ? true : false
                    console.log(res.data)
                })
                .catch(err => { console.log(err) })
            }
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