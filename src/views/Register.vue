<template>
  <v-container id="container" class="d-flex justify-content-center">
    <v-row class="d-flex align-center mt-5">
      <HomeBanner></HomeBanner>
      <v-col cols="10" offset="1" sm="8" md="6" offset-sm="2" offset-md="0">
        <div v-if="error">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </div>
        <v-card>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="10" offset="1">
                  <p class="headline">Formulario de Registro</p>
                </v-col>
                <v-col cols="10" offset="1">
                  <v-text-field v-model="email" label="Correo electrónico">
                  </v-text-field>
                </v-col>
                <v-col cols="10" offset="1">
                  <v-text-field v-model="password" label="Contraseña" type="password">
                  </v-text-field>
                </v-col>
                <v-col cols="10" offset="1">
                  <v-text-field v-model="confirmPassword" label="Confirma contraseña" type="password"
                    :rules="[comparePasswords]">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="10" offset="1" class="text-center">
                  <v-btn color="primary" block @click="onSignUp" :loading="loading" :disabled="loading">
                    Registrate
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
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      ...mapGetters(['error', 'loading']),
      comparePasswords() {
        return this.password !== this.confirmPassword ? 'Contraseñas no coninciden' : true
      },
      checkEmail(){
        return this.email.trim()
      }
    },
    methods: {
      ...mapActions(['signUserUp', 'signUserOut', 'clearError']),
      onSignUp() {
        let that = this
        let a = this.email.trim()
        let b = this.password.trim()
        that.signUserUp({
          email: a,
          password: b
        })
        that.signUserOut()
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