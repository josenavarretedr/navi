<template>
  <div>
    Creando Usuarios en bloque
    <v-btn small color="primary" @click="createUser"
      >Crear usuarios PMD-LATAM-21</v-btn
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
        "Andrea.201298.nusa@gmail.com",
        "salvador.rios.1999@gmail.com",
        "andres_199193@hotmail.com",
        "marianacabrejos@outlook.es",
        "antuane.centeno@ucsp.edu.pe",
        "enriquez.m.gabriela@gmail.com",
        "mayte.25.08.23@gmail.com",
        "delfitogastelo@hotmail.com",
        "garzunce@gmail.com",
        "jchildebrando395@gmail.com",
        "pacastro2013@gmail.com",
        "mjaramillom28@ucvvirtual.edu.pe",
        "joseph.maguina@urp.edu.pe",
        "fernando.romeroarteaga@gmail.com",
        "mariacollacso@gmail.com",
        "jessicakarinasm.jsm@gmail.com",
        "mariaesther.fm96@gmail.com",
        "alexandracq150501@gmail.com",
        "kevinavp258@gmail.com",
        "nelly18cerna@gmail.com",
        "flaviosantiagolonda@gmail.com",
        "flaviosantiagolonda@gmail.com",
        "glendayamba@gmail.com",
        "arianzt.ucsm@gmail.com",
        "les.felix19@gmail.com",
        "montenegropiero@outlook.com",
        "Dubercch@gmail.com",
        "kev.zoc@hotmail.com",
        "montenegropiero@outlook.com",
        "fervvs2014@gmail.com",
        "Alvaradonikolle@gmail.com",
        "arianzt.ucsm@gmail.com",
        "aaromgamero@gmail.com",
        "angely.tonky.99@gmail.com",
        "andresyanez23@gmail.com",
        "edu923@gmail.com",
        "rosavilma12@hotmail.com",
        "claudia.paredes.cornejo@ucsp.edu.pe",
        "victor98pm@gmail.com",
        "davidups93@gmail.com",
        "Hess09td@gmail.com",
        "71404002@continental.edu.pe",
        "71404002@continental.edu.pe",
        "valeriapamela91@gmail.com",
        "b.suasnabar1@gmail.com",
        "carolinanayed@gmail.com",
        "mey.chang.s@gmail.com",
        "huamanpinedajose@gmail.com",
        "carolinanayed@gmail.com",
        "camila.mesia@ucsp.edu.pe",
        "yamily.mantillajulca@gmail.com",
        "fervvs2014@gmail.com",
        "amc.75163945@gmail.com",
        "matanacio28@gmail.com",
        "Yommendez26@gmail.com",
        "Brandonjwf25@gmail.com",
        "jbaquero80@hotmail.com",
        "sebastianmontenegro48@gmail.com",
        "enriquez.m.gabriela@gmail.com",
        "fiosalazarsolano@gmail.com",
        "kevin.castro1993@hotmail.com",
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
          });
      });
    },
    comprobarUsuarios() {
      let users2 = [
        
        "milagros.cardenasm@gmail.com",
      ];
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