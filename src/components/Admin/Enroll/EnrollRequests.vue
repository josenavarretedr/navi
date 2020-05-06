<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        Estos botones actuarán sobre los participantes seleccionados
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark v-on="on" @click="changeRequests(1)">APROBADO</v-btn>
          </template>
          <span>Se aprueba solicitud</span>
        </v-tooltip>
      </v-col>

      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark v-on="on" @click="changeRequests(2)">Rechazado</v-btn>
          </template>
          <span>Se rechaza la solicitud</span>
        </v-tooltip>
      </v-col>

      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark v-on="on" @click="changeRequests(3)">Falta de pago</v-btn>
          </template>
          <span>Se rechaza la solicitud por falta de pago.</span>
        </v-tooltip>
      </v-col>

      <!-- <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark v-on="on" @click="changeRequests(4)">perfil incompleto</v-btn>
          </template>
          <span>Se rechaza la solicitud por perfil incompleto.</span>
        </v-tooltip>
      </v-col> -->
    </v-row>
    <v-row class="mt-10">
      <v-col>
        <v-skeleton-loader :loading="loadingData"
          type="table">
          <v-data-table v-model="selected" :headers="headers" :items="dataToShow" :search="search"
            :single-select="singleSelect" item-key="idRequest" show-select class="elevation-1">
            <template v-slot:top>
              <v-row class="d-flex justify-space-around">
                <v-col cols="5">
                  <!-- <v-switch v-model="singleSelect" label="1x1" class="pa-3"></v-switch> -->
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details>
                  </v-text-field>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-skeleton-loader>
      </v-col>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ textSnackbar }}
        <v-btn color="blue" text @click="snackbar = false">
          Cerrar
        </v-btn>
      </v-snackbar>
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
        // Config Skeleton
        loadingData: true,
        // Config del snackbar
        snackbar: false,
        textSnackbar: 'My timeout is set to 2000.',
        timeout: 4000,
        // Config de la tabla
        search: '',
        singleSelect: false,
        selected: [],
        headers: [{
            text: 'Apellidos, Nombres',
            align: 'start',
            value: 'profile.fullName',
          },
          {
            text: 'Email',
            align: 'start',
            value: 'profile.userEmail'
          },
          {
            text: 'DNI',
            align: 'start',
            value: 'profile.dni'
          },
          {
            text: 'Curso solicitado ',
            align: 'start',
            value: 'courseId'
          },
          // {
          //   text: 'Estado',
          //   align: 'start',
          //   value: 'status'
          // }
        ],
        allData: [],
        dataToUpdate: [],
        loading: false,
        endRequest: false,
        responseMsg: ''

      }
    },
    mounted() {
      let that = this
      // Funcion para llamar a todos los usuarios
      db.collection('users').where('role.student', "==", true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let requests = doc.data().coursesRequests
            let b = {}

            b.requests = requests
            b.courses = doc.data().courses
            b.id = doc.id

            that.dataToUpdate.push(b)
            requests.forEach((req, index) => {
              let data = {
                idRequest: '',
                userID: '',
                profile: {}
              }
              data.profile.fullName = doc.data().profile.lastName + ', ' + doc.data().profile.name
              data.profile.userEmail = doc.data().email
              data.profile.dni = doc.data().profile.dni
              data.userID = doc.id
              data.idRequest = doc.id


              data.idRequest += '-' + req.id
              data.status = req.status
              data.indexRq = index
              data.courseId = req.id

              that.allData.push(data)
            })
          });
          that.loadingData = false
        })
    },
    computed: {
      dataToShow() {
        return this.allData.filter((req) => req.status == 0)
      }
    },
    methods: {
      changeRequests(num) {
        console.log(num)
        this.selected.forEach(r => {
          let userToUpdate = this.dataToUpdate.filter((data) => data.id == r.userID)[0]
          // Actualiza localmente el stado del request
          userToUpdate.requests[r.indexRq].status = num

          // Actualiza los cursos localmente
          if (num == 1) {
            if (userToUpdate.courses.includes(r.courseId) == false) {
              userToUpdate.courses.push(r.courseId)
            }
            this.textSnackbar = 'Se aprobó la solicitud y se matricularon en los cursos'
          }

          // Eliminar de la data que se muestra
          for (var i = 0; i < this.allData.length; i++) {
            if (this.allData[i].idRequest === r.idRequest) {
              this.allData.splice(i, 1);
            }
          }
          // Mandar actualización a BD - sólo el status


          db.collection('users').doc(userToUpdate.id).update({
              // Actualiza el estado de request
              coursesRequests: userToUpdate.requests,
              // Actualizar BD - courses
              courses: userToUpdate.courses

            })

        })
        this.selected = []
        this.snackbar = true
        switch (num) {
          case 1:
            this.textSnackbar = 'Se aprobaron las solicitudes y se matricularon en los cursos'
            break
          case 2:
            this.textSnackbar = 'Se rechazó la solitud'
            break
          case 3:
            this.textSnackbar = 'Se rechazó la solitud por fata de pago'
            break
          case 4:
            this.textSnackbar = 'Se rechazó la solitud por perfil incompleto'
            break
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .borde {
    border: 1px red solid
  }
</style>