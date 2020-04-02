<template>
  <v-container>
    <SessionCard v-for="(session, index) in getSessionsCourse" :key="session.id" :session="session" :sessionIndex="index"></SessionCard>
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
    },
    computed: {
      ...mapGetters(['getSessionsCourse']),
    },
    methods: {
      ...mapActions(['setSessionsCourse'])
    },
  }
</script>

<style lang="scss" scoped>

</style>