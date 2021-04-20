<template>
    <v-menu open-on-hover offset-y transition="slide-y-transition">
        
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          {{btntitle}}
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" dense small>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>
</template>

<script>
export default {
    name: "AppbarMenu",
    props: ['btntitle','items'],
}
</script>