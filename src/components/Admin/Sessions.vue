<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10" class="titleCourse">
        <h1>Selecciona un curso que quieras cargar</h1>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10" sm="6" class="d-flex justify-space-around">
        <v-select :items="allCoursesID" label="Selecciona un curso" v-model="courseSelected"></v-select>
      </v-col>
      <v-btn small @click="getSessionBTN">Cargar sesiones</v-btn>
    </v-row>
    
    <v-row class="d-flex justify-space-around">
      <v-col cols="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';

  export default {
    data() {
      return {
        courseSelected: ''
      }
    },
    computed: {
      ...mapGetters(['allCoursesID'])
    },
    methods: {
      ...mapActions(['setSessionsCourse']),
      getSessionBTN() {
        this.$router.push('/sessions/'+this.courseSelected)
        this.setSessionsCourse(this.courseSelected)
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
</style>