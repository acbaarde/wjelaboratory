<template>
<div class="ma-n3">
    <myHeader :title="'Timekeeping'" :subtitle="'Manhour Posting'" />
    <v-container fluid>
  <v-card flat outlined>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="70"></v-progress-circular>
        </v-overlay>
        <v-flex md-12 class="ma-2">
            <v-container fluid>
                <v-row no-gutters class="mt-2">
                    <v-alert outlined type="info" max-width="600px">
                        <div><strong>Important Reminders,</strong></div>
                        <div>
                            Manhour Posting is done only once. All adjustments after the successfull process will be done on the next payroll period. Please check the payperiod carefully!!!
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
                                        <li style="color: red;">2021-01-01</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <v-btn color="primary" @click="postmanhour()">Manhour Posting</v-btn>
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
export default {
    name: 'Posting_form',
    components: { myHeader },
    data(){
        return{
            overlay: false,
            alert:{
                status: false,
                text: '',
                type: ''
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
    methods: {
        async postmanhour(){
            this.overlay = true
            let data = {
                user_id: this.$session.get('userid-session')
            }
            await this.$guest.post('/api/timekeeping/postmanhour', this.$form_data.generate(data))
            .then(res => {
                console.log(res)
                this.overlay = false
                this.alert.text = res.data.message
                if(res.data.status == true){
                    this.alert.status = 'true'
                    this.alert.type = 'success'
                }else{
                    this.alert.status = 'true'
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