<script setup lang="ts">
import {authStore} from "@/utils/auth.ts";
import router from "@/router";
import {onBeforeMount} from "vue";

const auth = authStore()

onBeforeMount(async () => {
  if (!auth.isAuth) {
    await router.push("/")
  }
})


</script>

<template>
  <div class="">
    <div class="notify">
      <div class="notify-container container">
        ddd
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>