<template>
  <v-list dense>
    <v-sheet v-if="courses.lenght === 0">
      <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
      <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
      <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
    </v-sheet>
 
    <v-list-group v-else :value="false" no-action prepend-icon="mdi-folder-outline" v-for="course in courses" :key="course.id">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">{{course.id}}</v-list-item-title>
            <v-list-item-subtitle class="text-caption">{{course.data.info.fullName}}</v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <v-list-item v-for="item in courseActions" :key="item.id" link :to="{name: item.pathName, params:{courseID: course.id}}">
          <v-list-item-title v-text="item.text" ></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
  </v-list>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      courseActions: [
        {
          text: 'Sesiones',
          pathName: 'in.course.sessions',
          icon: 'mdi-book-open-variant',
        },
        {
          text: 'Notas',
          pathName: 'in.course.qualifications',
          icon: 'mdi-chart-box-outline',
        },
      ]
    };
  },
  created () {
    this.studentData();
    this.studentsCourses()
  },
  computed: {
    ...mapState('student',['courses']),
    getCurrentRoute(a){
      if (this.$router.currentRoute.params.courseID === a){
        return 'mdi-folder-open-outline'
      } else {
        return 'mdi-folder-outline'
      } 
    }
  },
  methods: {
    ...mapActions('student',['studentData','studentsCourses']),
  },
};
</script>

<style lang="scss" scoped>
</style>