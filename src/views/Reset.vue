<template>
  <v-container id="container" class="d-flex justify-content-center">
    <v-row class="d-flex align-center mt-5">
      <HomeBanner v-if="!checkUser.user"></HomeBanner>
      <Resetbanner v-else></Resetbanner>
      <v-col cols="10" offset="1" sm="8" md="6" offset-sm="2" offset-md="0" class="borde">
        <div v-if="error">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </div>
        <v-card>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="10" offset="1">
                  <p class="headline">{{this.checkUser.text}}</p>
                </v-col>
                <v-col cols="10" offset="1">
                  <v-text-field v-model="email" label="Correo electrónico">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="10" offset="1" class="text-center">
                  <v-btn color="primary" block @click="sendPasswordResetCmp()" :loading="loading" :disabled="loading">
                    resetear contraseña
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
                <v-row v-if="!checkUser.user">
                  <v-col cols="6" offset="1">
                    <p class="body-2">Si ya tienes una cuenta
                    </p>
                  </v-col>
                  <v-col cols="4">
                    <v-btn color="primary" to="/login" small outlined block>Inicia sesión</v-btn>
                  </v-col>
                </v-row>

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
  import Resetbanner from '../components/Share/ResetBanner'
  export default {
    components: {
      HomeBanner,
      Resetbanner
    },
    data() {
      return {
        email: '',
      }
    },
    computed: {
      ...mapGetters(['error', 'loading', 'userID']),
      checkUser() {
        if (this.userID !== null) {
          return {
            user: true,
            text: 'Resetear contraseña'
          }
        } else return {
          user: false,
          text: '¿Olvidaste tu contraseña?'
        }
      }
    },
    methods: {
      ...mapActions(['signUserIn', 'clearError', 'sendPasswordReset']),
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

<style lang="scss" scoped>

#container{
  min-height: calc(100vh - 100px);
}

.link {
  cursor: pointer;
  color: #0D47A1;
  text-decoration: underline;
}

</style>