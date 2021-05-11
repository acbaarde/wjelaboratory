<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in items" :key="i" cols="3">
        <v-card :color="item.color" dark height="200px">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                  class="text-h5"
                  v-text="item.title"
                ></v-card-title>
              
                <v-card-actions>
            <v-spacer></v-spacer>
            <h3>{{ item.count }}</h3>
          </v-card-actions>
            </div>
          </div>


          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Dashboard',
    data(){
      return{
        items: [
          { title: 'PENDING', color: 'primary', count: 1},
          { title: 'FOR RELEASED', color: 'info', count: 5},
          { title: 'PHYSICIANS', color: '#1F7087', count: 0 },
          { title: 'TOTAL PATIENTS', color: '#952175', count: 10 },
        ]
      }
    },

    beforeCreate: function(){
        if(!this.$session.has('user-session')){
            this.$router.push('/login');
        }
    },
}
</script>

<style scoped>

</style>