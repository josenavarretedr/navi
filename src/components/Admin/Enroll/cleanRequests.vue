<template>
  <v-row>
    <v-col cols="10" class="mt-4">
      <p class="font-weight-light mx-3 title">Selecciona el curso que desea matricular</p>
    </v-col>
    <v-col cols="10">
      <p>Haciendo función para limpiar excesos</p>
      <v-btn color="success" @click="limpiar">Limpiar Requests</v-btn>
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
          db.collection('users').doc(student.id).update({
            coursesRequest: student.coursesRequest
          }).then(function () {
            console.log('Se acutalizó todo')
          })
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>