<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Navi</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>
