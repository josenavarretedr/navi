<template>
  <component :is="layout"></component>
</template>

<script>
import { auth } from "../src/firebaseInit";
import InitLayout from "./components/Layouts/Init";
import PrincipalLayout from "./components/Layouts/Principal";

import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    InitLayout,
    // eslint-disable-next-line vue/no-unused-components
    PrincipalLayout,
  },

  data() {
    return {
      // layout: 'init-layout'
    };
  },

  computed: {
    ...mapState(["layout", "userUID"]),
  },
  created() {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        this.SET_LAYOUT("principal-layout");
      } else {
        this.SET_LAYOUT("init-layout");
      }
    });
  },
  methods: {
    ...mapActions(["signUserOut"]),
    ...mapMutations(["SET_LAYOUT"]),
    signUserOutCmp() {
      this.signUserOut();
      this.$router.push("/");
    },
  },
};
</script>


<style lang="scss" scoped>
</style>