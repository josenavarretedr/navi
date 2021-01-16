<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col v-for="item in socialNetworks" :key="item.id" cols="10" class="mx-2">
        <!-- <v-btn block class="socialBtn">
          <v-icon left class="socialIcon mr-5"> {{item.icon}} </v-icon>
          Rinsa en {{item.name}}
        </v-btn> -->
        <v-btn block class="socialBtn" :id="item.id" :href="item.link" target="_blank">
          <v-icon left class="socialIcon mr-5"> {{item.icon}} </v-icon>
          Rinsa en {{item.name}}
        </v-btn>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        socialNetworks: [
          {
            id: 'facebook',
            name: 'Facebook',
            icon: 'mdi-facebook',
            color: '3b5998',
            link: 'https://www.facebook.com/familiarinsa'
          },
          {
            id: 'linkedin',
            name: 'LinkedIn',
            icon: 'mdi-linkedin',
            color: '0e76a8',
            link: 'https://www.linkedin.com/company/gruporinsa'
          },
          {
            id: 'whatsapp',
            name: 'WhatsApp',
            icon: 'mdi-whatsapp',
            color: '00bb2d',
            link: 'https://api.whatsapp.com/send?phone=51921492993&text=Hola,%20Rinsa.%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20'
          }
        ]
      }
    },
  }

</script>

<style lang="scss" scoped>
  .socialBtn{
    font-size: .9rem;
    transition: .5s ease-in-out;
  }

  .socialBtn:hover{
    color:#fff !important;
  }

  .socialIcon {
    font-size: 1.5rem;
  }

  #facebook:hover{
    background: #3b5998;
  }

  #linkedin:hover{
    background: #0e76a8;
  }

  #whatsapp:hover{
    background: #00bb2d;
  }


</style>
