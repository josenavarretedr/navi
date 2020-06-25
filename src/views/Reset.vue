<template>
  <v-container id="container" class="d-flex justify-content-center">
    <v-row class="d-flex align-center mt-5">
      <HomeBanner></HomeBanner>
      <v-col cols="10" offset="1" sm="8" md="6" offset-sm="2" offset-md="0" class="borde">
        <div v-if="error">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </div>
        <v-card>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="10" offset="1">
                  <p class="headline">¿Olvidades tu contraseña?</p>
                </v-col>
                <v-col cols="10" offset="1" >
                  <v-text-field v-model="email" label="Correo electrónico">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="10" offset="1"  class="text-center">
                  <v-btn color="primary" block  @click="sendPasswordResetCmp()" :loading="loading" :disabled="loading">
                    resetear contraseña
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
                <v-col cols="6" offset="1">
                  <p class="body-2">Si ya tienes una cuenta
                  </p>
                </v-col>
                <v-col cols="4">
                  <v-btn color="primary" to="/login" small outlined block>Inicia sesión</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'

  import HomeBanner from '../components/Share/HomeBanner'
  export default {
    components: {
      HomeBanner
    },
    data() {
      return {
        email: '',
      }
    },
    computed: {
      ...mapGetters(['error', 'loading','userID']),
    },
    methods: {
      ...mapActions(['signUserIn', 'clearError','sendPasswordReset']),
      sendPasswordResetCmp() {
        let a = this.email.trim()
        this.sendPasswordReset({
          email: a,
        })
        this.email = ''
      },
      onDismissed() {
        this.clearError()
      }
    },
    
  }
</script>