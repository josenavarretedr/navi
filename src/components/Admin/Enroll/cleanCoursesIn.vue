<template>
  <v-row>
    <v-col cols="10" class="mt-4">
      <p class="font-weight-light mx-3 title">Selecciona el curso que desea matricular</p>
    </v-col>
    <v-col cols="10">
      <p>Haciendo función para limpiar excesos</p>
      <v-btn color="success" @click="limpiar">Limpiar excesos</v-btn>
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
            user.courses = doc.data().courses
            user.id = doc.id
            that.allStudentsToClear.push(user)
          });
        })
    },
    methods: {
      limpiar() {
        Array.prototype.unique = function (a) {
          return function () {
            return this.filter(a)
          }
        }(function (a, b, c) {
          return c.indexOf(a, b + 1) < 0
        });

        this.allStudentsToClear.forEach((student) => {
          student.courses = student.courses.unique()
        })

        this.allStudentsToClear.forEach((student) => {
          db.collection('users').doc(student.id).update({
            courses: student.courses
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