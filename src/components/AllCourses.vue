<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10">
        <p class="font-weight-light">Estos son los cursos que tenemos a tu disposición:</p>
      </v-col>
      <CardCourse v-for="course in allCoursesID" :key="course" :course="course" :routeCheck='routeCheck'>
      </CardCourse>
    </v-row>
  </v-container>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import CardCourse from '../components/Share/CardCourse.vue'
  export default {
    components: {
      CardCourse
    },
    computed: {
      ...mapGetters(['allCoursesID']),
      routeCheck() {
        let route = this.$route.path
        if (route.indexOf('in') !== -1) {
          return true
        } else {
          return false
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>