<template>
  <div>
    Creando Usuarios en bloque
    <v-btn small color="primary" @click="createUser"
      >Crear usuarios LIDES MEX x222d</v-btn
    >
    <pre>
      {{ $data.usar }}
    </pre>
  </div>
</template>

<script>
import { auth } from "@/firebaseInit";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      users: [
        
'menfisgjgr_86@hotmail.com',
'Pequebonita1602@gmail.com',
'Angelitaam1993@gmail.com',
'nayeliv_23@hotmail.com',
'raquelita0368@hotmail.com',
'Vic.mucio@gmail.com',
'Suarezsalazar77@hotmail.com',
'rocioprensanchez@gmail.com',

],
      usar: "Usuarios de pruebas",
    };
  },
  methods: {
    practica() {
      this.usar = uuidv4();
      // console.log(this.usar)
    },
    createUser() {
      this.users.forEach((user) => {
        const pass = "yosoyrinsa";
        setTimeout(function(){
          auth
          .createUserWithEmailAndPassword(user, pass)
          .then(function () {
            console.log(
              "Se creo el usuario: " +
                user +
                "Con la contraseña: " +
                "yosoyrinsa"
            );
          })
          .catch((error) => {
            console.log(error);
            console.log(`El correo ${user} ya está siendo usado`)
          });
        },2000)
      });
    },
    comprobarUsuarios() {
      let users2 = ["milagros.cardenasm@gmail.com"];
      let noUsers = [];
      this.users.forEach((user) => {
        if (users2.includes(user.email)) console.log(user.email, "registrada");
        else noUsers.push(user.email);
      });
      console.log(noUsers);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>