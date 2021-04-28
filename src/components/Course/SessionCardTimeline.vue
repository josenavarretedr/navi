/* eslint-disable no-unreachable */
<template>
  <div>
    <v-timeline-item
      :color="this.color"
      :icon="this.icons"
      :left="rightOrLeft"
      large
    >
      <v-row>
        <v-col cols="10" offset="1">
          <v-card :color="this.color" dark>
        <v-card-title class="title"> {{ dataSession.name }} </v-card-title>
        <v-card-text class="white text--primary pt-4">
          <p>
            {{ dataSession.description }}
          </p>
          <v-btn :color="this.color" class="mx-0" outlined :to="{name: 'in.course.session', params: {sessionID: dataSession.id}}"> Descubre más </v-btn>
        </v-card-text>
      </v-card>
        </v-col>
      </v-row>
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
        return "success";
      } else {
        return "purple darken-1";
      }
    },
    icons() {
      // Switch en cada uno de los casos
      if('type' in this.dataSession){
        let icolor = {}
        switch(this.dataSession.type){
          case 'session':
            return icolor = {
              icon : 'mdi-bookmark-outline',
              color: 'indigo darken-4'
            }
            // eslint-disable-next-line no-unreachable
            break
          case 'comunicate':
            return icolor = {
              icon : 'mdi-start',
              color: 'yellow'
            }
            // eslint-disable-next-line no-unreachable
            break
          case 'forum':
            return icolor = {
              icon : 'mdi-comment-outline',
              color: 'cyan darken-3'
            }
            // eslint-disable-next-line no-unreachable
            break
          case 'control':
            return icolor = {
              icon : 'mdi-bookmark-outline',
              color: 'purple darken-1'
            }
            // eslint-disable-next-line no-unreachable
            break
          default:
            return 'mdi-star'
        }
      // eslint-disable-next-line no-unreachable
      return icolor
      } else if (this.dataSession.homework === true) {
        return "mdi-bookmark-check";
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