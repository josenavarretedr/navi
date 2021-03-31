<template>
  <v-container>
    <v-row class="d-flex align-center">
      <v-col cols="10">
        <v-file-input
          input
          type="file"
          @change="feedbackUpload"
          v-model="files"
          accept="application/pdf"
          small-chips
          multiple
          label="Archivo"
        ></v-file-input>
      </v-col>
      <v-col cols="2">
        <v-btn :disabled="uploadValue != 0" x-small elevation="2" @click="onUpload">Subir archivo</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-progress-linear
        v-if="uploadValue != 0"
        id="progress"
        v-model="uploadValue"
        rounded
        max="100"
        height="25"
        :color="colorBar"
      >
        <template v-slot:default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
        </template></v-progress-linear
      >
    </v-row>
    <v-row v-if="uploadValue === 100">
      <v-col class="mt-5">
        <p>
        Has enviado el siguiente documento <v-btn class="ml-3 green lighten-3" x-small target="_blank" :href="docUrl">
        {{ docName }}
      </v-btn>
      </p>
      </v-col>
      <br />
    </v-row>
  </v-container>
</template>

<script>
import { storage } from "@/firebaseInit.js";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["sessionID", "courseId", "sessionName"],
  name: "Upload",
  data() {
    return {
      docData: null,
      docName: null,
      docUrl: null,
      uploadValue: 0,
      files: [],
    };
  },
  computed: {
    ...mapGetters(["userID"]),
    colorBar() {
      if (this.uploadValue === 100) {
        return "success";
      } else {
        return "primary";
      }
    },
  },
  methods: {
    ...mapActions(["sessionRegister",'setStudentHomeworkDone']),
    feedbackUpload() {
      this.uploadValue = 0;
      this.docUrl = null;
      let fileList = this.files;
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.docData = fileList[x];
        this.docName = fileList[x].name;
      });
    },

    onUpload() {
      this.docUrl = null;
      const storageRef = storage
        .ref(
          `reception/${this.userID}/${this.courseId}/S${this.sessionID}-${this.docData.name}`
        )
        .put(this.docData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        // eslint-disable-next-line no-unused-vars
        (error) => {
          // console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.docUrl = url;
            this.sessionRegister({
              sessionName: this.sessionName,
              nameFile: this.docName,
              course: this.courseId,
              session: this.sessionID,
              url: this.docUrl,
            });
            this.setStudentHomeworkDone()
          });
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>