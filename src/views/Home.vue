<template>
  <v-container fluid id="container">
    <v-row>
      <AllCourses></AllCourses>
    </v-row>
  </v-container>
</template>

<script>
  // @ is an alias to /src
  import AllCourses from '@/components/AllCourses.vue'
  import {
    mapGetters
  } from 'vuex';

  export default {
    name: 'Home',
    components: {
      AllCourses,
    },
    computed: {
      ...mapGetters(['userID'])
    },
    watch: {
      userID(val) {
        if (val == null) this.$router.push('/login')
      }
    },
    mounted() {
      if (this.userID == null) this.$router.push('/login')
    },
  }
</script>

<style lang="scss" scoped>
  #container {
    background: #ECE9E6;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #FFFFFF, #ECE9E6);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #FFFFFF, #ECE9E6);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */



    background: #304352;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #d7d2cc, #304352);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #d7d2cc, #304352); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  }
</style>