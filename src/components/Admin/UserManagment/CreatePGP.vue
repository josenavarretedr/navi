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
              console.log('Se creo el usuario: ' + user + 'Con la contraseña: ' + 'yosoyrinsa')
            })
            .catch(
              error => {
                console.log(error)
              }
            )
        })
      },
      comprobarUsuarios() {
        let users2 = [
          "ingridamr19@gmail.com",
          "rocio.evelin.gv@gmail.com",
          "shey.yupanqui@gmail.com",
          "lizcalsina@gmail.com",
          "bianca_botelhoro@hotmail.com",
          "ingcarolina100@gmail.com",
          "fabianasr1998@gmail.com",
          "ssmendia@gmail.com",
          "ponki1420@gmail.com",
          "sanchezcruzmariacamila@gmail.com",
          "fbellott8@gmail.com",
          "smjessica97@gmail.com",
          "ruthmencary93@gmail.com",
          "kevin.ortiz@ucm.edu.co",
          "kellyr_16@hotmail.com",
          "valentina.hoyos@ucm.edu.co",
          "cralzate@ucm.edu.co",
          "natiestefi2606@gmail.com",
          "covarrubiaslore@gmail.com",
          "eva.larisa.scr@gmail.com",
          "melina1510@gmail.com",
          "jessicaaljure@gmail.com",
          "mabel-calero@hotmail.com",
          "marjorietatis@hotmail.com",
          "katherinefonseca17@gmail.com",
          "jorge.chicaiza@ucm.edu.co",
          "jenny.prado4797@utc.edu.ec",
          "gutierrez.magda22@gmail.com",
          "zamartgoh@gmail.com",
          "chernandezvilca@gmail.com",
          "dani.14308@gmail.com",
          "kgaravitod@gmail.com",
          "mariamorera0309@gmail.com",
          "1533041@utp.edu.pe",
          "mildredmada129@gmail.com",
          "rrlt2016@gmail.com",
          "guzmansilvany@gmail.com",
          "a3gmarcoandres@gmail.com",
          "jalexandra35@hotmail.com",
          "aloacosta47@gmail.com",
          "wilsonleo31@gmail.com",
          "deborah.bautista.g117@gmail.com",
          "luchin4029@gmail.com",
          "ramirezs.alondra@gmail.com",
          "dianaprz.ind@gmail.com",
          "barbara.tello.cabrera@gmail.com",
          "marianacabrejos@outlook.es",
          "escobedo1252@gmail.com",
          "abigailmejiagamarra@gmail.com",
          "janeramosayasta@gmail.com",
          "lgod11@hotmail.com",
          "elmergmch@gmail.com",
          "sigonza200@gmail.com",
          "ismarymaeli96@gmail.com",
          "karla.cristina02@gmail.com",
          "edwardcamilohm@gmail.com",
          "evecissan@gmail.com",
          "zpcastc295@gmail.com",
          "romr2409@gmail.com",
          "ldiazcon@unsa.edu.pe",
          "pipuls_hynm@hotmail.com",
          "MiguelOscar_2015@hotmail.com",
          "u17214762@utp.edu.pe",
          "darshavelasquez@gmail.com",
          "1612564@utp.edu.pe",
          "ingridlu.leon@gmail.com",
          "1521050@utp.edu.pe",
          "camilaquenallata@gmail.com",
          "trujilloyare4@gmail.com",
          "cnmcarmenmo0@gmail.com",
          "karlalihon17@gmail.com",
          "rojasvmariadelosangeles@gmail.com",
          "fp80715@gmail.com",
          "rcueva1407@gmail.com",
          "jclemente@unsa.edu.pe",
          "jckln239@gmail.com",
          "sandymendoza0506s@gmail.com",
          "siesquenalex55@gmail.com",
          "ylenia.flores.plaza@gmail.com",
          "1romiliz22@gmail.com",
          "hannan.alvarado@ucsp.edu.pe",
          "cristinahernandezd5@gmail.com",
          "pedroup65@gmail.com",
          "esegoviaca@unsa.edu.pe",
          "pamelaquispemendieta@gmail.com",
          "kflores0423@gmail.com",
          "khiaracar@gmail.com",
          "nesimarg.22@gmail.com",
          "1622422@utp.edu.pe",
          "karendiaz301999@gmail.com",
          "welopezpebe@gmail.com",
          "alfrecori@gmail.com",
          "sandrahh191099@gmail.com",
          "lourdeshuanuco97@gmail.com",
          "fchacongu@gmail.com",
          "lual6767@gmail.com",
          "danielamilenkatelloperez@gmail.com",
          "mari.anculle@gmail.com",
          "milagros.cardenasm@gmail.com",
        ]
        let noUsers = []
        this.users.forEach(user => {
          if (users2.includes(user.email)) console.log(user.email, 'registrada')
          else noUsers.push(user.email)
        })
        console.log(noUsers)
      }
    },
  }
</script>

<style lang="scss" scoped>


</style>