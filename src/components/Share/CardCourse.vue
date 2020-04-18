<template>
  <v-col cols="10" md="6" lg="4" max-height="100">
    <v-sheet v-if="!courseInfo.info">
      <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-img :src="courseInfo.info.banner" class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
        <v-card-title>
          {{courseInfo.info.shortName}}
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-2">
        {{courseInfo.info.kindProgram}} <br>
        {{courseInfo.info.fullName}}
        <br>
        Ed. {{courseInfo.info.edition}}
      </v-card-subtitle>

      <v-card-text class="text--primary text-justify">
        <div>
          {{ courseInfo.info.description.slice(0,200) }}...
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
      <v-img v-if="courseInfo.b2b.check" height="70" :src="courseInfo.b2b.logoURL" contain>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
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
        let a = this.getOneCourse(this.course)[0]
        return a
      }
    }
  }
</script>

<style lang="scss" scoped>
  .borde {
    border: solid 1px red
  }
</style>