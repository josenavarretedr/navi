<template>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Sesión</th>
          <th class="text-left">URL</th>
          <th class="text-left">Entrega</th>
          <th class="text-left">Nota</th>
        </tr>
      </thead>
      <tbody>
        <!-- TODO poner un loader que responda a un computed mientras se cargan las tareas -->
        <tr v-for="homeWork in homeWorks" :key="homeWork.sessionIDCourse">
          <td>{{ homeWork.sessionName }}</td>
          <td>
            <v-chip small color="primary" outlined :href="homeWork.url" target="_blank">
              Enlace
            </v-chip>
          </td>
          <td v-if="'created' in homeWork">{{ new Date(homeWork.created).toISOString().substr(0, 10) }}</td>
          <td v-else> {{homeWork.timestamp}} </td>
          <td>{{ homeWork.note }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  import { db} from '@/firebaseInit.js'

  import {
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        homeWorks: [],
      }
    },
    created() {
      let courseID = this.$route.params.id
      const that = this
      db.collection('users').doc(this.userID).collection('courses').doc(courseID).collection('sessions').get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            that.homeWorks.push(doc.data())
          });
        });
    },
    computed: {
      ...mapGetters(['userID']),
    },
  }
</script>