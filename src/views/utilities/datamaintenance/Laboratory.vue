<template>
<div class="ma-n3">
    <myHeader :title="'Data Maintenance'" :subtitle="'Manage Laboratory Data'" />
    <v-container fluid>
  <v-card flat outlined>
    <v-flex md-12 class="ma-2">
      <Overlay :value="overlay.value" />

      <v-tabs v-model="tab" centered grow>
        <v-tab>
          MODULE
        </v-tab>
        <v-tab>
          SUBMODULE
        </v-tab>
        <v-tab>
          LAB TEST
        </v-tab>

        <v-tab-item>
          <v-data-table :headers="module_table_headers" :items="module_table_items" :search="module_search" dense flat disable-sort :items-per-page="-1">
            <template v-slot:top>
                <v-toolbar flat>
                  <v-spacer></v-spacer>
                  <v-text-field class="shrink" v-model="module_search" append-icon="mdi-magnify" label="Search" outlined dense hide-details clearable :clear-icon="clearicon"></v-text-field>
                  <v-btn class="ml-2" color="primary" @click="mod_dialog = true" dark>Add MODULE</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:[`item.send_out`]="{item}">
              {{ item.send_out == 1 ? "YES" : "" }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn dense x-small color="primary" @click="btn_update(item)">UPDATE</v-btn>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table :headers="submodule_table_headers" :items="submodule_table_items" :search="submodule_search" dense flat disable-sort :items-per-page="-1">
            <template v-slot:top>
                <v-toolbar flat>
                  <v-spacer></v-spacer>
                  <v-text-field class="shrink" v-model="submodule_search" append-icon="mdi-magnify" label="Search" outlined dense hide-details clearable :clear-icon="clearicon"></v-text-field>
                  <v-btn class="ml-2" color="primary" @click="submod_dialog = true" dark>Add SUBMODULE</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn dense x-small color="primary" @click="btn_update(item)">UPDATE</v-btn>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table :headers="subsubmodule_table_headers" :items="subsubmodule_table_items" :search="subsubmodule_search" dense flat disable-sort :items-per-page="-1">
            <template v-slot:top>
                <v-toolbar flat>
                  <v-spacer></v-spacer>
                  <v-text-field class="shrink" v-model="subsubmodule_search" append-icon="mdi-magnify" label="Search" outlined dense hide-details clearable :clear-icon="clearicon"></v-text-field>
                  <v-btn class="ml-2" color="primary" @click="subsubmod_dialog = true" dark>Add LABTEST</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn dense x-small color="primary" @click="btn_update(item)">UPDATE</v-btn>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>

      <v-dialog v-model="mod_dialog" persistent max-width="600px">        
        <v-card>
            <v-card-title>{{ formTitle }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-2">
                <v-row no-gutters>
                  <v-col cols="8" class="mr-4">
                    <v-text-field v-model="active_item.title" dense outlined label="Title" clearable :clear-icon="clearicon"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-switch v-model="send_out" class="mt-1" inset hide-details label="SEND OUT"></v-switch>
                  </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small outlined color="primary" @click="btn_save()">Save</v-btn>
                <v-btn small outlined color="error" @click="btn_cancel()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="submod_dialog" persistent max-width="600px">        
        <v-card>
            <v-card-title>{{ formTitle }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-2">
                <v-select v-model="active_item.mod_id" dense outlined :items="module_table_items" item-text="title" item-value="id" clearable :clear-icon="clearicon"></v-select>
                <v-text-field v-model="active_item.title" dense outlined label="Title" clearable :clear-icon="clearicon"></v-text-field>
                <v-text-field v-model="active_item.amount" dense outlined label="Amount" clearable :clear-icon="clearicon"></v-text-field>
                <v-text-field v-model="active_item.abbr" v-mask="'XXXX'" dense outlined label="Abbreviation" clearable :clear-icon="clearicon"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small outlined color="primary" @click="btn_save()">Save</v-btn>
                <v-btn small outlined color="error" @click="btn_cancel()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="subsubmod_dialog" persistent max-width="600px">        
        <v-card>
            <v-card-title>{{ formTitle }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-2">
                <v-select v-model="active_item.submod_id" dense outlined :items="submodule_table_items" item-text="title" item-value="id" clearable :clear-icon="clearicon"></v-select>
                <v-text-field v-model="active_item.title" dense outlined label="Title" clearable :clear-icon="clearicon"></v-text-field>
                <v-text-field v-model="active_item.result_range" dense outlined label="Result Range" clearable :clear-icon="clearicon"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small outlined color="primary" @click="btn_save()">Save</v-btn>
                <v-btn small outlined color="error" @click="btn_cancel()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>

    </v-flex>
    <Snackbar :snackbar="snackbar" />
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
        clearicon: "mdi-close-circle",
        tab: 0,
        overlay: {
          value: false
        },
        snackbar: {
          status: false,
          text: '',
          color: '',
        },
        mod_dialog: false,
        submod_dialog: false,
        subsubmod_dialog: false,
        module_search: '',
        submodule_search: '',
        subsubmodule_search: '',
        itemIndex: -1,
        active_item:[],
        send_out: false,
        module_table_items: [],
        module_table_headers:[
          { text: 'Title', value: 'title', align: 'left' },
          { text: 'SEND OUT', value: 'send_out', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', filterable: false },
        ],
        submodule_table_items: [],
        submodule_table_headers:[
          { text: 'Module Title', value: 'mod_title', align: 'left' },
          { text: 'Title', value: 'title', align: 'left' },
          { text: 'Amount', value: 'amount', align: 'center',filterable: false },
          { text: 'Abbreviation', value: 'abbr', align: 'center' },
          { text: 'Actions', value: 'actions', align: 'center', filterable: false },
        ],
        subsubmodule_table_items: [],
        subsubmodule_table_headers:[
          { text: 'Sub Module Title', value: 'submod_title', align: 'left' },
          { text: 'Title', value: 'title', align: 'left' },
          { text: 'Range', value: 'result_range', align: 'center',filterable: false },
          { text: 'Actions', value: 'actions', align: 'center', filterable: false },
        ],
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
    computed:{
      formTitle(){
        return this.itemIndex === -1 ? 'New Module' : 'Update Module'
      },
    },
    methods: {
      async initialize(){
        this.overlay.value = true
        await this.$guest.get('/api/data_maintenance/loadModule')
        .then(res => {
          this.module_table_items = res.data.module
          this.submodule_table_items = res.data.submodule
          this.subsubmodule_table_items = res.data.labtest
          this.overlay.value = false
        })
        .catch(err => { console.log(err) })
      },

      btn_cancel(){
        this.itemIndex = -1
        this.active_item = []
        if(this.tab == 0){
          this.mod_dialog = false
        }else if(this.tab == 1){
          this.submod_dialog = false
        }else if(this.tab == 2){
          this.subsubmod_dialog = false
        }else{
          this.$route.push({ name: 'Laboratory' })
        }
      },
      btn_update(item){
        this.active_item = Object.assign({}, item)
        if(this.tab == 0){
          this.mod_dialog = true
          this.send_out = this.active_item.send_out == 1 ? true : false
          this.itemIndex = this.module_table_items.indexOf(item)
        }else if(this.tab == 1){
          this.submod_dialog = true
          this.itemIndex = this.submodule_table_items.indexOf(item)
        }else if(this.tab == 2){
          this.subsubmod_dialog = true
          this.itemIndex = this.subsubmodule_table_items.indexOf(item)
        }else{
          this.$route.push({ name: 'Laboratory' })
        }
      },
      async btn_save(){
        this.active_item['user_id'] = this.$session.get('userid-session')
        if(this.tab == 0){
          let data = {
            id: this.active_item.id,
            title: this.active_item.title,
            send_out: this.send_out == true ? 1 : 0,
            user_id: this.active_item.user_id
          }
          await this.$guest.post('/api/laboratory/saveModule', this.$form_data.generate(data))
          .then(() => {
            this.tab = 0
            this.snackbar.status = true
            this.snackbar.color = "success"
            this.snackbar.text = this.itemIndex == -1 ? 'Record(s) saved successfully!' : 'Record(s) updated successfully!'
          })
          .catch(err => { console.log(err) })
        }else if(this.tab == 1){
          await this.$guest.post('/api/laboratory/saveSubModule', this.$form_data.generate(this.active_item))
          .then(() => { 
            this.tab = 1
             this.snackbar.status = true
                this.snackbar.color = "success"
                this.snackbar.text = this.itemIndex == -1 ? 'Record(s) saved successfully!' : 'Record(s) updated successfully!'
                
          })
          .catch(err => { console.log(err) })
        }else if(this.tab == 2){
          this.active_item['mod_id'] = this.submodule_table_items.filter(e => e.id == this.active_item.submod_id)[0]['mod_id']
          await this.$guest.post('/api/laboratory/saveSubSubModule', this.$form_data.generate(this.active_item))
          .then(() => { 
            this.tab = 2
             this.snackbar.status = true
                this.snackbar.color = "success"
                this.snackbar.text = this.itemIndex == -1 ? 'Record(s) saved successfully!' : 'Record(s) updated successfully!'
                
          })
          .catch(err => { console.log(err) })
        }else{
          this.$route.push({ name: 'Laboratory' })
        }
        this.btn_cancel()
        this.initialize()
      },
    }
}
</script>

<style>

</style>