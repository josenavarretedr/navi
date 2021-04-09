<template>
  <div>
    <v-timeline-item
      :color="this.color"
      :icon="this.icons"
      :left="rightOrLeft"
      large
    >
      <v-card :color="this.color" dark>
        <v-card-title class="title"> {{ dataSession.name }} </v-card-title>
        <v-card-text class="white text--primary pt-4">
          <p>
            {{ dataSession.description }}
          </p>
          <v-btn :color="this.color" class="mx-0" outlined :to="{name: 'in.course.session', params: {sessionID: dataSession.id}}"> Descubre más </v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </div>
</template>

<script>
export default {
  props: ["dataSession", "indexSorted"],
  computed: {
    color() {
      // Switch en cada uno de los casos
      if (this.dataSession.homework === true) {
        return "indigo";
      } else {
        return "red lighten-2";
      }
    },
    icons() {
      // Switch en cada uno de los casos
      if (this.dataSession.homework === true) {
        return "mdi-buffer";
      } else {
        return "mdi-star";
      }
    },
    rightOrLeft() {
      if (this.indexSorted % 2) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>