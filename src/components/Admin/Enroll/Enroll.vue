<template>
  <v-container class="mt-5">
    <v-row>
      <v-col v-for="item in btns" :key="item.id">
        <v-btn small outlined color="success" :to="{name: item.to}">
          {{item.name}}
        </v-btn>
      </v-col>
    </v-row>
    <router-view></router-view>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        btns: [
          {
            to: 'enrollOne',
            name: 'matricula individual'
          },
          {
            to: 'unEnroll',
            name: 'Retirar del curso',
          },
          {
            to: 'enrollRequests',
            name: 'Solicitudes'
          }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>