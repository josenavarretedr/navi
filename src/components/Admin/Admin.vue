<template>
  <v-container>
    <v-row style="border: 1px red solid">
      <v-col cols="10" offset="1">
        <p class="headline">Completa los datos del curso a crear</p>
        <p class="text-justify">A continuación se te pedirá información sobre el curso que se va a crear, toma en cuenta
          que una modificación tendrás que llamar al soporte y a jose no le gusta esto >:V </p>
      </v-col>
      
      <v-col cols="10" offset="1">
        <v-card class="px-3 py-4">
          <v-form v-model="valid" class="mt-0" ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p class="subtitle-2">
                    Información básica
                  </p>
                </v-col>
                <v-col class="d-flex" cols="12" md="4">
                  <v-select :items="kindProgramItems" label="Tipo de Programa" v-model="info.kindProgram"></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="info.fullName" label="Nombre Completo" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field v-model="info.shortName" label="Nombre corto" required>
                  </v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-text-field v-model="info.edition" label="Edición" type="number" required>
                  </v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="info.banner" label="Link del banner" required>
                  </v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="info.link" label="Link para más info" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <!-- TODO crear regla para 120 carácteres -->
                  <v-text-field v-model="info.description" label="Descripción" required counter>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <p class="subtitle-2">
                    Información de configuración
                  </p>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                  <v-select :items="frequencyItems" label="Frecuencia" v-model="config.frequency"></v-select>
                </v-col>

                <v-col>

                  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                    offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="config.dateStart" label="Fecha de inicio" prepend-icon="mdi-calendar-clock"
                        readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="config.dateStart" @input="menu= false" locale="es-es"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field type="number" v-model="config.numSessions" label="# de sesiones" required>
                  </v-text-field>
                </v-col>


              </v-row>

              <v-row class="d-flex">
                <v-col cols="12">
                  <v-btn color="primary" @click="saveCourse" :loading="loading" :disabled="loading">
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
  </v-container>
</template>

<script>
  import {
    db
  } from '@/firebaseInit.js'
  export default {
    data() {
      return {
        valid: false,
        menu: false,
        kindProgramItems: ['Curso','Seminarios','Programas de Especialización','Programas de Dirección','Programas de Alta Especialización'],
        frequencyItems: ['semanal', 'quincenal'],
        info: {
          kindProgram: '',
          fullName: '',
          shortName: '',
          edition: '',
          description: '',
          link: 'https://',
          banner: '',
        },
        config: {
          frequency: '',
          numSessions: 0,
          dateStart: new Date().toISOString().substr(0, 10),
        },
        loading: false,
      }
    },
    computed: {
      idCourse() {
        return this.info.shortName.toUpperCase().replace(' ','-')+ '-' + this.info.edition
      }
    },
    methods: {
      save(date) {
        this.$refs.menu.save(date)
      },
      saveCourse() {
        this.loading = true
        let data = {
          id: this.idCourse,
          info: this.info,
          config: this.config
        }
        db.collection('courses').doc(this.idCourse).set(data)
        // Reseteando todo el formulario

        this.$refs.form.reset()

        this.loading = false
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>