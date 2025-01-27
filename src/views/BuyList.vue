<script setup lang="ts">

import {onBeforeMount, ref} from "vue";
import {APIRequest} from "@/utils/http.ts";

let buy = ref({})

onBeforeMount(async () => {
  await loadBuyList()
})

async function loadBuyList() {
  const data = await APIRequest("/buylist/get", "GET", {}, {}, true)

  if (data.status === 200) {
    buy.value = data.json
  }
}

</script>

<template>
  <div class="">
    <div class="buy">
      <div class="buy-container container">
        {{ buy }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>