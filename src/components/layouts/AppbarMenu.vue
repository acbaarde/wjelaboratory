<template>
    <v-menu open-on-hover top offset-y>
        
      <template v-slot:activator="{ on, attrs }">
        <v-btn text dark v-bind="attrs" v-on="on">
          Dropdown
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>
</template>

<script>
export default {
    name: "AppbarMenu",
    data() {
        return{
            items: [
                { title: 'Click Me' },
                { title: 'Click Me 1' },
                { title: 'Click Me 2' },
                { title: 'Click Me 3' },
            ]
        }
    },
    components:{

    }    
}
</script>

<style scoped>

</style>