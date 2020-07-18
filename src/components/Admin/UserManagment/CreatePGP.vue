<template>
  <div>
    Hola desde creandoasdas
    <v-btn small color="primary" @click="createUser">Crear ussssuarios</v-btn>
    <pre>
      {{$data.usar}}
    </pre>
  </div>
</template>

<script>
  import {
    auth,
  } from '@/firebaseInit'
  import { v4 as uuidv4 } from 'uuid';

  export default {
    data() {
      return {
        users: [
          {
            dni: "48204420",
            email: "jllontopmatallana@gmail.com"
        },
        {
            dni: "72805413",
            email: "flavioyoveraleon@gmail.com"
        },
        {
            dni: "73242610",
            email: "U17214529@utp.edu.pe"
        },
        {
            dni: "76298599",
            email: "1625979@utp.edu.pe"
        },
        {
            dni: "71233325",
            email: "regaladosanchezmariacristina7@gmail.com"
        },
        {
            dni: "75010457",
            email: "alvaroj.sc.18@gmail.com"
        },
        {
            dni: "47586704",
            email: "elizabethfsilva23@gmail.com"
        },
        {
            dni: "71919518",
            email: "u17103173@gmail.com"
        },
        {
            dni: "72515679",
            email: "ivanxitox_16@hotmail.com"
        }
        ],
        usar : 'Usuarios de psdrubea'
      }
    },
    methods: {
      practica(){
        this.usar = uuidv4()
        // console.log(this.usar)
      },
      createUser() {
        this.users.forEach(user => {
          auth.createUserWithEmailAndPassword(user.email, user.dni)
          .then(function () {
            console.log('Se creo el usuario: ' + user.email + 'Con la contraseña: '+ user.dni)
          })
          .catch(
            error => {
              console.log(error)
            }
          )
        })
        // auth.createUserWithEmailAndPassword('lili_27ad@hotmail.com','16586962')
        //   .then(function () {
        //     // console.log('Se creo el usuario: lili_27ad@hotmail.com con contraseña 16586962 ')
        //   })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>