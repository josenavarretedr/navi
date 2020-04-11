<template>
  <div>
    <v-container>
      <v-row class="p0 m0">
        <v-col id="homeBanner">
          <v-img :src="course.info.banner" height="100%"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <template>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <p class="white--text display-1 text-center">
                  <span id="kindProgram">{{course.info.kindProgram}}</span> <br>
                  <span id="namePrograma">{{course.info.fullName}}</span>
                </p>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="(item) in btns" :key="item.name">
          <v-btn block outlined color="primary" @click="$vuetify.goTo(item.to, options)"> {{item.name}}
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="py-0 my-4">
        <v-col cols="12" md="10" offset-md="1">
          <v-row>
            <v-col cols="12" class="p-0 m-0">
              <p style="padding: 0; margin-bottom: .5rem;" class="font-weight-light title">Resumen</p>
            </v-col>
            <v-col class="text-center">
              <p class="subtitle-1 ma-0">Inicio</p>
              <span class="font-weight-light">{{course.config.dateStart}} 🚀 </span>
            </v-col>
            <v-col class="text-center">
              <p class="subtitle-1 ma-0">Frecuencia</p>
              <span class="font-weight-light">{{course.config.frequency.toUpperCase()}} ⌛</span>
            </v-col>

            <v-col class="text-center">
              <p class="subtitle-1 ma-0">Dedicación</p>
              <span class="font-weight-light">1hr semanal 🗓️</span>
            </v-col>
            <!-- <v-col cols="6" md="3" class="text-center">
              <p class="subtitle-1 ma-0">Brouchure</p>
              <span class="font-weight-light">Descargar 🗎</span>
            </v-col> -->
            <v-col cols="12" class="d-flex align-center justify-center">
              <v-btn color="primary" block @click.stop="dialog = true">
                Inscríbete
              </v-btn>
              <v-dialog v-model="dialog" max-width="80%" v-if="course.payInfo.courseFree">
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
                          Por favor <router-link class="link" to="/login" tag="span">inicia sesión</router-link> para poder registrarte. <br>
                          Si no tienes una cuenta, crea una <router-link class="link" to="/register" tag="span">aquí</router-link>. Te estaremos esperando para que completes tu
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
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="headline" id="presentacion">Participantes</p>
          <v-row>
            <v-col cols="3" offset-sm="1" offset-md="2" class="d-flex align-center justify-center">
              <v-icon style="font-size: 4rem;">mdi-account-circle-outline</v-icon>
            </v-col>
            <v-col cols="9" sm="7" md="5">
              <ul class="text-justify font-weight-light">
                <li v-for="item in course.info.participantsDescriptionArray" :key="item.id">
                  {{item}}
                </li>
              </ul>
            </v-col>
          </v-row>

        </v-col>

        <v-col cols="12">
          <p class="headline">Beneficios</p>
          <v-row>
            <v-col cols="10" offset="1" offset-md="3" md="7" class="font-weight-light">
              <p>
                <v-icon class="mr-4">mdi-check-circle-outline</v-icon> <b>Metodología Simple</b>, de fácil
                comprensión y fácil seguimiento.
              </p>
              <p>
                <v-icon class="mr-4">mdi-laptop</v-icon> El programa de desarrolla de manera 100% virtual
              </p>
              <p>
                <v-icon class="mr-4">mdi-timer-off</v-icon> Tu ritmo, tus horarios
              </p>
              <p>
                <v-icon class="mr-4">mdi-chat-processing-outline</v-icon> Coach y tutores en todo momento
              </p>
              <p>
                <v-icon class="mr-4">mdi-responsive</v-icon> Accede desde tu celular, tablet o computadora.
              </p>
            </v-col>
          </v-row>

        </v-col>

        <v-col cols="12">
          <p class="headline" id="contenido">Contenido</p>
          <v-row>
            <v-col cols="12" md="8" offset-md="2">
              <v-expansion-panels>
                <v-expansion-panel v-for="(item,index) in course.academicInfo.modules" :key="index">
                  <v-expansion-panel-header>Módulo {{index+1}}: {{item.name}}</v-expansion-panel-header>
                  <v-expansion-panel-content class="font-weight-light">
                    {{item.description}}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-col>


        <v-col cols="12">
          <p class="headline" id="certificado">Certificación</p>
          <v-row>

            <v-col cols="9" sm="7" md="5" offset-sm="1" offset-md="2" class=" text-right">
              <p class="font-weight-light">
                De concluir con éxito se emitirá un diploma en: <br> <b>{{course.academicInfo.certificade.name}}*</b>
                <br>
                <span class="notes">*Además de hacer constar las {{course.academicInfo.certificade.hours}} hrs
                  académicas.</span>
              </p>
            </v-col>
            <v-col cols="3" class="d-flex">
              <v-icon style="font-size: 4rem;">mdi-certificate-outline</v-icon>
            </v-col>
          </v-row>

        </v-col>
        {{course.payInfo.courseFree}}
        <v-col cols="12">
          <p class="headline" id="inversion">Inversion</p>
          <v-row v-if="course.payInfo.courseFree">

            <v-col cols="3" offset-sm="1" offset-md="2" class="text-right ">
              <v-icon style="font-size: 4rem;">mdi-cash-remove</v-icon>
            </v-col>

            <v-col cols="9" sm="7" md="5"  class=" d-flex align-center">
              <p class="font-weight-light">
                ¡No tiene costo!
              </p>
            </v-col>
          </v-row>
          
          <v-row v-else>
            <!-- <v-col cols="6">
                  <p class="text-center">Certificación 
                    <v-icon>mdi-certificate-outline</v-icon>
                  </p>
                  <p class="font-weight-light text-justify">
                    De concluir con éxito se emitirá un diploma en: <br> <b>Programa de Gestión Pública*</b> <br>
                    <span class="notes">*Además de hacer constar las 120 hrs académicas.</span>
                  </p>
                </v-col> -->
            <v-col cols="12" class="mb-4">
              <p class="text-center">Precio
                <v-icon>mdi-cash-usd-outline</v-icon>
              </p>
              <p style="font-size: 2rem" class="font-weight-light text-center">
                S/{{course.payInfo.cost.pe}}
                <span style="font-size: 1rem">o</span> ${{course.payInfo.cost.rest}}
              </p>
            </v-col>

            <v-col cols="12" sm="4">
              <p class="text-center title">Beca Rinsa
              </p>
              <p class="font-weight-light text-justify">
                Para la instituciones con Convenio vigentes y asociaciones culturales o sin fines de lucro, tenemos
                a disposición la <b>Beca Rinsa</b>
              </p>
            </v-col>

            <v-col cols="6">
              <p class="text-center">Perú 🇵🇪
              </p>
              <p style="font-size: 2rem" class="font-weight-light text-center">
                S/{{course.payInfo.scholarship.pe}} <span style="font-size: 1rem">**</span>
              </p>
            </v-col>

            <v-col cols="6">
              <p class="text-center">Ecuador 🇪🇨
              </p>
              <p style="font-size: 2rem" class="font-weight-light text-center">
                ${{course.payInfo.scholarship.ec}} <span style="font-size: 1rem">**</span>
              </p>
            </v-col>

            <v-col cols="12">
              <p class="text-center">Otros países 🗺️
              </p>
              <p style="font-size: 2rem" class="font-weight-light text-center">
                ${{course.payInfo.scholarship.rest}} <span style="font-size: 1rem">**</span>
              </p>
            </v-col>

            <v-col cols="4">
              <p class="notes font-weight-light">** Único pago. Incluye diploma al concluir el 100% de las sesiones
                programas. Precio exclusivo con convenio con el Grupo Rinsa.
              </p>
            </v-col>


            <v-col cols="12">
              <v-col cols="6">
                <p class="text-center title">Medios de pago
                </p>
                <p class="font-weight-light text-justify">
                  Todas nuestras operaciones financieras son con las cuentas oficionales de la empresa y mediante
                  canales seguros.
                </p>
              </v-col>
            </v-col>

            <v-col cols="12" md="6">
              <p class="text-center">Perú 🇵🇪
              </p>
              <p class="font-weight-light text-center">
                Banco Interbank <br>
                Cuenta Ahorros: 700 3114 5953 08 <br>
                CCI: 003 700 013114 5953 0822 <br>
                <span class="notes">A nombre de Rinsa Corporation S.A.</span>
              </p>
            </v-col>

            <!-- <v-col cols="6" md="4" class="text-center">
              <p>Perú 🇵🇪
              </p>
              <p class="font-weight-light">
                Visa o Mastercard <v-icon>mdi-credit-card</v-icon> <br>
                <v-btn color="success" small>
                  Hacer pago <v-icon>mdi-redirect</v-icon>
                </v-btn>
              </p>
              <span class="font-weight-light notes">Para utilizar este medio de pago, te redigiremos a la plataforma
                segura de Visa.</span>
            </v-col> -->

            <v-col cols="12" md="6" class="text-center">
              <p>Otros países 🗺️
              </p>
              <p class="font-weight-light">
                Paypal o Western Union<v-icon></v-icon> <br>
                <v-btn icon color="success">
                  <v-icon>mdi-whatsapp</v-icon>
                </v-btn>
              </p>
              <span class="font-weight-light notes">Solicita tu codigo para usar este medio.</span>
            </v-col>


          </v-row>
        </v-col>
        <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right color="success" >
          <v-icon target="_blank" src="https://wa.me/51978042801">mdi-whatsapp</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import {
    db, auth
  } from '@/firebaseInit.js'

  export default {
    data() {
      return {
        fab: false,
        auth: true,
        dialog: false,
        e1: 1,
        btns: [{
            name: 'presentacion',
            to: '#presentacion'
          },
          {
            name: 'contenido',
            to: '#contenido'
          },
          {
            name: 'inversion',
            to: '#inversion'
          },
          {
            name: 'certificado',
            to: '#certificado'
          }
        ],
        updateLoading: false,
        updateEnd: false,
        updateMessage: '',
        userIsAuthenticated: false
      }
    },
    computed: {
      ...mapGetters(['getOneCourse', 'userID', 'user']),
      course() {
        let a = this.getOneCourse(this.$route.params.id)[0]
        return a
      },
      options() {
        return {
          durations: 300,
          offset: 20,
        }
      },
      userCheck() {
        if (this.userID == null) {
          return false
        } else {
          return true
        }
      },
      linkToWsp(){
        let a= {
          fullName: this.course.info.fullName.split(' ').join('%20'),
          kindProgram: this.course.info.kindProgram.split(' ').join('%20')
        }
        return a
        
      }
    },
    methods: {
      onScroll(e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset || e.target.scrollTop || 0
        this.fab = top > 20
      },
      toTop() {
        this.$vuetify.goTo(0)
      },
      courseRegister() {
        this.updateEnd = false
        this.updateLoading = true

        let b = this.user.coursesRequest

        let courseToRegister = this.$route.params.id
        let that = this
        if (this.user.courses.includes(courseToRegister) == true) {
          that.updateLoading = false
          that.updateEnd = true
          that.updateMessage = 'Ya estás registrado en este curso.'
        } else {
          let a = {
            courseid: '',
            status: 'revisando',
            kindProgram: that.course.info.kindProgram,
            courseName: that.course.info.fullName,
            comment: '',
          }
          a.courseid = courseToRegister

          b.push(a)
          
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
    mounted () {
      auth.onAuthStateChanged(userAuth => {
        if (userAuth) {
          return this.userIsAuthenticated = true
        } else {
          return this.userIsAuthenticated = false
        }
      });
    },
  }
</script>

<style lang="scss" scoped>
  #homeBanner {
    height: 70vh;
  }

  #kindProgram {
    font-size: 1.2rem;
  }

  .resumenItems {
    padding: 0;
  }

  .resumenItems p {
    margin: 0;
    ;
  }

  .borde{
    border: solid 1px red;
  }


  .link {
    cursor: pointer;
    color: #0D47A1;
    text-decoration: underline;
  }

  .notes {
    font-size: .8rem;
    font-style: italic;
  }
</style>