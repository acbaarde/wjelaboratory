<template>
    <v-flex md12 class="ma-2">
        <v-data-table dense flat disable-sort 
        :items-per-page="10"
        :headers="table_header"
        :items="table_items"
        :search="table_search">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <!-- <v-text-field class="shrink" v-model="search" append-icon="mdi-magnify" label="Search" outlined dense hide-details></v-text-field> -->

                    <v-dialog v-model="dialog" max-width="500">
                        <template v-slot:activator="{on ,attrs}">
                            <v-btn class="ml-2" color="primary" v-bind="attrs" v-on="on" dark>
                                {{ title }}
                            </v-btn>
                        </template>
                        
                        <v-card>
                            <v-card-title>{{ title }}</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-form>
                                    <v-container>
                                        <!-- <div v-for="(i,index) in modal_prop" :key="index">
                                            <div v-text-field>TEST</div>
                                        </div> -->
                                    </v-container>
                                </v-form>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="btn_save">Save</v-btn>
                                <v-btn text color="error" @click="btn_cancel">Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-btn v-for="(btn_item, index) in btn_items" :key="index" @click="call_event(btn_item.function_name,item)" :x-small="btn_item.xsmall" :color="btn_item.color" :class="btn_item.class">
                    {{ btn_item.text }}
                </v-btn>
            </template>
        </v-data-table>
    </v-flex>
</template>

<script>
export default {
    name: 'Data_table',
    props: ['table_header','table_items','btn_items','table_search'],
    data(){
        return{
            dialog: false,
            title: 'Add',
        }
    },
    methods: {
        call_event(btnname, item){
            this.$emit('btn_event', btnname, item)
        },

        btn_cancel(){
            this.dialog = !this.dialog;
        },
        btn_save(){

        }
    },
}
</script>

<style>

</style>