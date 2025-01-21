<script setup lang="ts">
import {PhBasket} from "@phosphor-icons/vue";
import { authStore } from "@/utils/auth";

const auth = authStore()
import {onMounted, ref} from "vue";
import {APIRequest} from "@/utils/http";

let products = ref([])

onMounted(async () => {
  if (auth.isAuth) {
    const data = await APIRequest('/products/all', 'GET', {}, {}, true)

    if (data.status === 200) {
      console.log(data.json)
      products.value = data.json
    }
   }
})

</script>

<template>
  <div class="">
    <div class="products">
      <div class="products-container container">
        <div class="products-cats" v-for="(value, key) in products">
          {{ key }}
          <div class="" v-for="(v, k) in value">
            {{k}}
            <div class="" v-for="(x, ) in v.items">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>