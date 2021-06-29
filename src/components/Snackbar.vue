<template>
  <v-snackbar v-model="status" :timeout="timeout" :color="color">
      {{ text }}
      <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="status = false">
              Close
          </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',
    props: ['snackbar'],
    data() {
      return {
        status: this.snackbar.status,
        text: this.snackbar.text,
        color: this.snackbar.color,
        timeout: 2000
      }
    }
}
</script>

<style>

</style>