<template>
  <div class="container">
    Comenzando a crear cursos
    <div class="formulario">
      <div class="formulario-pregunta">
        <label for="fullName">Nombre COMPLETO Curso</label>
        <input type="text" v-model="info.fullName" :name="info.fullName" />
      </div>

      <div class="formulario-pregunta">
        <label for="shortName">Nombre CORTO</label>
        <input type="text" v-model="info.shortName" :name="info.shortName" />
      </div>

      <div class="formulario-pregunta">
        <label for="edition">Edición</label>
        <input type="number" v-model="info.edition" :name="info.edition" />
      </div>

      <div class="formulario-pregunta">
        <label for="description">Descripción</label>
        <textarea
          type="textarea"
          minlength="4"
          maxlength="500"
          v-model="info.description"
          :name="info.description"
        >
        </textarea>
      </div>

      <v-btn small color="primary" @click="createCourse()"
        >Creando curso 1</v-btn
      >

      <div>
        {{ idCourse }}
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebaseInit.js";

export default {
  data() {
    return {
      nameCourse: "",
      kindProgramItems: [
        "Curso",
        "Seminario",
        "Programa de Especialización",
        "Programa de Dirección",
        "Programa de Alta Especialización",
      ],

      info: {
        kindProgram: "Programa de Alta Especialización",
        fullName: "",
        shortName: "",
        edition: "",
        description: "",
        banner:
          "https://firebasestorage.googleapis.com/v0/b/rinsacampus.appspot.com/o/course%2Fpcom-8%2Fvolodymyr-hryshchenko-V5vqWC9gyEU-unsplash.jpg?alt=media&token=e736d68f-7f11-483c-87c1-ef8c7d81baaa",
      },

      b2b: {
        check: true,
        logoURL:
          "https://firebasestorage.googleapis.com/v0/b/rinsacampus.appspot.com/o/course%2Fpmd-12%2FlogoSTM.png?alt=media&token=431272c1-dcd3-477b-9f04-52809935cb93",
      },
      payInfo: {
        courseFree: true,
        cost: {
          pe: "",
          ec: "",
          rest: "",
        },
        scholarship: {
          pe: "",
          ec: "",
          rest: "",
        },
      },
    };
  },
  computed: {
    idCourse() {
      var normalize = (function () {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
          to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {};

        for (var i = 0, j = from.length; i < j; i++)
          mapping[from.charAt(i)] = to.charAt(i);

        return function (str) {
          var ret = [];
          for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            // eslint-disable-next-line no-prototype-builtins
            if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
            else ret.push(c);
          }
          return ret
            .join("")
            .replace(/[^-A-Za-z0-9]+/g, "-")
            .toLowerCase();
        };
      })();
      let a = this.info.shortName + " " + this.info.edition;
      return normalize(a);
    },
  },
  methods: {
    createCourse() {
      console.log(this.info);
      console.log(this.b2b.logoURL);

      let data = {
        id: this.idCourse,
        info: this.info,
        b2b: this.b2b,
        payInfo: this.payInfo
      };

      db.collection("courses").doc(this.idCourse).set(data);

      this.idCourse = '';
      this.info.fullName = '';
      this.info.shortName = '';
      this.info.edition = '';
      this.info.description = '';

    },
  },
};
</script>

<style lang="scss" scoped>
.formulario {
  border: solid 1px red;
  display: flex;
  flex-direction: column;
  &-pregunta {
    padding: 2% 5%;

    label {
      display: inline-block;
      width: 30%;
    }

    input,
    textarea {
      margin: 10px 30px;
      width: 60%;
      border: solid 1px rgb(102, 102, 102);
    }
  }
}
</style>