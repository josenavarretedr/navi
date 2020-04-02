<template>
  <div>
    Hola desde INFO

    <pre>
      {{coursesIn}}
    </pre>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['coursesIn'])
    },
  }
</script>