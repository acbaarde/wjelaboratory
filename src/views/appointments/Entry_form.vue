<template>
  <div class="ma-n3">
    <v-row>
        <v-col cols="9" style="padding: 0;">
          <v-container fluid>
            <Overlay :value="overlay.value" />
            <v-card flat outlined>
              <v-card-text>
                <v-row no-gutters class="mb-2">
                  <!-- <v-col cols="2" class="mr-2">
                    <v-text-field v-model="active_item.patient_id" readonly dense outlined hide-details label="Patient ID No."></v-text-field>
                  </v-col> -->
                  <!-- <v-dialog v-model="dialog" persistent width="80%">
                    <template v-slot:activator="{on, attrs}">
                      <v-btn x-small color="info" block v-bind="attrs" v-on="on" @click="loadPatients()">PATIENT INFO</v-btn>
                      <v-btn v-if="route_stat==''" elevation="1" dark class="mr-2" color="info" v-bind="attrs" v-on="on" @click="loadPatients()">
                        <v-icon left>mdi-magnify</v-icon><span>Patient</span>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span>Search Patient</span>
                        <v-spacer></v-spacer>
                        <v-btn icon small @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-data-table :headers="patient_table_headers" :items="patient_table_items" dense hide-default-footer :items-per-page="-1">
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-spacer></v-spacer>
                              <v-flex md1 class="mx-1">
                                <v-select v-model="rowFilter" @change="key_search()" :items="rowItems" item-text="text" item-value="value" hide-details dense outlined label="ROWS"></v-select>
                              </v-flex>
                              <v-text-field class="shrink" v-model="search" @keyup="key_search()" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                            </v-toolbar>
                          </template>
                          <template v-slot:[`item.id`]="{ item }">
                            <v-btn text small color="success" @click="btn_patient(item)">{{ item.id }}</v-btn>
                          </template>
                          <template v-slot:footer={}>
                            <v-divider></v-divider>
                            <div class="pt-2">
                              <v-pagination v-model="page" @input="currentPage" :length="pageLength" :total-visible="7"></v-pagination>
                            </div>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-dialog> -->
                  <v-text-field class="shrink" v-model="route_ctrlno" label="Control #." dense outlined hide-details readonly></v-text-field>
                </v-row>
                <!-- <v-row no-gutters class="mb-2">
                  <v-col cols="4" class="mr-2">
                    <v-text-field v-model="fullname" readonly dense outlined hide-details label="Patient Name"></v-text-field>
                  </v-col>
                  <v-col cols="2" class="mr-2">
                    <v-text-field v-model="gender" readonly dense outlined hide-details label="Gender"></v-text-field>
                  </v-col>
                  <v-col cols="1" class="mr-2">
                    <v-text-field v-model="age" readonly dense outlined hide-details label="Age"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="active_item.address" readonly dense outlined hide-details label="Address"></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-2">
                  <v-col cols="4" class="mr-2">
                    <v-select :disabled="route_stat=='D'||route_stat=='C'" v-model="physician_selected.value" @change="physician_changed()" label="Physician" :prefix="physicianprefix" :items="physicians" item-text="text" item-value="value" dense outlined hide-details></v-select>
                  </v-col>
                  <v-col cols="2" class="mr-2">
                    <v-select :disabled="route_stat=='D'||route_stat=='C'" v-model="discount_selected.id" @change="discount_changed()" :readonly="route_stat!=''" label="Discount Type" :items="discount" item-text="text" item-value="id" dense outlined hide-details></v-select>
                  </v-col>
                  <v-col cols="1" class="mr-2">
                    <v-text-field v-model="discount_selected.percent" :readonly="discount_selected.id == 3 ? false : true" dense outlined hide-details label="Disc. %"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="route_stat=='D'||route_stat=='C'" v-model="discount_rmks" clearable dense outlined hide-details label=" Discount Remarks"></v-text-field>
                  </v-col>
                </v-row> -->
                <v-row no-gutters class="mb-2" v-if="route_stat==''">
                  <v-col cols="6" class="mr-2">
                    <v-dialog v-model="dialog" persistent width="80%">
                      <template v-slot:activator="{on, attrs}">
                        <v-btn x-small color="info" block v-bind="attrs" v-on="on" @click="loadPatients()"><v-icon left x-small>mdi-plus-circle</v-icon>PATIENT INFO</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span>Search Patient</span>
                          <v-spacer></v-spacer>
                          <v-btn icon small @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-data-table :headers="patient_table_headers" :items="patient_table_items" dense hide-default-footer :items-per-page="-1">
                            <template v-slot:top>
                              <v-toolbar flat>
                                <v-spacer></v-spacer>
                                <v-flex md1 class="mx-1">
                                  <v-select v-model="rowFilter" @change="key_search()" :items="rowItems" item-text="text" item-value="value" hide-details dense outlined label="ROWS"></v-select>
                                </v-flex>
                                <v-text-field class="shrink" v-model="search" @keyup="key_search()" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                                <v-btn color="primary" class="ml-2" dark @click="add_patient()">ADD</v-btn>
                              </v-toolbar>
                            </template>
                            <template v-slot:[`item.id`]="{ item }">
                              <v-btn text small color="success" @click="btn_patient(item)">{{ item.id }}</v-btn>
                            </template>
                            <template v-slot:footer={}>
                              <v-divider></v-divider>
                              <div class="pt-2">
                                <v-pagination v-model="page" @input="currentPage" :length="pageLength" :total-visible="7"></v-pagination>
                              </div>
                            </template>
                          </v-data-table>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-col>
                  <v-col>
                    <v-dialog v-model="dialog_phy" width="50%">
                      <template v-slot:activator="{on, attrs}">
                        <v-btn x-small color="info" block v-bind="attrs" v-on="on"><v-icon left x-small>mdi-plus-circle</v-icon>PHYSICIAN INFO</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span>Update Details</span>
                          <v-spacer></v-spacer>
                          <v-btn icon small @click="dialog_phy=false"><v-icon>mdi-close</v-icon></v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row no-gutters class="my-2">
                            <v-col>
                              <v-select class="mb-2" clearable @click:clear="clearPhysician" :disabled="route_stat=='D'||route_stat=='C'" v-model="physician_selected.value" @change="physician_changed()" label="Physician" :prefix="physicianprefix" :items="physicians" item-text="text" item-value="value" dense outlined hide-details></v-select>
                              <v-select class="mb-2" clearable @click:clear="clearDiscount" :disabled="route_stat=='D'||route_stat=='C'" v-model="discount_selected.id" @change="discount_changed()" :readonly="route_stat!=''" label="Discount Type" :items="discount" item-text="text" item-value="id" dense outlined hide-details></v-select>
                              <v-text-field class="mb-2" v-model="discount_selected.percent"  :readonly="discount_selected.id == 3 ? false : true" dense outlined hide-details type="number" label="Disc. %"></v-text-field>
                              <v-text-field class="mb-2" :disabled="route_stat=='D'||route_stat=='C'" v-model="discount_rmks" clearable dense outlined hide-details label=" Discount Remarks"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>

                <v-row no-gutters class="ml-2 mb-2">
                  <v-col cols="6" class="mr-2">
                    <ul>
                      <li>
                        <ul style="padding-left: 5;">
                            <li style="width: 120px;">Patient ID:</li>
                            <li style="color: #4caf50;"><strong>{{ active_item.patient_id }}</strong></li>
                        </ul>
                        <ul>
                            <li style="width: 120px;">Patient Name:</li>
                            <li><strong>{{ fullname }}</strong></li>
                        </ul>
                        <ul>
                            <li style="width: 120px;">Gender:</li>
                            <li><strong>{{ gender }}</strong></li>
                        </ul>
                        <ul>
                            <li style="width: 120px;">Age:</li>
                            <li><strong>{{ age }}</strong></li>
                        </ul>
                        <ul>
                            <li style="width: 120px;">Address:</li>
                            <li><strong>{{ active_item.address }}</strong></li>
                        </ul>
                      </li>
                    </ul>
                  </v-col>
                  <v-col>
                    <ul>
                      <li>
                        <ul style="padding-left: 5;">
                            <li style="width: 120px;">Physician Name:</li>
                            <li><strong>{{ physicianprefix + ' ' + physician_name }}</strong></li>
                        </ul>
                        <ul>
                            <li style="width: 120px;">Discount Type:</li>
                            <li><strong>{{ discount_type }}</strong></li>
                        </ul>
                        <ul>
                            <li style="width: 120px;">Discount %:</li>
                            <li><strong>{{ discount_selected.percent > 0 ? discount_selected.percent : '' }}</strong></li>
                        </ul>
                        <ul>
                            <li style="width: 120px;">Disc. Remarks:</li>
                            <li><strong>{{ discount_rmks }}</strong></li>
                        </ul>
                      </li>
                    </ul>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mb-2">
                  <v-spacer></v-spacer>
                  <v-dialog v-model="lab_dialog" persistent scrollable width="90%">
                    <template v-slot:activator="on,attrs">
                      <v-btn :disabled="route_stat=='D'||route_stat=='C'||active_item.patient_id==''" :dark="active_item.patient_id!=''" color="green" block v-bind="attrs" v-on="on" @click="btn_add_lab_test()"><v-icon left>mdi-plus</v-icon>ADD LABORATORY TEST</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span>Add Laboratory Test</span>
                        <v-spacer></v-spacer>
                        <v-btn icon small @click="lab_dialog=false"><v-icon>mdi-close</v-icon></v-btn>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="pa-0">

                        <v-toolbar flat>
                          <v-text-field clearable v-model="searchLabtest" block append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                        </v-toolbar>


                        <v-tabs v-model="tab" show-arrows>
                            <v-tab v-for="item in tab_headers" :key="item.id">
                              {{ item.title }}
                            </v-tab>
                        </v-tabs>
                        <v-divider></v-divider>
                        <v-card class="ma-4" flat outlined>
                          <v-tabs-items v-model="tab">
                            <v-tab-item v-for="item in tab_headers" :key="item.id">
                              <v-data-table :headers="lab_table_headers" :items="lab_table_items(item.id,searchLabtest)" dense>
                                <!-- <template v-slot:top>
                                  <v-toolbar flat>
                                    <v-text-field clearable v-model="searchLabtest" block append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field>
                                  </v-toolbar>
                                </template> -->
                                <template v-slot:[`item.actions`]="{item}">
                                  <v-btn small dark color="success" @click="btn_save_lab_test(item)">ADD</v-btn>
                                </template>
                              </v-data-table>
                            </v-tab-item>
                          </v-tabs-items>
                        </v-card>

                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-row>
              <v-divider></v-divider>
                      <v-data-table :headers="table_headers" :items="table_items" :items-per-page="-1" dense hide-default-footer>
                        <template v-slot:[`item.title`]="{item}">
                          {{ item.title }} {{ item.send_out==1 ? "(SEND OUT)" : ''  }}
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                          <div v-if="item.status=='P'">
                            <v-btn v-if="route_apprvd=='Y'||discount_selected.id!=3" small text color="info">FOR PRINT</v-btn>
                            <v-btn v-if="route_apprvd==''&&discount_selected.id==3" text small color="info">FOR APPROVAL</v-btn>
                          </div>
                          <v-btn v-if="item.send_out==0 && item.status=='D' && $session.get('usertype-session')=='ADMIN'" text small color="info" @click="btn_reprint(item)">RE-PRINT</v-btn>
                          <v-btn v-if="item.status=='D'" text small color="success">DONE</v-btn>
                          <v-btn v-if="item.status==''" text small color="warning">PENDING</v-btn>
                          <v-btn v-if="item.status=='C'" text small color="error">CANCELLED</v-btn>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-btn v-if="item.status=='' && item.send_out==1 && ($session.get('userposnid-session')==1 || $session.get('usertype-session')=='ADMIN')" x-small color="success" @click="btn_sendout(item)">SEND OUT</v-btn>
                          <v-btn v-if="(item.status=='' || item.status=='P' || item.status=='D') && item.send_out==0 && ($session.get('userposnid-session')==1 || $session.get('usertype-session')=='ADMIN')" x-small color="info" @click="btn_results(item)">RESULTS</v-btn>
                          
                          <template v-if="item.status=='' || typeof item.status == 'undefined'">
                            <v-btn v-if="item.so_status==''" x-small color="error" @click="btn_remove_item(item)">REMOVE</v-btn>
                          </template>
                          <template v-if="route_stat!='D'">
                            <v-btn v-if="(item.status==''&&item.so_status=='0') || item.status=='P' && ($session.get('userposnid-session')==1 || $session.get('usertype-session')=='ADMIN')" x-small color="error" @click="btn_cancel_item(item)">CANCEL</v-btn>
                          </template>

                          <template v-if="item.status=='C'">
                            <v-btn x-small color="error" @click="btn_viewreason(item)">VIEW REASON</v-btn>
                          </template>
                        </template>
                      </v-data-table>
                      <v-btn v-if="btn_s==true" small block color="primary" class="mt-2" @click="btn_save()">SAVE</v-btn>
              </v-card-text>
              <!-- <v-divider></v-divider>
              <v-card-actions>
                <v-text-field :disabled="route_stat=='D'||route_stat=='C'" v-model="total_cash" :error="cash_err" placeholder="0.00" color="success" outlined label="CASH" class="shrink mr-2" hide-details></v-text-field>
                <v-text-field :disabled="route_stat=='D'||route_stat=='C'" v-model="total_change" placeholder="0.00" outlined label="CHANGE" class="shrink mr-2" readonly hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-text-field :disabled="route_stat=='D'||route_stat=='C'" v-model="total_fee" outlined label="LAB FEE(s)" class="shrink mr-2" readonly hide-details></v-text-field>
                <v-text-field :disabled="route_stat=='D'||route_stat=='C'" v-model="total_amount" success color="info" outlined label="TOTAL AMOUNT" class="shrink mr-2" readonly hide-details></v-text-field>
                
                <template v-if="route_stat=='P'||route_stat==''" >
                  <v-btn :disabled="active_item.patient_id == '' ? true:false" color="primary" @click="btn_save()">SAVE</v-btn>
                  <template>
                    <v-btn v-if="for_posting" color="info" @click="btn_post()">POST</v-btn>
                    <v-btn v-else color="error" @click="btn_cancel()">CANCEL</v-btn>
                  </template>
                </template>
              </v-card-actions> -->
            </v-card>
          </v-container>
        </v-col>
        <v-col cols="3" style="padding: 0;">
          <v-container fluid>
            <v-card flat outlined>
              <v-card-title>
                <v-btn :disabled="route_stat=='D'||route_stat=='C'||table_items.length==0" block small text outlined color="info" @click="payment_dialog=true">ADD PAYMENT</v-btn>
              </v-card-title>
              <v-card-text no-gutters class="my-2">
                <v-text-field :disabled="route_stat=='D'||route_stat=='C'" dense append-icon="mdi-currency-php" label="TOTAL LAB FEE" value="0.00" v-model="total_fee" reverse readonly></v-text-field>
                <v-text-field :disabled="route_stat=='D'||route_stat=='C'" dense append-icon="mdi-currency-php" label="DISCOUNT" value="0.00" v-model="total_disc" reverse readonly></v-text-field>
                <v-text-field :disabled="route_stat=='D'||route_stat=='C'" dense append-icon="mdi-currency-php" label="CASH" value="0.00" v-model="total_cash" reverse readonly :error="cash_err"></v-text-field>
                <v-text-field :disabled="route_stat=='D'||route_stat=='C'" dense append-icon="mdi-currency-php" label="CHANGE" value="0.00" v-model="total_change" reverse readonly></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-text-field hide-details :disabled="route_stat=='D'||route_stat=='C'" success outlined append-icon="mdi-currency-php" label="TOTAL AMOUNT" value="0.00" v-model="total_amount" reverse readonly></v-text-field>
              </v-card-actions>
            </v-card>
          </v-container>
          
          <v-container fluid>
            <template v-if="route_stat=='P'||route_stat==''" >
                <v-btn v-if="for_posting" block color="info" text outlined @click="btn_post()">POST</v-btn>
                <v-btn v-else block color="error" text outlined @click="btn_cancel()">CANCEL</v-btn>
                <v-btn class="mt-2" block color="info" text outlined @click="btn_back()">BACK</v-btn>
            </template>
          </v-container>
        </v-col>
      </v-row>

    <v-dialog v-model="payment_dialog" persistent scrollable width="20%">
      <v-card>
        <v-card-title><span>ADD PAYMENT</span></v-card-title>
        <v-card-text>
          <v-row no-gutters class="mt-2">
            <v-text-field dense append-icon="mdi-currency-php" label="CASH" placeholder="0.00" v-model="total_cash" @focus="cashFocus" reverse hide-details></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn small block color="primary" @click="btn_save()">SAVE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="result_dialog" persistent scrollable width="60%">
      <v-card>
        <v-card-title>
          <span>{{ item_title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="result_dialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="result_table_headers" :items="result_table_items" dense :items-per-page="-1" hide-default-footer> 
            <template v-slot:[`item.result_value`]="{item}">
              <v-text-field :readonly="(route_stat=='D'||print_stat=='D')" v-model="item.result_value" dense hide-details outlined class="shrink"></v-text-field>
            </template>
          </v-data-table>
        </v-card-text>
        
        <v-divider></v-divider>
          <v-card-actions>
            <template v-if="print_stat=='P'">
              <v-btn v-if="route_apprvd=='Y'||discount_selected.id!=3" elevation="0" color="info" class="mr-2" @click="btn_print()">PRINT</v-btn>
            </template>
            <v-text-field :readonly="(route_stat=='D'||print_stat=='D')" v-model="result_remarks" dense hide-details outlined label="Remarks"></v-text-field>
            <v-spacer></v-spacer>
            <template v-if="route_stat!='D'&&print_stat!='D'">
              <v-btn color="primary" :disabled="result_table_items.length > 0 ? false : true" @click="btn_result_save()">SAVE</v-btn>
            </template>
          </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="cancel_dialog" persistent scrollable width="50%">
      <v-card>
        <v-card-title class="headline grey lighten-2">Cancel Laboratory test?</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left text-h6 pa-5">
          <!-- <span>Cancellation can't be undone, Proceed anyway?</span> -->
          <v-form ref="form">
            <!-- <v-text-field v-model="cancel_reason" outlined dense label="Reason" class="mt-4" required :rules="cancel_reasonRules"></v-text-field> -->
            <v-textarea v-model="cancel_reason" outlined clearable auto-grow rows="4" label="Reason" mt-4 required :rules="cancel_reasonRules"></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="btn_confirm()">OK</v-btn>
          <v-btn text color="error" @click="cancel_dialog=false, $refs.form.reset(), cancel_reason=''">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="sendout_dialog" persistent scrollable width="30%">
      <v-card>
        <v-card-title>
          <span>Send Out</span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="sendout_dialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <v-form>
            <v-text-field dense outlined v-model="send_out.clinic" label="To Clinic"></v-text-field>
            <v-text-field dense outlined v-model="send_out.remarks" label="Remarks"></v-text-field>
            <v-select dense outlined label="Status" v-model="send_out.status" :items="send_out_items" item-text="text" item-value="value"></v-select>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="btn_save_sendout()">SAVE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="post_dialog" persistent scrollable width="30%">
      <v-card>
        <v-card-title class="headline grey lighten-2">Confirm</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left text-h6 pa-5">
          Proceed Posting?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small text color="primary" @click="postEntry()">OK</v-btn>
          <v-btn small text color="error" @click="post_dialog=false">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="void_dialog" persistent scrollable width="30%">
      <v-card>
        <v-card-title class="headline grey lighten-2">Cancel</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left text-h6 pa-5">
          Do you want to cancel transaction?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small text color="primary" @click="cancelEntry()">Ok</v-btn>
          <v-btn small text color="error" @click="void_dialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="reason_dialog" persistent scrollable width="30%">
      <v-card>
        <v-card-title>
          <span>View Reason</span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="reason_dialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <v-text-field v-model="cancelled.reason" readonly outlined dense label="Cancelled reason"></v-text-field>
          <v-text-field v-model="cancelled.date" readonly outlined dense label="Cancelled date"></v-text-field>
          <v-text-field v-model="cancelled.user" readonly outlined dense label="Cancelled by"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script>
import Overlay from '../../components/Overlay.vue'
import Snackbar from '../../components/Snackbar.vue'
export default {
  components: { Overlay, Snackbar },
  data(){
    return{
      page: 1,
      pageLength: 1,
      rowFilter: '10',
      rowItems: [
        { text: '5', value: '5' },
        { text: '10', value: '10' },
        { text: '25', value: '25' },
        { text: 'All', value: 'all' },
      ],
      route_ctrlno: atob(this.$route.query.ctrlno),
      route_stat: atob(this.$route.query.stat),
      route_apprvd: atob(this.$route.query.apprvd),
      cancel_reasonRules: [v => !!v || 'Reason is required!!!'],
      snackbar: {
          status: false,
          text: '',
          color: '',
        },
      print_stat: '',
      overlay: {
          value: false
        },
      dialog: false,
      dialog_phy: false,
      lab_dialog: false,
      result_dialog: false,
      cancel_dialog: false,
      sendout_dialog: false,
      post_dialog: false,
      void_dialog: false,
      reason_dialog: false,
      payment_dialog: false,
      cancelled: {
        reason: '',
        date: '',
        user: ''
      },
      tab: 0,
      search: '',
      searchLabtest: '',
      send_out:{
        id: '',
        clinic: '',
        remarks: '',
        status: ''
      },
      send_out_items: [
        { value: '0', text: 'PENDING' },
        { value: '1', text: 'RECEIVED' }
      ],
      active_item: {
        id: '',
        patient_id: '',
        gender: '',
        age: '',
        agetype: '',
        address: '',
      },
      table_headers: [
        { text: 'STATUS', value: 'status', align: 'center', sortable: false },
        { text: 'TITLE', value: 'title', align: 'left', sortable: false },
        { text: 'ABBR', value: 'abbr', align: 'center', sortable: false },
        { text: 'LAB FEE', value: 'amount', align: 'center', sortable: false },
        { text: 'ACTIONS', value: 'actions', align: 'center', sortable: false },
      ],
      table_items: [],
      lab_table_headers: [
        { text: 'ABBR', value: 'abbr', align: 'center', sortable:false },
        { text: 'TITLE', value: 'title', align: 'left', sortable:false },
        { text: 'LAB FEE', value: 'amount', align: 'left', sortable:false },
        { text: 'ACTIONS', value: 'actions', align: 'center', sortable:false },
      ],
      patient_table_headers: [
        { text: 'ID No.', value: 'id', align: 'center', sortable: false },
        { text: 'LASTNAME', value: 'lastname', align: 'left', sortable: false },
        { text: 'FIRSTNAME', value: 'firstname', align: 'left', sortable: false },
        { text: 'MIDDLENAME', value: 'middlename', align: 'left', sortable: false },
        { text: 'GENDER', value: 'gender', align: 'center', sortable: false, filterable: false },
        { text: 'AGE', value: 'age', align: 'center', sortable: false, filterable: false },
        { text: 'CONTACT #.', value: 'contact', align: 'center', sortable: false, filterable: false },
        { text: 'ADDRESS', value: 'address', align: 'center', sortable: false, filterable: false },
      ],
      patient_table_items: [],
      result_table_headers: [
        { text: 'TITLE', value: 'result_title', align: 'left', sortable: false },
        { text: 'RESULT RANGE', value: 'result_range', align: 'left', sortable: false },
        { text: 'RESULT VALUE', value: 'result_value', align: 'center', sortable: false },
      ],
      result_table_items: [],
      physicians: [{
        text: '', gender: '', value: 0
      }],
      physician_selected: { text: '', gender: '', value: 0 },
      discount: [],
      discount_selected: {},
      discount_rmks: '',
      tab_headers: [],
      tab_items: [],
      total_cash: '0.00',
      result_remarks: '',
      cancel_reason: '',
      item_id: '',
      item_title: '',
      btn_s: false,
    }
  },

  computed:{
    fullname(){
        var fullname = this.active_item.lastname + ', ' + this.active_item.firstname + ' ' + this.active_item.middlename
        return typeof this.active_item.lastname == 'undefined' ? '' : fullname.toUpperCase()
      },
    age(){
      var age = ''
      if(this.active_item.age != ''){
        age = this.formatAge(this.active_item.age,this.active_item.agetype)
      }
      return age
    },
    gender(){
      var gnder = ''
      if(this.active_item.gender != ''){
        gnder = this.active_item.gender == 'M' ? 'MALE' : 'FEMALE'
      }
      return gnder
    },
    physicianprefix(){
      var gender = this.physicians.filter(e=> e.value == this.physician_selected.value).length > 0 ? this.physicians.filter(e=> e.value == this.physician_selected.value)[0].gender : '';
      return gender == 'F' ? 'Dra.' : gender == 'M' ? 'Dr.' : '';
    },

    total_amount(){
      let total = Object.values(this.table_items.filter(e=>e.status!='C')).reduce((total, { amount }) => total + parseFloat(amount), 0).toFixed(2);
      let percent = typeof this.discount_selected.percent == 'undefined' ? 0 : this.discount_selected.percent;
      return total > 0 ? (total - ((percent/100) * total)).toFixed(2) : '0.00';
    },

    total_disc(){
      let total = Object.values(this.table_items.filter(e=>e.status!='C')).reduce((total, { amount }) => total + parseFloat(amount), 0).toFixed(2);
      let percent = typeof this.discount_selected.percent == 'undefined' ? 0 : this.discount_selected.percent;
      return total > 0 ? ((percent/100) * total).toFixed(2) : '0.00';
    },

    total_fee(){
      return Object.values(this.table_items.filter(e=>e.status!='C')).reduce((total, { amount }) => total + parseFloat(amount), 0).toFixed(2)
    },

    total_change(){
      if(parseInt(this.total_cash) > parseInt(this.total_amount)){
        return (this.total_cash - this.total_amount) > 0 ? (this.total_cash - this.total_amount).toFixed(2) : ""
      }else{
        return '0.00'
      }
    },

    for_posting(){
      return this.table_items.filter(e=>e.status == 'P'||e.status == 'C'||e.status=='D').length > 0 ? true : false
    },

    cash_err(){
      return parseInt(this.total_amount) > parseInt(this.total_cash==''?0:this.total_cash) ? true : false
    },
    physician_name(){
      return this.physicians.filter(e=>e.value == this.physician_selected.value).length > 0 ? this.physicians.filter(e=>e.value == this.physician_selected.value)[0].text : '';
    },
    discount_type(){
      return this.discount.filter(e=>e.id == this.discount_selected.id).length > 0 ? this.discount.filter(e=>e.id == this.discount_selected.id)[0].text : '';
    },
    table_items_helper(){
      return JSON.parse(JSON.stringify(this.table_items));
    },
  },

  created(){
    this.initialize();
  },

  watch: {
    table_items_helper:{
      handler: function(newVal, oldVal){
        this.btn_s = newVal.filter(e=> typeof e.item_id == 'undefined').length > 0 ? true : newVal.length < oldVal.length ? true : false
      },
      deep: true
    },
  },

  methods: {
    cashFocus(){
      this.total_cash > 0 ? this.total_cash : this.total_cash = '';
    },
    async initialize(){
      this.overlay.value = true
      if(this.route_stat != ''){
        let data = {
          id: this.route_ctrlno
        }
        await this.$guest.post('/api/appointment/getEntry', this.$form_data.generate(data))
        .then(res => {
          this.active_item = res.data.patient
          this.table_items = res.data.submodule
          this.physician_selected.value = res.data.patient.physician_id
          this.discount_selected = {
            id: res.data.patient.discount_id,
            percent: res.data.patient.discount_percent
          }
          this.discount_rmks = res.data.patient.discount_rmks
          this.total_cash = res.data.patient.cash > 0 ? res.data.patient.cash : '0.00'
        })
        .catch(err => { console.log(err) })
      }

      await this.$guest.get('/api/data_maintenance/getPhysicians')
      .then(res => {
        this.physicians = res.data
      })
      .catch(err => {console.log(err)})
      await this.$guest.get('/api/data_maintenance/getDiscount')
      .then(res => {
        this.discount = res.data
        // this.discount.push({ id: '', text: '', percent: '' })
        this.overlay.value = false
      })
      .catch(err => {console.log(err)})

    },
    async currentPage(){
      this.loadPatients()
    },
    key_search(){
      this.page = 1
      this.loadPatients()
    },
    async loadPatients(){
      let limit = this.rowFilter == 'all' ? 100 : this.rowFilter
      let data = {
        search_value: this.search,
        offset: this.page == 1 ? 0 : (this.page-1)*limit,
        limit: limit
      }
      await this.$guest.post('/api/patient/getPatients', this.$form_data.generate(data))
      .then(res => {
        this.patient_table_items = res.data.patients
        this.pageLength = this.paginationLength(res.data.total, limit)
      })
      .catch(err =>{ console.log(err) })
    },

    btn_patient(item){
      this.dialog = false
      this.active_item = Object.assign({}, item)
      this.active_item['patient_id'] = item.id
    },
    async btn_save(){
        this.overlay.value = true
        let sel_tbl_itms = []
        this.table_items.forEach(el => {
          if(typeof el.lab_id == 'undefined'){
            sel_tbl_itms.push(el.id)
          }else{
            sel_tbl_itms.push(el.lab_id)
          }
        })
        let data = {
          user_id: this.$session.get('userid-session'),
          id: this.route_ctrlno,
          patient_id: this.active_item.patient_id,
          physician_id: typeof this.physician_selected.value !== 'undefined' ? this.physician_selected.value : '',
          discount_id: typeof this.discount_selected.id !== 'undefined' ? this.discount_selected.id : '',
          discount_rmks: this.discount_rmks == null ? '' : this.discount_rmks,
          discount_percent: typeof this.discount_selected.percent !== 'undefined' ? this.discount_selected.percent : '',
          submod_id: sel_tbl_itms,
          total_cash: this.total_cash,
          total_change: this.total_change,
          total_amount: this.total_amount,
          total_fee: this.total_fee,
        }
        let url = this.route_stat == '' ? '/api/appointment/insertEntry' : '/api/appointment/updateEntry'
        await this.$guest.post(url, this.$form_data.generate(data))
        .then(res => {
          if(res.data.status == true){
            this.$router.go(this.$router.push({ name: 'Entry_form', query: { ctrlno: btoa(res.data.control_id), stat: btoa(res.data.appointment_status), apprvd: btoa(res.data.apprvd) } }).catch(() => {}))
          }
        })
        .catch(err => {console.log(err)})
    },

    async btn_add_lab_test(){
      this.lab_dialog = true
      this.tab = 0
      await this.$guest.get('/api/laboratory/getLabModule')
      .then(res => {
        this.tab_headers = res.data.module
        this.tab_items = res.data.submodule
      })
      .catch(err => {console.log(err)})
    },

    async btn_save_lab_test(item){
      this.table_items.push(item)
    },

    btn_remove_item(item){
      this.table_items.splice(this.table_items.indexOf(item),1)
    },
    btn_viewreason(item){
      this.reason_dialog = true
      this.cancelled.reason = item.cancel_reason
      this.cancelled.date = this.formatDateTime(item.cancelled_at)
      this.cancelled.user = item.cancelled_by
    },
    btn_print(){
      this.btn_result_save()

      let print_info = {
        item_id: this.item_id,
        patient_id: this.active_item.patient_id,
        fullname: this.fullname,
        age: this.age,
        gender: this.gender,
        date: this.DateNow(),
        physician: this.physician_selected.value > 0 ? this.physicians.filter(e => this.physician_selected.value == e.value)[0]['text'] : '' 
      }
      let results_info = {
        title: this.item_title,
        remarks: this.result_remarks.toUpperCase(),
        lab_results: this.result_table_items
      }
      if(this.$session.get('userposnid-session')==1||this.$session.get('usertype-session')=='ADMIN'){
        this.$router.push({ name: 'Generate_reports', params: { info: print_info, results: results_info, url: this.$route.fullPath } })
      }
    },
    btn_reprint(item){
      let data = {
        item_id: item.item_id,
        user_id: this.$session.get('userid-session')
      }
      this.$guest.post('/api/appointment/reprintLabTest', this.$form_data.generate(data))
      .then(res=>{
        if(res.data.status==true){
          this.initialize()
        }
      })
      .catch(err => {console.log(err)})
    },
    async btn_results(item){
      this.result_dialog = true
      this.print_stat = item.status
      this.item_id = item.item_id
      this.item_title = item.title
      let data = {
        lab_id: item.id,
        control_id: this.route_ctrlno,
        item_id: this.item_id
      }
      await this.$guest.post('/api/appointment/getLabResults', this.$form_data.generate(data))
      .then(res => {
        this.result_remarks = res.data.result_remarks
        this.result_table_items = res.data.lab_results
      })
      .catch(err => { console.log(err) })
    },

    async btn_result_save(){
      let data = {
        lab_results: JSON.stringify(this.result_table_items),
        result_remarks: this.result_remarks,
        lab_test_id: this.item_id
      }
      await this.$guest.post('/api/appointment/saveResultEntry', this.$form_data.generate(data))
      .then(() => {
        this.result_dialog = false
        this.initialize()
      })
      .catch(err => { console.log(err) })
    },

    btn_sendout(item){
      this.sendout_dialog = true
      this.send_out.id = item.item_id
      this.send_out.clinic = item.so_clinic
      this.send_out.remarks = item.so_remarks
      this.send_out.status = item.so_status
    },
    btn_save_sendout(){
      this.overlay.value = true
      this.send_out['user_id'] = this.$session.get('userid-session')
      this.$guest.post('/api/appointment/saveSendout', this.$form_data.generate(this.send_out))
      .then(res => {
       if(res.data.status == true){
          this.initialize()
          this.overlay.value = false
          this.sendout_dialog = false
       }
      })
      .catch(err => { console.log(err) })
    },
    async btn_post(){
      if(this.table_items.filter(e=>e.status=="").length > 0){
        this.snackbar = {
          text: 'Pending Laboratory Test',
          status: true,
          color: 'error'
        }
      }else if(parseInt(this.total_amount) > (this.total_cash)){
        this.snackbar = {
          text: 'Insufficient Cash...',
          status: true,
          color: 'error'
        }
      }else if(this.route_apprvd == '' && this.discount_selected.id == 3){
         this.snackbar = {
          text: 'Waiting for Approval',
          status: true,
          color: 'error'
        }
      }else{
        let data = {
          id: this.route_ctrlno,
        }
        await this.$guest.post('/api/appointment/checkPendingLabTest', this.$form_data.generate(data))
        .then(res => {
          //direct check if theres pending lab test
          if(res.data == true){
            this.$router.go(this.$router.currentRoute)
          }else{
            //direct check if payment has been made
            this.$guest.post('/api/appointment/checkPayment', this.$form_data.generate(data))
            .then(ress => {
              if(ress.data == true){
                this.post_dialog = true
              }else{
                this.snackbar = {
                  text: 'Please enter CASH PAYMENT!!!',
                  status: true,
                  color: 'error'
                }
              }
            })
          }
        })
        .catch(err => { console.log(err) })
      }
    },
    async postEntry(){
      let data = {
          id: this.route_ctrlno,
          user_id: this.$session.get('userid-session')
        }
        await this.$guest.post('/api/appointment/postEntry', this.$form_data.generate(data))
        .then(res=> {
          if(res.data.status == true){
            this.post_dialog = false
            this.snackbar = {
              text: 'Posted successfully!!!',
              status: true,
              color: 'success'
            }
            setTimeout(() => {
              this.$router.push({ name: 'Dashboard' })
            }, 1500);
          }
        })
        .catch(err => { console.log(err) })
    },
    cancelEntry(){
      let data = {
        id: this.route_ctrlno,
        user_id: this.$session.get('userid-session')
      }
      this.$guest.post('/api/appointment/cancelEntry', this.$form_data.generate(data))
      .then(res => {
        if(res.data.status == true){
          this.void_dialog = false
          this.snackbar = {
            text: 'Transaction Cancelled!!!',
            status: true,
            color: 'warning'
          }
          setTimeout(() => {
            this.$router.push({ name: 'Entries_form' })
          }, 1500);
        }
      })
      .catch(err=>{console.log(err)})
    },
    btn_cancel(){
      this.void_dialog = true
    },
    btn_back(){
      this.$router.push({ name: 'Dashboard'})
    },
    btn_cancel_item(item){
      this.item_id = item.item_id
      this.cancel_dialog = true
    },
    async btn_confirm(){
      if(this.$refs.form.validate()){
        let data = {
          item_id: this.item_id,
          cancel_reason: this.cancel_reason,
          user_id: this.$session.get('userid-session')
        }
        await this.$guest.post('/api/appointment/cancelLabTest', this.$form_data.generate(data))
        .then(res => {
          if(res.data.status == true){
            this.cancel_dialog = false
            this.initialize()
            this.cancel_reason = ''
            this.$refs.form.reset()
          }
        })
        .catch(err => { console.log(err) })
      }
      
    },

    discount_changed(){
      this.discount.forEach(e => {
        if(e.id == this.discount_selected.id){
          const disc_sel = {
            'id': e.id,
            'percent': e.percent,
            'text': e.text
          }
          this.discount_selected = Object.assign({}, disc_sel)
        }
      })
    },
    physician_changed(){
      this.physicians.forEach(e => {
        if(e.value == this.physician_selected.value){
          const phy_sel = {
            'value': e.value,
            'gender': e.gender,
            'name': e.text
          }
          this.physician_selected = Object.assign({}, phy_sel)
        }
      })
    },

    lab_table_items(id, keysearch){
      let tbl_items = []
      this.table_items.forEach(el => {
        tbl_items.push(el.id)
      })
      return keysearch == '' || keysearch == null ? this.tab_items.filter(e => e.mod_id == id && !tbl_items.includes(e.id)) : this.tab_items.filter(e=> e.title.includes(keysearch.toUpperCase()) && !tbl_items.includes(e.id) )
    },
    clearPhysician(){
      this.$nextTick(() => {
        this.physician_selected = Object.assign({}, { value: 0 })
      })
    },
    clearDiscount(){
      this.$nextTick(() => {
        this.discount_selected = Object.assign({}, { id: 0, text: '', percent: '' })
      })
    },
    // discountLimit(value){
    //   value >= 100 ? value : 
    //   console.log(value)
    // },
    discountLength(value){
      return value <= 100 ? '###' : value == 100 ? '###' : '##'; 
    },
    add_patient(){
      this.$router.push({ name: 'Patient_lists_form'})
    }
  }
}
</script>

<style scoped>
ul li{
    font-size: 15px;
    display: inline-block;
    list-style: none;
}
ul {
  padding-left: 0;
}
</style>