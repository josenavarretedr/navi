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
  import {
    v4 as uuidv4
  } from 'uuid';

  export default {
    data() {
      return {
        users: [
          {
            email: "domy2cespedes@gmail.com",
            dni: "16645353"
        },
        {
            email: "lourdes_caramutti@hotmail.com",
            dni: "16681141"
        },
        {
            email: "zoila1937gustvo@gmail.com",
            dni: "16424350"
        },
        {
            email: "rchiroquezumaeta@gmail.com",
            dni: "16466021"
        },
        {
            email: "lupe668@hotmail.com",
            dni: "32910392"
        },
        {
            email: "franvica01@yahoo.es",
            dni: "2880722"
        },
        {
            email: "rosanalunacordova12@gmail.com",
            dni: "16445147"
        },
        {
            email: "jorgetumez1612@gmail.com",
            dni: "17562337"
        },
        {
            email: "victorhugochavezquesnay@gmail.com",
            dni: "43448106"
        },
        {
            email: "ceci05084@gmail.com",
            dni: "16701309"
        },
        {
            email: "alioz57@yahoo.es",
            dni: "03844674"
        },
        {
            email: "ulisesomar_15@hotmail.com",
            dni: "16789421"
        },
        {
            email: "jeannydm20@gmail.com",
            dni: "16797401"
        },
        {
            email: "pizarronancy58@gmail.com",
            dni: "16433059"
        },
        {
            email: "victormonsalve1604@gmail.com",
            dni: "17597137"
        },
        {
            email: "jesusvillegassosa201@gmail.com",
            dni: "17423962"
        },
        {
            email: "elvirafilomenaozetaguerrero@gmail.com",
            dni: "03200300"
        },
        {
            email: "oltegue@hotmail.com",
            dni: "28105314"
        },
        {
            email: "chinita70@outlook.com.ar",
            dni: "16674697"
        },
        {
            email: "rominaalejandraseclen@gmail.com",
            dni: "60775617"
        },
        {
            email: "salazarbancesjorgeluis@gmail.com",
            dni: "16679521"
        },
        {
            email: "rosavasquezrojas@hotmail.com",
            dni: "16525151"
        },
        {
            email: "pili25047@gmail.com",
            dni: "16733828"
        }
        ],
        usar: 'Usuarios de pruebassss'
      }
    },
    methods: {
      practica() {
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
        // auth.createUserWithEmailAndPassword('albert_hll@hotmail.com', '09632889')
        //   .then(function () {
        //     console.log('Se creo el usuario: albert_hll@hotmail.com con contraseña 09632889 ')
        //   })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>