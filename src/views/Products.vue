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

function date(f) {
  const date = new Date(Date.parse(f))
  const day = date.getDate().lengh === 1 ? date.getDate() : `0${date.getDate()}`
  const month = date.getMonth().lengh === 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

  const difference = (date - Date.now) > 0 ? Math.ceil((Date.now() - date) / 1000 / 60 / 60 / 24) : 0
  const finalDate = `${day}.${month}.${date.getFullYear()}`

  return [finalDate, difference]
}

</script>

<template>
  <div class="">
    <div class="products">
      <div class="products-container container">
        <div class="products-cats" v-for="(value, key) in products">
          {{ key }}
          <div class="" v-for="(v, k) in value">
            {{k}}
            <div class="" v-for="(x, y) in v.items">
              {{date(x.expiry_date)[0]}} // {{date(x.expiry_date)[1]}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>