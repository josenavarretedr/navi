<template>
  <v-col cols="10" md="6" lg="4" max-height="100">
    <v-card>
      <v-img :src="courseInfo.banner" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px">
        <v-card-title>
          <span class="d-inline-block text-truncate">{{courseInfo.fullName}}</span>
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-2">
        {{courseInfo.fullName}}
        <br>
        Ed. {{courseInfo.edition}}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>
          {{courseInfo.description}}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if='routeCheck' color="primary" small outlined :to="'/in/'+course">
          Entrar
        </v-btn>
        <v-btn v-else color="primary" small outlined :href="courseInfo.link" target="_blank">
          Saber más
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    props: ['course','routeCheck'],
    computed: {
      ...mapGetters(['getOneCourse']),
      courseInfo(){
        return this.getOneCourse(this.course)[0].info
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>