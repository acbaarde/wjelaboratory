<template>
    <v-container>
        <v-row>
            <v-col cols="2" class="ml-10">
                <img src="../../assets/wjelogo.png">
            </v-col>
            <v-col cols="8"  class="mr-18">
                <v-spacer></v-spacer>
                <ul class="ul">
                    <li class="li-center" style="color: #00B050; font-size: 20px; font-weight: bold; padding-bottom: 4px">WJE Diagnostic Laboratory</li>
                    <li class="li-center"> Blk 6 lot 34 A Brgy. San Pedro Sapang Palay</li>
                    <li class="li-center">City of San Jose del Monte, Bulacan</li>
                    <li class="li-center">San Pedro Pharmacy and Diagnostic Clinic Bldg. TEL. No. 09328449462</li>
                    <li class="li-center">DOH Lic. No. 03-356-14-CL-2</li>
                </ul>
            </v-col>
        </v-row>
        <v-row class="px-4 mb-2" style="padding-bottom: 8px;">
                <v-col cols="7" class="py-0">
                    <ul class="ul">
                        <li>
                            <ul class="ul">
                                <li style="display: inline-block; width: 50px;">Name:</li>
                                <li style="display: inline-block;"><strong>{{ data.fullname }}</strong></li>
                            </ul>
                            <ul class="ul">
                                <li style="display: inline-block; width: 50px;">Age:</li>
                                <li style="display: inline-block;"><strong>{{ formatAge(data.age[0],data.age[1]) }}</strong></li>
                            </ul>
                            <ul class="ul">
                                <li style="display: inline-block; width: 50px;">Gender:</li>
                                <li style="display: inline-block;"><strong>{{ data.gender }}</strong></li>
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
                                <li style="display: inline-block; width: 70px;">Physician:</li>
                                <li style="display: inline-block;"><strong>{{ data.physician }}</strong></li>
                            </ul>
                            <ul class="ul">
                                <li style="display: inline-block; width: 70px;">Date:</li>
                                <li style="display: inline-block;"><strong>{{ DateNow() }}</strong></li>
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
    props: ['data']
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