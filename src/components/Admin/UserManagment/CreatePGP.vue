<template>
  <div>
    Hola desde creando
    <v-btn small color="primary" @click="createUser">Crear usuarios</v-btn>
  </div>
</template>

<script>
  import {
    auth,
  } from '@/firebaseInit'

  export default {
    data() {
      return {
        users: [{
            name: "Fidelina",
            lastName: "Sembrera Aguilar",
            dni: "17543551",
            email: "fidelina1847@gmail.com",
            phone: "941832335"
          },
          {
            name: "Antenor Deymir",
            lastName: "Hernández Barrantes",
            dni: "70047521",
            email: "antenordeymir@gmail.com",
            phone: "931783326"
          },
          {
            name: "Yamil Omar",
            lastName: "Salvador Alejos",
            dni: "72629830",
            email: "omarsalvador.a21@gmail.com",
            phone: "945523289"
          },
          {
            name: "Elías Daniel",
            lastName: "Pinglo Risco",
            dni: "16436625",
            email: "pinglorisco@gmail.com",
            phone: "926595327"
          },
          {
            name: "Samuel Francisco",
            lastName: "Calle Mendoza",
            dni: "02767292",
            email: "sadan_11@hotmail.com",
            phone: "996067368"
          },
          {
            name: "Francisco Segundo Samuel Alexander",
            lastName: "Calle Chero",
            dni: "46384459",
            email: "fcalle0305@gmail.com",
            phone: "988891122"
          },
          {
            name: "Cintia Rosmery",
            lastName: "Altamirano Carranza",
            dni: "76865361",
            email: "cintiarosmery@gmail.com",
            phone: "973410239"
          },
          {
            name: "Vicente Abrahan",
            lastName: "Palacio Nevado",
            dni: "04641462",
            email: "vpalaciosn@gmail.com",
            phone: "998740280"
          },
          {
            name: "Janet Mirian",
            lastName: "Nuñez Mayanga",
            dni: "40745346",
            email: "janetnm@hotmail.com",
            phone: "949519278"
          },
          {
            name: "Julio",
            lastName: "Torres Manrique",
            dni: "43737387",
            email: "juliotorresmanrique@gmail.com",
            phone: "966397290"
          },
          {
            name: "Rocio Grisell",
            lastName: "Medina Gallardo",
            dni: "46311492",
            email: "mgallardorg@gmail.com",
            phone: "976763540"
          },
          {
            name: "Alvaro Javier",
            lastName: "Vega Villasnte",
            dni: "40721208",
            email: "alvarojvega@hotmail.com",
            phone: "976229162"
          },
          {
            name: "Lourder Giuliana",
            lastName: "Turriante Chavez",
            dni: "71534960",
            email: "lturriatech@gmail.com",
            phone: "984372918"
          },
          {
            name: "Melissa Karen",
            lastName: "Arévalo Vásquez",
            dni: "45329005",
            email: "meliarev2808@gmail.com",
            phone: "949485502"
          },
          {
            name: "William Eduardo",
            lastName: "Ríos Picón",
            dni: "70094377",
            email: "riosseduardo@hotmail.com",
            phone: "976742649"
          },
          {
            name: "Edelson Santos",
            lastName: "Chávez Torres",
            dni: "47057184",
            email: "echavezt1@outlook.com",
            phone: "976812747"
          },
          {
            name: "Fredy",
            lastName: "Labra Gutierrz",
            dni: "45244567",
            email: "fredylabra1@gmail.com",
            phone: "984999194"
          },
          {
            name: "Emilio Wilmer",
            lastName: "Barreto Niño",
            dni: "41169093",
            email: "hemiliot@hotmail.com",
            phone: "938198036"
          },
          {
            name: "Estafny Paulina",
            lastName: "Gualino Castillo",
            dni: "75553752",
            email: "nina_sky27@outlook.es",
            phone: "929848319"
          },
          {
            name: "Rodney Lohemar",
            lastName: "Herrera Mendoza",
            dni: "73959889",
            email: "rodneylohemar16@gmail.com",
            phone: "955679904"
          },
          {
            name: "Karla Jannet",
            lastName: "Tafur Silva",
            dni: "43430176",
            email: "karla.tafur.silva@gmail.com",
            phone: "957222878"
          },
          {
            name: "Mauricio Antonio",
            lastName: "Peralta Suárez",
            dni: "33408682",
            email: "marperaltasuarez@gmail.com",
            phone: "947435028"
          },
          {
            name: "Lizandro Miguel Angel",
            lastName: "Peralta Suárez",
            dni: "16653050",
            email: "miguelperalta2004@gmail.com",
            phone: "964568132"
          },
          {
            name: "Alicia",
            lastName: "Paz Monteza",
            dni: "40067897",
            email: "apazm_7@hotmail.com",
            phone: "980202292"
          },
          {
            name: "Karl",
            lastName: "Torres Mirez",
            dni: "46710220",
            email: "karlftm@gmail.com",
            phone: "978401427"
          },
          {
            name: "Sindy Roselly",
            lastName: "Pasapera Ramírez",
            dni: "45929165",
            email: "sindy.pas@gmail.com",
            phone: "991867579"
          },
          {
            name: "Cynthia Milagros Felicia",
            lastName: "Rios Ruiz",
            dni: "40849179",
            email: "cymifel28@gmail.com",
            phone: "959600316"
          },
          {
            name: "Camen",
            lastName: "Machado Guerrero",
            dni: "48875825",
            email: "sarai.machado.guerrero@gmail.com",
            phone: "979879163"
          },
          {
            name: "Dexi",
            lastName: "Melendres Alverca",
            dni: "48250281",
            email: "m_adexi@hotmail.com",
            phone: "979269678"
          },
          {
            name: "Luz Griselda",
            lastName: "Castañeda Salazar",
            dni: "16408512",
            email: "luzca1004@hotmail.com",
            phone: "979930232"
          },
          {
            name: "Leidy Requilda",
            lastName: "Pérez Chávez",
            dni: "73018807",
            email: "perezchavezleily5@gmail.com",
            phone: "948077473"
          },
          {
            name: "Evelin Claudia",
            lastName: "Pacheco Gallegos",
            dni: "70524179",
            email: "claudit257.ep@gmail.com",
            phone: "925588951"
          },
          {
            name: "Elmer Fredy",
            lastName: "Arenas Asenjo",
            dni: "16680055",
            email: "freddyarenas2004@gmail.com",
            phone: "953982004"
          },
          {
            name: "Yasser Ruben",
            lastName: "Bustamante Nuñez",
            dni: "16702360",
            email: "yassbustamante@hotmail.com",
            phone: "951778648"
          },
          {
            name: "Nathaly",
            lastName: "Lovon Cusi",
            dni: "47018114",
            email: "lovonnath@hotmail.com",
            phone: "993270476"
          },
          {
            name: "Fenando Javier",
            lastName: "Lluncor Barturen",
            dni: "74031564",
            email: "fernando_lluncor@hotmail.com",
            phone: "944443811"
          },
          {
            name: "Roxita Nohely",
            lastName: "Briceño Hernandez",
            dni: "44172019",
            email: "nohelyatm17@gmail.com",
            phone: "990929053"
          },
          {
            name: "Rodrigo",
            lastName: "Luya Perez",
            dni: "23714176",
            email: "rluyap@gmail.com",
            phone: "976008811"
          }
        ]
      }
    },
    methods: {
      createUser() {
        // this.users.forEach(user => {
        //   auth.createUserWithEmailAndPassword(user.email, user.dni)
        //   .then(function () {
        //     console.log('Se creo el usuario: ' + user.email + 'Con la contraseña: '+ user.dni)
        //   })
        //   .catch(
        //     error => {
        //       console.log(error)
        //     }
        //   )
        // })
        auth.createUserWithEmailAndPassword('lili_27ad@hotmail.com','16586962')
          .then(function () {
            console.log('Se creo el usuario: lili_27ad@hotmail.com con contraseña 16586962 ')
          })
          .catch(
            error => {
              console.log(error)
            }
          )
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>