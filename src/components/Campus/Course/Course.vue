<template>
  <v-container>
    <v-row class="mt-10 d-flex justify-space-around">
      <v-col cols="8" class="titleCourse">
        <h1>{{courseInfo.fullName}}</h1>
        <h2>{{courseInfo.shortName}} - Ed. {{courseInfo.edition}} </h2>
      </v-col>
      <v-col cols="4">
        <v-img v-if="courseB2b.check" height="70" :src="courseB2b.logoURL" contain></v-img>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10" sm="6" class="d-flex justify-space-around">

        <v-btn color="primary" small outlined :to="'/in/'+$route.params.id+'/sesiones'">
          Sesiones
        </v-btn>

        <v-btn color="primary" small outlined :to="'/in/'+$route.params.id+'/notes'">
          Notas
        </v-btn>
      </v-col>
      <!-- <v-col cols="10" sm="6" class="d-flex justify-space-around">
        <v-btn color="primary" small outlined :to="'/in/'+$route.params.id+'/cronograma'">
          Fechas
        </v-btn>

        <v-btn color="primary" small outlined :to="'/in/'+$route.params.id+'/info'">
          Info
        </v-btn>
      </v-col> -->
    </v-row>
    <!-- TODO -->
    <!-- Este será el menú de cada uno de los cursos que el estudiante está matrículado.
    Además de deberemos de incluir 3 botones EN LA CABECERA: NOTAS, SESIONES, CRONOGRAMA, DIPLOMA, INFORMACIÓN GENERAL -->
    <v-row class="d-flex justify-space-around">
      <v-col cols="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['getOneCourse']),
      courseInfo() {
        return this.getOneCourse(this.$route.params.id)[0].info
      },
      courseB2b(){
        return this.getOneCourse(this.$route.params.id)[0].b2b
      }      
    },

  }
</script>

<style lang="scss" scoped>
  .titleCourse {
    & h1 {
      font-size: 1.5rem;
      font-weight: 400;
    }

    & h2 {
      font-weight: 300;
      font-size: .9rem;
    }
  }
  .borde {
    border: solid 1px red
  }
</style>