<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10">
        <p v-if="coursesIn.length == 0" class="font-weight-light title">No estás registrado en ningún curso</p>
        <p v-if="coursesIn.length > 0" class="font-weight-light title">Mis cursos registrados</p>
      </v-col>
      <CardCourse v-for="course in coursesIn" :key="course.id" :course="course" :routeCheck='routeCheck'>
      </CardCourse>
    </v-row>
    <v-row>

      <v-col class="mt-10" cols="10" offset="1">
        <p class="font-weight-light">
          Estos son las solicitudes que has realizado:
        </p>
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">Cursoss</th>
                <th class="text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in getCoursesRequests" :key="item.courseid">
                <td>{{ index+1 }}</td>
                <!-- <td>{{ item.id  }}</td> -->
                <td>{{ courseName(item.id)}}</td>
                <td>{{ statusString(item.status) }}</td>
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
      ...mapGetters(['userID', 'coursesIn', 'getCoursesRequests', 'allCoursesData']),
      routeCheck() {
        let route = this.$route.path
        if (route.indexOf('in') !== -1) {
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      courseName(a) {
        let b = this.allCoursesData.filter((course) => course.id == a)[0]
        let fullName = b.info.fullName
        return fullName
      },
      statusString(a) {
        let msn = ''
        switch (a) {
          case 0:
            msn = 'Revisando solicitud'
            break
          case 1:
            msn = 'Solicitud aprobada'
            break
          case 2:
            msn = 'Solicitud rechazada'
            break
          case 3:
            msn = 'Solicitud rechazada por fata de pago'
            break
          case 4:
            msn = 'Solicitud rechazada - Completa tu perfil'
            break
        }
        return msn
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>