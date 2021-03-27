<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-file-input
          type="file"
          v-model="files"
          multiple
          label="Archivo"
          small-chips
          @change="detectFiles"
        >
        </v-file-input>
        <v-progress-linear
          v-model="progressUpload"
          background-color="none"
          :color="colorBar"
          v-if="!uploadEnd"
        >
        </v-progress-linear>
        <p class="textURL mt-2" v-if="uploadEnd">
          <v-btn x-small color="success" :href="dowloadUrl" target="_blank"
            >tarea enviada</v-btn
          >
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { storage } from "@/firebaseInit.js";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["sessionID", "courseId", "sessionName"],
  data() {
    return {
      progressUpload: 0,
      files: [],
      fileName: "",
      dowloadUrl: "",
      uploadTask: "",
      uploading: false,
      uploadEnd: false,
    };
  },
  computed: {
    colorBar() {
      if (this.uploadEnd) {
        return "teal";
      } else {
        return "primary";
      }
    },
    ...mapGetters(["userID"]),
  },
  methods: {
    ...mapActions(["sessionRegister"]),
    detectFiles() {
      let fileList = this.files;
      this.dowloadUrl = "";
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.fileName = fileList[x].name;
        this.upload(fileList[x]);
      });
    },
    upload(file) {
      this.uploading = true;
      this.uploadEnd = false;
      this.uploadTask = storage
        .ref(
          `reception/${this.userID}/${this.courseId}/S${this.sessionID}-${file.name}`
        )
        .put(file);
    },
  },
  watch: {
    uploadTask: function () {
      this.uploadTask.on(
        "state_changed",
        (sp) => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.uploadEnd = true;
            this.dowloadUrl = downloadURL;
            this.sessionRegister({
              sessionName: this.sessionName,
              nameFile: this.fileName,
              course: this.courseId,
              session: this.sessionID,
              url: this.dowloadUrl,
            });
          });
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.textURL {
  font-size: 0.85rem;
  margin: 2px 0;
}
</style>