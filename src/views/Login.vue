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
              </v-row>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-btn color="primary" block outlined @click="signUserInCmp" :loading="loading" :disabled="loading">
                    Iniciar sesión
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <p class="small">Si no tienes cuenta por favor registrate <router-link to="/register" tag="span"
                      style="cursor: pointer">aquí</router-link>
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
        password: ''
      }
    },
    computed: {
      ...mapGetters(['error', 'loading','userID']),
    },
    methods: {
      ...mapActions(['signUserIn', 'clearError']),
      signUserInCmp() {
        this.signUserIn({
          email: this.email,
          password: this.password
        })
      },
      onDismissed() {
        this.clearError()
      }
    }
  }
</script>