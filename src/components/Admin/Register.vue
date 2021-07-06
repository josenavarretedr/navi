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
          <v-btn small color="primary" @click="createUsers">LET'S GO</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <pre>
      {{ usersToCreate }}
    </pre>
  </div>
</template>

<script>
import { auth } from "@/firebaseInit";
import firebase from "firebase";

export default {
  data() {
    return {
      userToCreateEmail: "",
      usersInUse: [],
    };
  },
  methods: {
    createUsers() {
      let usersInUse = [];
      let userInvalidEmail = [];
      this.usersToCreate.forEach(async (user) => {
        try {
          let userCredential = await auth.createUserWithEmailAndPassword(
            user,
            "yosoyrinsa"
          );
          console.log(userCredential.user.uid);
        } catch (e) {
          if (e.code === "auth/email-already-in-use") {
            usersInUse.push(user);
          } else if (e.code === "auth/invalid-email") {
            userInvalidEmail.push(user);
          }
        }
      });
      // Verificando si ya están matriculados
      console.log("Usuarios ya creados", usersInUse);
      var rollCourses = firebase.functions().httpsCallable("rollCourses");
      rollCourses({ usersInUse }).then((results) => console.log(results));
      // console.log('Usuarios correo invalido', userInvalidEmail)
      // auth.createUserWithEmailAndPassword(usersToCreate, 'yosoyrinsa')
    },
  },
  computed: {
    usersToCreate() {
      return this.userToCreateEmail.replace(/\s+/g, "").split(",");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>