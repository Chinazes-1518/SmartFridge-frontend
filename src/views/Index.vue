<script setup lang="ts">
const authed = true
</script>

<template>
<div class="d">
  <div class="container">
    <div class="info" v-if="!authed">
      Для работы системы необходимо войти в аккаунт.
    </div>
    <div class="" v-else>
      Вход успешно выполнен!
    </div>
  </div>
</div>
</template>

<style scoped>

</style>