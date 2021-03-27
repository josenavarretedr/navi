<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12">
              {{ session.name }} <br />
              <div v-if="session.homework">
                <v-btn v-if="checkHomeworkDone" x-small class="success">
                  <v-icon left>mdi-thumb-up</v-icon> Tarea enviada
                </v-btn>
                <v-btn x-small v-else class="warning">
                  <v-icon left>mdi-alert</v-icon>Pendiente</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div class="text--primary">
            {{ session.description }}
          </div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="ml-1">
          <v-btn x-small color="primary" :href="session.link" target="_blank"
            >Sesión</v-btn
          >
          <v-btn
            v-if="session.homework"
            x-small
            color="error"
            @click="show = !show"
          >
            Tarea
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="session.homework" icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition v-if="session.homework">
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text class="caption">
              Según la información de la sesión, envía tu tarea mediante este
              medio.

              <!-- <FileSelector
                :sessionName="session.name"
                :sessionID="session.id"
                :courseId="this.$route.params.id"
              ></FileSelector> -->
              <NewFileSelector
                :sessionName="session.name"
                :sessionID="session.id"
                :courseId="this.$route.params.id"
              ></NewFileSelector>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
// import FileSelector from "../../Share/FileSelector.vue";
import NewFileSelector from "../../Share/NewFileSelector.vue";
export default {
  components: {
    // FileSelector,
    NewFileSelector,
  },
  props: ["session"],
  data: () => ({
    show: false,
    homeworkStatus: "",
  }),
  computed: {
    ...mapGetters(["getStudentHomeworkDone"]),
    checkHomeworkDone() {
      if (
        this.getStudentHomeworkDone.findIndex(
          (x) => x.sessionIDCourse === this.session.id
        ) === -1
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.d-flex {
  border: solid 1px red;
}
</style>