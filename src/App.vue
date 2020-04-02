<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" app absolute temporary>
      <v-list dense>

        <v-list-item v-for="item in navItems" :key="item.title" link :to="item.link">
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" @click="signUserOut">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- FIXME hacer que cuando esté en movil el menú siempre este visible, porque cuandos e baja no parecen las opciones del menú -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title class="ml-6">
        <router-link to="/" tag="span" style="cursor: pointer">Navi</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in navItems" :key="item.title" :to="item.link" text>
          <v-icon>mdi-{{ item.icon }}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn v-if="userIsAuthenticated" text @click="signUserOut">
          <v-icon>mdi-exit-to-app</v-icon>
          Salir
        </v-btn>
      </v-toolbar-items>


    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app color="blue-grey" class="white--text">
      <span>Navi &copy; </span>
      <v-spacer />
      <span>2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {
    auth
  } from '../src/firebaseInit'

  import {
    mapActions
  } from 'vuex';

  export default {
    name: 'App',

    data() {
      return {
        drawer: null,
        userIsAuthenticated: false,
        kindUser: false,
      }
    },

    computed: {
      adminSet() {
        if(this.kindUser){
          return 1
        } else {
          return 0
        }
      },
      navItems() {
        let navItems = [{
            title: 'Login',
            icon: 'login',
            link: '/login'
          },
          {
            title: 'Register',
            icon: 'account-plus',
            link: '/register'
          }
        ]
        if (this.userIsAuthenticated  && this.adminSet ==0) {
          navItems = [{
              title: 'Cursos',
              icon: 'folder',
              link: '/in/cursos'
            },
            {
              title: 'Perfil',
              icon: 'face',
              link: '/in/profile'
            }
          ]
        } else if (this.userIsAuthenticated && this.adminSet == 1) {
          navItems = [{
            title: 'Curso',
            icon: 'folder-clock-outline',
            link: '/admin'
          },
          {
            title: 'Sesiones',
            icon: 'file-plus',
            link: '/sessions'
          },
          {
            title: 'Matricular',
            icon: 'face-recognition',
            link: '/enroll',
          },{
            title: 'Revisar',
            icon: 'email-check-outline',
            link: 'check'
          }]
        }
        return navItems
      }
    },
    created() {
      auth.onAuthStateChanged(userAuth => {
        if (userAuth) {
          // TODO cuando esto esté hecho quitar los console.log()
          // Get TOKEN
          let that = this
          auth.currentUser.getIdTokenResult()
            .then(function ({
              claims
            }) {
              if (claims.admin) {
                that.kindUser = true
              } else {
                that.kindUser = false
              }
            });
          this.$store.dispatch('setUserUIDA', userAuth.uid)
          return this.userIsAuthenticated = true
        } else {
          return this.userIsAuthenticated = false
        }
      })

      this.setAllCoursesID()


    },
    methods: {
      ...mapActions(['setAllCoursesID']),
      signUserOut() {
        auth.signOut().then(this.$router.push('/'))
      }
    }
  };
</script>