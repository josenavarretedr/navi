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
      {{ firstStepChecker }}
    </pre>
    <pre>
      {{ usersResults }}
    </pre>
  </div>
</template>

<script>
import { auth } from "@/firebaseInit";
// import firebase from "firebase";

export default {
  data() {
    return {
      userToCreateEmail:
      "esdras96chino@gmail.com,kaigoar15@hotmail.com,bonillad51@yahoo.es,kattybg84@gmail.com,angeles9reyes@gmail.com,oswaldocrejb@gmail.com,lauramonroylopez32@gmail.com,Isisbueso.ac@gmail.com,paholafuentes13@gmail.com,Edvinespinoza15@gmail.com,marielcalix429@gmail.com,Lawyeraleman@hotmail.com,noechontal71@gmail.com,marisol.murga@ucb.edu.bo,antaurcomariajose@gmail.com,camilamcr97@gmail.com,suiperiodis.18@gmail.com,marialemech19@gmail.com,daysiherrand11@hotmail.com,Rivigroup1@gmail.com,marcela0265@hotmail.com,licdaelizabethdelacruz@gmail.com,gomc1977@gmail.com,acostamendezcatalina@gmail.com,lopez.nurys@gmail.com,aura-maria-marte@hotmail.com,josemorris2016@gmail.com,quica023@hotmail.com,Lorenaespanard08@gmail.com,agustinaolivier022@gmail.com,Suli.dl999@gmail.com,Elizabetholivo0208@gmail.com,nicoleingrid13@gmail.com,mayelynsanchezgomez@gmail.com,Diana_r209@hotmail.com,luzdivinapolancord@gmail.com,Cristinamartines022@gmail.com,brenda21cabrera@outlook.es,guialocal593@gmail.com,dannaidd@gmail.com,natalie.pamela1998@gmail.com,dmtp1996@gmail.com,Legal@aynieducativo.com,Briguit.reinaldo@aynieducativo.com,barrantes.carolina@pucp.edu.pe,sayra.yupac@unmsm.edu.pe,yoruesya@gmail.com,noelia.pultay@unmsm.edu.pe,rvcx1110@gmail.com,Alvarezadrianzen.21@gmail.com,daneric.089@gmail.com,gino.pulache@gmail.com,scollyt99@gmail.com,jhonvillore@gmail.com,tomas.06.2001@gmail.com,d.neyra@pucp.pe,valquiria_ayala@hotmail.com,Valeriopalominocama@gmail.com,yasmin.carreno@aynieducativo.com,adriana.more@aynieducativo.com,melisag.tc@gmail.com,yordy.garcia@unmsm.edu.pe,jazmin.mendoza.al@gmail.com,gianellacabanillas@gmail.com,betsluci@gmail.com,paulapajuelotinta@gmail.com,abel986958913@gmail.com,w.laurt@gmail.com,antuane.centeno@ucsp.edu.pe,ayrtonvc01@gmail.com,anafiorellarodriguez18@gmail.com ,kim21paullo@gmail.com,llmjhonatan0906@gmail.com,georgetteborja@gmail.com,dr.dejesusmercedes@gmail.com,ministeriodecapellania@yahoo.com,sanchezcruzmariacamila@gmail.com,gavaconsa@hotmail.com,ismarymaeli96@gmail.com,juancitolindo777@gmail.com,lcastro2268@gmail.com,miguaran@uniguajira.edu.co,ottorcoronadoe@gmail.com,capellopez@derechoshumano.org,rcanchiscastaneda@gmail.com,rominaalejandraseclen@gmail.com,rrlt2016@gmail.com,Soliz.susanne1998@gmail.com,abigailmejiagamarra@gmail.com,Mauricioparedesmejia@gmail.com,Carmen.criss024@gmail.com,maferivasv@gmail.com,ajuniormeza@uniguajira.edu.co,alinanc@uniguajira.edu.co,andrea.duarte-p@uniminuto.edu.co,amiguelenescobar@uniguajira.edu.co,cireynoso@uniguajIra.edu.co,cameneseso@uniguajira.edu.co,dainermesa1994@gmail.com,Dandresramirez@uniguajira.edu.co,dsanchezp@uniguajira.edu.co,valen.evog@gmail.com,faquintero@uniguajira.edu.co,gngonzalez@uniguajira.edu.co,iflorez@uniguajira.edu.co,jrojeda@uniguajira.edu.co,yulilopezdaza@gmail.com,kcastellarf@uniguajira.edu.co,laura.chaparro-a@uniminuto.edu.co,mmmorales@uniguajira.edu.co,maria.osorio-r@uniminuto.edu.co,maryimontenegromendez@gmail.com,mtcohen@uniguajira.edu.co,mmcaballero@uniguajira.edu.co,pduran@uniguajira.edu.co,rcadyrpimienta@uniguajira.edu.co,juliana.morenofer@gmail.com,Sjacevedo@uniguajira.edu.co,tvaleriap@uniguajira.edu.co,yyesselispenaranda@uniguajira.edu.co,hanccovargascorina@gmail.com,jinoalva@gmail.com,daniel.3000.vega@gmail.com,cesar.santos@pucp.edu.pe,pragmaticmorphoid@gmail.com,joelvega045@gmail.com",
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
          // this.firstStepChecker(this.usersResults);
        } catch (e) {
          if (e.code === "auth/email-already-in-use") {
            let result = new UserResult(
              userEmail,
              true,
              "Ya existe una cuenta con ese correo"
            );
            this.usersResults.push(result);
            // this.firstStepChecker(this.usersResults);
          } else if (e.code === "auth/invalid-email") {
            let result = new UserResult(
              userEmail,
              false,
              "Formato del correo incorrecto"
            );
            this.usersResults.push(result);
            this.firstStepChecker(this.usersResults);
          } else {
            console.log(e.code);
          }
        }
      });
      console.log("Se termino el forEach");
    },
  },
  computed: {
    userEmailsToCreate() {
      return this.userToCreateEmail.replace(/\s+/g, "").split(",");
    },
    firstStepChecker() {
      let isTrue = true
      return isTrue;
    },
  },
};

// var rollCourses = firebase.functions().httpsCallable("rollCourses")
// rollCourses({ userInUse: user, courseToRoll: 'pmd-13' }).then((results) => console.log(results.data.userUIDRolled));
</script>

<style lang="scss" scoped>
</style>