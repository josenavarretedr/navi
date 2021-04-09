<template>
  <v-container>
    <v-row>
      <a @click="$router.go(-1)">BACK</a>
      <br>
      <h1>Titulo : {{sessionData.name}}</h1>
      <p>
        {{sessionData.description}}
      </p>
      <p>
        {{new Date(sessionData.created)}}
      </p>
      <p>
        {{sessionData.homework}}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('course',['getOneSession']),
      sessionData(){
        return this.getOneSession(this.$route.params.sessionID)
      }
    },
    methods: {
    },
  }
</script>

<style lang="scss" scoped>

</style>