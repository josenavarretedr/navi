<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title> {{session.name}} </v-card-title>
        <v-card-text>
          <div class="text--primary">
            {{session.description}}
          </div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="ml-1">
          <v-btn x-small color="primary" :href="session.link" target="_blank" >Sesión</v-btn>
          <v-btn v-if='session.homework' x-small color="error" @click="show = !show">
            Tarea
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if='session.homework' icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition v-if='session.homework'>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text class="caption">
              Según la información de la sesión, envía tu tarea mediante este medio.

              <FileSelector :sessionName="session.name" :sessionNum="sessionIndex" :courseId="this.$route.params.id"></FileSelector>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import FileSelector from '../../Share/FileSelector.vue'
  export default {
    components: {
      FileSelector
    },
    props:['session','sessionIndex'],
    data: () => ({
      show: false,
    }),
  }
</script>

<style lang="scss" scoped>
  .d-flex {
    border: solid 1px red;
  }
</style>