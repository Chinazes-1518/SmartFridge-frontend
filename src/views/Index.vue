<script setup lang="ts">
import { APIRequest } from "@/utils/http";

async function sigma() {
  await APIRequest('', 'GET', {}, {}, false );
}
</script>

<template>
<button class="" @click="sigma()">игорь сигма</button>
</template>

<style scoped>

</style>