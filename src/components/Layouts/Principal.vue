<template>
  <v-app>
    <v-app-bar absolute color="white" elevate-on-scroll app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- TODO Esto puede ser un componente reactivo, dependiendo de la ubicación que cambie -->
      <v-toolbar-title class="mx-auto">Navi</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <!-- Avatar Navigation -->
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <!-- <v-list-item-subtitle>Logged In</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <!-- General Tools items -->
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="{name: item.pathName}">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <component :is="this.userClaim + '-items'"></component>

      <v-divider></v-divider>
      
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="signUserOut" block>
            Salir<v-icon right>mdi-exit-to-app</v-icon></v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

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

<script>
import AdminItems from "../Admin/NavItems";
import StudentItems from "../Student/NavItems";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    AdminItems,
    StudentItems,
  },
  name: "App",
  data() {
    return {
      drawer: true,
      title: "Principal Layout",
      items: [
        { title: "Home", icon: "mdi-home-city", pathName:'in.home' },
        { title: "Perfil", icon: "mdi-account", pathName: 'in.profile' },
      ],
    };
  },
  computed: {
    ...mapState(["userClaim"]),
  },
  methods: {
    ...mapActions(["signUserOut"]),
  },
};
</script>

<style lang="scss" scoped>
</style>