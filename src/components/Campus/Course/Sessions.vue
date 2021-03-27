<template>
  <v-container>
    <SessionCard v-for="(session) in getSessionsCourse" :key="session.id" :session="session" ></SessionCard>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import SessionCard from '../Course/SessionCard.vue'

  export default {
    components:{
      SessionCard
    },
    created () {
      this.setSessionsCourse(this.$route.params.id);
      this.setCourseID(this.$route.params.id);
      
    },
    computed: {
      ...mapGetters(['getSessionsCourse','getStudentHomeworkDone']),
    },
    methods: {
      ...mapActions(['setSessionsCourse','setCourseID'])
    },
  }
</script>

<style lang="scss" scoped>

</style>