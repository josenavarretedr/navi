<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10" md="8">
        <p class="headline">Completa tu perfil</p>
        <p class="text-justify">Completa la información de tu perfil, de esta forma podremos tener tus datos
          actualizados
          para emisión de diplomas o para contactarte.</p>
      </v-col>
      <v-col cols="10" md="8">
        <v-card class="px-3 py-4">
          <v-form v-model="valid" class="mt-0">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p class="subtitle-2">
                    Información básica
                  </p>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.profile.name" :rules="nameRules" label="Nombres" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="user.profile.lastName" :rules="nameRules" label="Apellidos" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="user.profile.dni" :rules="nameRules" label="DNI" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                    offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="user.profile.birthDate" label="Fecha de nacimiento"
                        prepend-icon="mdi-cake-variant" readonly v-on="on">
                      </v-text-field>
                    </template>
                    <v-date-picker ref="picker" v-model="user.profile.birthDate"
                      :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" @change="save" locale="es-es">

                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <p class="subtitle-2">
                    Información de contacto
                  </p>
                </v-col>

                <v-col cols="12">
                  <v-text-field disabled v-model="user.profile.email" :rules="emailRules" label="Correo electrónico"
                    required></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" sm="8">
                      <v-text-field v-model="user.profile.cellphone" label="Celular" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-switch v-model="user.profile.wsp" label="¿Whatsapp?"></v-switch>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="user.profile.adress" label="Dirección" required>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row class="d-flex">
                <v-col cols="12">
                  <v-btn color="primary" @click="saveProfile" :loading="loading" :disabled="loading">
                    Guardar
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="2000" color="success">
      {{ textSnackbar }}
      <v-btn text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn to="/reset" absolute fab fixed bottom right color="primary" dark v-bind="attrs" v-on="on" id="btnFlotante">
          <v-icon>mdi-alert-decagram-outline</v-icon>
        </v-btn>
      </template>
      <span>Resetear contraseña</span>
    </v-tooltip>
  </v-container>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    data: () => ({
      valid: false,
      nameRules: [
        v => !!v || 'Es necesario este dato',
      ],
      emailRules: [
        v => !!v || 'Es necesario este dato',
        v => /.+@.+/.test(v) || 'Debe de ser un correo válido',
      ],
      menu: false,
      // Config del snackbar
      snackbar: false,
      textSnackbar: 'Se ha actualizado correctamente los datos',
    }),
    watch: {
      menu(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      endVar(val) {
        if (val == true) {
          this.snackbar = true
        } else {
          this.snackbar = false
        }
      }
    },
    computed: {
      ...mapGetters(['user', 'loading', 'endVar']),
    },
    methods: {
      ...mapActions(['updateProfile']),
      save(date) {
        this.$refs.menu.save(date)
      },
      saveProfile() {
        let profile = this.user.profile
        this.updateProfile({
          name: profile.name,
          lastName: profile.lastName,
          dni: profile.dni,
          birthDate: profile.birthDate,
          email: profile.email,
          cellphone: profile.cellphone,
          wsp: profile.wsp,
          adress: profile.adress,
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  #btnFlotante {
    border: solid 1px red;
    bottom: 60px;
    right: 20px
  }
</style>