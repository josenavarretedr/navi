  <template>
  <div>
    <v-btn @click.native="selectFile" v-if="!uploadEnd && !uploading">
      Upload a cover image
      <v-icon right aria-hidden="true"> mdi-file-plus </v-icon>
    </v-btn>
    <form ref="form">
      <input
        id="files"
        type="file"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event)"
      />
    </form>
    <v-progress-circular
      v-if="uploading && !uploadEnd"
      :size="100"
      :width="15"
      :rotate="360"
      :value="progressUpload"
      color="primary"
    >
      %
    </v-progress-circular>
    <img v-if="uploadEnd" :src="downloadURL" width="100%" />
    <div v-if="uploadEnd">
      <v-btn class="ma-0" dark small color="error" @click="deleteImage()">
        Delete
      </v-btn>
    </div>
  </div>
</template>

  <script>
import { storage } from "@/firebaseInit.js";

export default {
  data() {
    return {
      progressUpload: 0,
      fileName: "",
      uploadTask: "",
      uploading: false,
      uploadEnd: false,
      downloadURL: "",
    };
  },
  methods: {
    selectFile() {
      this.$refs.uploadInput.click();
    },
    detectFiles(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.upload(fileList[x]);
      });
    },
    upload(file) {
      this.fileName = file.name;
      this.uploading = true;
      this.uploadTask = storage.ref("images/" + file.name).put(file);
    },
    deleteImage() {
      storage
        .ref("images/" + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false;
          this.uploadEnd = false;
          this.downloadURL = "";
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`);
        });
      this.$refs.form.reset();
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
            this.downloadURL = downloadURL;
            this.$emit("downloadURL", downloadURL);
          });
        }
      );
    },
  },
};
</script>

  <style>
.progress-bar {
  margin: 10px 0;
}

input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>