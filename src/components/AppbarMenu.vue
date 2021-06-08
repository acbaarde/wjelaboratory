<template>
    <v-menu open-on-hover offset-y transition="slide-y-transition">
        
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <!-- <v-icon right>expand_more</v-icon> -->
          
          {{menu_title}}
          <v-icon dark right small dense v-if="sub_menus.length">mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list v-if="sub_menus.length">
        <v-list-item v-for="(sub_menu, index) in sub_menus" :key="index" router to="/signin" dense small>
          <v-list-item-title>{{ sub_menu.menu_title }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>
</template>

<script>
export default {
    name: "AppbarMenu",
    props: ['menu_title','sub_menus'],
}
</script>