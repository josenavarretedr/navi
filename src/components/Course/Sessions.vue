<template>
  <div>
    <v-sheet v-if="loading">
      <v-skeleton-loader class="mx-auto" max-width="300" type="card">
      </v-skeleton-loader>
    </v-sheet>
    <div v-else>
      <!-- TODO hacer un filtro por cada una de las categorías existentes -->
      <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">

      <session-card-timeline v-for="(session,index) in getSortedSessions" :key="index" :dataSession="session" :indexSorted="index"></session-card-timeline>

    </v-timeline>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import SessionCardTimeline from './SessionCardTimeline.vue';
export default {
  components: { SessionCardTimeline },
  created () {
    if(this.sessions.length === 0 ){
      this.getSessionsDB(this.$route.params.courseID);
    }
  },
  computed: {
    ...mapState(['loading']),
    ...mapState('course',['sessions']),
    ...mapGetters('course',['getSortedSessions']),
  },
  methods: {
    ...mapActions('course',['getSessionsDB'])
  },
  watch:{
    $route (to, from){
      if(to.params.courseID  !== from.params.courseID){
        this.getSessionsDB(to.params.courseID)
      }
    }
} 
};
</script>

<style lang="scss" scoped>
</style>