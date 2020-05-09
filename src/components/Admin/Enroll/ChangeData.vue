<template>
  <v-row>
    <v-col cols="10" class="mt-4">
      <p class="font-weight-light mx-3 title">Selecciona el curso que desea matricular</p>
    </v-col>
    rRUx4D8ShkhrSNCiNPBXbkguYDJ2
    <v-col cols="10">
      <p>Haciendo función para cambiar base de datos</p>
      <v-btn color="success" @click="limpiar">Limpiar Requests</v-btn>
      <!-- <v-btn color="success" @click="deleteData">deleteData</v-btn> -->
      <pre>
        {{allStudentsToClear}}
      </pre>
    </v-col>
  </v-row>
</template>

<script>
  import {
    db
  } from '@/firebaseInit.js'

  export default {
    data() {
      return {
        allStudentsToClear: [],
      }
    },
    mounted() {
      let that = this
      db.collection('users').where('role.student', "==", true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let user = {}
            user.coursesRequest = doc.data().coursesRequest
            user.id = doc.id
            that.allStudentsToClear.push(user)
          });
        })
    },
    methods: {
      limpiar() {

        this.allStudentsToClear.forEach((student) => {
          student.coursesRequest = student.coursesRequest.filter((valorActual, indiceActual, arreglo) => {
          return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(
            valorActual)) === indiceActual
        });
        })

        this.allStudentsToClear.forEach((student) => {
          let newRequests = []
          student.coursesRequest.forEach((request) => {
            let newRequest = {}
            newRequest.id = request.courseid
            newRequest.status = 0
            newRequests.push(newRequest)
          })

          db.collection('users').doc(student.id).update({
            coursesRequests: newRequests
          }).then(function () {
            // console.log('Se actualizó la nueva base de datos por cada uno')
          })
        })
      },
      deleteData(){
        // let fireStore = db
        db.collection('users').doc('rRUx4D8ShkhrSNCiNPBXbkguYDJ2').update({
            test2: 'Probadno 2'
          }).then(function () {
            // console.log('Se acutalizó todo')
          })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>