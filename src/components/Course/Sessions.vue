<template>
  <div>
    <v-sheet v-if="loading">
      <v-skeleton-loader class="mx-auto" max-width="300" type="card">
      </v-skeleton-loader>
    </v-sheet>
    <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown" v-else>

      <session-card-timeline v-for="(session,index) in getSortedSessions" :key="index" :dataSession="session" :indexSorted="index"></session-card-timeline>

    </v-timeline>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import SessionCardTimeline from './SessionCardTimeline.vue';
export default {
  components: { SessionCardTimeline },
  created () {
    this.getSessionsDB(this.$route.params.courseID);
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
    // eslint-disable-next-line no-unused-vars
    $route (to, from){
        this.getSessionsDB()
    }
} 
};
</script>

<style lang="scss" scoped>
</style>