<template>
  <v-row class="d-flex justify-space-around">
    <v-col cols="10" class="mt-4">
      <p class="font-weight-light mx-3 title">Selecciona el curso que desea matricular</p>
    </v-col>
    <v-col cols="10">
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Usuario</th>
              <th class="text-left">Email</th>
              <th class="text-left">DNI</th>
              <th class="text-left">cursos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in allStudents" :key="student.id">
              <td>{{ student.profile.lastName }}, {{ student.profile.name }}</td>
              <td>{{ student.profile.email }}</td>
              <td>{{ student.profile.dni }}</td>
              <td>
                <v-select :items="allCoursesID" label="Selecciona el curso" :value="student.courseToRoll"
                  @input="courseToRoll => updateCourse(student, courseToRoll)"></v-select>
              </td>
              <td>
                <span class="caption text-success" v-if="student.updateEnd">
                  {{student.updateMessage}}
                </span>
                <v-progress-circular v-if="student.updateLoading" indeterminate color="primary"></v-progress-circular>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
  import {
    db
  } from '@/firebaseInit.js'
import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        allStudents: [],
        courseSelected: '',
        updateEnd: false
      }
    },
    created() {
      let that = this
      // Funcion para llamar a todos los usuarios
      db.collection('users').where('role.student', "==", true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let user = doc.data()
            user.courseToRoll = ''
            user.id = doc.id
            user.updateEnd = false
            user.updateMessage = ''
            user.updateLoading = false
            that.allStudents.push(user)
          });
        })
    },
    computed: {
      ...mapGetters(['allCoursesID'])
    },
    methods: {
      updateCourse(student, courseToRoll) {
        student.updateEnd = false
        student.updateLoading = true
        if (student.courses.includes(courseToRoll) == true) {
          student.updateLoading = false
          student.updateEnd = true
          student.updateMessage = 'El usuario ya se encuentra registrado en ese curso'
        } else {
          student.courses.push(courseToRoll)
          let data = student.courses
          db.collection('users').doc(student.id).update({
            courses: data
          }).then(function () {
            student.updateLoading = false
            student.updateEnd = true
            student.updateMessage = 'Se registró correctamente'
          });
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>