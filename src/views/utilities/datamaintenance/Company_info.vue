<template>
<div class="ma-n3">
    <myHeader :title="'Data Maintenance'" :subtitle="'Manage Company Information'" />
    <v-container fluid>
        <v-card flat outlined width="800">
            <Overlay :value="overlay.value" />
            <v-flex md-12 class="ma-2">
                <v-text-field v-model="company.company_name" dense outlined label="COMPANY NAME"></v-text-field>
                <v-textarea v-model="company.address" dense outlined auto-grow clearable label="ADDRESS" rows="3" row-height="30"></v-textarea>
                <v-text-field v-model="company.tel_no" dense outlined label="TELEPHONE No."></v-text-field>
                <v-text-field v-model="company.doh_lic_no" dense outlined label="DOH LICENSE No."></v-text-field>
                <v-text-field v-model="company.pathologist_name" dense outlined label="PATHOLOGIST NAME"></v-text-field>
                <v-text-field v-model="company.pathologist_lic_no" dense outlined label="PATHOLOGIST LICENSE No."></v-text-field>
            </v-flex>
            <Snackbar :snackbar="snackbar" />
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="btn_save()">SAVE</v-btn>
        </v-card-actions>
        </v-card>
    </v-container>
</div>
</template>

<script>
import myHeader from '../../../components/myHeader.vue'
import Overlay from '../../../components/Overlay.vue'
import Snackbar from '../../../components/Snackbar.vue'
export default {
    name: 'Physicians',
    components: { myHeader,Overlay,Snackbar },
    data(){
      return{
        overlay: {
          value: false
        },
        snackbar: {
          status: false,
          text: '',
          color: '',
        },
        company: {
            company_name: '',
            address: '',
            tel_no: '',
            doh_lic_no: '',
            pathologist_name: '',
            pathologist_lic_no: ''
        }
      }
    },
    beforeCreate: function(){
      if(!this.$session.has('user-session')){
          this.$router.push({ path: '/login' });
      }
      let user_access = this.$session.get('user-access')
      let cpath = this.$route.path
      let modpath = []
      user_access.forEach(el => {
        modpath.push(el.mod_path)
      })
      if(modpath.indexOf(cpath) == -1){
        this.$router.push({ path: '/' })
      }
    },
    created(){
        this.initialize()
    },
    methods: {
        async initialize(){
            await this.$guest.get('/api/data_maintenance/getCompanyInfo')
            .then(res => {
                this.company = Object.assign({}, res.data)
            })
            .catch(err => {console.log(err)})
        },

        async btn_save(){
            this.overlay.value = true
            await this.$guest.post('/api/data_maintenance/saveCompanyInfo', this.$form_data.generate(this.company))
            .then(res => {
                if(res.data.status){
                    this.overlay.value = false
                    this.snackbar.status = true
                    this.snackbar.text = res.data.message
                    this.snackbar.color = 'success'
                    this.initialize()
                }else{
                    this.overlay.value = false
                    this.snackbar.status = true
                    this.snackbar.text = res.data.message
                    this.snackbar.color = 'error'
                    setTimeout(() => {
                        window.location.reload()
                    },1000)
                }
                
            })
            .catch(err => {console.log(err)})
        }
    }
}
</script>

<style>

</style>