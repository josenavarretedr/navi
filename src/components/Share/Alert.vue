<template>
  <v-alert @input="onClose" border="left" close-text="Close Alert" color="error" dark dismissible :value='true'>
    {{text}}
  </v-alert>
</template>

<script>
  export default{
    props: ['text'],
    methods: {
      onClose() {
        this.$emit('dismissed')
      }
    },
  }
</script>