<template>
<v-row dense no-gutters>
    <v-col>
        <v-card flat color="#eeeeee" tile>
            <div class="d-flex justify-space-between align-end">
                <div>
                    <v-card-title><span>{{ title }}</span></v-card-title>
                    <v-card-subtitle>{{ subtitle }}...</v-card-subtitle>
                </div>
                <div class="mr-2">
                    
                    <v-breadcrumbs :items="items">
                        <template v-slot:divider>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </v-breadcrumbs>
                </div>
            </div>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
export default {
    name: 'myHeader',
    props: ['title','subtitle'],
    data(){
        return{
            items: [
                // { text: 'Home', disabled: false, to: '/' },
                // { text: '', disabled: false, href: '#' },
                // { text: '', disabled: false, href: '#' },
            ]
        }
    },
    created(){
        let useraccess = this.$session.get('user-access')
        useraccess.forEach(el => {
            // console.log(this.$route.path)
            if(el.mod_path == this.$route.path){
                let title = el.mod_path.split("/")
                title.splice(0,1, "Home")
                let title_len = title.length -1
                title.forEach((e,i) => {
                    if(e == 'Home'){
                        this.items.push({
                            text: e,
                            disabled: false,
                            to: '/'
                        })
                    }else{
                        this.items.push({
                            text: i == title_len ? el.mod_title : e[0].toUpperCase() + e.substring(1),
                            disabled: false,
                            href: '#'
                        })
                    }
                })

                // title = title[0].toUpperCase() + title.substring(1)
                // this.items = [
                //     { text: 'Home', disabled: false, to: '/' },
                //     { text: title, disabled: false, href: '#' },
                //     { text: el.mod_title, disabled: false, href: '#' },
                // ]
            }
        })
    }
}
</script>

<style scoped>
span{
  color: #1976d2;
}
</style>