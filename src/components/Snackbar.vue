<template>
  <v-snackbar v-model="snackbar.status" timeout="1500" :color="snackbar.color">
      <v-icon>{{ snackbar.color == 'error' ? 'mdi-exclamation-thick' : 'mdi-check' }}</v-icon> {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.status = false" >
              Close
          </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',
    props: ['snackbar'],
    // data() {
    //   return {
    //     status: this.snackbar.status,
    //     text: this.snackbar.text,
    //     color: this.snackbar.color,
    //     timeout: 2000
    //   }
    // }
}
</script>

<style>

</style>