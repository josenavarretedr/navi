<template>
  <div>
    Creando Usuarios en bloque
    <v-btn small color="primary" @click="createUser"
      >Crear usuarios faltantes</v-btn
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