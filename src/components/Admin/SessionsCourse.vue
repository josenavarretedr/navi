<template>
  <v-container>
    <v-row class="d-flex">
      <v-col cols="10" class="titleCourse">
        <h1>Agregar sesión en {{$route.params.id}} </h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col cols="12">
        <v-row>
          <v-col cols="8">
            <v-text-field v-model="name" label="Nombre de la sesión"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-checkbox v-model="newSession" label="¿Nueva sesión?"></v-checkbox>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="12">
        <v-row>
          <v-col cols="6">
            <v-select :items="getSessionsCourseID" :disabled="newSession" label="¿Qué sesión va a modificar?"
              v-model="sessionSelect"></v-select>
          </v-col>
          <v-col>
            <v-radio-group v-model="type" row >
              <v-radio label="Tarea" value="homework"></v-radio>
              <v-radio label="Comunicado" value="infomation"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>      

      <v-col cols="12">
        <v-textarea outlined label="Descripción de la sesión" v-model="description"></v-textarea>
      </v-col>

      <v-col cols="10">
        <v-file-input type="file" v-model="files" multiple label="Archivo" small-chips accept="application/pdf"
          @change="detectFiles">
        </v-file-input>
        <v-progress-linear v-model="progressUpload" background-color="none" v-if="!uploadEnd">
        </v-progress-linear>
      </v-col>
      <v-col cols="2">

        <p class="textURL mt-2" v-if="uploadEnd">
          <v-btn x-small color="success" :href="dowloadUrl" target="_blank">Sesión Grabada</v-btn>
        </p>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex'

  import {
    db,
    storage
  } from '@/firebaseInit'
  export default {
    data() {
      return {
        newSession: true,
        sessionSelect: null,
        name: '',
        description: '',
        session: '',
        url: '',
        type: 'homework',
        // Datos para el file
        files: [],
        fileName: '',
        dowloadUrl: '',
        uploading: false,
        uploadEnd: false,
        progressUpload: 0,
        uploadTask: '',

      }
    },
    computed: {
      ...mapGetters(['getSessionsCourseID', 'loading']),
      kindOfSession() {
        if (this.type == 'homework') {
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      detectFiles() {
        let fileList = this.files
        this.dowloadUrl = ''
        Array.from(Array(fileList.length).keys()).map(x => {
          this.fileName = fileList[x].name
          this.upload(fileList[x])
        })
      },
      upload(file) {
        this.uploading = true
        this.uploadEnd = false
        let numSesionsPlusOne = this.getSessionsCourseID.length + 1
        if (this.newSession == true) {
          this.uploadTask = storage.ref(`course/${this.$route.params.id}/S${numSesionsPlusOne}-${file.name}`).put(file)
        } else {
          this.uploadTask = storage.ref(`course/${this.$route.params.id}/${this.getSessionsCourseID}-${file.name}`).put(
            file)
        }
      },
      saveSession(downloadURL) {
        let data = null
        let numSesionsPlusOne = this.getSessionsCourseID.length + 1
        if (this.newSession == true) {
          if (this.getSessionsCourseID.length == 0) {
            data = {
              name: this.name,
              description: this.description,
              id: 'S1',
              link: downloadURL,
              homework: this.kindOfSession
            }
          } else{
            let s = "S"
            let a = s+numSesionsPlusOne
            data = {
              name: this.name,
              description: this.description,
              id: a,
              link: downloadURL,
              homework: this.kindOfSession
            }
          }
        } else {
          data = {
            name: this.name,
            description: this.description,
            id: this.sessionSelect,
            link: downloadURL,
            homework: this.kindOfSession
          }
        }

        let that = this
        db.collection('courses').doc(this.$route.params.id).collection('sessions').doc(data.id)
          .set(data)
          .then(function () {
            that.sessionSelect = null
            that.name = ''
            that.description = ''
            that.session = ''
            that.url = ''
          })
          // .catch(function (error) {
          //   console.error("Error writing document: ", error);
          // });
      }
    },
    watch: {
      uploadTask: function () {
        this.uploadTask.on('state_changed', sp => {
            this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
          },
          null,
          () => {
            this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.uploadEnd = true
              this.dowloadUrl = downloadURL
              this.saveSession(downloadURL)
            })
          })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>