<template>
  <div v-if="show" class="password-error-banner">
    <p>Password errata. Riprova.</p>
  </div>
</template>

<script>
export default {
  props: ['show']
}
</script>

<style scoped>
.password-error-banner {
  background-color: red;
  color: white;
  padding: 10px;
}
</style>