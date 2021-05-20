<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <ul class="ul">
                    <li class="li-center"><h3>WJE Diagnostic Laboratory</h3></li>
                    <li class="li-center"> Blk 6 lot 34 A Brgy. San Pedro Sapang Palay</li>
                    <li class="li-center">City of San Jose del Monte, Bulacan</li>
                    <li class="li-center">San Pedro Pharmacy and Diagnostic Clinic Bldg. TEL. No. 09328449462</li>
                    <li class="li-center">DOH Lic. No. 03-356-14-CL-2</li>
                </ul>
            </v-col>
        </v-row>
        <v-row class="px-4 pb-2">
                <v-col cols="7" class="py-0">
                    <ul class="ul" style="line-height:1rem;">
                        <li>
                            <ul class="d-inline-flex ul">
                                <li class="li-start">Name:</li>
                                <li>BAARDE, ARIES CABRERA</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="d-inline-flex ul">
                                <li class="li-start">Age:</li>
                                <li >28</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="d-inline-flex ul">
                                <li class="li-start">Gender:</li>
                                <li >MALE</li>
                            </ul>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="5" class="py-0">
                    <ul class="ul" style="line-height:1rem;">
                        <li>
                            <ul class="d-inline-flex ul">
                                <li class="li-start">Physician:</li>
                                <li >DRA. SAN PEDRO</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="d-inline-flex ul">
                                <li class="li-start">Date:</li>
                                <li >JANUARY 01, 2021</li>
                            </ul>
                        </li>
                    </ul>
                </v-col>
            </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'resultHeader'
}
</script>

<style scoped>
.ul{
    list-style: none;
    padding: 0%;
    inline-size: auto;
}
li, h2{
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
</style>