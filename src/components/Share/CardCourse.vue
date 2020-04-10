<template>
  <v-col cols="10" md="6" lg="4" max-height="100">
    <v-sheet v-if="!courseInfo">
      <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-img :src="courseInfo.banner" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px">
        <v-card-title>
          {{courseInfo.shortName}}
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-2">
        {{courseInfo.kindProgram}} <br>
        {{courseInfo.fullName}}
        <br>
        Ed. {{courseInfo.edition}}
      </v-card-subtitle>

      <v-card-text class="text--primary text-justify">
        <div>
          {{ courseInfo.description.slice(0,200) }}...
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if='routeCheck' color="primary" small outlined :to="'/in/'+course">
          Entrar
        </v-btn>
        <v-btn v-else color="primary" small outlined :to="'/courses/'+course">
          Saber más
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    props: ['course', 'routeCheck'],
    computed: {
      ...mapGetters(['getOneCourse']),
      courseInfo() {
        let a = this.getOneCourse(this.course)[0].info
        return a
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>