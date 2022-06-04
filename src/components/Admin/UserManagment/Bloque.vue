<template>
  <div>
    <h1>Matriculando en bloque</h1>
    <v-btn small color="primary" @click="matricular">Probando PFE-12 xd</v-btn>
    <pre>
      {{ usersID }}
    </pre>
  </div>
</template>

<script>
import { db } from "@/firebaseInit";
export default {
  data() {
    return {
      emails: [
        'jinoalva@gmail.com',
'daniel.3000.vega@gmail.com',
'cesar.santos@pucp.edu.pe',
'pragmaticmorphoid@gmail.com',
'joelvega045@gmail.com',
'yulilopezdaza@gmail.com',
'kcastellarf@uniguajira.edu.co',
'faquintero@uniguajira.edu.co',
'ottorcoronadoe@gmail.com',
        ],
      emails2: ["marialemech19@gmail.com", "rominaalejandraseclen@gmail.com"],
      usersID: [],
    };
  },
  methods: {
    matricular() {
      this.emails.forEach(async (email) => {
        let goodEmail = email.toLowerCase().replace(/\s+/g, "");
        let querySnapshot = await db
          .collection("users")
          .where("email", "==", goodEmail)
          .get();
        querySnapshot.forEach((doc) => {
          let userData = doc.data();
          if (!userData.courses.includes("pfe-12")) {
            userData.courses.push("pfe-12");
            db.collection("users").doc(doc.id).update({
              courses: userData.courses,
            });
            console.log(userData.email);
          }
          this.usersID.push(doc.id);
        });
      });
      // this.usersID.forEach(async (userID) => {
      //   let usuario = await db.collection('users').doc(userID).get()
      //   let dataUser = usuario.data()
      //   if (!dataUser.courses.includes('pfd-latam-1')){
      //     console.log(dataUser.courses)
      //   }
      // })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>