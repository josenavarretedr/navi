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
      ...mapGetters(['coursesIn']),
      routeCheck(){
        let route = this.$route.path
        if(route.indexOf('in') !== -1){
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