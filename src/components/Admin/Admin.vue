<template>
  <v-container>
    <v-row>
      <v-col cols="10" offset="1">
        <p class="headline">Completa los datos del curso a crear</p>
        <p class="text-justify">A continuación se te pedirá información sobre el curso que se va a crear, toma en cuenta
          que una modificación tendrás que llamar al soporte y a jose no le gusta esto >:V </p>
      </v-col>

      <v-col>
        <v-card class="px-3 py-4">
          <v-form v-model="valid" class="mt-0" ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p class="headline">
                    Información básica
                  </p>
                </v-col>
                <v-col class="d-flex" cols="12" md="3">
                  <v-select :items="kindProgramItems" label="Tipo de Programa" v-model="info.kindProgram"></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="info.fullName" label="Nombre Completo" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field v-model="info.shortName" label="Nombre corto" required>
                  </v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-text-field v-model="info.edition" label="Edición" type="number" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <!-- TODO crear regla para 120 carácteres -->
                  <v-text-field v-model="info.description" label="Descripción" required :rules="descriptionRules"
                    counter>
                  </v-text-field>
                </v-col>

                <!-- TODO hacer que el banner sea una imagen puesta, hacer un select files-->
                <v-col cols="12">
                  <!-- <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="info.banner" label="Link del banner" required>
                      </v-text-field>
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <v-col cols="9" class="m0">
                      <v-file-input v-model="file" chips id="myFile" label="Seleccionar archivos"></v-file-input>
                    </v-col>
                    <v-col cols="3" class="d-flex justify-center align-center">
                      <v-btn :disabled="file.length == 0" color="success" @click="upload" accept="image/*">cargar banner
                      </v-btn>
                    </v-col>
                    <v-col class="m0 p0">
                      <p class="caption">NOTA: Si ya has cargado una imagen, el boton "ENVIAR" lo reemplazará el que
                        has selecionado.
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <v-progress-linear v-model="progressUpload" background-color="none" color="primary"
                        v-if="!uploadEnd">
                      </v-progress-linear>
                    </v-col>
                    <v-col v-if="downloadURL.length !== 0" class="d-flex justify-center align-center">
                      <v-img height="250" :src="downloadURL" contain>
                        <v-btn icon x-large color="red" @click="deleteFile">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-img>

                    </v-col>

                  </v-row>
                </v-col>




                <!-- <v-col cols="6">
                  <v-text-field v-model="info.link" label="Link para más info" required>
                  </v-text-field>
                </v-col> -->

                <v-col cols="12">
                  <p class="subtitle-1">Sobre los participantes</p>


                  <v-row>
                    <v-col cols="12" sm="10">
                      <v-text-field label="Agrega un item al listado" v-model="participantsDescription"></v-text-field>
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-btn small color="success" @click="addParticipantsDescription">
                        <v-icon>mdi-circle-edit-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <p style="font-size: .8rem; font-style: italic">Descripciones de los participantes</p>
                  <ul>
                    <li style="list-style: none" v-for="(item,index) in info.participantsDescriptionArray" :key="index">
                      <v-btn x-small icon color="red" @click="deleteParticipantDescription(index)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn> {{ item }}
                    </li>
                  </ul>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <p class="headline">
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

              <v-row>
                <v-col cols="12">
                  <p class="headline">Información académica</p>
                </v-col>

                <v-col>
                  <v-select :items="teachers" multiple chips label="Profesores a cargo" v-model="academicInfo.teachers">
                  </v-select>
                </v-col>

                <v-col cols="12">
                  <p class="subtitle-1">Sobre la certificación</p>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field label="Certificación" required v-model="academicInfo.certificade.name">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-text-field label="# horas" required v-model="academicInfo.certificade.hours"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field label="Emite" required v-model="academicInfo.certificade.from"></v-text-field>
                    </v-col>
                    <!-- <v-col class="d-flex justify-center align-center">
                      <v-btn small color="success" @click="addModule">
                        <v-icon>mdi-circle-edit-outline</v-icon>
                      </v-btn>
                    </v-col> -->
                  </v-row>
                </v-col>

                <!-- Configuración de los módulos -->
                <v-col cols="12">
                  <p class="subtitle-1">Sobre los módulos</p>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field label="Nombre del módulos" v-model="moduleToAdd.name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Descripción del módulo" v-model="moduleToAdd.description"></v-text-field>
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-btn small color="success" @click="addModule">
                        <v-icon>mdi-circle-edit-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <p style="font-size: .8rem; font-style: italic">
                    Módulos agregados:
                  </p>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">#</th>
                          <th class="text-left">Módulos</th>
                          <th class="text-left">Descripción</th>
                          <th class="text-right">Eliminar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(module,index) in academicInfo.modules" :key="index">
                          <td>{{index+1}}</td>
                          <td>{{ module.name }}</td>
                          <td>{{ module.description }}</td>
                          <td class="text-right">
                            <v-btn icon color="deep-orange" @click="deleteModule(index)">
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>

              </v-row>

              <!-- <v-row>
                <v-col cols="12">
                  <p class="headline">Programa personalizado</p>
                  <v-switch label="Es un programa para terceros (empresa)" v-model="b2b.check"></v-switch>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Nombre dela empresa" required v-model="b2b.name">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <p class="subtitle-1">Persona de contacto</p>
                </v-col>
                <v-col cols="5">
                  <v-text-field label="Nombre y Apellidos completos" v-model="b2b.contact.name"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Correo electrónico" v-model="b2b.contact.email"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="Número de teléfono" v-model="b2b.contact.phone"></v-text-field>
                </v-col>

                <v-row>
                  <v-col cols="9" class="m0">
                    <v-file-input v-model="file" chips id="myFile" label="Seleccionar archivos"></v-file-input>
                  </v-col>
                  <v-col cols="3" class="d-flex justify-center align-center">
                    <v-btn :disabled="file.length == 0" color="success" @click="upload" accept="image/*">cargar banner
                    </v-btn>
                  </v-col>
                  <v-col class="m0 p0">
                    <p class="caption">NOTA: Si ya has cargado una imagen, el boton "ENVIAR" lo reemplazará el que
                      has selecionado.
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <v-progress-linear v-model="progressUpload" background-color="none" color="primary"
                      v-if="!uploadEnd">
                    </v-progress-linear>
                  </v-col>
                  <v-col v-if="downloadURL.length !== 0" class="d-flex justify-center align-center">
                    <v-img height="250" :src="downloadURL" contain>
                      <v-btn icon x-large color="red" @click="deleteFile">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-img>
                  </v-col>
                </v-row>
              </v-row> -->

              <v-row class="mt-10">
                <v-col cols="12">
                  <p class="headline">
                    Información de pago
                  </p>
                  <v-switch v-model="payInfo.courseFree" label="Es un curso gratis"></v-switch>
                </v-col>

                <v-row>
                  <v-col class="d-flex justify-center align-center">
                    <p>Precio sin beca</p>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="!payInfo.courseFree" v-model="payInfo.cost.pe" label="Precio 🇵🇪 (S/)">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="!payInfo.courseFree" v-model="payInfo.cost.ec" label="Precio 🇪🇨 ($)">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="!payInfo.courseFree" v-model="payInfo.cost.rest"
                      label="Otros países 🗺️ ($)"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="d-flex justify-center align-center">
                    <p>Precio <b>CON</b> beca</p>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="!payInfo.courseFree" v-model="payInfo.scholarship.pe"
                      label="Precio 🇵🇪 (S/)"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="!payInfo.courseFree" v-model="payInfo.scholarship.ec"
                      label="Precio 🇪🇨 ($)"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field :disabled="!payInfo.courseFree" v-model="payInfo.scholarship.rest"
                      label="Otros países 🗺️ ($)"></v-text-field>
                  </v-col>
                </v-row>
              </v-row>

              <v-row class="d-flex mt-10">
                <v-col cols="12">
                  <v-btn color="primary" block @click="saveCourse" :loading="loading" :disabled="loading">
                    crear nuevo curso
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
    db,
    storage
  } from '@/firebaseInit.js'
  export default {
    data() {
      return {
        // START setup to banner update
        file: [],
        downloadURL: '',
        fileName: '',
        filePath: '',
        uploadTask: '',
        progressUpload: 0,
        uploading: false,
        uploadEnd: false,

        // SETUP to banner updates


        // END setup to banner update
        descriptionRules: [v => v.length <= 120 || 'Máximo 200 caracteres'],
        valid: false,
        menu: false,
        kindProgramItems: ['Curso', 'Seminario', 'Programa de Especialización', 'Programa de Dirección',
          'Programa de Alta Especialización'
        ],
        frequencyItems: ['semanal', 'quincenal'],
        teachers: ['a', 'b', 'c'],
        moduleToAdd: [{
          name: '',
          description: ''
        }],
        info: {
          kindProgram: '',
          fullName: '',
          shortName: '',
          edition: '',
          description: '',
          banner: '',
          participantsDescriptionArray: []
        },
        config: {
          frequency: '',
          numSessions: 0,
          dateStart: new Date().toISOString().substr(0, 10)
        },
        academicInfo: {
          teachers: [],
          certificade: {
            name: '',
            hours: '',
            from: '',
          },
          modules: []
        },
        payInfo: {
          courseFree: true,
          cost: {
            pe: '',
            ec: '',
            rest: ''
          },
          scholarship: {
            pe: '',
            ec: '',
            rest: ''
          }
        },
        b2b: {
          check: false,
          name: '',
          logoURL: '',
          contact: {
            name: '',
            email: '',
            phone: '',
          }
        },
        loading: false,
        participantsDescription: '',
      }
    },
    computed: {
      idCourse() {
        var normalize = (function () {
          var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping = {};

          for (var i = 0, j = from.length; i < j; i++)
            mapping[from.charAt(i)] = to.charAt(i);

          return function (str) {
            var ret = [];
            for (var i = 0, j = str.length; i < j; i++) {
              var c = str.charAt(i);
              // eslint-disable-next-line no-prototype-builtins
              if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
              else
                ret.push(c);
            }
            return ret.join('').replace(/[^-A-Za-z0-9]+/g, '-').toLowerCase();
          }

        })();
        // return this.info.shortName.toLowerCase().replace(' ', '-') + '-' + this.info.edition
        let a = this.info.shortName + ' ' + this.info.edition
        return normalize(a)
      },
      // bannerName(){
      //   let indice = this.file.name.indexOf('.')
      //   return 'banner'+this.file.name.substring(indice)
      // }
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
          config: this.config,
          academicInfo: this.academicInfo,
          payInfo: this.payInfo
        }
        db.collection('courses').doc(this.idCourse).set(data)
        // Reseteando todo el formulario
        this.$refs.form.reset()

        this.loading = false
      },
      addModule() {
        let a = {
          name: '',
          description: ''
        }
        a.name = this.moduleToAdd.name
        a.description = this.moduleToAdd.description
        this.academicInfo.modules.push(a)
        this.moduleToAdd.name = '',
          this.moduleToAdd.description = ''
      },
      deleteModule(index) {
        this.academicInfo.modules.splice(index, 1)
      },
      addParticipantsDescription() {
        let a = ''
        a = this.participantsDescription
        this.info.participantsDescriptionArray.push(a)
        this.participantsDescription = ''
      },
      deleteParticipantDescription(index) {
        this.info.participantsDescriptionArray.splice(index, 1)
      },
      upload() {
        this.fileName = this.file.name
        this.uploadTask = storage.ref(`course/${this.idCourse}/${this.fileName}`).put(this.file)
        this.uploading = true
        this.uploadEnd = false
      },
      deleteFile() {
        storage.ref(`course/${this.idCourse}/${this.fileName}`).delete()
        this.downloadURL = ''
      }
    },
    watch: {
      uploadTask: function () {
        this.uploadTask.on('state_changed', sp => {
            this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
          },
          null,
          () => {
            this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.file = []
              this.uploadEnd = true
              this.downloadURL = downloadURL
            })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .borde {
    border: solid 1px red;
  }
</style>