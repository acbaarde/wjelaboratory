<template>
  <v-overlay :value="value">
    <v-card color="cardColor">
        <v-card-text>
            <v-row>
                <v-col class="d-flex align-center">
                    <v-progress-circular indeterminate size="50" class="mr-2"></v-progress-circular>
                    <h2>PLEASE WAIT...</h2>
                </v-col>
            </v-row>
            
        </v-card-text>
    </v-card>
</v-overlay>
</template>

<script>
export default {
    props: ['value']
}
</script>

<style scoped>
.cardColor {
   background-color: rgba(59, 59, 59, 0.411) !important;
   border-color: gray !important;
   
 }
</style>