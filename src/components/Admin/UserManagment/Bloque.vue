<template>
  <div>
    <h1>Matriculando en bloque</h1>
    <v-btn small color="primary" @click="matricular">Probando</v-btn>
    <pre>
      {{ emails }}
    </pre>
  </div>
</template>

<script>
import { db } from "@/firebaseInit";
export default {
  data() {
    return {
      emails: [
        'fany.ruiz_munoz@outlook.com',
'jrmsnre@yahoo.com.mx',
'alejandro_cabello@hotmail.com',
'jgfigueroag@icloud.com',
'smendezctecel168@live.com.mx',
'mel.reaph@gmail.com',
'lore1282107@gmail.com',
'leonor@lahijadelfuego.com',
'jesus_cha18@hotmail.com',
'karlaortasosa@gmail.com',
'mayzena12@hotmail.es',
'alessandratapia@gmail.com',
'romeroarpimex@hotmail.com',
'marylu.her@hotmail.com',
'karinagallegosrodriguez0@gmail.com',
'guillegu69@gmail.com',
'miguela.pina56@gmail.com',
'mariaramirezenciso@gmail.com',
'marinabeltran571@gmail.com',
'bere_20_salgado@hotmail.com',
'tianquiztliurbanbivis@gmail.com',
'marylunamosh@gmail.com',
'lettyp05@hotmail.com',
'figueroagonzalo672@gmail.com',
'delialeon29@gmail.com',
'eva196221@gmail.com',
'victorvaltierrez7777@gmail.com',
'blakrose150916@gmail.com',
'jsergiorodriguez@hotmail.com',
'elenita.mtz2207@gmail.com',
'alixiacallejas@gmail.com',
'iamcryslu19@gmail.com',
'saravlqz@outlook.com',
'golga103@gmail.com',
'mary_valenzuela80@hotmail.com',
'jvelarios@hotmail.com',
'zusy1966@gmail.com',
'isabreyes70@gmail.com',
'menfisgjgr_86@hotmail.com',
'mapifranxo@gmail.com',
'cortesvalencia69@yahoo.com.mx',
'pequebonita1602@gmail.com',
'xochigabriel4@gmail.com',
'isapel3007@gmail.com',
'juanflomatz@gmail.com',
'gustavosanders@hotmail.com',
'gurro32@gmail.com',
'marcialmoreno0303@gmail.com',
'bekazulblue@gmail.com',
'angelitaam1993@gmail.com',
'velazquezladaniel@gmail.com',
'callejasgonzalezirene@gmail.com',
'davidcg2512@hotmail.com',
'bordadoscimadi@gmail.com',
'nayeliv_23@hotmail.com',
'vale_era@hotmail.com',
'raquelita0368@hotmail.com',
'vic.mucio@gmail.com',
'suarezsalazar77@hotmail.com',
'erick1450@hotmail.com',
'armentajuarez371@gmail.com',
'zay_sago_tec55@hotmail.com',
'rocioprensanchez@gmail.com',
'nemeciomartunezalexis@gmail.com',
'anitarenteral@gmail.com',
'patty.olguin.78@gmail.com',

      ],
    };
  },
  methods: {
    matricular() {
      let usersID = [];
      this.emails.forEach(async (email) => {
        let querySnapshot = await db
          .collection("users")
          .where("email", "==", email)
          .get();
        querySnapshot.forEach((doc) => {
          let userData = doc.data()
          if(!userData.courses.includes('lides-mex-141')){
            // userData.courses.push('lides-mex-141')
            // db.collection('users').doc(doc.id).update({
            //   courses: userData.courses
            // })
            console.log(userData.email)
          }
          usersID.push(doc.id);
        });
      });
      // usersID.forEach(async (userID) => {
      //   let usuario = await db.collection('users').doc(userID).get()
      //   let dataUser = usuario.data()
      //   if (!dataUser.courses.includes('lides-mex-141')){
      //     console.log(dataUser.courses)
      //   }
      // })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>