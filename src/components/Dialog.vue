<template>
  <v-dialog v-model="dialog.status" max-width="400" persistent>
    <v-card>
        <v-card-title>Confirm?</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
            {{ dialog.text }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="primary" @click="btn_yes()">YES</v-btn>
            <v-btn small color="error" @click="btn_no()">NO</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ['dialog'],
    methods: {
        btn_yes(){
            this.$emit('emit', true)
        },
        btn_no(){
            this.$emit('emit', false)
        }
    }
}
</script>

<style>

</style>