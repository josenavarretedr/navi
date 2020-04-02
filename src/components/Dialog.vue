<template>
  <div class="dialog">
    <div class="dialog__inner">
      <h3>My Dialog</h3>
      <a class="btn" @click="close">Close</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close () {
      this.$router.back()
    }
  }
}
</script>
