<template>
  <div>
    <v-container>
      <v-row class="p0 m0">
        <v-col id="homeBanner">
          <v-img src="https://reloadvisor.org/wp-content/uploads/2019/10/Canada-ReloAdvisor.org_.jpg" height="100%"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <template>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <p class="white--text display-1 text-center">Programa <br> {{$route.params.id}} </p>
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
            <v-col cols="6" md="3" class="text-center">
              <p class="subtitle-1 ma-0">Inicio</p>
              <span class="font-weight-light">XXXXXXXXX 🚀 </span>
            </v-col>
            <v-col cols="6" md="3" class="text-center">
              <p class="subtitle-1 ma-0">Duración</p>
              <span class="font-weight-light">xxxxxx ⌛</span>
            </v-col>

            <v-col cols="6" md="3" class="text-center">
              <p class="subtitle-1 ma-0">Dedicación</p>
              <span class="font-weight-light">1hr semanal 🗓️</span>
            </v-col>
            <v-col cols="6" md="3" class="text-center">
              <p class="subtitle-1 ma-0">Brouchure</p>
              <span class="font-weight-light">Descargar 🗎</span>
            </v-col>
            <v-col cols="12" class="d-flex align-center justify-center">
              <v-btn color="primary" block @click.stop="dialog = true">
                Inscríbete
              </v-btn>
              <v-dialog v-model="dialog" max-width="80%">
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
                        <v-card-text v-if="auth">
                          ¡Vaya! Vemos que no tienes una cuenta en nuestra plataforma. Por favor, crea una cuenta <a
                            href="#!">aquí</a> y regresa cuando tengas una, te estaremos esperando para que completes tu
                          registro.
                        </v-card-text>
                        <div  v-else>
                          <v-card-text>
                          ¡Muchas gracias por confiar en nosotros para seguir con tu formación! Dale al boton
                          'Registrar' y en un plazo máximo de 12 horas validaremos tu pago se te habilitará el acceso
                          directamente desde la sección <b>"CURSOS"</b> de tu plataforma.
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" text>
                            Registrar
                          </v-btn>
                          <span class="notes">
                            <v-icon>mdi-check-circle-outline</v-icon>
                            Su registro se ha realizado con éxito
                          </span>
                        </v-card-actions>
                        </div>
                      </v-card>

                      <v-btn small color="success" @click="e1 = 3">
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
                <li>
                  Especialmente diseñado para comprender y proponer soluciones en la gestión pública bajo un enfoque
                  de resultados.
                </li>
                <li>
                  Dirigido a directivos, gerentes y líderes con equipos en gestión pública o interesados en
                  desarrollarla y público en general
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
                <v-expansion-panel v-for="(item,index) in contents" :key="index">
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
                De concluir con éxito se emitirá un diploma en: <br> <b>Programa de Gestión Pública*</b> <br>
                <span class="notes">*Además de hacer constar las 120 hrs académicas.</span>
              </p>
            </v-col>
            <v-col cols="3" class="d-flex">
              <v-icon style="font-size: 4rem;">mdi-certificate-outline</v-icon>
            </v-col>
          </v-row>

        </v-col>

        <v-col cols="12">
          <p class="headline" id="inversion">Inversion</p>
          <v-row>
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
                S/3,000 <span style="font-size: 1rem">o</span> $850
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

            <v-col cols="4" sm="3">
              <p class="text-center">Perú 🇵🇪
              </p>
              <p style="font-size: 2rem" class="font-weight-light text-center">
                S/100 <span style="font-size: 1rem">**</span>
              </p>
            </v-col>

            <v-col cols="4" sm="2">
              <p class="text-center">Ecuador 🇪🇨
              </p>
              <p style="font-size: 2rem" class="font-weight-light text-center">
                $250 <span style="font-size: 1rem">**</span>
              </p>
            </v-col>

            <v-col cols="4" sm="3">
              <p class="text-center">Otros países 🗺️
              </p>
              <p style="font-size: 2rem" class="font-weight-light text-center">
                $550 <span style="font-size: 1rem">**</span>
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

            <v-col cols="12" md="4">
              <p class="text-center">Perú 🇵🇪
              </p>
              <p class="font-weight-light text-justify">
                Banco Interbank <br>
                Cuenta Ahorros: 700 3114 5953 08 <br>
                CCI: 003 700 013114 5953 0822 <br>
                <span class="notes">A nombre de Rinsa Corporation S.A.</span>
              </p>
            </v-col>

            <v-col cols="6" md="4" class="text-center">
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
            </v-col>

            <v-col cols="6" md="4" class="text-center">
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
        <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right color="success" @click="toTop">
          <v-icon>mdi-whatsapp</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
        return {
          fab: false,
          auth: true,
          dialog: false,
          e1: 1,
          prueba: ['a', 'b', 'c'],
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
          contents: [{
              name: 'Estado, Gobierno y Nación',
              description: 'Durante el primer módulo los participantes revisarán conceptos básicos sobre la organización del Estado, el Gobierno y la Nación y revisarán los documentos básicos que lo regulan.'
            },
            {
              name: 'Ética en la Función Pública',
              description: 'En el segundo módulo, se revisará aspectos éticos con casos prácticos que motivarán al análisis de cada participante. Asimismo, se revisarán fuentes oficiales de la materia.'
            },
            {
              name: 'Planeamiento Estratégico',
              description: 'Los participantes revisarán además las Directivas de Planeamiento Estratégico del Estado Peruano y obtendrán las herramientas para elaborar Planes Estratégicos y de Desarrollo.'
            },
            {
              name: 'Habilidades Directivas ',
              description: 'En el cuarto módulo los participantes recibirán herramientas para la gestión de personas y liderazgo.'
            },
            {
              name: 'Gobierno Electrónico',
              description: 'Los participantes además conocerán las últimas tendencias del gobierno electrónico como herramienta para la gestión de un gobierno transparente.'
            },
            {
              name: 'Comunicación Estratégica',
              description: 'Finalmente, los participantes accederán a un módulo especial de comunicación estratégica aplicada a la gestión pública.'
            }
          ]
        }
      },
      computed: {
        options() {
          return {
            durations: 300,
            offset: 20,
          }
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
        }
      }
  }
</script>

<style lang="scss" scoped>

</style>