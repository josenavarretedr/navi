<template>
  <div>
    Hola desde el hijo
    <FileSelector></FileSelector>
  </div>
</template>

<script>
  import FileSelector from '../Share/FileSelector.vue'
  export default {
    components: {
      FileSelector
    }
  }
</script>

<style lang="scss" scoped>

</style>