<template>
  <v-container>
    <v-row>
      <AllCourses></AllCourses>
    </v-row>
  </v-container>
</template>

<script>
  // @ is an alias to /src
  import AllCourses from '@/components/AllCourses.vue'

  export default {
    name: 'Home',
    components: {
      AllCourses,
    }
  }
</script>