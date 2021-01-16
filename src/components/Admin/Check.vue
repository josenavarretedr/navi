<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        <p class="title">Revisar las tareas pendientes</p>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10" sm="6" class="d-flex justify-space-around">
        <v-select :items="allCoursesID" label="Selecciona un curso" v-model="courseSelected"></v-select>
      </v-col>
      <!-- <v-btn small @click="getSessionBTN">Cargar sesiones</v-btn> -->
      <v-btn small @click="cargarSesiones">Cargar sesiones Nombresss</v-btn>
    </v-row>
    <v-row class="mt-10">
      <v-col>
        <!-- <v-skeleton-loader :loading="usersToShow.length == 0" type="table">
          <v-data-table dense :headers="headers" :items="usersToShow" :search="search" item-key="id">
            <template v-slot:top>
              <v-row class="d-flex justify-space-around">
                <v-col cols="5">
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-dialog v-model="dialog" max-width="700px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Revisar tareas</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <span class="title">Sesión: </span><span class="subtitle-1">{{editedItem.sessionName}}</span>
                        </v-col>
                        <v-col cols="12" sm="6" class="d-flex align-center">
                          <p class="subtitle-2 mr-5">Archivo enviado:</p>
                          <v-btn color="primary" fab small outlined @click="editItem(item)" :href="editedItem.url"
                            target="_blank">
                            <v-icon>mdi-file-link</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field v-model="editedItem.note" label="Nota" :rules="[max3]"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.comment" label="Comentario a la tarea"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.url="{ item }">
              <v-btn color="primary" fab small outlined @click="editItem(item)" :href="item.url" target="_blank">
                <v-icon>mdi-file-link</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn color="primary" small dark @click="editItem(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <template v-slot:no-data>
              <p class="headline">Por favor selecciona un curso en la lista de arriba</p>
            </template>

          </v-data-table>
        </v-skeleton-loader> -->
        <table style="width:100%">
          <tr>
            <th>Uid</th>
            <th>SessionName</th>
          </tr>
          <tr v-for="session in sessionsRQ" :key="session.id">
            <td> {{session.id}} </td>
            <td> {{session.name}} </td>
          </tr>
        </table>
        <!-- <table style="width:100%">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>DNI</th>
            <th>Sesión enviada</th>
          </tr>
          <tr v-for="user in usersToShow" :key="user.uid">
            <td>{{user.profile.fullName}}</td>
            <td>{{user.profile.userEmail}}</td>
            <td>{{user.profile.dni}}</td>
            <td> {{user.numSession}} </td>
          </tr>
        </table> -->
        <v-snackbar v-model="snackbar" :timeout="2000" :color="snackColor">
          {{ textSnackbar }}
          <v-btn text @click="snackbar = false">Cerrar</v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    db
  } from '@/firebaseInit.js'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        // Config del select
        courseSelected: '',
        // Config Skeleton
        loadingData: true,
        // Config del snackbar
        snackbar: false,
        textSnackbar: 'My timeout is set to 2000.',
        snackColor: '',
        // Config de la tabla
        search: '',
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
            text: 'Sesión',
            align: 'start',
            value: 'numSession'
          },
          {
            text: 'URL',
            align: 'start',
            value: 'url'
          },
          {
            text: 'Nota',
            align: 'start',
            value: 'note'
          },
          {
            text: 'Comentario',
            value: 'comment'
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false
          },
        ],
        allData: [],
        dataToUpdate: [],
        loading: false,
        endRequest: false,
        responseMsg: '',
        allUserUID: [],
        usersToShow: [],
        // Consiguiendo los nombres de las sesiones
        sessionsRQ: [],

        // Setting crud option
        dialog: false,
        editedIndex: -1,
        editedItem: {
          sessionName: '',
          url: '',
          note: '',
          comment: ''
          // userFullName: 0,
        },
        defaultItem: {
          sessionName: '',
          url: '',
          note: '',
          comment: ''
          // userFullName: 0,
        },
        // Regla para notas
        max3: v => v <= 3 || 'Máxima calificación es 3',
      }
    },
    mounted() {
      let that = this
      // Funcion para guardar todos los UIDs

      db.collection('users').where('role.student', "==", true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let data = {
              profile: {},
              sessions: []
            }
            data.courses = doc.data().courses
            data.id = doc.id


            data.profile.fullName = doc.data().profile.lastName + ', ' + doc.data().profile.name
            data.profile.userEmail = doc.data().email
            data.profile.dni = doc.data().profile.dni
            data.profile.phone = doc.data().profile.cellphone

            that.allUserUID.push(data)
          });
          // that.loadingData = false
        })
    },
    computed: {
      ...mapGetters(['allCoursesID']),
      dataToShow() {
        return this.allData.filter((res) => res.courses.length == 2)
      }
    },
    methods: {
      getSessionBTN() {
        let dataToUpdate = []
        let usersEnroll = this.allUserUID.filter((user) => user.courses.includes(this.courseSelected))
        usersEnroll.forEach((u) => {

          let docRef = db.collection('users').doc(u.id).collection('courses').doc(this.courseSelected)
          docRef.get().then((doc) => {
            if (doc.exists) {
              docRef.collection('sessions').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (session) {

                  let userToShow = {
                    id: '',
                    userid: u.id,
                    profile: u.profile,
                    numSession: session.id,
                    sessionName: session.data().sessionName,
                    nameFile: session.data().nameFile,
                    url: session.data().url,
                    note: session.data().note,
                    timestamp: session.data().timestamp,
                  }

                  if (session.data().comment) {
                    userToShow.comment = session.data().comment
                  } else {
                    userToShow.comment = ''
                  }

                  userToShow.id = u.id + '-' + session.id
                  dataToUpdate.push(userToShow)
                });
              });
            }
          })

        })
        this.loadingData = false

        this.usersToShow = dataToUpdate
      },

      cargarSesiones() {
        let data = []
        db.collection('courses').doc(this.courseSelected).collection('sessions').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            data.push(doc.data())
          });
        });
        this.sessionsRQ = data
        console.log(this.sessionsRQ)
      },

      editItem(item) {
        this.editedIndex = this.usersToShow.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.usersToShow[this.editedIndex], this.editedItem)

          let that = this
          let docRef = db.collection('users').doc(this.editedItem.userid).collection('courses').doc(this.courseSelected)
          docRef.collection('sessions').doc(this.editedItem.numSession).update({
            note: this.editedItem.note,
            comment: this.editedItem.comment
          }).then(function () {
            that.snackbar = true
            that.snackColor = 'success'
            that.textSnackbar = 'Datos cargados'
          })

        } else {
          this.usersToShow.push(this.editedItem)
        }
        this.close()

      }
    },
  }
</script>

<style lang="scss" scoped>
  .borde {
    border: 1px red solid
  }
</style>