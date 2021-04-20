<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm8 offset-sm2 align-center justify-center>
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Sign In</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                    <form>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                label="Email"
                                name="emailid" outlined dense required>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                label="Password"
                                name="password" outlined dense required>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row xs12>
                            <v-flex>
                                <v-btn text block color="primary"
                                @click.prevent="validateBeforeSubmit">
                                Sign In
                                </v-btn>
                            </v-flex>
                            <v-flex>
                                <v-btn text block
                                @click.prevent="clear">
                                Clear
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </form>
                    </v-container>
                </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Home',
    beforeCreate: function(){
        if(!this.$session.exists()){
            this.$router.push('/login');
        }
    }
    
}
</script>

<style scoped>

</style>