<template>
  <!-- <v-tabs
      dark
      background-color="grey"
      show-arrows
      fixed-tabs
    >
      <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

      <v-tab v-for="i in 5" :key="i" :href="'#tab-' + i">
        Item {{ i }}
      </v-tab>


    </v-tabs> -->

    <v-card>

        <v-tabs v-model="tab" grow>
            <v-tab key="laboratory">Laboratory</v-tab>
            <v-tab key="laboratory">Section</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card-text>
                    <customTable />
                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                <v-card-text>
                    <h1>SECTION PAGE</h1>
                </v-card-text>
            </v-tab-item>
        </v-tabs-items>
    
    </v-card>
</template>

<script>
import  Data_table from '../../layouts/Data_table';
export default {
    name: 'Data_maintenance',
    components:{ customTable: Data_table },
    data(){
        return{
            tab: null,
            items: [
            'Laboratory', 'Type',
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    }
}
</script>

<style>

</style>