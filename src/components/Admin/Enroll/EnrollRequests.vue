<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        Estos botones actuarán sobre los participantes seleccionados
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark v-on="on" @click="acceptRequest">APROBADO</v-btn>
          </template>
          <span>Se aprueba solicitud</span>
        </v-tooltip>
      </v-col>

      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark v-on="on">Rechazado</v-btn>
          </template>
          <span>Se rechaza la solicitud</span>
        </v-tooltip>
      </v-col>

      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark v-on="on">Falta de pago</v-btn>
          </template>
          <span>Se rechaza la solicitud por falta de pago.</span>
        </v-tooltip>
      </v-col>

    </v-row>
    <v-row class="mt-10">
      <v-col>
        <v-data-table v-model="selected" :headers="headers" :items="allRequests" :search="search"
          :single-select="singleSelect" item-key="userID" show-select class="elevation-1">
          <template v-slot:top>
            <v-row class="d-flex justify-space-around">
              <v-col cols="5">
                <v-switch v-model="singleSelect" label="1x1" class="pa-3"></v-switch>
              </v-col>
              <v-col cols="5">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <pre>
      {{selected}}
    </pre>
  </v-container>
</template>

<script>
  import {
    db
  } from '@/firebaseInit.js'
  export default {
    data() {
      return {
        // Config de la tabla
        search: '',
        singleSelect: false,
        selected: [],
        headers: [{
            text: 'Nombre',
            align: 'start',
            sortable: false,
            value: 'userName',
          },
          {
            text: 'Apellidos',
            value: 'userLastName'
          },
          {
            text: 'Curso solicitado ',
            value: 'courseid'
          },
        ],
        allRequests: [],
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
            let requests = doc.data().coursesRequest
            let data = {
              indexRequests: 0,
              userID: '',
              userName: '',
              userLastName: '',
              userEmail: '',
              courseid: '',
              courseName: '',
              status: '',
              coursesEnroll: ''
            }
            data.userName = doc.data().profile.name
            data.userLastName = doc.data().profile.lastName
            data.userEmail = doc.data().email
            data.userID = doc.id
            data.coursesEnroll = doc.data().courses
            if (Object.keys(requests).length != 0) {
              requests.forEach((r, index) => {
                data.indexRequests = index
                data.courseid = r.courseid
                data.courseName = r.courseName
                data.status = r.status
              })
              that.allRequests.push(data)
            }
          });
        })
    },
    methods: {
      acceptRequest() {
        this.selected.forEach(r => {
          // TODO registrar si es que ya está registrado en el curso.
          r.coursesEnroll.push(r.courseid)
          // Actualiza los cursos registrados
          db.collection('users').doc(r.userID).update({
              courses: r.coursesEnroll
            })
            .then(function () {
              // console.log('Se aprobo la solicitsud')
            })

          // Modificando el status de las requests

          // db.collection('users').doc(r.userID).update({
          //   courses: r.coursesEnroll
          // })

        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .borde {
    border: 1px red solid
  }
</style>