<template>
  <div>
    Hola desde el registro de usuarios
    <input v-model="userToCreateEmail" type="text" placeholder="s" />
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="userToCreateEmail"
            label="Email"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn small color="primary" @click="createUsers"
            >CREAR uusarios</v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-btn small color="primary" @click="enrollUsers">MATRICULAR</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <pre>
      {{ userEmailsToCreate }}
    </pre>
    <pre>
      {{ usersResults }}
    </pre>
  </div>
</template>

<script>
import { auth, functions } from "@/firebaseInit";
// import firebase from "firebase";

export default {
  data() {
    return {
      userToCreateEmail: "fresatorres@hotmail.com,lmedina21@gmail.com",
      usersInUse: [],
      usersResults: [],
      process: [
        { name: "Create users", status: "success", check: false },
        { name: "Enroll Users", status: "success", check: false },
      ],
    };
  },
  methods: {
    async createUsers() {
      this.usersResults = [];
      // Esta función recorre cada elemento de array
      // Constructor
      function UserResult(email, account = true, comment = "") {
        (this.email = email),
          (this.account = account),
          (this.comment = comment);
      }
      this.userEmailsToCreate.forEach(async (userEmail) => {
        try {
          let userCredential = await auth.createUserWithEmailAndPassword(
            userEmail,
            "yosoyrinsa"
          );
          console.log(userCredential.user.uid);
          let result = new UserResult(userEmail, true, "ok");
          this.usersResults.push(result);
        } catch (e) {
          if (e.code === "auth/email-already-in-use") {
            let result = new UserResult(
              userEmail,
              true,
              "Ya existe una cuenta con ese correo"
            );
            this.usersResults.push(result);
          } else if (e.code === "auth/invalid-email") {
            let result = new UserResult(
              userEmail,
              false,
              "Formato del correo incorrecto"
            );
            this.usersResults.push(result);
          } else {
            let result = new UserResult(
              userEmail,
              false,
              "Algo más pasó no sabemos"
            );
            this.usersResults.push(result);
          }

          console.log(e.code);
        }
      });
      console.log("Se termino el forEach");
    },
    async enrollUsers() {
      function UserResult(email, account = true, comment = "") {
        (this.email = email),
          (this.account = account),
          (this.comment = comment);
      }
      var rollCourses = functions.httpsCallable("rollCourses");

      this.userEmailsToCreate.forEach(async (userEmail) => {
        try {
          let results = await rollCourses({
            userInUse: userEmail,
            courseToRoll: "pcom-18",
          });

          let log = new UserResult(userEmail, true, results.data.userUIDRolled);

          this.usersResults.push(log);
        } catch (e) {
          let result = new UserResult(
            userEmail,
            false,
            "Algo más pasó no sabemos"
          );
          this.usersResults.push(result);
          console.log(e.code);
        }
      });
    },
  },
  computed: {
    userEmailsToCreate() {
      return this.userToCreateEmail.replace(/\s+/g, "").split(",");
    },
  },
};

// var rollCourses = firebase.functions().httpsCallable("rollCourses")
// rollCourses({ userInUse: user, courseToRoll: 'pmd-13' }).then((results) => console.log(results.data.userUIDRolled));
</script>

<style lang="scss" scoped>
</style>