<template>
  <v-container fluid id="container">
    <v-row>
      <!-- <AllCourses></AllCourses>, -->
      <HomeMsg class="mt-5"></HomeMsg>
      <HomeSocial class="mt-5"></HomeSocial>
      <v-btn text @click="getAllStudentbyCourse">
        <v-icon>mdi-chart-bubble</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import AllCourses from '@/components/AllCourses.vue'

// import { db } from "@/firebaseInit";

import HomeMsg from "@/components/HomeMsg.vue";
import HomeSocial from "@/components/HomeSocial.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    // AllCourses,
    HomeMsg,
    HomeSocial,
  },
  computed: {
    ...mapGetters(["userID"]),
  },
  methods: {
    ...mapActions(["signUserOut"]),
    signUserOutCmp() {
      this.signUserOut();
      this.$router.push("/");
    },
    getAllStudentbyCourse() {
      console.log('hola')  
    },
  },
};
</script>

<style lang="scss" scoped>
</style>