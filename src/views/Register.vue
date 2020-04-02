<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col cols="11" sm="8" md="6" lg="4">
        <div v-if="error">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </div>
        <v-card class="px-3 py-4">
          <v-form class="mt-0">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="email" label="Correo electrónico">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="password" label="Contraseña" type="password">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="confirmPassword" label="Confirma contraseña" type="password"
                    :rules="[comparePasswords]">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-btn color="primary" block outlined @click="onSignUp" :loading="loading" :disabled="loading">
                    Registrate
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <p class="small">Si ya tienes una cuenta <router-link to="/login" tag="span" style="cursor: pointer">
                      inicia sesión</router-link>
                  </p>
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

  export default {
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
      }
    },
    methods: {
      ...mapActions(['signUserUp', 'signUserOut', 'clearError']),
      onSignUp() {
        let that = this
        that.signUserUp({
          email: this.email,
          password: this.password
        })
        that.signUserOut()
      },
      onDismissed() {
        this.clearError()
      }
    },
  }
</script>