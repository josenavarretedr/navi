<template>
  <v-col cols="10" md="6" lg="4" max-height="100">
    <v-sheet v-if="!courseInfo.info">
      <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-img :src="courseInfo.info.banner" class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
        <v-card-title>
          {{courseInfo.info.shortName}}
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-2">
        {{courseInfo.info.kindProgram}} <br>
        {{courseInfo.info.fullName}}
        <br>
        Ed. {{courseInfo.info.edition}}
      </v-card-subtitle>

      <v-card-text class="text--primary text-justify">
        <div>
          {{ courseInfo.info.description.slice(0,200) }}...
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if='routeCheck' color="primary" small outlined :to="'/in/'+course">
          Entrar
        </v-btn>
        <v-row v-else class="d-flex justify-end">
          <v-btn color="primary" small @click.stop="dialog = true" class="mr-4">
            Inscríbete
          </v-btn>
          <v-btn color="primary" small outlined :to="'/courses/'+course" class="mr-4">
            Saber más
          </v-btn>
          {{  this.courseInfo.id  }}
        </v-row>
      </v-card-actions>
      <v-img v-if="courseInfo.b2b.check" height="70" :src="courseInfo.b2b.logoURL" contain>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-card>



    <v-dialog v-model="dialog" max-width="80%" v-if="!courseInfo.payInfo.courseFree">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Pagar</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Registrate</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12">
              <v-card-title>
                Realizar pago
              </v-card-title>
              <v-card-text>
                Realiza el pago mediante cualquiera de los medios de pagos que tenemos a tu disposición.
              </v-card-text>
            </v-card>

            <v-btn small color="primary" @click="e1 = 2">
              Continuar
            </v-btn>

            <v-btn text @click="dialog = false">Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12">
              <v-card-title primary-title>
                Registro en el curso
              </v-card-title>
              <v-card-text v-if="!userIsAuthenticated">
                ¡Vaya! Vemos que no has iniciado sesión.
                Por favor <router-link class="link" to="/login" tag="span">inicia sesión</router-link> para
                poder registrarte. <br>
                Si no tienes una cuenta, crea una <router-link class="link" to="/register" tag="span">aquí
                </router-link>. Te estaremos esperando para que completes tu
                registro.
              </v-card-text>
              <div v-else>
                <v-card-text>
                  ¡Muchas gracias por confiar en nosotros para seguir con tu formación! Dale al boton
                  'Registrar' y en un plazo máximo de 12 horas se te habilitará el acceso
                  directamente desde la sección <b>"CURSOS"</b> de tu plataforma.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" small outlined @click="courseRegister">
                    Registrar
                  </v-btn>
                  <v-spacer></v-spacer>
                  <span class="notes" v-if="updateEnd">
                    <v-icon color="success">mdi-check-circle-outline</v-icon>
                    {{updateMessage}}
                  </span>
                  <v-progress-circular v-if="updateLoading" indeterminate color="primary">
                  </v-progress-circular>
                </v-card-actions>
              </div>
            </v-card>

            <v-btn small color="success" @click="e1 = 1">
              Finalizar
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>


    <v-dialog v-model="dialog" max-width="80%" v-else>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Registrate</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>

          <v-stepper-content step="1">
            <v-card class="mb-12">
              <v-card-title primary-title>
                Registro en el curso
              </v-card-title>
              <v-card-text v-if="!userIsAuthenticated">
                ¡Vaya! Vemos que no has iniciado sesión.
                Por favor <router-link class="link" to="/login" tag="span">inicia sesión</router-link> para
                poder registrarte. <br>
                Si no tienes una cuenta, crea una <router-link class="link" to="/register" tag="span">aquí
                </router-link>. Te estaremos esperando para que completes tu
                registro.
              </v-card-text>
              <div v-else>
                <v-card-text>
                  ¡Muchas gracias por confiar en nosotros para seguir con tu formación! Dale al boton
                  'Registrar' y en un plazo máximo de 12 horas se te habilitará el acceso
                  directamente desde la sección <b>"CURSOS"</b> de tu plataforma.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" small outlined @click="courseRegister">
                    Registrar
                  </v-btn>
                  <v-spacer></v-spacer>
                  <span class="notes" v-if="updateEnd">
                    <v-icon color="success">mdi-check-circle-outline</v-icon>
                    {{updateMessage}}
                  </span>
                  <v-progress-circular v-if="updateLoading" indeterminate color="primary">
                  </v-progress-circular>

                </v-card-actions>
              </div>
            </v-card>

            <v-btn small color="success" @click="dialog = false">
              Finalizar
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </v-col>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import {
    db,
    auth
  } from '@/firebaseInit.js'


  export default {
    props: ['course', 'routeCheck'],
    data() {
      return {
        auth: true,
        dialog: false,
        e1: 1,
        updateLoading: false,
        updateEnd: false,
        updateMessage: '',
        userIsAuthenticated: false
      }
    },
    computed: {
      ...mapGetters(['getOneCourse','userID', 'user']),
      courseInfo() {
        let a = this.getOneCourse(this.course)[0]
        return a
      }
    },
    mounted() {
      auth.onAuthStateChanged(userAuth => {
        if (userAuth) {
          return this.userIsAuthenticated = true
        } else {
          return this.userIsAuthenticated = false
        }
      });
    },
    methods: {
      courseRegister() {
        this.updateEnd = false
        this.updateLoading = true

        let b = this.user.coursesRequest

        let courseToRegister = this.courseInfo.id
        let that = this
        if (this.user.courses.includes(courseToRegister) == true) {
          that.updateLoading = false
          that.updateEnd = true
          that.updateMessage = 'Ya estás registrado en este curso.'
        }
        // else if (this.user.coursesRequest.includes(courseToRegister) == true) {
        //   that.updateLoading = false
        //   that.updateEnd = true
        //   that.updateMessage = 'Ya enviaste enviaste una solicitud para este curso'
        // } 
        else {
          let a = {
            courseid: '',
            status: 'revisando',
            kindProgram: that.courseInfo.info.kindProgram,
            courseName: that.courseInfo.info.fullName,
            comment: '',
          }
          a.courseid = courseToRegister

          b.push(a)

          b.forEach(course => {
            console.log(course.courseid)
          });
          db.collection('users').doc(this.userID).update({
            coursesRequest: b
          }).then(function () {
            that.updateLoading = false
            that.updateEnd = true
            that.updateMessage = 'Su solicitud se ha enviado con éxito'
          });
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .borde {
    border: solid 1px red
  }
</style>