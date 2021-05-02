<template>
  <div>
    Creando Usuarios en bloque
    <v-btn small color="primary" @click="createUser">Crear usuarios DEMUNASVERANO-1</v-btn>
    <pre>
      {{$data.usar}}
    </pre>
  </div>
</template>

<script>
  import {
    auth,
  } from '@/firebaseInit'
  import {
    v4 as uuidv4
  } from 'uuid';

  export default {
    data() {
      return {
        users: [
          'gastonolivos64@gmail.com',
          'el_solbrillaparatodos@hotmail.com',
          'joseestebanqs@gmail.com',
          'leo_a1977@hotmail.com',
          'joslusoal@hotmail.com',
          'clau1989ct@gmail.com',
          'yasmin_498@hotmail.com',
          'igaci2021@gmail.com',
          'katmia.2292@hotmail.com',
        ],
        usar: 'Usuarios de pruebas'
      }
    },
    methods: {
      practica() {
        this.usar = uuidv4()
        // console.log(this.usar)
      },
      createUser() {
        this.users.forEach(user => {
          const pass = 'yosoyrinsa'
          auth.createUserWithEmailAndPassword(user, pass)
            .then(function () {
              // console.log('Se creo el usuario: ' + user + 'Con la contraseña: ' + 'yosoyrinsa')

            })
            .catch(
              // error => {
              //   // console.log(error)
              // }
            )
        })
      }
    },
  }
</script>

<style lang="scss" scoped>


</style>