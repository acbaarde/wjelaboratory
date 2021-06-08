<template>
  <v-card>
        <v-flex md-12 class="ma-2">
            <v-container fluid>
                <v-row no-gutters>
                    <v-alert outlined type="info" max-width="600px">
                        <div><strong>Important Reminders,</strong></div>
                        <div>
                            Timekeeping Process computes DTR, Overtime, Undertime of the employees on active Payperiod. Please check the payperiod carefully!!!
                        </div>
                    </v-alert>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="mb-4">
                            <ul style="list-style: none; padding: 0;">
                                <li>
                                    <ul>
                                        <li style="width: 120px;">PAYPERIOD:</li>
                                        <li>2021-01-01</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <v-btn color="primary">Process Timekeeping</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-flex>
  </v-card>
</template>

<script>
export default {
    name: 'Processing_form'
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