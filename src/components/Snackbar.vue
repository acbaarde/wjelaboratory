<template>
  <div>
      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="success"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
    name: 'Snackbar',
    props: ['snackbar'],
    data: () => ({
        snackbar: this.snackbar,
        text: "TIMEOUT 2000",
        timeout: 2000
    })
}
</script>

<style>

</style>