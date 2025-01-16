<script setup lang="ts">
import { APIRequest } from "@/utils/http";

async function sigma() {
  await APIRequest('', 'GET', {}, {}, false );
}
</script>

<template>
<div class="d">
  <div class="container">
    <button class="" @click="sigma()">игорь сигма</button>
    Привет
  </div>
</div>
</template>

<style scoped>

</style>