<template>
  <div>
    <v-btn small color="primary" @click="infoCourse">LET'S GO</v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <!-- <th class="text-left">ID</th> -->
            <th class="text-left">EMAIL</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="user in users2" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
          </tr> -->
          <tr v-for="(user,index) in users2" :key="index">
            <td> {{ user}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { db } from "@/firebaseInit.js";

export default {
  data() {
    return {
      users2: [],
      usersShow: [],
      dataPDF : [

      ]
    };
  },
  methods: {
    async infoCourse() {
      try {
        let doc = await db.collection("courses").doc("lides-mex-141").get();
        this.usersShow = doc.data().students;
        this.usersShow.forEach((user)=>{
          if(this.dataPDF.includes(user.email)){
            this.users2.push(user.email)
            console.log(`El correo ${user.email} SÍ está registrado en el lidex`)
          }
        })
      } catch (e) {
        console.log(e);
      }
    },
    async agregarStudentAFB() {
      try {
        let usersEnrolled = [];
        let querySnapshot = await db
          .collection("users")
          .where("courses", "array-contains", "lides-mex-141")
          .get();
        querySnapshot.forEach((user) => {
          let u = {
            id: user.id,
            email: user.data().profile.email,
          };
          console.log(user.id, "=>", user.data().profile.email);
          usersEnrolled.push(u);
        });
        this.usersShow = usersEnrolled;
        await db.collection("courses").doc("lides-mex-141").update({
          students: usersEnrolled,
        });
      } catch (e) {
        console.log("Error:", e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>