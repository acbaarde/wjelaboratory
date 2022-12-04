<template>
    <v-container>
        <v-row>
            <v-col cols="2" class="ml-10" style="padding-left:60px;">
                <img src="../../assets/wjelogo.png" width="80" height="80">
            </v-col>
            <!-- <div>
                <img src="../../assets/wjelogo.png" width="100" height="100">
            </div> -->
            <v-col cols="8"  class="mr-18">
                <v-spacer></v-spacer>
                <ul class="ul">
                    <li class="li-center" style="color: #00B050; font-size: 20px; font-weight: bold; padding-bottom: 4px">{{ company.name }}</li>
                    <li class="li-center" v-for="(item,index) in company.address" :key="index">{{ item }}</li>
                    <li class="li-center">TEL. No. {{ company.tel_no }}</li>
                    <li class="li-center">DOH Lic. No. {{ company.doh_lic_no }}</li>
                </ul>
            </v-col>
        </v-row>
        <v-row class="ml-6 mb-2" style="margin-left: 16px;padding-bottom: 8px;">
                <v-col cols="7" class="py-0">
                    <ul class="ul">
                        <li>
                            <ul class="ul">
                                <li style="display: inline-block; width: 80px;">Patient Name:</li>
                                <li style="display: inline-block;"><strong>{{ data.fullname }}</strong></li>
                            </ul>
                            <ul class="ul">
                                <li style="display: inline-block; width: 60px;">Patient ID:</li>
                                <li style="display: inline-block;"><strong>{{ data.patient_id }}</strong></li>
                            </ul>
                            <ul class="ul">
                                <li style="display: inline-block; width: 70px;">Age/Gender:</li>
                                <li style="display: inline-block;"><strong>{{ data.age + " / " + data.gender }}</strong></li>
                            </ul>
                        </li>
                    </ul>
                    <!-- <ul class="ul" style="line-height:1rem;">
                        <li>
                            <ul class="ul">
                                <li class="li-start">Name:</li>
                                <li>{{ data.fullname }}</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="ul">
                                <li class="li-start">Age:</li>
                                <li>{{ formatAge(data.age[0],data.age[1]) }}</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="ul">
                                <li class="li-start">Gender:</li>
                                <li>{{ data.gender }}</li>
                            </ul>
                        </li>
                    </ul> -->
                </v-col>
                <v-col cols="5" class="py-0">
                    <ul class="ul">
                        <li>
                            <ul class="ul">
                                <li style="display: inline-block; width: 60px;">Physician:</li>
                                <li style="display: inline-block;"><strong>{{ data.physician }}</strong></li>
                            </ul>
                            <ul class="ul">
                                <li style="display: inline-block; width: 40px;">Date:</li>
                                <li style="display: inline-block;"><strong>{{ data.date }}</strong></li>
                            </ul>
                        </li>
                    </ul>
                    <!-- <ul class="ul" style="line-height:1rem;">
                        <li>
                            <ul class="ul">
                                <li class="li-start">Physician:</li>
                                <li>{{ data.physician }}</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="ul">
                                <li class="li-start">Date:</li>
                                <li>{{ DateNow() }}</li>
                            </ul>
                        </li>
                    </ul> -->
                </v-col>
            </v-row>
            <!-- <v-divider></v-divider> -->
            <!-- <v-row no-gutters>
                <v-col cols="12" style="text-align: center; padding-top: 6px;">
                    <h2 style="color: red;">{{ data.title }}</h2>
                </v-col>
            </v-row> -->
    </v-container>
</template>

<script>
export default {
    name: 'resultHeader',
    props: ['data'],
    data(){
        return{
            company: {
                name: '',
                tel_no: '',
                doh_lic_no: '',
                address: []
            }
        }
    },
    created(){
        this.initialize()
    },
    methods: {
        async initialize(){
            await this.$guest.get('/api/data_maintenance/getCompanyInfo')
            .then(res => {
                this.company.name = res.data.company_name
                this.company.address = res.data.address.split("\n")
                this.company.tel_no = res.data.tel_no
                this.company.doh_lic_no = res.data.doh_lic_no
            })
            .catch(err => {console.log(err)})
        }
    }
}
</script>

<style scoped>
/* ul{
    padding: 0;
}
ul li{
    font-size: 13px;
    display: inline-block;
    list-style: none;
} */
.ul{
    list-style: none;
    padding: 0%;
    inline-size: auto;
}
li{
    color: black;
}
li{
    font-size: 11px;
}
.li-center{
    text-align: center;
    line-height: 1rem;
}

.li-start{
    text-align: start;
    width: 80px;
}
li, h2{
    font-family: "Roboto", sans-serif;
}
</style>