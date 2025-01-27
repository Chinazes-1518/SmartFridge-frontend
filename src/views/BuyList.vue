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

async function getProductType(id) {
  const data = await APIRequest(`/product_types/get`, "GET", {
    id: id
  }, {}, true)

  if (data.status === 200) {
    console.log(data.json)
    return (data.json)
  }

  return 0
}

</script>

<template>
  <div class="">
    <div class="buy">
      <div class="buy-container container">
        <div class="buy-table-pre">
          <table class="buy-table">
            <thead>
            <tr class="buy-table-tr">
              <th class="buy-table-th">ID</th>
              <th class="buy-table-th">Название продукта</th>
              <th class="buy-table-th">Масса</th>
              <th class="buy-table-th">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr class="buy-table-tr" v-for="item in Object.values(buy)[0]">
              <td class="buy-table-td">{{ item.id }}</td>
              <td class="buy-table-td">{{ getProductType(item.prod_type_id) }} ({{ item.prod_type_id }})</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>