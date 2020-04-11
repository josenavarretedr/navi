<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10">
        <p v-if="coursesIn.length == 0" class="font-weight-light">No estás registrado en ningún curso</p>
        <p v-if="coursesIn.length > 0" class="font-weight-light">Estos son los cursos en los que estás registrado</p>
      </v-col>
      <CardCourse v-for="course in coursesIn" :key="course.id" :course="course" :routeCheck='routeCheck'>
      </CardCourse>
    </v-row>
    <v-row>

      <v-col cols="10" offset="1">
        <p class="font-weight-light">
          Estos son las solicitudes de cursos que has hecho:
        </p>
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">Curso</th>
                <th class="text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in getCoursesRequest" :key="item.courseid">
                <td>{{ index+1 }}</td>
                <td>{{ item.courseName }}</td>
                <td>{{ item.status.toLowerCase() }}</td>
                <!-- <td>{{ item.comment }}</td> -->
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import CardCourse from '../Share/CardCourse.vue'

  export default {
    components: {
      CardCourse
    },
    computed: {
      ...mapGetters(['coursesIn', 'getCoursesRequest']),
      routeCheck() {
        let route = this.$route.path
        if (route.indexOf('in') !== -1) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>