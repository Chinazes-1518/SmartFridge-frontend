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
  const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`
  const month = date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

  const difference = (date - Date.now()) > 0 ? Math.ceil((date - Date.now()) / 1000 / 60 / 60 / 24) : 0
  const finalDate = `${day}.${month}.${date.getFullYear()}`

  return [finalDate, difference]
}

</script>

<!--<div class="products-cats" v-for="(value, key) in products">-->
<!--{{ key }}-->
<!--<div class="" v-for="(v, k) in value">-->
<!--  {{k}}-->
<!--  <div class="" v-for="(x, y) in v.items">-->
<!--    {{date(x.expiry_date)[0]}} // {{date(x.expiry_date)[1]}}-->
<!--  </div>-->
<!--</div>-->
<!--</div>-->

<template>
  <div class="">
    <div class="products">
      <div class="products-container container">
        <div class="products-title">Список продуктов</div>
        <div class="products-space">
          <div class="products-card" v-for="(category, cName) in products">
            <div class="products-card-title">{{ cName }}</div>
            <div class="products-card-type" v-for="(type, tName) in category">
              <div class="products-card-type-title"><div>—</div> {{ tName }}</div>
              <div class="products-card-table-pre">
                <table class="products-card-table">
                  <thead>
                    <tr class="products-card-table-tr">
                      <th class="products-card-table-th">ID</th>
                      <th class="products-card-table-th">Дата изготовления</th>
                      <th class="products-card-table-th">Дата истечения срока годности</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr class="products-card-table-tr" v-for="(item, itemID) in type.items">
                    <td class="products-card-table-td"><code>{{ itemID }}</code></td>
                    <td class="products-card-table-td">{{ date(item.production_date)[0] }}</td>
                    <td class="products-card-table-td expiry">{{ date(item.expiry_date)[0] }} (<div class="products-card-table-time">{{ date(item.expiry_date)[1] }} дней</div>)</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products {
  margin-top: 60px;
  &-title {
    font-size: 2rem;
    font-weight: 600;
  }

  &-space {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px 0;
  }

  &-card {
    width: 100%;
    padding: 30px;
    background: var(--color-sub-background);
    border: 1px solid var(--color-main);
    border-radius: 15px;

    &-title {
      font-size: 1.5rem;
      font-weight: 600;
    }

    &-type {
      margin-top: 25px;
      &-title {
        font-size: 1.2rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0 15px;
      }
    }

    &-table {
      width: 100%;
      text-align: left;
      background: var(--color-table-background);
      border-collapse: collapse;
      white-space: nowrap;

      &-pre {
        margin-top: 10px;
        border: 1px solid var(--color-main);
        border-radius: 10px;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
      }

      &-tr {
        border-bottom: 1px solid var(--color-main);
      }

      &-th {
        font-weight: 400;
      }

      &-th, &-td {
        padding: 10px 20px;

        code {
          font-family: monospace;
        }
      }

      tbody &-tr:last-child {
        border-bottom: none;
      }

      &-td.expiry {
        display: flex;
        align-items: center;
      }

      &-time {
        background: rgb(255, 59, 59, 0.2);
        color: #ff3b3b;
        border-radius: 2px;
      }
    }
  }
}
</style>